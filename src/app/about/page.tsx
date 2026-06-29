import PageShell, { getTelHref } from "@/components/PageShell";
import MarketingHero from "@/components/marketing/MarketingHero";
import RealScoutListingSection from "@/components/home/RealScoutListingSection";
import { SITE } from "@/config";
import {
  createPageMetadata,
  createStructuredDataScript,
} from "@/lib/page-metadata";
import { getSiteContact } from "@/lib/site-contact";

export const metadata = createPageMetadata({
  title: `About Dr. Jan Duffy | ${SITE.title}`,
  description:
    "Meet Dr. Jan Duffy — Nevada real estate professional focused on Sunstone, Trilogy Sunset, and Las Vegas. License S.0197614.LLC, Berkshire Hathaway HomeServices Nevada Properties.",
  canonicalPath: "/about/",
});

export default function AboutPage() {
  const contact = getSiteContact();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: createStructuredDataScript({
            title: `About Dr. Jan Duffy | ${SITE.title}`,
            description:
              "Meet Dr. Jan Duffy — Nevada real estate professional focused on Sunstone, Trilogy Sunset, and Las Vegas.",
            canonicalPath: "/about/",
          }),
        }}
      />
      <PageShell mobileHomeBuyerBarTelHref={getTelHref(contact.telephone)}>
        <MarketingHero
          title="About Dr. Jan Duffy"
          tagline="Trilogy Sunset and Sunstone specialist serving Las Vegas and Henderson"
        />
        <RealScoutListingSection tightTop />
        <section className="slv-panel">
          <div className="slv-prose">
            <h2>Meet Dr. Jan</h2>
            <p>
              Dr. Jan Duffy helps buyers and sellers navigate Sunstone, Trilogy
              Sunset, and the wider Las Vegas market with clear communication and a
              process tailored to your timeline.
            </p>
            <p>
              Whether you are comparing communities, preparing to list, or planning
              a purchase months out, you get a single point of contact and a roadmap
              from first conversation to closing.
            </p>
          </div>
          <div className="slv-callout">
            <h3 className="slv-card__title">Credentials</h3>
            <ul className="slv-prose m-0 mt-2 list-disc pl-5">
              <li>Nevada real estate license {contact.licenseNumber}</li>
              <li>{contact.brokerageName}</li>
              <li>Local focus: Sunstone, Trilogy Sunset, Las Vegas, and Henderson</li>
            </ul>
          </div>
        </section>
      </PageShell>
    </>
  );
}
