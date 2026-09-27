import type { FaqEntry } from "@/data/faq-entries";
import { COMMUNITY_MAP } from "@/lib/community-map";

export type AmenityContentSection = {
  id: string;
  heading: string;
  paragraphs: string[];
};

export const AMENITIES_PAGE_TITLE = `Nearby Amenities in ${COMMUNITY_MAP.shortName}, Las Vegas`;

export const AMENITIES_PAGE_DESCRIPTION =
  "Interactive map and local guide to grocery, healthcare, golf, parks, and daily errands near Sunstone and Trilogy Sunset in northwest Las Vegas—with Dr. Jan Duffy.";

export const amenityContentSections: AmenityContentSection[] = [
  {
    id: "grocery-dining",
    heading: "Grocery & dining",
    paragraphs: [
      `Sunstone and Trilogy Sunset sit in the 89143 corridor of northwest Las Vegas, where daily errands usually mean a short drive to Skye Canyon and Centennial Hills retail. Smith's Marketplace at 9710 W Skye Canyon Park Dr is the closest large-format grocery hub commonly referenced for the Sunstone area. Sprouts Farmers Market (8441 Farm Rd) and Albertsons (8410 Farm Rd) add conventional supermarket options a few miles west.`,
      `For specialty runs, Trader Joe's on Centennial Center Blvd serves the broader northwest valley. Restaurant and cafe options cluster along Durango, Skye Canyon Park Drive, and Centennial Center—use the map filters to see what Google Places lists near the community center; hours and menus change, so confirm before you go.`,
    ],
  },
  {
    id: "parks-recreation",
    heading: "Parks & recreation",
    paragraphs: [
      `Inside the Sunstone masterplan, marketing materials emphasize trails, neighborhood parks, and outdoor amenities woven through the community. Outside the gates, Floyd Lamb Park at Tule Springs (9200 Tule Springs Rd) is a well-known regional park with walking paths, ponds, and picnic areas northwest of Sunstone.`,
      `Trilogy Sunset buyers often weigh on-site club and lifestyle programming against regional recreation—Mt. Charleston and Lee Canyon are part of the northwest lifestyle draw, though mountain access depends on season and road conditions. The Centennial Hills YMCA and Centennial Hills Library on Buffalo Drive are everyday anchors for fitness and community programs in the northwest valley.`,
    ],
  },
  {
    id: "golf",
    heading: "Golf",
    paragraphs: [
      `Northwest Las Vegas has several public and resort courses within a reasonable drive of Sunstone. Angel Park Golf Club (1 Tournament Way) is a long-standing local favorite with multiple courses and practice facilities. The Club at Stallion Mountain (2000 E Craig Rd) is another established option east of the Strip corridor.`,
      `Golf membership, tee-time pricing, and league play change seasonally—call the course or check their official site before you plan a round. Use the map's Golf filter to explore additional courses Google Places surfaces near the community.`,
    ],
  },
  {
    id: "healthcare",
    heading: "Healthcare",
    paragraphs: [
      `Major hospital campuses serving northwest Las Vegas buyers include Centennial Hills Hospital (6575 N Town Center Dr) and MountainView Hospital (3100 N Tenaya Way). Urgent care, primary care, and specialty clinics also line Buffalo Drive, Durango, and Centennial Hills corridors—use the Healthcare filter on the map for current listings.`,
      `This page is not medical advice. For emergencies, call 911. Verify provider networks with your insurance before choosing a doctor or hospital.`,
    ],
  },
  {
    id: "shopping-services",
    heading: "Shopping & services",
    paragraphs: [
      `Day-to-day shopping for Sunstone residents typically flows toward Skye Canyon retail, Centennial Center, and the Centennial Hills area—home improvement, apparel, and services along Durango and the 215 beltway. Pharmacy counters are available inside major grocery stores; standalone pharmacies appear in the Pharmacies map filter.`,
      `For big-box runs and regional malls, many buyers also drive to Summerlin or the Strip corridor depending on the errand. Approximate drive times vary with traffic and which Sunstone collection you start from—tour homes at different times of day to see what feels convenient.`,
    ],
  },
  {
    id: "schools",
    heading: "Schools (Clark County)",
    paragraphs: [
      `Sunstone is served by Clark County School District schools assigned by address—always verify zoning for the exact home you are buying. Nearby campuses frequently referenced for northwest 89143 / Centennial Hills assignments include William & Mary Scherkenbach Elementary School (5750 Harris Ranch Rd) and Ralph Cadwallader Middle School (7775 W. Washington Ave).`,
      `Trilogy Sunset is an age-qualified 55+ collection; many households are not shopping for K–12 schools, but resale buyers with family plans still ask about district boundaries. Check CCSD zoning maps and tour schools during your home search.`,
    ],
  },
  {
    id: "commute",
    heading: "Commute & regional access",
    paragraphs: [
      `Sunstone marketing highlights US-95 access for northwest Las Vegas commuters. Approximate off-peak drives from the Sunstone area to the Las Vegas Strip resort corridor are often cited in the 30–40 minute range; Harry Reid International Airport is commonly in a similar ballpark depending on terminal traffic and time of day—label these as approximate and test your own route during rush hour.`,
      `Downtown Summerlin and the 215 beltway connect northwest residents to west-side employment and recreation. Kyle Canyon Road leads toward Mt. Charleston for mountain outings. Your commute story depends on where you work—compare Sunstone to Trilogy Sunset collections and resale streets when you schedule tours with Dr. Jan Duffy.`,
    ],
  },
];

