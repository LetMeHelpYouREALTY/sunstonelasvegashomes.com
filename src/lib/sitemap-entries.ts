import type { MetadataRoute } from "next";
import { SITE } from "@/config";
import { getSunstoneSpokeSlugs } from "@/data/sunstone-content";
import { getAllPosts } from "@/lib/posts";
import { paginatePosts, postsPageUrl, tagPageUrl } from "@/lib/pagination";
import { getPath } from "@/utils/getPath";
import getPostsByTag from "@/utils/getPostsByTag";
import getUniqueTags from "@/utils/getUniqueTags";

const MONEY_PATHS = [
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
  "/privacy/",
] as const;

const SECONDARY_PATHS = ["/lifestyle/", "/community/", "/posts/", "/archives/"] as const;

const MODEL_PATHS = ["/models/sunstone/", "/models/trilogy-sunset/"] as const;

function absoluteUrl(path: string): string {
  const origin = SITE.website.replace(/\/$/, "");
  return path === "/" ? `${origin}/` : `${origin}${path}`;
}

/** Sitemap entries aligned with former @astrojs/sitemap priority/changefreq tuning. */
export function buildSitemapEntries(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of MONEY_PATHS) {
    entries.push({
      url: absoluteUrl(path),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.95,
    });
  }

  for (const path of SECONDARY_PATHS) {
    if (path === "/archives/" && !SITE.showArchives) continue;
    entries.push({
      url: absoluteUrl(path),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const path of MODEL_PATHS) {
    entries.push({
      url: absoluteUrl(path),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    });
  }

  for (const slug of getSunstoneSpokeSlugs()) {
    entries.push({
      url: absoluteUrl(`/sunstone/${slug}/`),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    });
  }

  const posts = getAllPosts();
  const { totalPages } = paginatePosts(posts, 1);
  for (let page = 2; page <= totalPages; page++) {
    entries.push({
      url: absoluteUrl(postsPageUrl(page)),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    });
  }

  for (const post of posts) {
    entries.push({
      url: absoluteUrl(getPath(post.id, post.filePath)),
      lastModified: post.data.modDatetime ?? post.data.pubDatetime,
      changeFrequency: "monthly",
      priority: 0.65,
    });
  }

  const tags = getUniqueTags(posts);
  for (const { tag } of tags) {
    const tagged = getPostsByTag(posts, tag);
    const tagPages = Math.max(1, Math.ceil(tagged.length / SITE.postPerPage));
    for (let page = 1; page <= tagPages; page++) {
      entries.push({
        url: absoluteUrl(tagPageUrl(tag, page)),
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.55,
      });
    }
  }

  entries.push({
    url: absoluteUrl("/tags/"),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  });

  return entries;
}
