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

const pageTitle = uniquePageTitle("Contact Dr. Jan Duffy");
const pageDesc =
  "Call, directions, and Google reviews for Dr. Jan Duffy—Sunstone, Trilogy Sunset, Las Vegas and Henderson real estate. Nevada license S.0197614.LLC, Berkshire Hathaway HomeServices Nevada Properties.";
const canonicalPath = "/contact/";

export const metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDesc,
  canonicalPath,
});

export default function ContactPage() {
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
          aria-labelledby="contact-h1"
        >
          <h1
            id="contact-h1"
            className="mb-3 text-[clamp(1.5rem,4vw,1.85rem)] font-bold"
          >
            Contact Dr. Jan Duffy
          </h1>
          <p className="mx-auto max-w-[36rem] text-[1.02rem] leading-relaxed opacity-95">
            Sunstone, Trilogy Sunset, and greater Las Vegas—buying, selling, and
            straight answers when you are ready.
          </p>
        </section>

        <RealScoutListingSection tightTop />

        <section
          className="mx-auto my-8 flex max-w-[720px] flex-col gap-5 px-4"
          aria-label="Contact options"
        >
          <div className="rounded-2xl border border-[rgba(10,37,64,0.06)] bg-white p-5 text-[#0a2540] shadow-[var(--box-shadow)]">
            <h2 className="mb-3 text-[1.1rem] font-semibold">Office &amp; license</h2>
            <p className="mb-3 text-[0.98rem] leading-relaxed">
              <strong>{contact.agentName}</strong>
              <br />
              {contact.brokerageName}
              <br />
              Nevada license {contact.licenseNumber}
            </p>
            {contact.streetAddress && contact.postalCode ? (
              <p className="mb-3 text-[0.98rem] leading-relaxed">
                {contact.streetAddress}
                <br />
                {contact.addressLocality}, {contact.addressRegion}{" "}
                {contact.postalCode}
              </p>
            ) : null}
            {telHref ? (
              <p className="mb-3 text-[0.98rem] leading-relaxed">
                <a href={telHref} className="font-semibold text-[var(--accent-buyer)] underline underline-offset-2">
                  {contact.telephone}
                </a>
              </p>
            ) : null}
            <p className="text-sm text-foreground/85">
              For current business hours, see{" "}
              {contact.googleBusinessProfileUrl ? (
                <a
                  href={contact.googleBusinessProfileUrl}
                  className="font-semibold text-[var(--accent-buyer)] underline underline-offset-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Business Profile
                </a>
              ) : (
                "Google Business Profile"
              )}{" "}
              or call the number above.
            </p>
          </div>

          <div className="rounded-2xl border border-[rgba(10,37,64,0.06)] bg-white p-5 text-[#0a2540] shadow-[var(--box-shadow)]">
            <h2 className="mb-3 text-[1.1rem] font-semibold">Maps &amp; reviews</h2>
            <ul className="list-disc pl-5 leading-relaxed">
              {contact.googleMapsUrl ? (
                <li>
                  <a
                    href={contact.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[var(--accent-buyer)] underline underline-offset-2"
                  >
                    Directions
                  </a>
                </li>
              ) : null}
              {contact.googleReviewsUrl ? (
                <li>
                  <a
                    href={contact.googleReviewsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[var(--accent-buyer)] underline underline-offset-2"
                  >
                    Google reviews
                  </a>
                </li>
              ) : null}
              {contact.googleBusinessProfileUrl ? (
                <li>
                  <a
                    href={contact.googleBusinessProfileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[var(--accent-buyer)] underline underline-offset-2"
                  >
                    View on Google
                  </a>
                </li>
              ) : null}
            </ul>
          </div>

          <div className="rounded-2xl border border-[rgba(10,37,64,0.06)] bg-white p-5 text-[#0a2540] shadow-[var(--box-shadow)]">
            <h2 className="mb-3 text-[1.1rem] font-semibold">What happens next</h2>
            <p className="mb-3 text-[0.98rem] leading-relaxed">
              Share whether you are buying or selling, your timeline, and
              neighborhoods you&apos;re considering. We will align on MLS search, tours,
              or listing strategy—no pressure.
            </p>
            <p className="text-[0.98rem] leading-relaxed">
              <Link href="/about/" className="font-semibold text-[var(--accent-buyer)] underline underline-offset-2">
                About Dr. Jan Duffy
              </Link>
              {" · "}
              <a href="#browse-listings" className="font-semibold text-[var(--accent-buyer)] underline underline-offset-2">
                Browse MLS listings
              </a>
              {" · "}
              <Link href="/sellers/" className="font-semibold text-[var(--accent-buyer)] underline underline-offset-2">
                Selling a home
              </Link>
            </p>
          </div>
        </section>
        <MobileHomeBuyerBar telHref={telHref || undefined} />
      </main>
      <PageChrome omitListingsFooter />
    </>
  );
}
