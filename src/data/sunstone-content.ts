export type SunstoneCollection = {
  anchorId: string;
  title: string;
  body: string;
};

export type SunstoneSpoke = {
  slug: string;
  pageTitle: string;
  metaDescription: string;
  h1: string;
  lede: string;
  sections: { heading: string; body: string }[];
};

export const SUNSTONE_PILLAR_TITLE = "Sunstone Las Vegas masterplan guide";
export const SUNSTONE_PILLAR_DESCRIPTION =
  "Northwest Las Vegas Sunstone masterplan—builders, amenities, collections, and how to compare MLS resale with new construction. Dr. Jan Duffy, Berkshire Hathaway HomeServices Nevada Properties.";

export const sunstonePillarIntro: string[] = [
  "Sunstone is a large master-planned community in northwest Las Vegas positioned near US-95 and regional recreation such as Mt. Charleston and Lee Canyon (your commute and weekend rhythm still depend on where you work and how you travel).",
  "The public community site lists multiple national builders and a mix of attached and detached product—including age-qualified options—woven with trails, parks, and outdoor amenities. This page gives buyer-friendly context and links to the official community site for builder phases; use the MLS search on this site for resale and listed inventory Dr. Jan Duffy can tour with you.",
];

export const sunstonePillarSections: { heading: string; body: string[] }[] = [
  {
    heading: "Why use this guide alongside the official community site?",
    body: [
      "The developer site is the right place for new-home releases, model hours, and builder registration. This guide helps you place Sunstone on the Las Vegas map, understand collection names you will see in marketing, and move quickly into MLS-backed tours and offers with a licensed local agent.",
    ],
  },
  {
    heading: "Builders active in the masterplan",
    body: [
      "Public marketing names Lennar, Shea Homes, Woodside Homes, and Richmond American Homes as builders in the Sunstone masterplan. Use their published materials for elevations, options, and phase timing; use this site’s home search to compare resale and listed homes in the area.",
    ],
  },
  {
    heading: "Amenities and outdoor living",
    body: [
      "Marketing materials emphasize interconnected trails, parks, and bike-friendly amenities such as pump tracks and walking paths—useful signals if you want a neighborhood where it is easy to be outside without leaving the community.",
    ],
  },
  {
    heading: "Product mix: townhomes, single-family, and active adult",
    body: [
      "Buyers can encounter attached townhomes, single-family neighborhoods, and age-qualified product lines (age restrictions and HOA rules vary—review disclosures and community documents before you commit). If Trilogy Sunset is on your list, pair this guide with the active-adult spoke page linked below.",
    ],
  },
];

/** Twelve named collections — in-page anchors on the pillar (not separate URLs). */
export const sunstoneCollections: SunstoneCollection[] = [
  {
    anchorId: "alia-at-sunstone",
    title: "Alia at Sunstone",
    body:
      "Alia is positioned as a higher-footprint line within the masterplan—useful if you want generous square footage and flexible bedroom counts. Compare MLS resale against builder availability on the official site before you lock a budget.",
  },
  {
    anchorId: "asher",
    title: "Asher",
    body:
      "Asher targets buyers who want efficient square footage with three-bedroom layouts—strong for lock-and-leave or smaller-household needs. Ask Dr. Jan Duffy to line up similar resale so you can compare monthly payment and HOA side by side.",
  },
  {
    anchorId: "lyra-collection-one",
    title: "Lyra Collection One",
    body:
      "Lyra Collection One is one of two Lyra groupings—helpful if you want mid-size layouts with multi-bed flexibility. Use tours to judge storage, separation of spaces, and how the home handles daily traffic patterns.",
  },
  {
    anchorId: "lyra-collection-two",
    title: "Lyra Collection Two",
    body:
      "Lyra Collection Two extends the Lyra story with larger plans—compare against Collection One on the same day so differences in flow and upgrades are obvious.",
  },
  {
    anchorId: "axel",
    title: "Axel",
    body:
      "Axel focuses on versatile bedroom counts in a mid-size footprint—good for blended households or home offices. Verify what is standard vs optional on the builder side, then compare with resale that already includes upgrades.",
  },
  {
    anchorId: "resort-collection",
    title: "Resort Collection",
    body:
      "Resort Collection signals a more maintenance-aware footprint—often appealing if you want simpler upkeep while staying inside the masterplan. Pair with HOA questions on what is covered before you write an offer.",
  },
  {
    anchorId: "freedom-35-collection",
    title: "Freedom 35 Collection",
    body:
      "Freedom 35 is one of several Freedom-branded groupings—use builder materials to see how plan depth and garage configuration differ from Freedom 40 and 50.",
  },
  {
    anchorId: "freedom-40-collection",
    title: "Freedom 40 Collection",
    body:
      "Freedom 40 typically steps up bedroom and living flexibility versus Freedom 35—confirm current plan sheets and lot availability on the official site, then compare with MLS.",
  },
  {
    anchorId: "freedom-50-collection",
    title: "Freedom 50 Collection",
    body:
      "Freedom 50 is aimed at buyers who want more room to spread out—great for multi-gen layouts when lots and plans align with your timeline.",
  },
  {
    anchorId: "modern-collection",
    title: "Modern Collection",
    body:
      "Modern Collection highlights contemporary elevations and layout choices—if aesthetics matter as much as square footage, tour models and ask how finishes translate to resale value locally.",
  },
  {
    anchorId: "solstice",
    title: "Solstice",
    body:
      "Solstice plans skew larger with generous bedroom counts—useful for buyers who expect long-term housemates or frequent guests. Compare carrying costs with similarly sized resale nearby.",
  },
  {
    anchorId: "capella",
    title: "Capella",
    body:
      "Capella balances mid-to-large footprints with flexible bedroom counts—strong when you want a home that adapts as needs change. Dr. Jan Duffy can help you weigh new incentives against resale that already reflects real-world wear and upgrades.",
  },
];

