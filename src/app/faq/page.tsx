import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { MobileHomeBuyerBar } from "@/components/MobileHomeBuyerBar";
import { PageChrome } from "@/components/PageChrome";
import { FaqBlock } from "@/components/home/FaqBlock";
import { RealScoutListingSection } from "@/components/home/RealScoutListingSection";
import { SITE } from "@/config";
import { buildFaqEntries, buildFaqPageSchema, getFaqContactAnswerText } from "@/data/faq-entries";
import { buildPageMetadata, buildStructuredData } from "@/lib/json-ld";
import { getSiteContact } from "@/lib/site-contact";
import { uniquePageTitle } from "@/lib/seo-helpers";

export const dynamic = "force-static";

const pageTitle = uniquePageTitle("FAQ — Sunstone & Las Vegas real estate");
const pageDesc =
  "Answers about Sunstone, Trilogy Sunset, MLS search, Dr. Jan Duffy's Nevada license and brokerage, and how to get in touch.";
const canonicalPath = "/faq/";

const siteOrigin = SITE.website.replace(/\/$/, "");

function getFaqPageData(faqContactAnswerText: string) {
  const faqEntries = buildFaqEntries(faqContactAnswerText, siteOrigin);
  return {
    faqEntries,
    faqSchema: buildFaqPageSchema(
      faqEntries,
      `${siteOrigin}/faq/#faq`,
    ),
  };
}

export const metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDesc,
  canonicalPath,
});

export default function FaqPage() {
  const contact = getSiteContact();
  const telHref = contact.telephone
    ? `tel:${contact.telephone.replace(/\D/g, "")}`
    : "";

  const faqContactAnswerText = getFaqContactAnswerText(contact);

  const { faqEntries, faqSchema } = getFaqPageData(faqContactAnswerText);

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
      <main
        id="main-content"
        className="pb-[calc(5rem+env(safe-area-inset-bottom,0px))] pt-6 md:pb-0"
      >
        <section
          className="mx-auto mb-4 max-w-[42rem] px-2"
          aria-labelledby="faq-h1"
        >
          <h1
            id="faq-h1"
            className="mb-3 text-2xl font-semibold text-[#0a2540]"
          >
            Frequently asked questions
          </h1>
          <p className="m-0 text-[0.95rem] leading-relaxed text-foreground opacity-90">
            Answers about Sunstone, Trilogy Sunset, MLS search, Dr. Jan Duffy&apos;s Nevada
            license and brokerage, and how to get in touch.
          </p>
        </section>
        <RealScoutListingSection tightTop />
        <FaqBlock entries={faqEntries} hideHeading />
        <MobileHomeBuyerBar telHref={telHref || undefined} />
      </main>
      <PageChrome omitListingsFooter />
    </>
  );
}
