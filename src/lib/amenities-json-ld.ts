import { SITE } from "@/config";
import { CURATED_AMENITIES } from "@/data/nearby-amenities-curated";
import type { FaqEntry } from "@/data/faq-entries";
import { COMMUNITY_MAP } from "@/lib/community-map";
import { buildStructuredData, type PageJsonLdOptions } from "@/lib/json-ld";
import { getSiteContact } from "@/lib/site-contact";

function formatPostalAddress(
  street: string,
  locality: string,
  region: string,
  postalCode: string,
) {
  return {
    "@type": "PostalAddress",
    streetAddress: street,
    addressLocality: locality,
    addressRegion: region,
    postalCode,
    addressCountry: "US",
  };
}

export function buildAmenitiesFaqSchema(
  faqEntries: FaqEntry[],
  pageUrl: string,
) {
  return {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: faqEntries.map(entry => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.answer,
      },
    })),
  };
}

export function buildAmenitiesItemListSchema(pageUrl: string) {
  return {
    "@type": "ItemList",
    "@id": `${pageUrl}#nearby-places`,
    name: `Featured places near ${COMMUNITY_MAP.name}`,
    itemListElement: CURATED_AMENITIES.map((place, index) => {
      const item: Record<string, unknown> = {
        "@type": place.schemaType,
        name: place.name,
        url: place.sourceUrl,
      };
      if (place.address && place.postalCode) {
        item.address = formatPostalAddress(
          place.address,
          place.locality,
          place.region,
          place.postalCode,
        );
      }
      return {
        "@type": "ListItem",
        position: index + 1,
        item,
      };
    }),
  };
}

export function buildAmenitiesBreadcrumbSchema(pageUrl: string) {
  const origin = SITE.website.replace(/\/$/, "");
  return {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${origin}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Nearby amenities",
        item: pageUrl,
      },
    ],
  };
}

export function buildCommunityPlaceSchema(pageUrl: string) {
  return {
    "@type": "Place",
    "@id": `${pageUrl}#community`,
    name: COMMUNITY_MAP.name,
    description:
      "Sunstone master-planned community and Trilogy Sunset 55+ collection in northwest Las Vegas, Nevada.",
    containedInPlace: {
      "@type": "City",
      name: COMMUNITY_MAP.city,
      containedInPlace: {
        "@type": "State",
        name: "Nevada",
      },
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: COMMUNITY_MAP.latitude,
      longitude: COMMUNITY_MAP.longitude,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: COMMUNITY_MAP.city,
      addressRegion: COMMUNITY_MAP.state,
      postalCode: COMMUNITY_MAP.postalCode,
      addressCountry: "US",
    },
  };
}

export function buildAmenitiesStructuredData(
  options: PageJsonLdOptions,
  faqEntries: FaqEntry[],
) {
  const base = buildStructuredData({
    ...options,
    faqSchema: buildAmenitiesFaqSchema(
      faqEntries,
      new URL(options.canonicalPath, SITE.website).href,
    ),
  });

  const pageUrl = new URL(options.canonicalPath, SITE.website).href;
  const contact = getSiteContact();

  const extra = [
    buildAmenitiesBreadcrumbSchema(pageUrl),
    buildCommunityPlaceSchema(pageUrl),
    buildAmenitiesItemListSchema(pageUrl),
  ];

  const graph = [...(base["@graph"] as Record<string, unknown>[]), ...extra];

  const agentNode = graph.find(
    node => node["@type"] === "RealEstateAgent",
  ) as Record<string, unknown> | undefined;

  if (agentNode) {
    agentNode.knowsAbout = [
      ...(Array.isArray(agentNode.knowsAbout) ? agentNode.knowsAbout : []),
      COMMUNITY_MAP.name,
      "Nearby amenities in northwest Las Vegas",
    ];
    if (contact.latitude && contact.longitude) {
      agentNode.workLocation = {
        "@type": "Place",
        name: contact.businessName,
        geo: {
          "@type": "GeoCoordinates",
          latitude: Number(contact.latitude),
          longitude: Number(contact.longitude),
        },
      };
    }
  }

  return {
    ...base,
    "@graph": graph,
  };
}
