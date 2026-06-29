import type { Metadata } from "next";

import { SITE } from "@/config";
import { buildStructuredData, type StructuredDataNode } from "@/lib/json-ld";

const THEME_COLOR = "#0a2540";

export type PageMetadataInput = {
  title: string;
  description?: string;
  canonicalPath?: string;
  ogImage?: string;
  pubDatetime?: Date;
  modDatetime?: Date | null;
  faqSchema?: StructuredDataNode | null;
  noIndex?: boolean;
};

function canonicalUrl(path = "/"): string {
  const origin = SITE.website.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${origin}${normalized}`;
}

export function createPageMetadata({
  title,
  description = SITE.desc,
  canonicalPath = "/",
  ogImage = "/og.png",
  noIndex = false,
}: PageMetadataInput): Metadata {
  const canonical = canonicalUrl(canonicalPath);
  const image = ogImage.startsWith("http")
    ? ogImage
    : canonicalUrl(ogImage);

  return {
    title,
    description,
    authors: [{ name: SITE.author }],
    alternates: {
      canonical,
      types: {
        "application/rss+xml": canonicalUrl("/rss.xml"),
      },
    },
    openGraph: {
      type: "website",
      siteName: SITE.title,
      title,
      description,
      url: canonical,
      locale: "en_US",
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    other: {
      "theme-color": THEME_COLOR,
    },
  };
}

export function createArticleMetadata({
  title,
  description,
  canonicalPath,
  ogImage,
  pubDatetime,
  modDatetime,
}: PageMetadataInput): Metadata {
  const base = createPageMetadata({
    title,
    description,
    canonicalPath,
    ogImage,
  });

  if (!pubDatetime) {
    return base;
  }

  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: pubDatetime.toISOString(),
      ...(modDatetime ? { modifiedTime: modDatetime.toISOString() } : {}),
    },
  };
}

export function createStructuredDataScript(input: PageMetadataInput) {
  const canonical = canonicalUrl(input.canonicalPath ?? "/");
  const structuredData = buildStructuredData({
    title: input.title,
    description: input.description ?? SITE.desc,
    canonicalURL: canonical,
    pubDatetime: input.pubDatetime,
    modDatetime: input.modDatetime,
    faqSchema: input.faqSchema ?? null,
    ogImage: input.ogImage?.startsWith("http")
      ? input.ogImage
      : canonicalUrl(input.ogImage ?? "/og.png"),
  });

  return JSON.stringify(structuredData);
}
