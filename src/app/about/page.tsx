import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { MobileHomeBuyerBar } from "@/components/MobileHomeBuyerBar";
import { PageChrome } from "@/components/PageChrome";
import { RealScoutListingSection } from "@/components/home/RealScoutListingSection";
import { SITE } from "@/config";
import { buildPageMetadata, buildStructuredData } from "@/lib/json-ld";
import { getSiteContact } from "@/lib/site-contact";

export const dynamic = "force-static";

const pageTitle = `About Dr. Jan Duffy | ${SITE.title}`;
const pageDesc =
  "Meet Dr. Jan Duffy — Nevada real estate professional focused on Sunstone, Trilogy Sunset, and Las Vegas. License S.0197614.LLC, Berkshire Hathaway HomeServices Nevada Properties.";
const canonicalPath = "/about/";

export const metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDesc,
  canonicalPath,
});

export default function AboutPage() {
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
        className="min-h-[60vh] pb-[calc(5rem+env(safe-area-inset-bottom,0px))] md:pb-0"
      >
        <section className="flex min-h-[220px] flex-col justify-center bg-gradient-to-br from-[#0a2540] from-60% to-[#3a8dde] px-8 py-12 text-center text-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] md:px-4 md:py-8">
          <h1>About Dr. Jan Duffy</h1>
          <p>Trilogy Sunset and Sunstone specialist serving Las Vegas and Henderson</p>
        </section>

        <RealScoutListingSection tightTop />

        <section className="mx-auto my-8 grid max-w-[900px] gap-8 rounded-2xl bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
          <div>
            <h2>Meet Dr. Jan</h2>
            <p>
              Dr. Jan Duffy helps buyers and sellers navigate Sunstone, Trilogy
              Sunset, and the wider Las Vegas market with clear communication and a
              process tailored to your timeline.
            </p>
            <p className="mt-4 leading-relaxed text-[#0a2540]">
              Whether you are comparing communities, preparing to list, or planning
              a purchase months out, you get a single point of contact and a roadmap
              from first conversation to closing.
            </p>
          </div>

          <div className="rounded-xl bg-[#f7f9fc] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
            <h3>Credentials</h3>
            <ul className="mt-2 list-disc pl-5">
              <li>Nevada real estate license S.0197614.LLC</li>
              <li>Berkshire Hathaway HomeServices Nevada Properties</li>
              <li>
                Local focus: Sunstone, Trilogy Sunset, Las Vegas, and Henderson
              </li>
            </ul>
          </div>
        </section>
        <MobileHomeBuyerBar telHref={telHref || undefined} />
      </main>
      <PageChrome omitListingsFooter />
    </>
  );
}
