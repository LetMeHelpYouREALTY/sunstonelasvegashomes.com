import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { MobileHomeBuyerBar } from "@/components/MobileHomeBuyerBar";
import { PageChrome } from "@/components/PageChrome";
import { RealScoutListingSection } from "@/components/home/RealScoutListingSection";
import { SITE } from "@/config";
import { buildPageMetadata, buildStructuredData } from "@/lib/json-ld";
import { getSiteContact } from "@/lib/site-contact";

export const dynamic = "force-static";

const pageTitle = `Market insights | ${SITE.title}`;
const pageDesc =
  "Las Vegas housing market notes for Sunstone and Trilogy Sunset buyers and sellers—trends, inventory, and what to watch with Dr. Jan Duffy.";
const canonicalPath = "/market/";

const siteOrigin = SITE.website.replace(/\/$/, "");

const faqSchema = {
  "@type": "FAQPage",
  "@id": `${siteOrigin}/market/#faq`,
  mainEntity: [
    {
      "@type": "Question",
      name: "Where can I see current list prices for Sunstone and Trilogy Sunset?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use the RealScout MLS home search on this site to filter by price range and property type. Your agent can also set up alerts when new listings match your criteria.",
      },
    },
    {
      "@type": "Question",
      name: "How often does the Las Vegas resale market change?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Inventory, interest rates, and seasonal demand can all move month to month. Ask for a short market briefing when you are ready to make a move so numbers reflect the current window.",
      },
    },
  ],
};

export const metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDesc,
  canonicalPath,
});

export default function MarketPage() {
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
          faqSchema,
        })}
      />
      <Header />
      <main id="main-content" className="min-h-[50vh]">
        <section className="flex min-h-[220px] flex-col justify-center bg-gradient-to-br from-[#0a2540] from-60% to-[#3a8dde] px-8 py-12 text-center text-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] md:px-4 md:py-8">
          <h1>Market intelligence</h1>
          <p>Sunstone, Trilogy Sunset, and greater Las Vegas trends</p>
        </section>

        <RealScoutListingSection tightTop />

        <section className="mx-auto my-8 grid max-w-[900px] gap-8 rounded-2xl bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
          <div className="rounded-xl border border-[rgba(10,37,64,0.08)] bg-[#f7f9fc] p-4">
            <p className="m-0 text-base leading-relaxed text-[#0a2540]">
              For live list prices and inventory in your range, start with the{" "}
              <a href="#browse-listings" className="font-semibold text-[#3a8dde] underline underline-offset-2">
                MLS home search
              </a>{" "}
              on this site—filter by price, beds, and property type, then save favorites or ask for a
              tailored market snapshot when you are ready to tour.
            </p>
          </div>

          <section aria-labelledby="market-faq-heading">
            <h2 id="market-faq-heading" className="mb-4 text-[1.25rem] font-semibold text-[#0a2540]">
              Questions
            </h2>
            <div className="mb-5">
              <h3 className="mb-2 text-[1.05rem] font-semibold text-[#0a2540]">
                Where can I see current list prices for Sunstone and Trilogy Sunset?
              </h3>
              <p className="m-0 leading-relaxed text-[#0a2540]">
                Use the RealScout MLS home search on this site to filter by price
                range and property type. Your agent can also set up alerts when new
                listings match your criteria.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-[1.05rem] font-semibold text-[#0a2540]">
                How often does the Las Vegas resale market change?
              </h3>
              <p className="m-0 leading-relaxed text-[#0a2540]">
                Inventory, interest rates, and seasonal demand can all move month
                to month. Ask for a short market briefing when you are ready to make
                a move so numbers reflect the current window.
              </p>
            </div>
          </section>
        </section>
        <MobileHomeBuyerBar telHref={telHref || undefined} />
      </main>
      <PageChrome omitListingsFooter />
    </>
  );
}
