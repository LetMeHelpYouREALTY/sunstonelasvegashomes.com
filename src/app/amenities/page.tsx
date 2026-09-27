import Link from "next/link";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { MobileHomeBuyerBar } from "@/components/MobileHomeBuyerBar";
import { PageChrome } from "@/components/PageChrome";
import { FaqBlock } from "@/components/home/FaqBlock";
import { RealScoutListingSection } from "@/components/home/RealScoutListingSection";
import { AmenityMap } from "@/components/amenities/AmenityMap";
import {
  AMENITIES_PAGE_DESCRIPTION,
  AMENITIES_PAGE_TITLE,
  amenityContentSections,
  buildAmenitiesFaqEntries,
} from "@/data/nearby-amenities-content";
import { buildAmenitiesStructuredData } from "@/lib/amenities-json-ld";
import { COMMUNITY_MAP } from "@/lib/community-map";
import {
  getGoogleMapsApiKey,
  getGoogleMapsMapId,
} from "@/lib/google-maps-env";
import { buildPageMetadata } from "@/lib/json-ld";
import { getSiteContact } from "@/lib/site-contact";
import { uniquePageTitle } from "@/lib/seo-helpers";

export const dynamic = "force-static";

const canonicalPath = "/amenities/";
const pageTitle = uniquePageTitle(AMENITIES_PAGE_TITLE);

export const metadata = buildPageMetadata({
  title: pageTitle,
  description: AMENITIES_PAGE_DESCRIPTION,
  canonicalPath,
});

export default function AmenitiesPage() {
  const contact = getSiteContact();
  const telHref = contact.telephone
    ? `tel:${contact.telephone.replace(/\D/g, "")}`
    : "";
  const faqEntries = buildAmenitiesFaqEntries(contact.telephone || undefined);
  const apiKey = getGoogleMapsApiKey();
  const mapId = getGoogleMapsMapId();

  return (
    <>
      <JsonLd
        data={buildAmenitiesStructuredData(
          {
            title: pageTitle,
            description: AMENITIES_PAGE_DESCRIPTION,
            canonicalPath,
          },
          faqEntries,
        )}
      />
      <Header />
      <main
        id="main-content"
        className="marketing-surface min-h-[50vh] pb-[calc(5rem+env(safe-area-inset-bottom,0px))] md:pb-0"
      >
        <section
          className="slv-marketing-hero flex min-h-[220px] flex-col justify-center px-8 py-12 text-center text-white md:px-8"
          aria-labelledby="amenities-h1"
        >
          <h1 id="amenities-h1" className="text-3xl font-bold">
            {AMENITIES_PAGE_TITLE}
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-white/90">
            Grocery, healthcare, golf, parks, and northwest Las Vegas errands—mapped
            from the Sunstone &amp; Trilogy Sunset area ({COMMUNITY_MAP.postalCode}).
          </p>
        </section>

        <RealScoutListingSection tightTop />

        <section
          className="mx-auto my-8 max-w-[1200px] px-4 md:px-6"
          aria-labelledby="amenities-map-heading"
        >
          <h2
            id="amenities-map-heading"
            className="mb-4 text-[1.25rem] font-semibold text-[#0a2540]"
          >
            Interactive amenity map
          </h2>
          <p className="mb-4 max-w-3xl text-[0.98rem] leading-relaxed text-[#0a2540]/90">
            Center point: {COMMUNITY_MAP.name} ({COMMUNITY_MAP.latitude},{" "}
            {COMMUNITY_MAP.longitude}). {COMMUNITY_MAP.coordinateNote}
          </p>
          <AmenityMap
            apiKey={apiKey}
            mapId={mapId || undefined}
            variant="page"
            initialCategory="restaurants"
          />
        </section>

        <section
          className="mx-auto my-10 max-w-[900px] space-y-10 px-4 md:px-6"
          aria-label="Nearby amenities by category"
        >
          {amenityContentSections.map(section => (
            <article
              key={section.id}
              id={section.id}
              className="rounded-2xl bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
            >
              <h2 className="mb-3 text-xl font-semibold text-[#0a2540]">
                {section.heading}
              </h2>
              {section.paragraphs.map((para, i) => (
                <p
                  key={i}
                  className="text-[1.02rem] leading-relaxed text-[#0a2540] [&+&]:mt-4"
                >
                  {para}
                </p>
              ))}
            </article>
          ))}
        </section>

        <section className="mx-auto max-w-2xl px-2" aria-labelledby="amenities-faq-heading">
          <h2
            id="amenities-faq-heading"
            className="mb-5 text-center text-2xl font-semibold text-[#0a2540]"
          >
            Frequently asked questions
          </h2>
          <FaqBlock entries={faqEntries} hideHeading />
        </section>
        <section
          className="mx-auto mb-12 max-w-[720px] rounded-2xl border border-[rgba(58,141,222,0.25)] bg-gradient-to-br from-[#0a2540] to-[#1a4a7a] px-6 py-8 text-center text-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
          aria-labelledby="amenities-cta-heading"
        >
          <h2 id="amenities-cta-heading" className="text-xl font-semibold">
            Tour homes near these amenities
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-[0.98rem] leading-relaxed opacity-95">
            <strong>{contact.agentName}</strong>, REALTOR · {contact.brokerageName}{" "}
            · Nevada license {contact.licenseNumber}. Hyperlocal guidance for{" "}
            {COMMUNITY_MAP.name} and northwest Las Vegas MLS listings.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/#browse-listings"
              className="inline-flex rounded-lg bg-white px-5 py-2.5 font-semibold text-[#0a2540] no-underline hover:bg-white/95"
            >
              Search MLS listings
            </Link>
            <Link
              href="/contact/"
              className="inline-flex rounded-lg border-2 border-white/90 px-5 py-2.5 font-semibold text-white no-underline hover:bg-white/10"
            >
              Contact
            </Link>
            {telHref ? (
              <a
                href={telHref}
                className="font-semibold text-white underline underline-offset-2"
              >
                Call {contact.telephone}
              </a>
            ) : null}
          </div>
        </section>

        <MobileHomeBuyerBar telHref={telHref || undefined} />
      </main>
      <PageChrome omitListingsFooter />
    </>
  );
}
