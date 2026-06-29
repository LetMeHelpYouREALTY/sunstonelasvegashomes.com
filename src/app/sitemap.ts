import type { MetadataRoute } from "next";

import { SITE } from "@/config";
import { getSortedPosts } from "@/lib/blog";
import { getSunstoneSpokeSlugs } from "@/data/sunstone-content";
import { getPath } from "@/utils/getPath";

const MONEY_PAGES = new Set([
  "/",
  "/about",
  "/contact",
  "/location",
  "/market",
  "/buying-process",
  "/buyers",
  "/faq",
  "/sellers",
]);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE.website.replace(/\/$/, "");
  const staticPaths = [
    "",
    "about",
    "buyers",
    "sellers",
    "contact",
    "faq",
    "location",
    "market",
    "lifestyle",
    "community",
    "buying-process",
    "market-news",
    "privacy",
    "search",
    "tags",
    "posts",
    "sunstone",
    "models/sunstone",
    "models/trilogy-sunset",
    ...(SITE.showArchives ? ["archives"] : []),
    ...getSunstoneSpokeSlugs().map(slug => `sunstone/${slug}`),
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map(path => {
    const pathname = path ? `/${path}/` : "/";
    const isMoney = MONEY_PAGES.has(pathname.replace(/\/$/, "") || "/");
    return {
      url: `${base}${pathname === "/" ? "/" : pathname}`,
      lastModified: new Date(),
      changeFrequency: isMoney ? "weekly" : "monthly",
      priority: isMoney ? 0.95 : 0.7,
    };
  });

  const posts = await getSortedPosts();
  const postEntries: MetadataRoute.Sitemap = posts.map(post => ({
    url: `${base}${getPath(post.id, post.filePath)}/`,
    lastModified: post.data.modDatetime ?? post.data.pubDatetime,
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  return [...staticEntries, ...postEntries];
}
