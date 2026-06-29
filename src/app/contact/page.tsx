import Link from "next/link";

import PageShell, { getTelHref } from "@/components/PageShell";
import MarketingHero from "@/components/marketing/MarketingHero";
import RealScoutListingSection from "@/components/home/RealScoutListingSection";
import {
  createPageMetadata,
  createStructuredDataScript,
} from "@/lib/page-metadata";
import { uniquePageTitle } from "@/lib/seo-helpers";
import { getSiteContact } from "@/lib/site-contact";

export const metadata = createPageMetadata({
  title: uniquePageTitle("Contact Dr. Jan Duffy"),
  description:
    "Call, directions, and Google reviews for Dr. Jan Duffy—Sunstone, Trilogy Sunset, Las Vegas and Henderson real estate. Nevada license S.0197614.LLC, Berkshire Hathaway HomeServices Nevada Properties.",
  canonicalPath: "/contact/",
});

export default function ContactPage() {
  const contact = getSiteContact();
  const telHref = getTelHref(contact.telephone);
  const hasAddress =
    contact.streetAddress.length > 0 && contact.postalCode.length > 0;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: createStructuredDataScript({
            title: uniquePageTitle("Contact Dr. Jan Duffy"),
            description:
              "Call, directions, and Google reviews for Dr. Jan Duffy—Sunstone, Trilogy Sunset, Las Vegas and Henderson real estate.",
            canonicalPath: "/contact/",
          }),
        }}
      />
      <PageShell mobileHomeBuyerBarTelHref={telHref || undefined}>
        <MarketingHero
          title="Contact Dr. Jan Duffy"
          headingId="contact-h1"
          lede="Sunstone, Trilogy Sunset, and greater Las Vegas—buying, selling, and straight answers when you are ready."
        />
        <RealScoutListingSection tightTop />
        <section
          className="slv-panel slv-panel--narrow slv-panel--stack"
          aria-label="Contact options"
        >
          <div className="slv-card">
            <h2 className="slv-card__title">Office &amp; license</h2>
            <p className="slv-card__text">
              <strong>{contact.agentName}</strong>
              <br />
              {contact.brokerageName}
              <br />
              Nevada license {contact.licenseNumber}
            </p>
            {hasAddress ? (
              <p className="slv-card__text">
                {contact.streetAddress}
                <br />
                {contact.addressLocality}, {contact.addressRegion}{" "}
                {contact.postalCode}
              </p>
            ) : null}
            {telHref ? (
              <p className="slv-card__text">
                <Link className="slv-link" href={telHref}>
                  {contact.telephone}
                </Link>
              </p>
            ) : null}
            <p className="slv-card__text slv-meta">
              For current business hours, see{" "}
              {contact.googleBusinessProfileUrl ? (
                <a
                  href={contact.googleBusinessProfileUrl}
                  className="slv-link"
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
          <div className="slv-card">
            <h2 className="slv-card__title">Maps &amp; reviews</h2>
            <ul className="slv-prose m-0 list-disc pl-5 leading-relaxed">
              {contact.googleMapsUrl ? (
                <li>
                  <a
                    href={contact.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="slv-link"
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
                    className="slv-link"
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
                    className="slv-link"
                  >
                    View on Google
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
          <div className="slv-card">
            <h2 className="slv-card__title">What happens next</h2>
            <p className="slv-card__text">
              Share whether you are buying or selling, your timeline, and
              neighborhoods you&apos;re considering. We will align on MLS search, tours,
              or listing strategy—no pressure.
            </p>
            <p className="slv-card__text">
              <Link href="/about/" className="slv-link">
                About Dr. Jan Duffy
              </Link>{" "}
              ·{" "}
              <Link href="/#browse-listings" className="slv-link">
                Browse MLS listings
              </Link>{" "}
              ·{" "}
              <Link href="/sellers/" className="slv-link">
                Selling a home
              </Link>
            </p>
          </div>
        </section>
      </PageShell>
    </>
  );
}
