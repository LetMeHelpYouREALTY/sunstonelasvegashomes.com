import Link from "next/link";

import PageShell, { getTelHref } from "@/components/PageShell";
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
      <PageShell
        className="location-page"
        mobileHomeBuyerBarTelHref={getTelHref(contact.telephone)}
      >
        <section className="location-hero">
          <h1>Location advantage</h1>
          <p>Sunstone, Trilogy Sunset, and nearby Las Vegas amenities</p>
        </section>
        <RealScoutListingSection tightTop />
        <section className="location-content">
          <div className="location-body">
            <p>
              Northwest Las Vegas puts Sunstone and Trilogy Sunset within reach of
              regional recreation and major corridors—pair neighborhood context with{" "}
              <Link href="/sunstone/">the Sunstone guide</Link> and live{" "}
              <Link href="/#browse-listings">MLS search</Link> when you are ready.
            </p>
            {contact.googleMapsUrl ? (
              <p>
                <a
                  href={contact.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline"
                >
                  Open directions on Google Maps
                </a>
              </p>
            ) : null}
            <ul className="location-bullets">
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
