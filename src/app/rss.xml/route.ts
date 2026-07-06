import { SITE } from "@/config";
import { getAllPosts } from "@/lib/posts";
import { getPath } from "@/utils/getPath";

export const dynamic = "force-static";

export async function GET() {
  const posts = getAllPosts();
  const origin = SITE.website.replace(/\/$/, "");

  const items = posts
    .map(post => {
      const link = `${origin}${getPath(post.id, post.filePath)}`;
      const pubDate = new Date(post.data.modDatetime ?? post.data.pubDatetime);
      return `
    <item>
      <title><![CDATA[${post.data.title}]]></title>
      <link>${link}</link>
      <description><![CDATA[${post.data.description}]]></description>
      <pubDate>${pubDate.toUTCString()}</pubDate>
      <guid isPermaLink="true">${link}</guid>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${SITE.title}</title>
    <link>${origin}/</link>
    <description>${SITE.desc}</description>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
