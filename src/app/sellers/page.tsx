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
  title: uniquePageTitle("Selling in Sunstone & Las Vegas"),
  description:
    "List and sell Sunstone, Trilogy Sunset, or Las Vegas real estate with Dr. Jan Duffy—pricing, prep, MLS exposure, and closing support. Nevada license S.0197614.LLC.",
  canonicalPath: "/sellers/",
});

export default function SellersPage() {
  const contact = getSiteContact();
  const telHref = getTelHref(contact.telephone);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: createStructuredDataScript({
            title: uniquePageTitle("Selling in Sunstone & Las Vegas"),
            description:
              "List and sell Sunstone, Trilogy Sunset, or Las Vegas real estate with Dr. Jan Duffy.",
            canonicalPath: "/sellers/",
          }),
        }}
      />
      <PageShell mobileHomeBuyerBarTelHref={telHref || undefined}>
        <MarketingHero
          title="Selling your home"
          headingId="sellers-h1"
          lede="Sunstone, Trilogy Sunset, and the wider Las Vegas market—with clear pricing conversations, MLS exposure, and support from list to close."
        />
        <RealScoutListingSection tightTop />
        <section
          className="slv-panel slv-panel--narrow slv-panel--stack"
          aria-label="Seller topics"
        >
          <article className="slv-card">
            <h2 className="slv-card__title">Pricing &amp; positioning</h2>
            <p className="slv-card__text">
              We review recent sales and active competition so your list price
              matches today&apos;s market—not last year&apos;s headlines. Adjustments follow
              feedback and timing.
            </p>
          </article>
          <article className="slv-card">
            <h2 className="slv-card__title">Prep &amp; presentation</h2>
            <p className="slv-card__text">
              Practical priorities for photos, access, and disclosures so buyers and
              agents see your home at its best.
            </p>
          </article>
          <article className="slv-card">
            <h2 className="slv-card__title">Exposure</h2>
            <p className="slv-card__text">
              MLS syndication and coordinated marketing aligned with your brokerage
              and local MLS rules. Buyers often start here—see how we present
              listings on this site.
            </p>
          </article>
          <article className="slv-card">
            <h2 className="slv-card__title">Next steps</h2>
            <p className="slv-card__text">
              Read the <Link href="/market/" className="slv-link">Las Vegas market</Link> overview, review{" "}
              <Link href="/location/" className="slv-link">location</Link> context for your neighborhood, and{" "}
              <Link href="/contact/" className="slv-link">get in touch</Link>
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
            <p className="slv-card__text slv-card__text--muted">
              This is general information, not legal or tax advice. Consult
              licensed professionals for your situation.
            </p>
          </article>
        </section>
      </PageShell>
    </>
  );
}
