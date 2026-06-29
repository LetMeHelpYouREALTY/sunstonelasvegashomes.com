import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";
import { cache } from "react";

import matter from "gray-matter";
import kebabcase from "lodash.kebabcase";

import { SITE } from "@/config";

const BLOG_ROOT = path.join(process.cwd(), "src", "data", "blog");

export type BlogPostData = {
  title: string;
  author: string;
  pubDatetime: Date;
  modDatetime?: Date | null;
  featured?: boolean;
  draft?: boolean;
  tags: string[];
  description: string;
  canonicalURL?: string;
  ogImage?: string;
  hideEditPost?: boolean;
  timezone?: string;
  slug?: string;
  [key: string]: unknown;
};

export type BlogPost = {
  id: string;
  data: BlogPostData;
  content: string;
  filePath: string;
};

function isHiddenEntry(name: string): boolean {
  return name.startsWith("_");
}

function slugifySegment(value: string): string {
  return kebabcase(value);
}

function parseDate(value: unknown, fieldName: string): Date {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value;
  }

  if (typeof value === "string" || typeof value === "number") {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed;
    }
  }

  throw new Error(`[blog] Invalid ${fieldName} value in frontmatter.`);
}

function parseOptionalDate(value: unknown): Date | null | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (value === null || value === "") {
    return null;
  }

  return parseDate(value, "modDatetime");
}

function parseTags(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return ["others"];
  }

  const tags = value
    .map(tag => (typeof tag === "string" ? tag.trim() : ""))
    .filter(Boolean);

  return tags.length > 0 ? tags : ["others"];
}

async function walkMarkdownFiles(directory: string): Promise<string[]> {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const filePaths: string[] = [];

  for (const entry of entries) {
    if (isHiddenEntry(entry.name)) {
      continue;
    }

    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      filePaths.push(...(await walkMarkdownFiles(absolutePath)));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".md")) {
      filePaths.push(absolutePath);
    }
  }

  return filePaths.sort((left, right) => left.localeCompare(right));
}

function buildPostId(filePath: string, frontmatter: Record<string, unknown>): string {
  const rawSlug =
    typeof frontmatter.slug === "string" ? frontmatter.slug.trim() : "";

  if (rawSlug) {
    return rawSlug
      .split("/")
      .filter(Boolean)
      .map(slugifySegment)
      .join("/");
  }

  const relativePath = path.relative(BLOG_ROOT, filePath);
  const segments = relativePath.split(path.sep);
  const fileName = segments.pop() ?? "";
  const fileSlug = slugifySegment(fileName.replace(/\.md$/i, ""));
  const dirSlugs = segments
    .filter(segment => !isHiddenEntry(segment))
    .map(slugifySegment);

  return [...dirSlugs, fileSlug].filter(Boolean).join("/");
}

async function readBlogPost(filePath: string): Promise<BlogPost> {
  const rawFile = await fs.readFile(filePath, "utf8");
  const { content, data } = matter(rawFile);

  if (typeof data.title !== "string" || data.title.trim().length === 0) {
    throw new Error(`[blog] Missing title in ${filePath}`);
  }

  const normalizedData: BlogPostData = {
    ...data,
    title: data.title.trim(),
    author:
      typeof data.author === "string" && data.author.trim().length > 0
        ? data.author.trim()
        : SITE.author,
    pubDatetime: parseDate(data.pubDatetime, "pubDatetime"),
    modDatetime: parseOptionalDate(data.modDatetime),
    featured: Boolean(data.featured),
    draft: Boolean(data.draft),
    tags: parseTags(data.tags),
    description:
      typeof data.description === "string" ? data.description.trim() : "",
    canonicalURL:
      typeof data.canonicalURL === "string" ? data.canonicalURL.trim() : undefined,
    ogImage: typeof data.ogImage === "string" ? data.ogImage.trim() : undefined,
    hideEditPost: Boolean(data.hideEditPost),
    timezone: typeof data.timezone === "string" ? data.timezone.trim() : undefined,
    slug: typeof data.slug === "string" ? data.slug.trim() : undefined,
  };

  return {
    id: buildPostId(filePath, data),
    data: normalizedData,
    content,
    filePath,
  };
}

const readAllPosts = cache(async (): Promise<BlogPost[]> => {
  const files = await walkMarkdownFiles(BLOG_ROOT);
  return Promise.all(files.map(readBlogPost));
});

function normalizeSlug(slug: string): string {
  return slug.replace(/^\/+|\/+$/g, "").replace(/^posts\//, "");
}

export async function getAllPosts(): Promise<BlogPost[]> {
  return readAllPosts();
}

export function filterPublished(posts: BlogPost[]): BlogPost[] {
  const isDev = process.env.NODE_ENV !== "production";
  const now = Date.now();

  return posts.filter(({ data }) => {
    const isPublishTimePassed =
      now > data.pubDatetime.getTime() - SITE.scheduledPostMargin;

    return !data.draft && (isDev || isPublishTimePassed);
  });
}

export async function getSortedPosts(): Promise<BlogPost[]> {
  return [...filterPublished(await getAllPosts())].sort(
    (left, right) =>
      Math.floor(
        (right.data.modDatetime ?? right.data.pubDatetime).getTime() / 1000,
      ) -
      Math.floor(
        (left.data.modDatetime ?? left.data.pubDatetime).getTime() / 1000,
      ),
  );
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const normalizedSlug = normalizeSlug(slug);
  return (await getAllPosts()).find(post => post.id === normalizedSlug);
}
