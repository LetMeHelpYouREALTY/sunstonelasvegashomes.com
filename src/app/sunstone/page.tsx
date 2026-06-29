import Link from "next/link";

import PageShell, { getTelHref } from "@/components/PageShell";
import MarketingHero from "@/components/marketing/MarketingHero";
import RealScoutListingSection from "@/components/home/RealScoutListingSection";
import {
  SUNSTONE_INVENTORY_DISCLAIMER,
  SUNSTONE_OFFICIAL_SITE,
  sunstoneOfficialLinkText,
} from "@/lib/sunstone-hyperlocal";
import {
  SUNSTONE_PILLAR_DESCRIPTION,
  SUNSTONE_PILLAR_TITLE,
  sunstoneCollections,
  sunstonePillarIntro,
  sunstonePillarSections,
  sunstoneSpokes,
} from "@/data/sunstone-content";
import {
  createPageMetadata,
  createStructuredDataScript,
} from "@/lib/page-metadata";
import { uniquePageTitle } from "@/lib/seo-helpers";
import { getSiteContact } from "@/lib/site-contact";

function slugifyHeading(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const metadata = createPageMetadata({
  title: uniquePageTitle(SUNSTONE_PILLAR_TITLE),
  description: SUNSTONE_PILLAR_DESCRIPTION,
  canonicalPath: "/sunstone/",
});

export default function SunstonePage() {
  const contact = getSiteContact();
  const telHref = getTelHref(contact.telephone);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: createStructuredDataScript({
            title: uniquePageTitle(SUNSTONE_PILLAR_TITLE),
            description: SUNSTONE_PILLAR_DESCRIPTION,
            canonicalPath: "/sunstone/",
          }),
        }}
      />
      <PageShell mobileHomeBuyerBarTelHref={telHref || undefined}>
        <MarketingHero
          title={SUNSTONE_PILLAR_TITLE}
          headingId="sunstone-h1"
          tagline="Northwest Las Vegas masterplan context, MLS search, and links to the official community site"
        />
        <RealScoutListingSection tightTop />
        <section className="slv-panel slv-panel--wide slv-panel--stack">
          <nav className="slv-toc" aria-label="On this page">
            <h2 className="slv-toc__title">On this page</h2>
            <ul className="slv-toc__list">
              <li>
                <a href="#sunstone-overview">Overview</a>
              </li>
              {sunstonePillarSections.map(section => (
                <li key={section.heading}>
                  <a href={`#${slugifyHeading(section.heading)}`}>{section.heading}</a>
                </li>
              ))}
              <li>
                <a href="#collections-at-sunstone">Collections at Sunstone</a>
              </li>
              <li>
                <a href="#spoke-pages">Related guides</a>
              </li>
            </ul>
          </nav>

          <div className="slv-prose slv-scroll-target" id="sunstone-overview">
            {sunstonePillarIntro.map(paragraph => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
            <p>
              <a
                href={SUNSTONE_OFFICIAL_SITE}
                rel="noopener noreferrer"
                target="_blank"
                className="slv-link"
              >
                {sunstoneOfficialLinkText}
              </a>
            </p>
            <p className="slv-meta">{SUNSTONE_INVENTORY_DISCLAIMER}</p>
          </div>

          {sunstonePillarSections.map(section => (
            <section
              key={section.heading}
              id={slugifyHeading(section.heading)}
              className="slv-prose slv-scroll-target"
            >
              <h2>{section.heading}</h2>
              {section.body.map(paragraph => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </section>
          ))}

          <section id="collections-at-sunstone" className="slv-scroll-target">
            <h2 className="slv-section-title">Collections at Sunstone</h2>
            <ul className="slv-anchor-jump">
              {sunstoneCollections.map(collection => (
                <li key={collection.anchorId}>
                  <a href={`#${collection.anchorId}`} className="slv-link">
                    {collection.title}
                  </a>
                </li>
              ))}
            </ul>
            {sunstoneCollections.map(collection => (
              <div
                key={collection.anchorId}
                id={collection.anchorId}
                className="slv-prose slv-scroll-target"
              >
                <h3>{collection.title}</h3>
                <p>{collection.body}</p>
              </div>
            ))}
          </section>

          <section id="spoke-pages" className="slv-scroll-target">
            <h2 className="slv-section-title">Related guides</h2>
            <ul className="slv-prose m-0 list-disc pl-5">
              {sunstoneSpokes.map(spoke => (
                <li key={spoke.slug}>
                  <Link href={`/sunstone/${spoke.slug}/`} className="slv-link">
                    {spoke.h1}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <div className="slv-prose">
            <p>
              Ready to compare listings?{" "}
              <Link href="/#browse-listings" className="slv-link">
                Open MLS search
              </Link>{" "}
              ·{" "}
              <Link href="/contact/" className="slv-link">
                Contact
              </Link>
              {telHref ? (
                <>
                  {" "}
                  ·{" "}
                  <Link href={telHref} className="slv-link">
                    Call {contact.telephone}
                  </Link>
                </>
              ) : null}
            </p>
          </div>
        </section>
      </PageShell>
    </>
  );
}
