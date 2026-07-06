import Link from "next/link";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { MobileHomeBuyerBar } from "@/components/MobileHomeBuyerBar";
import { PageChrome } from "@/components/PageChrome";
import { RealScoutListingSection } from "@/components/home/RealScoutListingSection";
import { SITE } from "@/config";
import { buildPageMetadata, buildStructuredData } from "@/lib/json-ld";
import { getSiteContact } from "@/lib/site-contact";

export const dynamic = "force-static";

const pageTitle = `Location & amenities | ${SITE.title}`;
const pageDesc =
  "Sunstone and Trilogy Sunset location context—nearby amenities, commute, and lifestyle in Las Vegas with Dr. Jan Duffy.";
const canonicalPath = "/location/";

export const metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDesc,
  canonicalPath,
});

export default function LocationPage() {
  const contact = getSiteContact();
  const telHref = contact.telephone
    ? `tel:${contact.telephone.replace(/\D/g, "")}`
    : "";
  const mapsUrl = contact.googleMapsUrl;

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
          <h1>Location advantage</h1>
          <p>Sunstone, Trilogy Sunset, and nearby Las Vegas amenities</p>
        </section>

        <RealScoutListingSection tightTop />

        <section className="mx-auto my-8 grid max-w-[900px] gap-8 rounded-2xl bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
          <div>
            <p className="mb-4 text-base leading-relaxed text-[#0a2540]">
              Sunstone sits in the <strong>northwest Las Vegas</strong> corridor
              (master-planned community marketing often references US-95 access and
              regional recreation). Trilogy Sunset buyers weigh the same
              lifestyle and commute tradeoffs across the greater Las Vegas metro.
              Read the <Link href="/sunstone/" className="font-semibold text-[#3a8dde] underline underline-offset-2">Sunstone guide</Link> for collection names
              and context, then use the{" "}
              <a href="#browse-listings" className="font-semibold text-[#3a8dde] underline underline-offset-2">MLS home search</a> to see what is on the
              market and plan tours that compare your top neighborhoods side by
              side.
            </p>
            {mapsUrl ? (
              <p className="mb-4">
                <a
                  href={mapsUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="text-[1.05rem] font-semibold text-[#3a8dde] underline underline-offset-2"
                >
                  Open directions in Google Maps
                </a>
              </p>
            ) : null}
            <ul className="m-0 flex list-disc flex-col gap-3 pl-5 leading-relaxed text-[#0a2540]">
              <li>
                <strong>Sunstone</strong> — community context and inventory for
                Sunstone buyers are covered in your search filters and tours.
              </li>
              <li>
                <strong>Trilogy Sunset</strong> — active-adult lifestyle and
                neighborhood fit are easier to judge when you compare listings in
                person.
              </li>
              <li>
                <strong>Las Vegas &amp; Henderson</strong> — broader metro options
                stay available when your priorities shift during the search.
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
