import type { AmenityCategoryId } from "@/lib/community-map";

export type CuratedAmenity = {
  name: string;
  category: AmenityCategoryId;
  address: string;
  locality: string;
  region: string;
  postalCode: string;
  /** schema.org @type */
  schemaType: string;
  note?: string;
};

/** Verified names and street addresses only—no invented ratings or drive times. */
export const CURATED_AMENITIES: readonly CuratedAmenity[] = [
  {
    name: "Smith's Marketplace",
    category: "grocery",
    address: "9710 W Skye Canyon Park Dr",
    locality: "Las Vegas",
    region: "NV",
    postalCode: "89143",
    schemaType: "GroceryStore",
    note: "Large Smith's Marketplace at Skye Canyon—commonly cited as the closest major grocery hub to Sunstone.",
  },
  {
    name: "Sprouts Farmers Market",
    category: "grocery",
    address: "8441 Farm Rd",
    locality: "Las Vegas",
    region: "NV",
    postalCode: "89131",
    schemaType: "GroceryStore",
  },
  {
    name: "Albertsons",
    category: "grocery",
    address: "8410 Farm Rd",
    locality: "Las Vegas",
    region: "NV",
    postalCode: "89131",
    schemaType: "GroceryStore",
  },
  {
    name: "Trader Joe's",
    category: "grocery",
    address: "5639 Centennial Center Blvd",
    locality: "Las Vegas",
    region: "NV",
    postalCode: "89149",
    schemaType: "GroceryStore",
  },
  {
    name: "Centennial Hills Hospital",
    category: "healthcare",
    address: "6575 N Town Center Dr",
    locality: "Las Vegas",
    region: "NV",
    postalCode: "89149",
    schemaType: "Hospital",
  },
  {
    name: "MountainView Hospital",
    category: "healthcare",
    address: "3100 N Tenaya Way",
    locality: "Las Vegas",
    region: "NV",
    postalCode: "89128",
    schemaType: "Hospital",
  },
  {
    name: "Floyd Lamb Park at Tule Springs",
    category: "parks",
    address: "9200 Tule Springs Rd",
    locality: "Las Vegas",
    region: "NV",
    postalCode: "89131",
    schemaType: "Park",
    note: "Regional park northwest of Sunstone with trails, ponds, and event space.",
  },
  {
    name: "Angel Park Golf Club",
    category: "golf",
    address: "1 Tournament Way",
    locality: "Las Vegas",
    region: "NV",
    postalCode: "89131",
    schemaType: "GolfCourse",
  },
  {
    name: "The Club at Stallion Mountain",
    category: "golf",
    address: "2000 E Craig Rd",
    locality: "Las Vegas",
    region: "NV",
    postalCode: "89115",
    schemaType: "GolfCourse",
  },
  {
    name: "William & Mary Scherkenbach Elementary School",
    category: "schools",
    address: "5750 Harris Ranch Rd",
    locality: "Las Vegas",
    region: "NV",
    postalCode: "89149",
    schemaType: "School",
  },
  {
    name: "Ralph Cadwallader Middle School",
    category: "schools",
    address: "7775 W. Washington Ave",
    locality: "Las Vegas",
    region: "NV",
    postalCode: "89128",
    schemaType: "School",
  },
  {
    name: "Centennial Hills YMCA",
    category: "fitness",
    address: "6601 N Buffalo Dr",
    locality: "Las Vegas",
    region: "NV",
    postalCode: "89131",
    schemaType: "ExerciseGym",
  },
  {
    name: "Centennial Hills Library",
    category: "recreation",
    address: "6711 N Buffalo Dr",
    locality: "Las Vegas",
    region: "NV",
    postalCode: "89131",
    schemaType: "Library",
  },
];

export function curatedAmenitiesForCategory(
  category: AmenityCategoryId,
): CuratedAmenity[] {
  return CURATED_AMENITIES.filter(a => a.category === category);
}
