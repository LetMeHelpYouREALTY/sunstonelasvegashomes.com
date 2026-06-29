import { SITE } from "@/config";
import { getPublicEnv } from "@/lib/env";

const trim = (v: string | undefined) => v?.trim() ?? "";

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

/** GBP-aligned NAP and entity fields. Set PUBLIC_* or NEXT_PUBLIC_* in .env. */
export function getSiteContact() {
  const origin = SITE.website.replace(/\/$/, "");
  const facebook = trim(getPublicEnv("SOCIAL_FACEBOOK"));
  const linkedin = trim(getPublicEnv("SOCIAL_LINKEDIN"));
  const googleBusinessProfileUrl = trim(
    getPublicEnv("GOOGLE_BUSINESS_PROFILE_URL"),
  );
  return {
    websiteId: `${origin}/#website`,
    agentId: `${origin}/#agent`,
    brokerageId: `${origin}/#brokerage`,
    businessName: SITE.title,
    agentName: SITE.author,
    profileUrl: SITE.profile,
    brokerageName: "Berkshire Hathaway HomeServices Nevada Properties",
    licenseNumber: "S.0197614.LLC",
    telephone: trim(getPublicEnv("SITE_PHONE")),
    streetAddress: trim(getPublicEnv("SITE_STREET")),
    addressLocality: "Las Vegas",
    addressRegion: "NV",
    postalCode: trim(getPublicEnv("SITE_POSTAL")),
    latitude: trim(getPublicEnv("SITE_LAT")),
    longitude: trim(getPublicEnv("SITE_LNG")),
    googleMapsUrl: trim(getPublicEnv("GOOGLE_MAPS_URL")),
    googleReviewsUrl: trim(getPublicEnv("GOOGLE_REVIEWS_URL")),
    /** Public Google Business Profile page (maps.app.goo.gl or g.page / business.google links). */
    googleBusinessProfileUrl,
    socialFacebookUrl: facebook,
    socialLinkedInUrl: linkedin,
    areaServed: AREA_SERVED,
  };
}

/** Absolute URL for default OG image — use as RealEstateAgent.image when no dedicated headshot URL is set. */
export function getDefaultOgImageUrl(): string {
  const origin = SITE.website.replace(/\/$/, "");
  return `${origin}/og.png`;
}

/**
 * Stable entity URLs for RealEstateAgent.sameAs (GEO): social profiles, GBP, reviews.
 * Dedupes identical hrefs.
 */
export function getEntitySameAsUrls(): string[] {
  const c = getSiteContact();
  const raw = [
    c.socialFacebookUrl,
    c.socialLinkedInUrl,
    c.googleBusinessProfileUrl,
    c.googleReviewsUrl,
  ].filter(Boolean) as string[];
  return [...new Set(raw)];
}
