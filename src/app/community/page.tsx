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

const pageTitle = uniquePageTitle("Community");
const pageDesc =
  "Sunstone and Trilogy Sunset community life—neighborhoods, amenities, and local character in Las Vegas with Dr. Jan Duffy.";
const canonicalPath = "/community/";

export const metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDesc,
  canonicalPath,
});

export default function CommunityPage() {
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
          <h1>Community</h1>
          <p>Sunstone, Trilogy Sunset, and nearby Las Vegas neighborhoods</p>
        </section>

        <RealScoutListingSection tightTop />

        <section className="mx-auto my-8 grid max-w-[900px] gap-8 rounded-2xl bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
          <div className="text-[1.05rem] leading-relaxed text-[#0a2540]">
            <p>
              <strong>Sunstone</strong> and <strong>Trilogy Sunset</strong> sit in
              northwest Las Vegas—close to daily shopping and services, with
              master-planned streetscapes and shared amenities that define how the
              neighborhood feels day to day. Buyers often compare these communities
              for lifestyle fit, commute patterns, and how each area handles
              landscaping, events, and walkability.
            </p>
            <p className="mt-4">
              For masterplan context on Sunstone, read the{" "}
              <Link href="/sunstone/" className="text-[#3a8dde] underline underline-offset-2">Sunstone guide</Link>, then start with the{" "}
              <Link href="/location/" className="text-[#3a8dde] underline underline-offset-2">location</Link> page for maps and context and the{" "}
              <a href="#browse-listings" className="text-[#3a8dde] underline underline-offset-2">MLS home search</a> for active listings.
              Dr. Jan Duffy can align tours with your timeline and answer HOA and
              neighborhood questions as you shortlist homes.
            </p>
            <p className="mt-4">
              For financing and milestones, see the{" "}
              <Link href="/buying-process/" className="text-[#3a8dde] underline underline-offset-2">buying process</Link> overview.
              {telHref ? (
                <span>
                  {" "}
                  Questions? Call <a href={telHref} className="text-[#3a8dde] underline underline-offset-2">{contact.telephone}</a> or use
                  the bar below on mobile.
                </span>
              ) : (
                <span> Use the bar below on mobile to get connected.</span>
              )}
            </p>
          </div>
        </section>
        <MobileHomeBuyerBar telHref={telHref || undefined} />
      </main>
      <PageChrome omitListingsFooter />
    </>
  );
}