export function buildAmenitiesFaqEntries(
  phoneLine: string | undefined,
): FaqEntry[] {
  const phoneBit = phoneLine
    ? ` Call ${phoneLine} to talk through neighborhoods and tour timing.`
    : " Use the contact page when you are ready to tour.";

  return [
    {
      question: `What grocery stores are near ${COMMUNITY_MAP.shortName}?`,
      answer: `Smith's Marketplace at 9710 W Skye Canyon Park Dr is the closest large grocery hub commonly cited for Sunstone; Sprouts and Albertsons on Farm Rd are also nearby in northwest Las Vegas.${phoneBit}`,
    },
    {
      question: `How far is ${COMMUNITY_MAP.shortName} from the Las Vegas Strip?`,
      answer: `Approximate drive time to the Strip resort corridor is often in the 30–40 minute range off-peak from northwest Las Vegas, but traffic and your exact Sunstone address change the answer—drive the route during your typical commute hours before you buy.`,
    },
    {
      question: `Are there hospitals near ${COMMUNITY_MAP.shortName}?`,
      answer: `Yes—Centennial Hills Hospital on Town Center Drive and MountainView Hospital on Tenaya Way are major hospital campuses serving the northwest valley; use the Healthcare filter on this page's map for clinics and urgent care nearby.`,
    },
    {
      question: `What parks are close to Sunstone and Trilogy Sunset?`,
      answer: `Sunstone includes master-planned parks and trails, and Floyd Lamb Park at Tule Springs is a large regional park northwest of the community with walking paths and picnic areas.`,
    },
    {
      question: `Is Trilogy Sunset part of Sunstone?`,
      answer: `Trilogy Sunset is the age-qualified 55+ collection within the larger Sunstone master-planned community in the 89143 ZIP code—buyers compare HOA lifestyle, floor plans, and resale vs new construction across both.`,
    },
    {
      question: `How far is Harry Reid International Airport from Sunstone?`,
      answer: `Approximate airport drives from northwest Las Vegas are often cited around 30–35 minutes depending on traffic and terminal—verify with a test drive from the homes you are touring.`,
    },
    {
      question: `Where do Sunstone students go to school?`,
      answer: `School assignment is by Clark County School District zoning for each street address—nearby campuses often discussed include Scherkenbach Elementary and Cadwallader Middle; confirm zoning for every home before you write an offer.`,
    },
    {
      question: `Who can help me tour homes near these amenities?`,
      answer: `Dr. Jan Duffy, REALTOR with Berkshire Hathaway HomeServices Nevada Properties, focuses on Sunstone, Trilogy Sunset, and northwest Las Vegas MLS listings—start with the home search on this site, then schedule tours.${phoneBit}`,
    },
  ];
}
