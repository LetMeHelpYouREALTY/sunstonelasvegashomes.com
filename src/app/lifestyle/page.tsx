import Link from "next/link";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { MobileHomeBuyerBar } from "@/components/MobileHomeBuyerBar";
import { PageChrome } from "@/components/PageChrome";
import { RealScoutListingSection } from "@/components/home/RealScoutListingSection";
import { buildPageMetadata, buildStructuredData } from "@/lib/json-ld";
import { getSiteContact } from "@/lib/site-contact";
import { uniquePageTitle } from "@/lib/seo-helpers";

export const dynamic = "force-static";

const pageTitle = uniquePageTitle("Lifestyle");
const pageDesc =
  "Lifestyle and amenities near Sunstone and Trilogy Sunset—events, recreation, and day-to-day living in Las Vegas.";
const canonicalPath = "/lifestyle/";

export const metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDesc,
  canonicalPath,
});

export default function LifestylePage() {
  const contact = getSiteContact();
  const telHref = contact.telephone
    ? `tel:${contact.telephone.replace(/\D/g, "")}`
    : "";

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
        className="min-h-[50vh] pb-[calc(5rem+env(safe-area-inset-bottom,0px))] md:pb-0"
      >
        <section className="flex min-h-[220px] flex-col justify-center bg-gradient-to-br from-[#0a2540] from-60% to-[#3a8dde] px-8 py-12 text-center text-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] md:px-4 md:py-8">
          <h1>Lifestyle</h1>
          <p>What it is like to live in Sunstone and Trilogy Sunset</p>
        </section>

        <RealScoutListingSection tightTop />

        <section className="mx-auto my-8 grid max-w-[900px] gap-8 rounded-2xl bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
          <div className="text-[1.05rem] leading-relaxed text-[#0a2540]">
            <p>
              Life in the Las Vegas Valley balances desert climate with strong indoor
              and outdoor amenities—pools, trails, clubhouses, and year-round events
              are common reasons buyers choose master-planned communities like
              Sunstone and Trilogy Sunset in northwest Las Vegas. Weekends might mean
              golf, dining out, or quick trips to the Strip and airport; your routine
              depends on work location and how you like to spend time at home.
            </p>
            <p className="mt-4">
              Pair this page with <Link href="/community/" className="text-[#3a8dde] underline underline-offset-2">community</Link>, the{" "}
              <Link href="/sunstone/" className="text-[#3a8dde] underline underline-offset-2">Sunstone guide</Link>, and{" "}
              <Link href="/location/" className="text-[#3a8dde] underline underline-offset-2">location</Link> for maps and commute framing. When you
              are ready to see homes that match your lifestyle, use the{" "}
              <a href="#browse-listings" className="text-[#3a8dde] underline underline-offset-2">MLS home search</a> and filter with Dr. Jan
              Duffy for tours and offer strategy.
            </p>
            <p className="mt-4">
              For a step-by-step path from pre-approval to keys, read the{" "}
              <Link href="/buying-process/" className="text-[#3a8dde] underline underline-offset-2">buying process</Link> page.
              {telHref ? (
                <span>
                  {" "}
                  Call <a href={telHref} className="text-[#3a8dde] underline underline-offset-2">{contact.telephone}</a> to talk through
                  timing and priorities.
                </span>
              ) : null}
            </p>
          </div>
        </section>
        <MobileHomeBuyerBar telHref={telHref || undefined} />
      </main>
      <PageChrome omitListingsFooter />
    </>
  );
}
