/**
 * FAQ copy shared by visible HTML and FAQPage JSON-LD — keep strings in sync.
 */
export type FaqEntry = {
  question: string;
  answer: string;
};

type FaqContactFields = {
  telephone: string;
  streetAddress: string;
  postalCode: string;
};

export function getFaqContactAnswerText(contact: FaqContactFields): string {
  const hasFooterNap =
    Boolean(contact.telephone) ||
    (Boolean(contact.streetAddress) && Boolean(contact.postalCode));

  return hasFooterNap
    ? "Use the phone number and address in the site footer when you are ready to talk. You can also start with the home search on this site and then reach out about tours or a home valuation."
    : "Start with the home search on this site to browse listings and save favorites. When you are ready to talk, visit the About page for Dr. Jan Duffy's profile and next steps toward tours or a home valuation.";
}

export function buildFaqPageSchema(
  entries: FaqEntry[],
  schemaId: string,
): Record<string, unknown> {
  return {
    "@type": "FAQPage",
    "@id": schemaId,
    mainEntity: entries.map(entry => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.answer,
      },
    })),
  };
}

export function buildFaqEntries(
  faqContactAnswerText: string,
  siteOrigin: string,
): FaqEntry[] {
  const sunstoneGuide = `${siteOrigin}/sunstone/`;
  const resaleNew = `${siteOrigin}/sunstone/resale-vs-new-construction/`;
  return [
    {
      question:
        "What areas does Dr. Jan Duffy serve for Sunstone and Trilogy Sunset real estate?",
      answer:
        "Dr. Jan Duffy works with buyers and sellers across Las Vegas and Henderson, with a focus on northwest Las Vegas—including the Sunstone masterplan and the Trilogy Sunset community. Use the home search on this site to browse current MLS inventory in your price range.",
    },
    {
      question: "Where is Sunstone, and what kind of community is it?",
      answer:
        `Sunstone is a master-planned community in northwest Las Vegas, marketed with multiple builders, trails and parks, and a mix of attached and single-family product—including age-qualified options. For builder phases and new-home details, use the official Sunstone community site; for MLS resale and tours with a local agent, start with the Sunstone guide on this site (${sunstoneGuide}).`,
    },
    {
      question: "How do I search homes for sale in Sunstone or Trilogy Sunset?",
      answer:
        "Use the RealScout MLS home search on this site to filter by price, property type, and listing status. You can adjust the price range and sort order to match your goals before you tour homes.",
    },
    {
      question: "Should I buy resale or new construction in Sunstone?",
      answer:
        `It depends on your timeline, financing, and whether you want builder design choices or MLS resale with a traditional contract. New homes are sold through builder channels; resale is listed on MLS. Read the resale vs new construction page (${resaleNew}) and compare listings in the home search.`,
    },
    {
      question: "Which brokerage is Dr. Jan Duffy with?",
      answer:
        "Dr. Jan Duffy is licensed in Nevada (S.0197614.LLC) and affiliated with Berkshire Hathaway HomeServices Nevada Properties.",
    },
    {
      question: "How can I contact Dr. Jan Duffy about buying or selling?",
      answer: faqContactAnswerText,
    },
  ];
}
