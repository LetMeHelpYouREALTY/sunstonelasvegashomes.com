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

const pageTitle = uniquePageTitle("Selling in Sunstone & Las Vegas");
const pageDesc =
  "List and sell Sunstone, Trilogy Sunset, or Las Vegas real estate with Dr. Jan Duffy—pricing, prep, MLS exposure, and closing support. Nevada license S.0197614.LLC.";
const canonicalPath = "/sellers/";

export const metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDesc,
  canonicalPath,
});

export default function SellersPage() {
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
        className="marketing-surface min-h-[50vh] pb-[calc(5rem+env(safe-area-inset-bottom,0px))] md:pb-0"
      >
        <section
          className="slv-marketing-hero px-6 py-10 text-center"
          aria-labelledby="sellers-h1"
        >
          <h1
            id="sellers-h1"
            className="mb-3 text-[clamp(1.5rem,4vw,1.85rem)] font-bold"
          >
            Selling your home
          </h1>
          <p className="mx-auto max-w-[38rem] text-[1.02rem] leading-relaxed opacity-95">
            Sunstone, Trilogy Sunset, and the wider Las Vegas market—with clear
            pricing conversations, MLS exposure, and support from list to close.
          </p>
        </section>

        <RealScoutListingSection tightTop />

        <section
          className="mx-auto my-8 flex max-w-[720px] flex-col gap-5 px-4"
          aria-label="Seller topics"
        >
          <article className="rounded-2xl border border-[rgba(10,37,64,0.06)] bg-white p-5 text-[#0a2540] shadow-[var(--box-shadow)]">
            <h2 className="mb-3 text-[1.1rem] font-semibold">Pricing &amp; positioning</h2>
            <p className="text-[0.98rem] leading-relaxed">
              We review recent sales and active competition so your list price
              matches today&apos;s market—not last year&apos;s headlines. Adjustments follow
              feedback and timing.
            </p>
          </article>
          <article className="rounded-2xl border border-[rgba(10,37,64,0.06)] bg-white p-5 text-[#0a2540] shadow-[var(--box-shadow)]">
            <h2 className="mb-3 text-[1.1rem] font-semibold">Prep &amp; presentation</h2>
            <p className="text-[0.98rem] leading-relaxed">
              Practical priorities for photos, access, and disclosures so buyers and
              agents see your home at its best.
            </p>
          </article>
          <article className="rounded-2xl border border-[rgba(10,37,64,0.06)] bg-white p-5 text-[#0a2540] shadow-[var(--box-shadow)]">
            <h2 className="mb-3 text-[1.1rem] font-semibold">Exposure</h2>
            <p className="text-[0.98rem] leading-relaxed">
              MLS syndication and coordinated marketing aligned with your brokerage
              and local MLS rules. Buyers often start here—see how we present
              listings on this site.
            </p>
          </article>
          <article className="rounded-2xl border border-[rgba(10,37,64,0.06)] bg-white p-5 text-[#0a2540] shadow-[var(--box-shadow)]">
            <h2 className="mb-3 text-[1.1rem] font-semibold">Next steps</h2>
            <p className="text-[0.98rem] leading-relaxed">
              Read the <Link href="/market/" className="font-semibold text-[var(--accent-buyer)] underline underline-offset-2">Las Vegas market</Link> overview, review{" "}
              <Link href="/location/" className="font-semibold text-[var(--accent-buyer)] underline underline-offset-2">location</Link> context for your neighborhood, and{" "}
              <Link href="/contact/" className="font-semibold text-[var(--accent-buyer)] underline underline-offset-2">get in touch</Link>
              {telHref ? (
                <>
                  {" "}
                  or call{" "}
                  <a href={telHref} className="font-semibold text-[var(--accent-buyer)] underline underline-offset-2">
                    {contact.telephone}
                  </a>
                </>
              ) : null}
              .
            </p>
            <p className="mt-3 text-[0.85rem] leading-relaxed opacity-90">
              This is general information, not legal or tax advice. Consult
              licensed professionals for your situation.
            </p>
          </article>
        </section>
        <MobileHomeBuyerBar telHref={telHref || undefined} />
      </main>
      <PageChrome omitListingsFooter />
    </>
  );
}
