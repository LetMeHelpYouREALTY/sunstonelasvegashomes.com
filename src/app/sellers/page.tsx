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
      <PageShell
        className="sellers-page marketing-surface"
        mobileHomeBuyerBarTelHref={telHref || undefined}
      >
        <section className="sellers-hero slv-marketing-hero" aria-labelledby="sellers-h1">
          <h1 id="sellers-h1">Selling your home</h1>
          <p>
            Sunstone, Trilogy Sunset, and the wider Las Vegas market—with clear
            pricing conversations, MLS exposure, and support from list to close.
          </p>
        </section>
        <RealScoutListingSection tightTop />
        <section className="sellers-content" aria-label="Seller topics">
          <article className="sellers-card">
            <h2>Pricing &amp; positioning</h2>
            <p>
              We review recent sales and active competition so your list price
              matches today&apos;s market—not last year&apos;s headlines.
            </p>
          </article>
          <article className="sellers-card">
            <h2>Prep &amp; presentation</h2>
            <p>Practical priorities for photos, access, and disclosures.</p>
          </article>
          <article className="sellers-card">
            <h2>Exposure</h2>
            <p>MLS syndication and coordinated marketing aligned with local MLS rules.</p>
          </article>
          <article className="sellers-card">
            <h2>Next steps</h2>
            <p>
              Read the <Link href="/market/">Las Vegas market</Link> overview, review{" "}
              <Link href="/location/">location</Link> context, and{" "}
              <Link href="/contact/">get in touch</Link>
              {telHref ? (
                <>
                  {" "}
                  or call{" "}
                  <Link href={telHref} className="sellers-link">
                    {contact.telephone}
                  </Link>
                </>
              ) : null}
              .
            </p>
            <p className="text-sm opacity-90">
              This is general information, not legal or tax advice.
            </p>
          </article>
        </section>
      </PageShell>
    </>
  );
}
