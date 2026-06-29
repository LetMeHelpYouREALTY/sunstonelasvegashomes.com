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
  title: uniquePageTitle("Privacy"),
  description:
    "How Sunstone Las Vegas Homes handles theme preferences, MLS search tools, and contact. Dr. Jan Duffy, Berkshire Hathaway HomeServices Nevada Properties.",
  canonicalPath: "/privacy/",
});

export default function PrivacyPage() {
  const contact = getSiteContact();
  const telHref = getTelHref(contact.telephone);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: createStructuredDataScript({
            title: uniquePageTitle("Privacy"),
            description:
              "How Sunstone Las Vegas Homes handles theme preferences, MLS search tools, and contact.",
            canonicalPath: "/privacy/",
          }),
        }}
      />
      <PageShell mobileHomeBuyerBarTelHref={telHref || undefined}>
        <MarketingHero
          title="Privacy"
          headingId="privacy-h1"
          lede={`${contact.agentName}, ${contact.brokerageName}. Nevada license ${contact.licenseNumber}.`}
        />
        <RealScoutListingSection tightTop />
        <section className="slv-panel slv-panel--narrow slv-panel--stack">
          <article className="slv-prose">
            <h2>Local storage &amp; theme</h2>
            <p>
              This site stores your light/dark theme preference in your browser&apos;s
              local storage so the choice persists between visits.
            </p>
          </article>
          <article className="slv-prose">
            <h2>MLS search &amp; listings</h2>
            <p>
              Listing search is provided by RealScout and third-party MLS data providers.
              Their policies govern data you enter in search widgets.
            </p>
          </article>
          <article className="slv-prose">
            <h2>Contacting us</h2>
            <p>
              When you call or email, we use your information to respond about real
              estate services. See{" "}
              <Link href="/contact/" className="slv-link">
                Contact
              </Link>
              {telHref ? (
                <>
                  {" "}
                  or call{" "}
                  <Link href={telHref} className="slv-link">
                    {contact.telephone}
                  </Link>
                </>
              ) : null}
              .
            </p>
          </article>
          <article className="slv-prose">
            <h2>Updates</h2>
            <p>We may update this page as site features change.</p>
          </article>
        </section>
      </PageShell>
    </>
  );
}
