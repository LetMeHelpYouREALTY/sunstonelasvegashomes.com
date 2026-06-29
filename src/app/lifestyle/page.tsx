import Link from "next/link";

import PageShell, { getTelHref } from "@/components/PageShell";
import RealScoutListingSection from "@/components/home/RealScoutListingSection";
import {
  createPageMetadata,
  createStructuredDataScript,
} from "@/lib/page-metadata";
import { uniquePageTitle } from "@/lib/seo-helpers";
import { getSiteContact } from "@/lib/site-contact";

export const metadata = createPageMetadata({
  title: uniquePageTitle("Lifestyle"),
  description:
    "Lifestyle and amenities near Sunstone and Trilogy Sunset—events, recreation, and day-to-day living in Las Vegas.",
  canonicalPath: "/lifestyle/",
});

export default function LifestylePage() {
  const contact = getSiteContact();
  const telHref = getTelHref(contact.telephone);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: createStructuredDataScript({
            title: uniquePageTitle("Lifestyle"),
            description:
              "Lifestyle and amenities near Sunstone and Trilogy Sunset—events, recreation, and day-to-day living in Las Vegas.",
            canonicalPath: "/lifestyle/",
          }),
        }}
      />
      <PageShell
        className="lifestyle-page"
        mobileHomeBuyerBarTelHref={telHref || undefined}
      >
        <section className="lifestyle-hero">
          <h1>Lifestyle</h1>
          <p>What it is like to live in Sunstone and Trilogy Sunset</p>
        </section>
        <RealScoutListingSection tightTop />
        <section className="lifestyle-content">
          <div className="lifestyle-prose">
            <p>
              Desert living in northwest Las Vegas blends outdoor amenities, community
              events, and practical access to recreation corridors—use this page alongside{" "}
              <Link href="/community/">community life</Link> and the{" "}
              <Link href="/sunstone/">Sunstone guide</Link>.
            </p>
            <p>
              When you are ready to compare homes, use{" "}
              <Link href="/#browse-listings">MLS search</Link> and review{" "}
              <Link href="/location/">location context</Link> for commute and daily
              rhythm.
            </p>
            <p>
              Planning a purchase? See the{" "}
              <Link href="/buying-process/">buying process</Link>
              {telHref ? (
                <>
                  {" "}
                  or call{" "}
                  <Link href={telHref}>{contact.telephone}</Link>
                </>
              ) : null}
              .
            </p>
          </div>
        </section>
      </PageShell>
    </>
  );
}
