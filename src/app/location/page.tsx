import Link from "next/link";

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
  title: `Location & amenities | ${SITE.title}`,
  description:
    "Sunstone and Trilogy Sunset location context—nearby amenities, commute, and lifestyle in Las Vegas with Dr. Jan Duffy.",
  canonicalPath: "/location/",
});

export default function LocationPage() {
  const contact = getSiteContact();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: createStructuredDataScript({
            title: `Location & amenities | ${SITE.title}`,
            description:
              "Sunstone and Trilogy Sunset location context—nearby amenities, commute, and lifestyle in Las Vegas.",
            canonicalPath: "/location/",
          }),
        }}
      />
      <PageShell mobileHomeBuyerBarTelHref={getTelHref(contact.telephone)}>
        <MarketingHero
          title="Location advantage"
          headingId="location-h1"
          tagline="Sunstone, Trilogy Sunset, and nearby Las Vegas amenities"
        />
        <RealScoutListingSection tightTop />
        <section className="slv-panel slv-panel--narrow">
          <div className="slv-prose">
            <p>
              Northwest Las Vegas puts Sunstone and Trilogy Sunset within reach of
              regional recreation and major corridors—pair neighborhood context with{" "}
              <Link href="/sunstone/" className="slv-link">
                the Sunstone guide
              </Link>{" "}
              and live{" "}
              <Link href="/#browse-listings" className="slv-link">
                MLS search
              </Link>{" "}
              when you are ready.
            </p>
            {contact.googleMapsUrl ? (
              <p>
                <a
                  href={contact.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="slv-link"
                >
                  Open directions on Google Maps
                </a>
              </p>
            ) : null}
            <ul className="m-0 list-disc pl-5">
              <li>Sunstone masterplan in northwest Las Vegas</li>
              <li>Trilogy Sunset active-adult community context</li>
              <li>Las Vegas and Henderson buyer and seller representation</li>
            </ul>
          </div>
        </section>
      </PageShell>
    </>
  );
}
