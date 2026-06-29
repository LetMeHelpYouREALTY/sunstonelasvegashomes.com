import Link from "next/link";

import PageShell, { getTelHref } from "@/components/PageShell";
import RealScoutListingSection from "@/components/home/RealScoutListingSection";
import { SITE } from "@/config";
import {
  createPageMetadata,
  createStructuredDataScript,
} from "@/lib/page-metadata";
import { getSiteContact } from "@/lib/site-contact";

const faqSchema = {
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I read Las Vegas housing headlines for Sunstone buyers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "National headlines describe broad trends; your offer strategy still depends on local inventory, pricing, and the specific Sunstone or Trilogy Sunset homes you are comparing. Use MLS search on this site, then talk through timing with Dr. Jan Duffy.",
      },
    },
    {
      "@type": "Question",
      name: "Where should I start if I am new to the Las Vegas market?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Start with the home buyer guide, explore Sunstone context, and filter live listings before you schedule tours.",
      },
    },
  ],
};

export const metadata = createPageMetadata({
  title: `Market insights | ${SITE.title}`,
  description:
    "Las Vegas housing market notes for Sunstone and Trilogy Sunset buyers and sellers—trends, inventory, and what to watch with Dr. Jan Duffy.",
  canonicalPath: "/market/",
});

export default function MarketPage() {
  const contact = getSiteContact();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: createStructuredDataScript({
            title: `Market insights | ${SITE.title}`,
            description:
              "Las Vegas housing market notes for Sunstone and Trilogy Sunset buyers and sellers.",
            canonicalPath: "/market/",
            faqSchema,
          }),
        }}
      />
      <PageShell
        className="market-page"
        mobileHomeBuyerBarTelHref={getTelHref(contact.telephone)}
      >
        <section className="market-hero">
          <h1>Market intelligence</h1>
          <p>Sunstone, Trilogy Sunset, and greater Las Vegas trends</p>
        </section>
        <RealScoutListingSection tightTop />
        <section className="market-content">
          <div>
            <p>
              Pair national headlines with what you see in live inventory—start from{" "}
              <Link href="/#browse-listings">MLS search</Link> and compare similar
              homes before you commit to a price range.
            </p>
          </div>
          <section>
            <h2 className="faq-h2">Questions</h2>
            <div className="faq-block">
              <h3 className="faq-q">
                How do I read Las Vegas housing headlines for Sunstone buyers?
              </h3>
              <p>
                National headlines describe broad trends; your offer strategy still
                depends on local inventory and the specific homes you are comparing.
              </p>
            </div>
            <div className="faq-block">
              <h3 className="faq-q">
                Where should I start if I am new to the Las Vegas market?
              </h3>
              <p>
                Start with the <Link href="/buyers/">home buyer guide</Link>, explore{" "}
                <Link href="/sunstone/">Sunstone context</Link>, and filter live
                listings before you schedule tours.
              </p>
            </div>
          </section>
        </section>
      </PageShell>
    </>
  );
}
