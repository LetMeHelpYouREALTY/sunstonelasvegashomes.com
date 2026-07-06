import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { MobileHomeBuyerBar } from "@/components/MobileHomeBuyerBar";
import { PageChrome } from "@/components/PageChrome";
import { RealScoutListingSection } from "@/components/home/RealScoutListingSection";
import { SITE } from "@/config";
import { buildPageMetadata, buildStructuredData } from "@/lib/json-ld";
import { getSiteContact } from "@/lib/site-contact";

export const dynamic = "force-static";

const pageTitle = `Buying process | ${SITE.title}`;
const pageDesc =
  "Step-by-step overview of buying a home in Las Vegas—from pre-approval and tours to offer and closing—with Dr. Jan Duffy.";
const canonicalPath = "/buying-process/";

export const metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDesc,
  canonicalPath,
});

export default function BuyingProcessPage() {
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
          <h1>Buying process</h1>
          <p>What to expect when you purchase in Sunstone or Trilogy Sunset</p>
        </section>

        <RealScoutListingSection tightTop />

        <section
          className="mx-auto my-8 grid max-w-[900px] gap-6 rounded-2xl bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
          aria-labelledby="buying-steps-title"
        >
          <h2 id="buying-steps-title" className="m-0 text-[1.35rem] text-[#0a2540]">
            A practical path from search to keys
          </h2>
          <ol className="m-0 flex list-decimal flex-col gap-4 pl-5 text-base leading-relaxed text-[#0a2540]">
            <li>
              <strong>Define your budget with a lender.</strong> A pre-approval letter
              clarifies what you can offer and helps you move quickly when the right
              home appears.
            </li>
            <li>
              <strong>Search and short-list homes.</strong> Use the{" "}
              <a href="#browse-listings" className="font-semibold text-[#3a8dde]">
                MLS home search on this site
              </a>
              , then narrow to a handful of homes that fit your must-haves.
            </li>
            <li>
              <strong>Tour with a local agent.</strong> Dr. Jan Duffy can coordinate
              showings, spot red flags, and explain how each listing compares to recent
              sales nearby.
            </li>
            <li>
              <strong>Make a competitive offer.</strong> Your offer reflects price,
              contingencies, and timing—aligned with current Las Vegas market norms.
            </li>
            <li>
              <strong>Due diligence and closing.</strong> Inspections, appraisal, and
              final walk-through protect you before you sign at closing.
            </li>
          </ol>
          <p className="m-0 border-t border-[rgba(10,37,64,0.12)] pt-2 text-[0.95rem] leading-normal text-[#0a2540]">
            Questions about Sunstone, Trilogy Sunset, or timing your purchase? Use the
            contact details in the footer to reach Dr. Jan Duffy.
          </p>
        </section>
        <MobileHomeBuyerBar telHref={telHref || undefined} />
      </main>
      <PageChrome omitListingsFooter />
    </>
  );
}