export const sunstoneSpokes: SunstoneSpoke[] = [
  {
    slug: "active-adult-55-living",
    pageTitle: "55+ and active-adult living near Sunstone & Trilogy Sunset",
    metaDescription:
      "Age-qualified and resort-style living in northwest Las Vegas—how 55+ product relates to Sunstone and Trilogy Sunset, MLS search, and tours with Dr. Jan Duffy.",
    h1: "55+ and active-adult living",
    lede:
      "Sunstone’s marketing includes age-qualified product, and many buyers compare it with Trilogy Sunset for active-adult lifestyle. Rules, fees, and what is included in HOA services vary by neighborhood—verify documents and tour in person.",
    sections: [
      {
        heading: "What “55+” means in practice",
        body:
          "Age-qualified communities publish policies about occupancy and guests. Read the community disclosures and ask clarifying questions before you make an offer—your eligibility and household plans must match the recorded rules.",
      },
      {
        heading: "How Dr. Jan Duffy helps active-adult buyers",
        body:
          "You get MLS-backed search, tour coordination, and offer strategy aligned with your timeline—whether you buy resale inside an age-qualified neighborhood or evaluate new construction alongside builder channels.",
      },
      {
        heading: "Next steps",
        body:
          "Start with the home search on this site, read the Sunstone guide (see link below), then call when you want a shortlist and tour plan.",
      },
    ],
  },
  {
    slug: "resale-vs-new-construction",
    pageTitle: "Resale vs new construction in Sunstone",
    metaDescription:
      "Compare MLS resale with builder new homes in northwest Las Vegas Sunstone—representation, timelines, and what to verify with Dr. Jan Duffy.",
    h1: "Resale vs new construction in Sunstone",
    lede:
      "New construction is sold through builder processes, deposits, and design timelines. MLS resale is negotiated with traditional contract contingencies. Many buyers compare both until monthly payment, commute, and HOA fit line up.",
    sections: [
      {
        heading: "What is different at the contract level",
        body:
          "Builder contracts often include builder-specific terms, design-center selections, and completion timing. Resale contracts typically follow local MLS norms with inspections and appraisal contingencies. Have your lender outline new vs resale cash-to-close early.",
      },
      {
        heading: "Where the official community site fits",
        body:
          "Use the developer site for models, phases, and incentives on new homes. Use this site’s MLS search for listed resale and ask Dr. Jan Duffy to interpret how competing listings price upgrades and lot premiums.",
      },
      {
        heading: "Representation",
        body:
          "If you want advocacy in negotiation and inspection review on resale, engage early. If you are shopping new, still ask how your agent supports you alongside the builder’s sales team—roles are not identical.",
      },
    ],
  },
  {
    slug: "buyers-guide-tours-and-mls",
    pageTitle: "Sunstone buyers — MLS search, tours, and representation",
    metaDescription:
      "How to search Sunstone and Trilogy Sunset on MLS, schedule tours, and work with Dr. Jan Duffy—Berkshire Hathaway HomeServices Nevada Properties.",
    h1: "Sunstone buyers: tours, MLS, and representation",
    lede:
      "Start with RealScout on this site to filter price, beds, and property type. Save favorites, then reach out to align tours that compare similar homes back-to-back—especially if you are weighing northwest Las Vegas against other pockets of the valley.",
    sections: [
      {
        heading: "Search first, then narrow by lifestyle",
        body:
          "Use filters to match payment range and must-have layout. Add Sunstone or Trilogy Sunset vocabulary from the masterplan guide when you compare listings and marketing materials.",
      },
      {
        heading: "Tours that save time",
        body:
          "Cluster tours geographically and bring the same checklist to each home—HOA fees, solar or lease assumptions, and what stays with the property matter as much as square footage.",
      },
      {
        heading: "Work with Dr. Jan Duffy",
        body:
          "Licensed in Nevada (S.0197614.LLC) with Berkshire Hathaway HomeServices Nevada Properties, Dr. Jan Duffy focuses on clear next steps from search to offer. Use Contact when you are ready to talk.",
      },
    ],
  },
];

export function getSunstoneSpokeSlugs(): string[] {
  return sunstoneSpokes.map(s => s.slug);
}

export function getSpokeBySlug(slug: string): SunstoneSpoke | undefined {
  return sunstoneSpokes.find(s => s.slug === slug);
}
