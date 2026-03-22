import Parser from "rss-parser";

/** Default: Simplifying the Market English feed (KCM). Override with PUBLIC_KCM_FEED_URL. */
const DEFAULT_FEED_URL =
  "https://www.simplifyingthemarket.com/en/feed?a=956758-ef2edda2f940e018328655620ea05f18";

/** If CSP is added later, allow img-src: files.keepingcurrentmatters.com, www.simplifyingthemarket.com */

export type KcmFeedItem = {
  title: string;
  link: string;
  pubDate: Date | null;
  excerpt: string;
  image?: string;
};

const parser = new Parser({
  customFields: {
    item: ["content:encoded"],
  },
});

function firstImgSrc(html: string | undefined): string | undefined {
  if (!html) return undefined;
  const m = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return m?.[1]?.trim();
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function excerptFromItem(item: {
  contentSnippet?: string;
  content?: string;
  summary?: string;
  contentEncoded?: string;
}): string {
  const raw =
    item.contentSnippet ||
    item.summary ||
    (item.contentEncoded ? stripHtml(item.contentEncoded) : "") ||
    (item.content ? stripHtml(item.content) : "") ||
    "";
  const text = typeof raw === "string" ? raw : stripHtml(String(raw));
  if (text.length <= 280) return text;
  return `${text.slice(0, 277)}…`;
}

function rawHtmlForImage(item: Record<string, unknown>): string {
  const encoded = item["content:encoded"];
  if (typeof encoded === "string") return encoded;
  const c = item.content;
  if (typeof c === "string") return c;
  const desc = item.description;
  if (typeof desc === "string") return desc;
  return "";
}

export async function getKcmFeedItems(
  limit?: number
): Promise<KcmFeedItem[]> {
  const feedUrl =
    (import.meta.env.PUBLIC_KCM_FEED_URL as string | undefined)?.trim() ||
    DEFAULT_FEED_URL;

  try {
    const xml = await fetch(feedUrl, {
      headers: {
        Accept: "application/rss+xml, application/xml, text/xml, */*",
      },
    });
    if (!xml.ok) {
      console.warn(
        `[kcm-feed] feed HTTP ${xml.status} for ${feedUrl.slice(0, 80)}…`
      );
      return [];
    }
    const text = await xml.text();
    const feed = await parser.parseString(text);

    const items: KcmFeedItem[] = [];
    const rawItems = feed.items ?? [];

    for (const item of rawItems) {
      const record = item as unknown as Record<string, unknown>;
      const title = item.title?.trim();
      const link = item.link?.trim();
      if (!title || !link) continue;

      const htmlBlob = rawHtmlForImage(record);
      const image = firstImgSrc(htmlBlob);

      let pubDate: Date | null = null;
      if (item.pubDate) {
        const d = new Date(item.pubDate);
        if (!Number.isNaN(d.getTime())) pubDate = d;
      }

      const contentEncoded =
        typeof record["content:encoded"] === "string"
          ? (record["content:encoded"] as string)
          : undefined;

      items.push({
        title,
        link,
        pubDate,
        excerpt: excerptFromItem({
          contentSnippet: item.contentSnippet,
          content: item.content,
          contentEncoded,
        }),
        ...(image ? { image } : {}),
      });

      if (limit !== undefined && items.length >= limit) break;
    }

    return items;
  } catch (e) {
    console.warn("[kcm-feed] failed to load or parse feed:", e);
    return [];
  }
}
