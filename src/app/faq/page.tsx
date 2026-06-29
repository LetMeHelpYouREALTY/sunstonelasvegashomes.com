import PageShell, { getTelHref } from "@/components/PageShell";
import FaqBlock from "@/components/home/FaqBlock";
import RealScoutListingSection from "@/components/home/RealScoutListingSection";
import { SITE } from "@/config";
import { buildFaqEntries } from "@/data/faq-entries";
import {
  createPageMetadata,
  createStructuredDataScript,
} from "@/lib/page-metadata";
import { uniquePageTitle } from "@/lib/seo-helpers";
import { getSiteContact } from "@/lib/site-contact";

export const metadata = createPageMetadata({
  title: uniquePageTitle("FAQ — Sunstone & Las Vegas real estate"),
  description:
    "Answers about Sunstone, Trilogy Sunset, MLS search, Dr. Jan Duffy's Nevada license and brokerage, and how to get in touch.",
  canonicalPath: "/faq/",
});

export default function FaqPage() {
  const contact = getSiteContact();
  const hasFooterNap =
    Boolean(contact.telephone) ||
    (Boolean(contact.streetAddress) && Boolean(contact.postalCode));

  const faqContactAnswerText = hasFooterNap
    ? "Use the phone number and address in the site footer when you are ready to talk. You can also start with the home search on this site and then reach out about tours or a home valuation."
    : "Start with the home search on this site to browse listings and save favorites. When you are ready to talk, visit the About page for Dr. Jan Duffy's profile and next steps toward tours or a home valuation.";

  const siteOrigin = SITE.website.replace(/\/$/, "");
  const faqEntries = buildFaqEntries(faqContactAnswerText, siteOrigin);
  const faqSchema = {
    "@type": "FAQPage",
    "@id": `${siteOrigin}/faq/#faq`,
    mainEntity: faqEntries.map(entry => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: createStructuredDataScript({
            title: uniquePageTitle("FAQ — Sunstone & Las Vegas real estate"),
            description:
              "Answers about Sunstone, Trilogy Sunset, MLS search, Dr. Jan Duffy's Nevada license and brokerage, and how to get in touch.",
            canonicalPath: "/faq/",
            faqSchema,
          }),
        }}
      />
      <PageShell
        className="faq-page-main marketing-surface"
        mobileHomeBuyerBarTelHref={getTelHref(contact.telephone)}
      >
        <section className="faq-page-hero" aria-labelledby="faq-h1">
          <h1 id="faq-h1" className="faq-page-h1">
            Frequently asked questions
          </h1>
          <p className="faq-page-lede">
            Answers about Sunstone, Trilogy Sunset, MLS search, Dr. Jan Duffy&apos;s
            Nevada license and brokerage, and how to get in touch.
          </p>
        </section>
        <RealScoutListingSection tightTop />
        <FaqBlock entries={faqEntries} hideHeading />
      </PageShell>
    </>
  );
}
