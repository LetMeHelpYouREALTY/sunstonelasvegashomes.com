import PageShell, { getTelHref } from "@/components/PageShell";
import RealScoutListingSection from "@/components/home/RealScoutListingSection";
import { SITE } from "@/config";
import {
  createPageMetadata,
  createStructuredDataScript,
} from "@/lib/page-metadata";
import { getSiteContact } from "@/lib/site-contact";

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
      <PageShell
        className="buying-page"
        mobileHomeBuyerBarTelHref={getTelHref(contact.telephone)}
      >
        <section className="buying-hero">
          <h1>Buying process</h1>
          <p>What to expect when you purchase in Sunstone or Trilogy Sunset</p>
        </section>
        <RealScoutListingSection tightTop />
        <section className="buying-content">
          <h2 className="buying-h2">A practical path from search to keys</h2>
          <ol className="buying-steps">
            <li>Clarify budget, financing, and must-have layout</li>
            <li>Search live MLS listings and save favorites</li>
            <li>Tour homes with a consistent checklist</li>
            <li>Make an offer with local market context</li>
            <li>Close with inspections, appraisal, and title coordination</li>
          </ol>
          <p>Questions along the way? Use the contact details in the site footer.</p>
        </section>
      </PageShell>
    </>
  );
}
