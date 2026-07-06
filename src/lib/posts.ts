import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { cache } from "react";
import { SITE } from "@/config";
import { BLOG_PATH } from "@/lib/blog-path";
import { isDev } from "@/lib/env";
import { slugifyStr } from "@/utils/slugify";

const postSchema = z.object({
  author: z.string().default(SITE.author),
  pubDatetime: z.coerce.date(),
  modDatetime: z.coerce.date().optional().nullable(),
  title: z.string(),
  featured: z.boolean().optional(),
  draft: z.boolean().optional(),
  tags: z.array(z.string()).default(["others"]),
  ogImage: z.string().optional(),
  description: z.string(),
  canonicalURL: z.string().optional(),
  hideEditPost: z.boolean().optional(),
  timezone: z.string().optional(),
});

export type BlogPostData = z.infer<typeof postSchema>;

export type BlogPost = {
  id: string;
  filePath: string;
  data: BlogPostData;
  content: string;
};

function collectMarkdownFiles(dir: string, base = dir): string[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name.startsWith("_")) continue;
      files.push(...collectMarkdownFiles(full, base));
      continue;
    }
    if (!entry.name.endsWith(".md")) continue;
    if (entry.name.startsWith("_")) continue;
    files.push(full);
  }

  return files;
}

function filePathToId(filePath: string): string {
  const rel = path.relative(path.join(process.cwd(), BLOG_PATH), filePath);
  return rel.replace(/\.md$/, "").replace(/\\/g, "/");
}

function parsePost(filePath: string): BlogPost | null {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const parsed = postSchema.safeParse(data);
  if (!parsed.success) {
    console.warn(`[posts] invalid frontmatter in ${filePath}:`, parsed.error.message);
    return null;
  }
  return {
    id: filePathToId(filePath),
    filePath: path.relative(process.cwd(), filePath),
    data: parsed.data,
    content,
  };
}

function postFilter(post: BlogPost): boolean {
  const isPublishTimePassed =
    Date.now() >
    new Date(post.data.pubDatetime).getTime() - SITE.scheduledPostMargin;
  return !post.data.draft && (isDev() || isPublishTimePassed);
}

export const getAllPosts = cache((): BlogPost[] => {
  const blogDir = path.join(process.cwd(), BLOG_PATH);
  const files = collectMarkdownFiles(blogDir);
  return files
    .map(parsePost)
    .filter((p): p is BlogPost => p !== null)
    .filter(postFilter)
    .sort(
      (a, b) =>
        Math.floor(
          new Date(b.data.modDatetime ?? b.data.pubDatetime).getTime() / 1000,
        ) -
        Math.floor(
          new Date(a.data.modDatetime ?? a.data.pubDatetime).getTime() / 1000,
        ),
    );
});

export function getPostBySlug(slugParts: string[]): BlogPost | undefined {
  const slug = slugParts.join("/");
  return getAllPosts().find(post => post.id === slug);
}

export function getPostSlugParts(post: BlogPost): string[] {
  return post.id.split("/");
}

export { slugifyStr };
