/**
 * Map center for Sunstone master-planned community (89143), northwest Las Vegas.
 * Coordinates approximate the community interior east of US-95; access is documented
 * via Log Cabin Way and North Skye Canyon Park Dr (City of Las Vegas Sunstone MDP exhibits).
 * Representative parcel coordinates in Sunstone align near 36.331°N, 115.311°W.
 */
export const COMMUNITY_MAP = {
  name: "Sunstone & Trilogy Sunset",
  shortName: "Sunstone",
  city: "Las Vegas",
  state: "NV",
  postalCode: "89143",
  latitude: 36.3314,
  longitude: -115.3113,
  /** Default map zoom when interactive API loads */
  defaultZoom: 13,
  /** searchNearby radius in meters */
  searchRadiusMeters: 8000,
  coordinateNote:
    "Center point for the Sunstone masterplan (89143), consistent with City of Las Vegas planning documents and representative in-community parcel coordinates—not a single official GIS pin.",
} as const;

export type AmenityCategoryId =
  | "healthcare"
  | "golf"
  | "parks"
  | "recreation"
  | "grocery"
  | "restaurants"
  | "cafes"
  | "pharmacies"
  | "shopping"
  | "fitness"
  | "parking"
  | "schools";

export type AmenityCategory = {
  id: AmenityCategoryId;
  label: string;
  /** Google Places (New) `includedPrimaryTypes` for Place.searchNearby */
  placeTypes: string[];
};

/** Active-adult–leaning masterplan: healthcare, golf, parks, and daily errands first; schools last. */
export const AMENITY_CATEGORIES: readonly AmenityCategory[] = [
  {
    id: "healthcare",
    label: "Healthcare",
    placeTypes: ["hospital", "doctor"],
  },
  {
    id: "golf",
    label: "Golf",
    placeTypes: ["golf_course"],
  },
  {
    id: "parks",
    label: "Parks",
    placeTypes: ["park"],
  },
  {
    id: "recreation",
    label: "Recreation",
    placeTypes: ["community_center", "sports_complex"],
  },
  {
    id: "grocery",
    label: "Grocery",
    placeTypes: ["grocery_store", "supermarket"],
  },
  {
    id: "restaurants",
    label: "Restaurants",
    placeTypes: ["restaurant"],
  },
  {
    id: "cafes",
    label: "Cafes",
    placeTypes: ["cafe", "coffee_shop"],
  },
  {
    id: "pharmacies",
    label: "Pharmacies",
    placeTypes: ["pharmacy"],
  },
  {
    id: "shopping",
    label: "Shopping",
    placeTypes: ["shopping_mall", "department_store"],
  },
  {
    id: "fitness",
    label: "Fitness",
    placeTypes: ["gym", "fitness_center"],
  },
  {
    id: "parking",
    label: "Parking",
    placeTypes: ["parking"],
  },
  {
    id: "schools",
    label: "Schools",
    placeTypes: ["school", "primary_school", "secondary_school"],
  },
];

export function getAmenityCategory(
  id: AmenityCategoryId,
): AmenityCategory | undefined {
  return AMENITY_CATEGORIES.find(c => c.id === id);
}

export const DEFAULT_AMENITY_CATEGORY: AmenityCategoryId = "grocery";

export function googleMapsEmbedUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps?q=${lat},${lng}&z=14&output=embed`;
}

export function directionsUrl(lat: number, lng: number, label?: string): string {
  const destination = label
    ? encodeURIComponent(label)
    : `${lat},${lng}`;
  return `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
}
