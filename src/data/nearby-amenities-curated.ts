import type { AmenityCategoryId } from "@/lib/community-map";

export type CuratedAmenity = {
  name: string;
  category: AmenityCategoryId;
  /** Omit street when not verified against a primary source */
  address?: string;
  locality: string;
  region: string;
  postalCode?: string;
  /** schema.org @type */
  schemaType: string;
  /** Official business, agency, or locator page used to verify the listing */
  sourceUrl: string;
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
    postalCode: "89166",
    schemaType: "GroceryStore",
    sourceUrl:
      "https://www.smithsfoodanddrug.com/stores/grocery/nv/las-vegas/skye-canyon-marketplace/70600320",
    note: "Skye Canyon Marketplace anchor grocery—commonly cited for northwest Sunstone errands.",
  },
  {
    name: "Sprouts Farmers Market",
    category: "grocery",
    address: "8441 Farm Rd",
    locality: "Las Vegas",
    region: "NV",
    postalCode: "89131",
    schemaType: "GroceryStore",
    sourceUrl: "https://www.sprouts.com/stores/nv/las-vegas/las-vegas/",
  },
  {
    name: "Albertsons",
    category: "grocery",
    address: "8410 Farm Rd",
    locality: "Las Vegas",
    region: "NV",
    postalCode: "89131",
    schemaType: "GroceryStore",
    sourceUrl:
      "https://local.albertsons.com/nv/las-vegas/8410-farm-rd.html",
  },
  {
    name: "Trader Joe's",
    category: "grocery",
    address: "5639 Centennial Center Blvd",
    locality: "Las Vegas",
    region: "NV",
    postalCode: "89149",
    schemaType: "GroceryStore",
    sourceUrl:
      "https://www.traderjoes.com/home/stores/store?storeid=748",
  },
  {
    name: "Whole Foods Market",
    category: "grocery",
    address: "2475 S Town Center Dr",
    locality: "Las Vegas",
    region: "NV",
    postalCode: "89135",
    schemaType: "GroceryStore",
    sourceUrl:
      "https://www.wholefoodsmarket.com/stores/summerlin",
  },
  {
    name: "Centennial Hills Hospital Medical Center",
    category: "healthcare",
    address: "6900 N Durango Dr",
    locality: "Las Vegas",
    region: "NV",
    postalCode: "89149",
    schemaType: "Hospital",
    sourceUrl:
      "https://www.centennialhillshospital.com/patients-visitors/maps-directions",
  },
  {
    name: "MountainView Hospital",
    category: "healthcare",
    address: "3100 N Tenaya Way",
    locality: "Las Vegas",
    region: "NV",
    postalCode: "89128",
    schemaType: "Hospital",
    sourceUrl: "https://www.mountainview-hospital.com/contact-us",
  },
  {
    name: "Floyd Lamb Park at Tule Springs",
    category: "parks",
    address: "9200 Tule Springs Rd",
    locality: "Las Vegas",
    region: "NV",
    postalCode: "89131",
    schemaType: "Park",
    sourceUrl:
      "https://www.lasvegasnevada.gov/Residents/Parks-Facilities/Floyd-Lamb-Park",
    note: "City of Las Vegas regional park (680 developed acres per city materials).",
  },
  {
    name: "Angel Park Golf Club",
    category: "golf",
    address: "100 S Rampart Blvd",
    locality: "Las Vegas",
    region: "NV",
    postalCode: "89145",
    schemaType: "GolfCourse",
    sourceUrl:
      "https://arcisgolf.com/clubs/angel-park-golf-club/hours-and-directions",
  },
  {
    name: "TPC Las Vegas",
    category: "golf",
    address: "9851 Canyon Run Dr",
    locality: "Las Vegas",
    region: "NV",
    postalCode: "89144",
    schemaType: "GolfCourse",
    sourceUrl: "https://tpc.com/lasvegas/",
  },
  {
    name: "Bear's Best Las Vegas",
    category: "golf",
    address: "11111 W Flamingo Rd",
    locality: "Las Vegas",
    region: "NV",
    postalCode: "89135",
    schemaType: "GolfCourse",
    sourceUrl: "https://bearsbestlv.com/",
  },
  {
    name: "William & Mary Scherkenbach Elementary School",
    category: "schools",
    address: "9371 Iron Mountain Rd",
    locality: "Las Vegas",
    region: "NV",
    postalCode: "89143",
    schemaType: "School",
    sourceUrl: "https://williamandmaryscherkenbaches.ccsd.net/contact-us",
  },
  {
    name: "Ralph Cadwallader Middle School",
    category: "schools",
    address: "7775 Elkhorn Rd",
    locality: "Las Vegas",
    region: "NV",
    postalCode: "89131",
    schemaType: "School",
    sourceUrl: "https://cadwalladerms.org/apps/contact/",
  },
  {
    name: "Centennial Hills YMCA",
    category: "fitness",
    address: "6601 N Buffalo Dr",
    locality: "Las Vegas",
    region: "NV",
    postalCode: "89131",
    schemaType: "ExerciseGym",
    sourceUrl:
      "https://www.ymcasouthernnevada.org/locations/centennial-hills-ymca",
  },
  {
    name: "Centennial Hills Library",
    category: "recreation",
    address: "6711 N Buffalo Dr",
    locality: "Las Vegas",
    region: "NV",
    postalCode: "89131",
    schemaType: "Library",
    sourceUrl:
      "https://www.lvccld.org/locations/CH",
  },
];

export function curatedAmenitiesForCategory(
  category: AmenityCategoryId,
): CuratedAmenity[] {
  return CURATED_AMENITIES.filter(a => a.category === category);
}
