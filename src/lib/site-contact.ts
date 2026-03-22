import { SITE } from "@/config";

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
    areaServed: ["Las Vegas", "Henderson", "Sunstone", "Trilogy Sunset"],
  };
}
