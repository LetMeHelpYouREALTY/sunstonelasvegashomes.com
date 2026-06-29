import Link from "next/link";

import PageShell, { getTelHref } from "@/components/PageShell";
import BuyersJourney from "@/components/home/BuyersJourney";
import MarketingHero from "@/components/marketing/MarketingHero";
import RealScoutListingSection from "@/components/home/RealScoutListingSection";
import { getKcmFeedItems } from "@/lib/kcm-feed";
import {
  createPageMetadata,
  createStructuredDataScript,
} from "@/lib/page-metadata";
import { uniquePageTitle } from "@/lib/seo-helpers";
import { getSiteContact } from "@/lib/site-contact";

export const metadata = createPageMetadata({
  title: uniquePageTitle("Home buyer guide — Sunstone & Trilogy Sunset"),
  description:
    "Next steps for buying in Sunstone and Trilogy Sunset: MLS search, neighborhood context, Las Vegas market notes, and curated national buyer articles.",
  canonicalPath: "/buyers/",
});

export default async function BuyersPage() {
  const contact = getSiteContact();
  const kcmFeedTeaser = await getKcmFeedItems(4);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: createStructuredDataScript({
            title: uniquePageTitle("Home buyer guide — Sunstone & Trilogy Sunset"),
            description:
              "Next steps for buying in Sunstone and Trilogy Sunset: MLS search, neighborhood context, Las Vegas market notes, and curated national buyer articles.",
            canonicalPath: "/buyers/",
          }),
        }}
      />
      <PageShell mobileHomeBuyerBarTelHref={getTelHref(contact.telephone)}>
        <MarketingHero
          title="Home buyer guide"
          headingId="buyers-hero-heading"
          lede={
            <>
              Plan your search in <strong>Sunstone</strong> and{" "}
              <strong>Trilogy Sunset</strong>—local context, market timing, and
              listings when you are ready. Dr. Jan Duffy, {contact.brokerageName} ·
              Nevada license {contact.licenseNumber}
            </>
          }
          note={
            <>
              <Link href="/faq/" className="slv-link">
                FAQ
              </Link>
              {" · "}
              <Link href="/buying-process/" className="slv-link">
                Buying process
              </Link>
              {" · "}
              <Link href="/#browse-listings" className="slv-link">
                Jump to MLS search
              </Link>
            </>
          }
        />
        <RealScoutListingSection tightTop />
        <BuyersJourney kcmFeedTeaser={kcmFeedTeaser} />
      </PageShell>
    </>
  );
}
