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
  title: uniquePageTitle("Community"),
  description:
    "Sunstone and Trilogy Sunset community life—neighborhoods, amenities, and local character in Las Vegas with Dr. Jan Duffy.",
  canonicalPath: "/community/",
});

export default function CommunityPage() {
  const contact = getSiteContact();
  const telHref = getTelHref(contact.telephone);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: createStructuredDataScript({
            title: uniquePageTitle("Community"),
            description:
              "Sunstone and Trilogy Sunset community life—neighborhoods, amenities, and local character in Las Vegas.",
            canonicalPath: "/community/",
          }),
        }}
      />
      <PageShell
        className="community-page"
        mobileHomeBuyerBarTelHref={telHref || undefined}
      >
        <section className="community-hero">
          <h1>Community</h1>
          <p>Neighborhood character around Sunstone and Trilogy Sunset</p>
        </section>
        <RealScoutListingSection tightTop />
        <section className="community-content">
          <div className="community-prose">
            <p>
              Master-planned amenities, trails, and builder collections shape daily life
              in northwest Las Vegas—start with the{" "}
              <Link href="/sunstone/">Sunstone guide</Link> for collection names and
              official links.
            </p>
            <p>
              Compare commute and lifestyle using the{" "}
              <Link href="/location/">location page</Link>, then narrow inventory with{" "}
              <Link href="/#browse-listings">MLS search</Link>.
            </p>
            <p>
              Ready for next steps? Review the{" "}
              <Link href="/buying-process/">buying process</Link>
              {telHref ? (
                <>
                  {" "}
                  or call <Link href={telHref}>{contact.telephone}</Link>
                </>
              ) : null}
              .
            </p>
          </div>
        </section>
      </PageShell>
    </>
  );
}
