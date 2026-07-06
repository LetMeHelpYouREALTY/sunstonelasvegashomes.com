import Link from "next/link";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { MobileHomeBuyerBar } from "@/components/MobileHomeBuyerBar";
import { PageChrome } from "@/components/PageChrome";
import { BuyersJourney } from "@/components/home/BuyersJourney";
import { RealScoutListingSection } from "@/components/home/RealScoutListingSection";
import { getKcmFeedItems } from "@/lib/kcm-feed";
import { buildPageMetadata, buildStructuredData } from "@/lib/json-ld";
import { getSiteContact } from "@/lib/site-contact";
import { uniquePageTitle } from "@/lib/seo-helpers";

export const dynamic = "force-static";

const pageTitle = uniquePageTitle("Home buyer guide — Sunstone & Trilogy Sunset");
const pageDesc =
  "Next steps for buying in Sunstone and Trilogy Sunset: MLS search, neighborhood context, Las Vegas market notes, and curated national buyer articles.";
const canonicalPath = "/buyers/";

export const metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDesc,
  canonicalPath,
});

export default async function BuyersPage() {
  const contact = getSiteContact();
  const telHref = contact.telephone
    ? `tel:${contact.telephone.replace(/\D/g, "")}`
    : "";
  const kcmFeedTeaser = await getKcmFeedItems(4);

  return (
    <>
      <JsonLd
        data={buildStructuredData({
          title: pageTitle,
          description: pageDesc,
          canonicalPath,
        })}
      />
      <Header />
      <main
        id="main-content"
        className="mx-auto max-w-[1200px] px-2 pb-[calc(5rem+env(safe-area-inset-bottom,0px))] md:pb-0"
      >
        <section
          className="mx-auto my-5 mb-8 rounded-2xl bg-gradient-to-br from-[#0a2540] from-60% to-[#3a8dde] px-6 py-8 text-center text-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
          aria-labelledby="buyers-hero-heading"
        >
          <h1
            id="buyers-hero-heading"
            className="mb-3 text-[clamp(1.5rem,4vw,1.85rem)] leading-tight font-bold"
          >
            Home buyer guide
          </h1>
          <p className="mx-auto max-w-[40rem] text-[1.02rem] leading-relaxed opacity-95">
            Plan your search in <strong>Sunstone</strong> and
            <strong> Trilogy Sunset</strong>—local context, market timing, and
            listings when you are ready. Dr. Jan Duffy, {contact.brokerageName} ·
            Nevada license {contact.licenseNumber}
          </p>
          <p className="mt-5 text-sm opacity-90">
            <Link href="/faq/" className="font-semibold text-white underline underline-offset-[3px]">
              FAQ
            </Link>
            {" · "}
            <Link href="/buying-process/" className="font-semibold text-white underline underline-offset-[3px]">
              Buying process
            </Link>
            {" · "}
            <a href="#browse-listings" className="font-semibold text-white underline underline-offset-[3px]">
              Jump to MLS search
            </a>
          </p>
        </section>

        <RealScoutListingSection tightTop />

        <BuyersJourney kcmFeedTeaser={kcmFeedTeaser} />
        <MobileHomeBuyerBar telHref={telHref || undefined} />
      </main>
      <PageChrome omitListingsFooter />
    </>
  );
}
