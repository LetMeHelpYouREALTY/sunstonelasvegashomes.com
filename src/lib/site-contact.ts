import { SITE } from "@/config";

/** Metro areas vs communities (schema.org City vs Place + containedInPlace). */
export type AreaServedEntry =
  | { kind: "city"; name: string }
  | { kind: "place"; name: string; containedInCity: string };

export const AREA_SERVED: readonly AreaServedEntry[] = [
  { kind: "city", name: "Las Vegas" },
  { kind: "city", name: "Henderson" },
  {
    kind: "place",
    name: "Sunstone",
    containedInCity: "Las Vegas",
  },
  {
    kind: "place",
    name: "Trilogy Sunset",
    containedInCity: "Las Vegas",
  },
];

export function areaServedToJsonLd(
  entries: readonly AreaServedEntry[],
): Record<string, unknown>[] {
  return entries.map(entry => {
    if (entry.kind === "city") {
      return { "@type": "City", name: entry.name };
    }
    return {
      "@type": "Place",
      name: entry.name,
      containedInPlace: { "@type": "City", name: entry.containedInCity },
    };
  });
}

/** GBP-aligned NAP and entity fields. Set PUBLIC_* in .env for production. */
export function getSiteContact() {
  const origin = SITE.website.replace(/\/$/, "");
  return {
    websiteId: `${origin}/#website`,
    agentId: `${origin}/#agent`,
    brokerageId: `${origin}/#brokerage`,
    businessName: SITE.title,
    agentName: SITE.author,
    profileUrl: SITE.profile,
    brokerageName: "Berkshire Hathaway HomeServices Nevada Properties",
    licenseNumber: "S.0197614.LLC",
    telephone: (import.meta.env.PUBLIC_SITE_PHONE as string | undefined)?.trim() ?? "",
    streetAddress: (import.meta.env.PUBLIC_SITE_STREET as string | undefined)?.trim() ?? "",
    addressLocality: "Las Vegas",
    addressRegion: "NV",
    postalCode: (import.meta.env.PUBLIC_SITE_POSTAL as string | undefined)?.trim() ?? "",
    latitude: (import.meta.env.PUBLIC_SITE_LAT as string | undefined)?.trim() ?? "",
    longitude: (import.meta.env.PUBLIC_SITE_LNG as string | undefined)?.trim() ?? "",
    googleMapsUrl: (import.meta.env.PUBLIC_GOOGLE_MAPS_URL as string | undefined)?.trim() ?? "",
    googleReviewsUrl: (import.meta.env.PUBLIC_GOOGLE_REVIEWS_URL as string | undefined)?.trim() ?? "",
    areaServed: AREA_SERVED,
  };
}
