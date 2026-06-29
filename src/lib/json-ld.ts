import { SITE } from "@/config";
import {
  areaServedToJsonLd,
  getDefaultOgImageUrl,
  getEntitySameAsUrls,
  getSiteContact,
} from "@/lib/site-contact";

export type StructuredDataNode = Record<string, unknown>;

export type BuildStructuredDataInput = {
  title: string;
  description: string;
  canonicalURL: string | URL;
  pubDatetime?: Date;
  modDatetime?: Date | null;
  faqSchema?: StructuredDataNode | null;
  author?: string;
  profile?: string;
  ogImage?: string | URL;
};

function toAbsoluteUrl(value: string | URL): URL {
  return value instanceof URL ? value : new URL(value, SITE.website);
}

function stripContext(node: StructuredDataNode): StructuredDataNode {
  const entries = Object.entries(node).filter(([key]) => key !== "@context");
  return Object.fromEntries(entries);
}

export function buildStructuredData({
  title,
  description,
  canonicalURL,
  pubDatetime,
  modDatetime,
  faqSchema = null,
  author = SITE.author,
  profile = SITE.profile,
  ogImage = getDefaultOgImageUrl(),
}: BuildStructuredDataInput): StructuredDataNode {
  const canonical = toAbsoluteUrl(canonicalURL);
  const socialImageURL = toAbsoluteUrl(ogImage);
  const siteOrigin = SITE.website.replace(/\/$/, "");
  const contact = getSiteContact();

  const personAuthor = {
    "@type": "Person",
    name: author,
    ...(profile ? { url: profile } : {}),
  };

  const orgBrokerage = {
    "@type": "Organization",
    "@id": contact.brokerageId,
    name: contact.brokerageName,
    url: siteOrigin,
  };

  const realEstateAgent: StructuredDataNode = {
    "@type": "RealEstateAgent",
    "@id": contact.agentId,
    name: contact.agentName,
    url: contact.profileUrl,
    identifier: contact.licenseNumber,
    memberOf: { "@id": contact.brokerageId },
  };

  if (contact.telephone) {
    realEstateAgent.telephone = contact.telephone;
  }

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

  realEstateAgent.areaServed = areaServedToJsonLd(contact.areaServed);
  realEstateAgent.image = getDefaultOgImageUrl();

  const sameAs = getEntitySameAsUrls();
  if (sameAs.length > 0) {
    realEstateAgent.sameAs = sameAs;
  }

  const webSite: StructuredDataNode = {
    "@type": "WebSite",
    "@id": contact.websiteId,
    name: SITE.title,
    url: siteOrigin,
    publisher: { "@id": contact.agentId },
  };

  const webPageDoc: StructuredDataNode = {
    "@type": "WebPage",
    "@id": `${canonical.href}#webpage`,
    name: title,
    description,
    url: canonical.href,
    isPartOf: { "@id": contact.websiteId },
    about: { "@id": contact.agentId },
  };

  if (!pubDatetime && author) {
    webPageDoc.author = personAuthor;
  }

  const graph: StructuredDataNode[] = [webSite, orgBrokerage, realEstateAgent];

  if (pubDatetime) {
    graph.push({
      "@type": "WebPage",
      "@id": `${canonical.href}#webpage`,
      name: title,
      description,
      url: canonical.href,
      isPartOf: { "@id": contact.websiteId },
    });

    graph.push({
      "@type": "BlogPosting",
      "@id": `${canonical.href}#article`,
      headline: title,
      image: socialImageURL.href,
      datePublished: pubDatetime.toISOString(),
      ...(modDatetime ? { dateModified: modDatetime.toISOString() } : {}),
      author: { "@id": contact.agentId },
      publisher: { "@id": contact.agentId },
      mainEntityOfPage: { "@id": `${canonical.href}#webpage` },
    });
  } else {
    graph.push(webPageDoc);
  }

  if (faqSchema) {
    graph.push(stripContext(faqSchema));
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
