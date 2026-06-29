import Link from "next/link";

import PageShell, { getTelHref } from "@/components/PageShell";
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
      <PageShell
        className="contact-page marketing-surface"
        mobileHomeBuyerBarTelHref={telHref || undefined}
      >
        <section className="contact-hero slv-marketing-hero" aria-labelledby="contact-h1">
          <h1 id="contact-h1">Contact Dr. Jan Duffy</h1>
          <p>
            Sunstone, Trilogy Sunset, and greater Las Vegas—buying, selling, and
            straight answers when you are ready.
          </p>
        </section>
        <RealScoutListingSection tightTop />
        <section className="contact-body" aria-label="Contact options">
          <div className="contact-card">
            <h2 className="contact-h2">Office &amp; license</h2>
            <p className="contact-p">
              <strong>{contact.agentName}</strong>
              <br />
              {contact.brokerageName}
              <br />
              Nevada license {contact.licenseNumber}
            </p>
            {hasAddress ? (
              <p className="contact-p">
                {contact.streetAddress}
                <br />
                {contact.addressLocality}, {contact.addressRegion}{" "}
                {contact.postalCode}
              </p>
            ) : null}
            {telHref ? (
              <p className="contact-p">
                <Link className="contact-link" href={telHref}>
                  {contact.telephone}
                </Link>
              </p>
            ) : null}
          </div>
          <div className="contact-card">
            <h2 className="contact-h2">Maps &amp; reviews</h2>
            <ul className="contact-actions list-disc pl-5">
              {contact.googleMapsUrl ? (
                <li>
                  <a
                    href={contact.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link"
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
                    className="contact-link"
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
                    className="contact-link"
                  >
                    View on Google
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
          <div className="contact-card">
            <h2 className="contact-h2">What happens next</h2>
            <p className="contact-p">
              Share whether you are buying or selling, your timeline, and
              neighborhoods you&apos;re considering.
            </p>
            <p className="contact-p">
              <Link href="/about/" className="contact-link">
                About Dr. Jan Duffy
              </Link>{" "}
              ·{" "}
              <Link href="/#browse-listings" className="contact-link">
                Browse MLS listings
              </Link>{" "}
              ·{" "}
              <Link href="/sellers/" className="contact-link">
                Selling a home
              </Link>
            </p>
          </div>
        </section>
      </PageShell>
    </>
  );
}
