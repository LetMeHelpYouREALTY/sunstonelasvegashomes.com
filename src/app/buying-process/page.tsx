import PageShell, { getTelHref } from "@/components/PageShell";
import MarketingHero from "@/components/marketing/MarketingHero";
import RealScoutListingSection from "@/components/home/RealScoutListingSection";
import { SITE } from "@/config";
import {
  createPageMetadata,
  createStructuredDataScript,
} from "@/lib/page-metadata";
import { getSiteContact } from "@/lib/site-contact";

const BUYING_STEPS = [
  "Clarify budget, financing, and must-have layout",
  "Search live MLS listings and save favorites",
  "Tour homes with a consistent checklist",
  "Make an offer with local market context",
  "Close with inspections, appraisal, and title coordination",
];

export const metadata = createPageMetadata({
  title: `Buying process | ${SITE.title}`,
  description:
    "Step-by-step overview of buying a home in Las Vegas—from pre-approval and tours to offer and closing—with Dr. Jan Duffy.",
  canonicalPath: "/buying-process/",
});

export default function BuyingProcessPage() {
  const contact = getSiteContact();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: createStructuredDataScript({
            title: `Buying process | ${SITE.title}`,
            description:
              "Step-by-step overview of buying a home in Las Vegas—from pre-approval and tours to offer and closing.",
            canonicalPath: "/buying-process/",
          }),
        }}
      />
      <PageShell mobileHomeBuyerBarTelHref={getTelHref(contact.telephone)}>
        <MarketingHero
          title="Buying process"
          headingId="buying-h1"
          tagline="What to expect when you purchase in Sunstone or Trilogy Sunset"
        />
        <RealScoutListingSection tightTop />
        <section className="slv-panel slv-panel--narrow slv-panel--stack">
          <div>
            <h2 className="slv-section-title">A practical path from search to keys</h2>
            <div className="slv-card-grid slv-steps-grid">
              {BUYING_STEPS.map(step => (
                <article key={step} className="slv-card slv-step-card">
                  <p className="slv-card__text m-0">{step}</p>
                </article>
              ))}
            </div>
          </div>
          <p className="slv-prose m-0 text-center">
            Questions along the way? Use the contact details in the site footer.
          </p>
        </section>
      </PageShell>
    </>
  );
}
