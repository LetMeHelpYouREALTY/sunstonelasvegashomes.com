import { SITE } from "@/config";
import { getAllPosts } from "@/lib/posts";
import { getPath } from "@/utils/getPath";
import type { MetadataRoute } from "next";

const MONEY_PAGES = [
  "/",
  "/about/",
  "/contact/",
  "/location/",
  "/market/",
  "/buying-process/",
  "/buyers/",
  "/faq/",
  "/sellers/",
  "/sunstone/",
  "/market-news/",
  "/buying-process/",
  "/lifestyle/",
  "/community/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = SITE.website.replace(/\/$/, "");
  const staticEntries: MetadataRoute.Sitemap = MONEY_PAGES.map(path => ({
    url: path === "/" ? `${origin}/` : `${origin}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.95,
  }));

  const posts = getAllPosts();
  const postEntries: MetadataRoute.Sitemap = posts.map(post => ({
    url: `${origin}${getPath(post.id, post.filePath)}`,
    lastModified: post.data.modDatetime ?? post.data.pubDatetime,
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  return [...staticEntries, ...postEntries];
}
