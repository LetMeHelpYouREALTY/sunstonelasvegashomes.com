import type { Metadata } from "next";
import { SITE } from "@/config";
import {
  areaServedToJsonLd,
  getDefaultOgImageUrl,
  getEntitySameAsUrls,
  getSiteContact,
} from "@/lib/site-contact";

export type PageJsonLdOptions = {
  title: string;
  description: string;
  canonicalPath: string;
  pubDatetime?: Date;
  modDatetime?: Date | null;
  ogImage?: string;
  faqSchema?: Record<string, unknown> | null;
};

export function buildStructuredData({
  title,
  description,
  canonicalPath,
  pubDatetime,
  modDatetime,
  ogImage = "/og.png",
  faqSchema = null,
}: PageJsonLdOptions) {
  const siteOrigin = SITE.website.replace(/\/$/, "");
  const canonicalURL = new URL(canonicalPath, SITE.website);
  const socialImageURL = /^https?:\/\//i.test(ogImage)
    ? ogImage
    : new URL(ogImage, SITE.website).href;

  const contact = getSiteContact();

  const personAuthor = {
    "@type": "Person",
    name: SITE.author,
    ...(SITE.profile ? { url: SITE.profile } : {}),
  };

  const orgBrokerage = {
    "@type": "Organization",
    "@id": contact.brokerageId,
    name: contact.brokerageName,
    url: siteOrigin,
  };

  const realEstateAgent: Record<string, unknown> = {
    "@type": "RealEstateAgent",
    "@id": contact.agentId,
    name: contact.agentName,
    url: contact.profileUrl,
    identifier: contact.licenseNumber,
    memberOf: { "@id": contact.brokerageId },
    image: getDefaultOgImageUrl(),
    areaServed: areaServedToJsonLd(contact.areaServed),
  };

  if (contact.telephone) realEstateAgent.telephone = contact.telephone;
  if (contact.streetAddress && contact.postalCode) {
    realEstateAgent.address = {
      "@type": "PostalAddress",
      streetAddress: contact.streetAddress,
      addressLocality: contact.addressLocality,
      addressRegion: contact.addressRegion,
      postalCode: contact.postalCode,
      addressCountry: "US",
    };
  }
  if (contact.latitude && contact.longitude) {
    realEstateAgent.geo = {
      "@type": "GeoCoordinates",
      latitude: Number(contact.latitude),
      longitude: Number(contact.longitude),
    };
  }
  const sameAs = getEntitySameAsUrls();
  if (sameAs.length > 0) realEstateAgent.sameAs = sameAs;

  const webSite: Record<string, unknown> = {
    "@type": "WebSite",
    "@id": contact.websiteId,
    name: SITE.title,
    url: siteOrigin,
    publisher: { "@id": contact.agentId },
  };

  const webPageDoc: Record<string, unknown> = {
    "@type": "WebPage",
    "@id": `${canonicalURL.href}#webpage`,
    name: title,
    description,
    url: canonicalURL.href,
    isPartOf: { "@id": contact.websiteId },
    about: { "@id": contact.agentId },
    author: personAuthor,
  };

  const graph: Record<string, unknown>[] = [webSite, orgBrokerage, realEstateAgent];

  if (pubDatetime) {
    graph.push({
      "@type": "WebPage",
      "@id": `${canonicalURL.href}#webpage`,
      name: title,
      description,
      url: canonicalURL.href,
      isPartOf: { "@id": contact.websiteId },
    });
    graph.push({
      "@type": "BlogPosting",
      "@id": `${canonicalURL.href}#article`,
      headline: title,
      image: socialImageURL,
      datePublished: pubDatetime.toISOString(),
      ...(modDatetime ? { dateModified: modDatetime.toISOString() } : {}),
      author: { "@id": contact.agentId },
      publisher: { "@id": contact.agentId },
      mainEntityOfPage: { "@id": `${canonicalURL.href}#webpage` },
    });
  } else {
    graph.push(webPageDoc);
  }

  if (faqSchema) graph.push(faqSchema);

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export function buildPageMetadata({
  title,
  description,
  canonicalPath,
  pubDatetime,
  modDatetime,
  ogImage,
}: Omit<PageJsonLdOptions, "faqSchema">): Metadata {
  const canonicalURL = new URL(canonicalPath, SITE.website);
  const image = ogImage
    ? /^https?:\/\//i.test(ogImage)
      ? ogImage
      : new URL(ogImage, SITE.website).href
    : new URL("/og.png", SITE.website).href;

  return {
    title,
    description,
    authors: [{ name: SITE.author }],
    alternates: {
      canonical: canonicalURL.href,
      types: {
        "application/rss+xml": [{ url: "/rss.xml", title: SITE.title }],
      },
    },
    openGraph: {
      type: pubDatetime ? "article" : "website",
      siteName: SITE.title,
      title,
      description,
      url: canonicalURL.href,
      images: [{ url: image }],
      locale: "en_US",
      ...(pubDatetime
        ? {
            publishedTime: pubDatetime.toISOString(),
            ...(modDatetime
              ? { modifiedTime: modDatetime.toISOString() }
              : {}),
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: { index: true, follow: true },
  };
}
