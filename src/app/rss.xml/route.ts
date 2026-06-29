import { SITE } from "@/config";
import { getSortedPosts } from "@/lib/blog";
import { getPath } from "@/utils/getPath";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = await getSortedPosts();
  const site = SITE.website.replace(/\/$/, "");

  const items = posts
    .map(post => {
      const link = `${site}${getPath(post.id, post.filePath)}/`;
      return `
    <item>
      <title>${escapeXml(post.data.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid>${escapeXml(link)}</guid>
      <description>${escapeXml(post.data.description)}</description>
      <pubDate>${new Date(post.data.modDatetime ?? post.data.pubDatetime).toUTCString()}</pubDate>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(SITE.title)}</title>
    <link>${escapeXml(`${site}/`)}</link>
    <description>${escapeXml(SITE.desc)}</description>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
