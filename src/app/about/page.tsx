import PageShell, { getTelHref } from "@/components/PageShell";
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
      <PageShell
        className="about-page"
        mobileHomeBuyerBarTelHref={getTelHref(contact.telephone)}
      >
        <section className="about-hero">
          <h1>About Dr. Jan Duffy</h1>
          <p>Trilogy Sunset and Sunstone specialist serving Las Vegas and Henderson</p>
        </section>
        <RealScoutListingSection tightTop />
        <section className="about-content">
          <div>
            <h2>Meet Dr. Jan</h2>
            <p>
              Dr. Jan Duffy helps buyers and sellers navigate Sunstone, Trilogy
              Sunset, and the wider Las Vegas market with clear communication and a
              process tailored to your timeline.
            </p>
            <p className="about-follow">
              Whether you are comparing communities, preparing to list, or planning
              a purchase months out, you get a single point of contact and a roadmap
              from first conversation to closing.
            </p>
          </div>
          <div className="credentials">
            <h3>Credentials</h3>
            <ul>
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
