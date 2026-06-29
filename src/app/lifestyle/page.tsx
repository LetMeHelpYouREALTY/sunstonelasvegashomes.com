import Link from "next/link";

import PageShell, { getTelHref } from "@/components/PageShell";
import MarketingHero from "@/components/marketing/MarketingHero";
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
      <PageShell mobileHomeBuyerBarTelHref={telHref || undefined}>
        <MarketingHero
          title="Lifestyle"
          headingId="lifestyle-h1"
          tagline="What it is like to live in Sunstone and Trilogy Sunset"
        />
        <RealScoutListingSection tightTop />
        <section className="slv-panel slv-panel--narrow">
          <div className="slv-prose">
            <p>
              Desert living in northwest Las Vegas blends outdoor amenities, community
              events, and practical access to recreation corridors—use this page alongside{" "}
              <Link href="/community/" className="slv-link">
                community life
              </Link>{" "}
              and the{" "}
              <Link href="/sunstone/" className="slv-link">
                Sunstone guide
              </Link>
              .
            </p>
            <p>
              When you are ready to compare homes, use{" "}
              <Link href="/#browse-listings" className="slv-link">
                MLS search
              </Link>{" "}
              and review{" "}
              <Link href="/location/" className="slv-link">
                location context
              </Link>{" "}
              for commute and daily rhythm.
            </p>
            <p>
              Planning a purchase? See the{" "}
              <Link href="/buying-process/" className="slv-link">
                buying process
              </Link>
              {telHref ? (
                <>
                  {" "}
                  or call{" "}
                  <Link href={telHref} className="slv-link">
                    {contact.telephone}
                  </Link>
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
