/** Public reference site for the Sunstone masterplan (developer marketing). */
export const SUNSTONE_OFFICIAL_SITE = "https://www.sunstonelv.com/" as const;

/** Builders named on the official community site — factual listing, not an endorsement. */
export const SUNSTONE_BUILDERS = [
  "Lennar",
  "Shea Homes",
  "Woodside Homes",
  "Richmond American Homes",
] as const;

export const sunstoneOfficialLinkText = "Sunstone community site (builders & phases)";

/** Short disclaimer for inventory, pricing, and phase timing. */
export const SUNSTONE_INVENTORY_DISCLAIMER =
  "Availability, pricing, and incentives change often. Confirm current new-home details on the official community site and compare with MLS resale listings on this site.";

/** Geographic framing — regional context only, not drive-time guarantees. */
export const SUNSTONE_AREA_CONTEXT =
  "Sunstone is marketed as a master-planned community in northwest Las Vegas with access to US-95 and regional recreation such as Mt. Charleston and Lee Canyon—exact commute times depend on your routine.";

export function officialSunstoneSiteLink(): string {
  return SUNSTONE_OFFICIAL_SITE;
}
