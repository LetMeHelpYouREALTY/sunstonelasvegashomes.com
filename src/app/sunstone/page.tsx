import Link from "next/link";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { MobileHomeBuyerBar } from "@/components/MobileHomeBuyerBar";
import { PageChrome } from "@/components/PageChrome";
import { RealScoutListingSection } from "@/components/home/RealScoutListingSection";
import {
  SUNSTONE_PILLAR_DESCRIPTION,
  SUNSTONE_PILLAR_TITLE,
  sunstoneCollections,
  sunstonePillarIntro,
  sunstonePillarSections,
  sunstoneSpokes,
} from "@/data/sunstone-content";
import { buildPageMetadata, buildStructuredData } from "@/lib/json-ld";
import { uniquePageTitle } from "@/lib/seo-helpers";
import { getSiteContact } from "@/lib/site-contact";
import {
  SUNSTONE_INVENTORY_DISCLAIMER,
  SUNSTONE_OFFICIAL_SITE,
  sunstoneOfficialLinkText,
} from "@/lib/sunstone-hyperlocal";

export const dynamic = "force-static";

function slugify(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const pageTitle = uniquePageTitle(SUNSTONE_PILLAR_TITLE);
const pageDesc = SUNSTONE_PILLAR_DESCRIPTION;

export const metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDesc,
  canonicalPath: "/sunstone/",
});

export default function SunstonePage() {
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
          canonicalPath: "/sunstone/",
        })}
      />
      <Header />
      <main
        id="main-content"
        className="marketing-surface min-h-[50vh] pb-[calc(5rem+env(safe-area-inset-bottom,0px))] md:pb-0"
      >
        <section className="slv-marketing-hero flex min-h-[220px] flex-col justify-center px-8 py-12 text-center text-white md:px-8">
          <h1 className="text-3xl font-bold">{SUNSTONE_PILLAR_TITLE}</h1>
          <p className="mt-2 text-white/90">
            Northwest Las Vegas masterplan context, MLS search, and links to the official
            community site
          </p>
        </section>

        <RealScoutListingSection tightTop />

        <section className="mx-auto my-8 grid max-w-[900px] gap-7 rounded-2xl bg-white p-8 shadow-[var(--box-shadow)]">
          <nav
            className="rounded-xl border border-[rgba(10,37,64,0.12)] bg-[#f7f9fc] p-4"
            aria-label="On this page"
          >
            <h2 className="mb-2 text-[0.85rem] font-semibold text-[var(--primary)]">
              On this page
            </h2>
            <ul className="list-disc space-y-1 pl-5 text-[0.95rem] leading-relaxed text-[var(--primary)]">
              <li>
                <a
                  href="#sunstone-overview"
                  className="font-semibold text-[var(--accent-buyer)] underline underline-offset-2"
                >
                  Overview
                </a>
              </li>
              {sunstonePillarSections.map(s => (
                <li key={s.heading}>
                  <a
                    href={`#${slugify(s.heading)}`}
                    className="font-semibold text-[var(--accent-buyer)] underline underline-offset-2"
                  >
                    {s.heading}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#collections-at-sunstone"
                  className="font-semibold text-[var(--accent-buyer)] underline underline-offset-2"
                >
                  Collections at Sunstone
                </a>
              </li>
              <li>
                <a
                  href="#spoke-pages"
                  className="font-semibold text-[var(--accent-buyer)] underline underline-offset-2"
                >
                  Related guides
                </a>
              </li>
            </ul>
          </nav>

          <div id="sunstone-overview" className="text-[1.02rem] leading-relaxed text-[var(--primary)]">
            {sunstonePillarIntro.map(p => (
              <p key={p} className="mb-4">
                {p}
              </p>
            ))}
            <p className="mb-4">
              <a
                href={SUNSTONE_OFFICIAL_SITE}
                rel="noopener noreferrer"
                target="_blank"
                className="font-semibold text-[var(--accent-buyer)]"
              >
                {sunstoneOfficialLinkText}
              </a>
            </p>
            <p className="text-[0.92rem] opacity-90">{SUNSTONE_INVENTORY_DISCLAIMER}</p>
          </div>

          {sunstonePillarSections.map(s => (
            <section
              key={s.heading}
              id={slugify(s.heading)}
              aria-labelledby={`h-${slugify(s.heading)}`}
              className="text-[var(--primary)]"
            >
              <h2 id={`h-${slugify(s.heading)}`} className="mb-3 text-xl font-semibold">
                {s.heading}
              </h2>
              {s.body.map(para => (
                <p key={para} className="mb-4 text-[1.02rem] leading-relaxed">
                  {para}
                </p>
              ))}
            </section>
          ))}

          <section
            id="collections-at-sunstone"
            aria-labelledby="collections-heading"
            className="text-[var(--primary)]"
          >
            <h2 id="collections-heading" className="mb-3 text-xl font-semibold">
              Collections at Sunstone
            </h2>
            <p className="mb-4 text-[1.02rem] leading-relaxed">
              These names appear in public marketing for the masterplan. Availability and
              pricing change—confirm details on the official site and in MLS.
            </p>
            <ul className="mb-4 columns-2 gap-6 pl-5 text-[0.95rem] max-[600px]:columns-1">
              {sunstoneCollections.map(c => (
                <li key={c.anchorId}>
                  <a
                    href={`#${c.anchorId}`}
                    className="font-semibold text-[var(--accent-buyer)]"
                  >
                    {c.title}
                  </a>
                </li>
              ))}
            </ul>
            {sunstoneCollections.map(c => (
              <div key={c.anchorId} id={c.anchorId} className="scroll-mt-20">
                <h3 className="mt-6 mb-2 text-[1.08rem] font-semibold">{c.title}</h3>
                <p className="mb-4 text-[1.02rem] leading-relaxed">{c.body}</p>
              </div>
            ))}
          </section>

          <section id="spoke-pages" aria-labelledby="spokes-heading" className="text-[var(--primary)]">
            <h2 id="spokes-heading" className="mb-3 text-xl font-semibold">
              Related guides
            </h2>
            <ul className="list-disc space-y-2 pl-5 leading-relaxed">
              {sunstoneSpokes.map(s => (
                <li key={s.slug}>
                  <Link href={`/sunstone/${s.slug}/`} className="font-semibold text-[var(--accent-buyer)]">
                    {s.h1}
                  </Link>
                  <span className="text-[0.88rem] opacity-85">
                    {" "}
                    — {s.metaDescription.slice(0, 90)}…
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <div className="text-[1.02rem] leading-relaxed text-[var(--primary)]">
            <p>
              Ready to see listings?{" "}
              <a href="#browse-listings" className="font-semibold text-[var(--accent-buyer)]">
                Open the MLS home search
              </a>{" "}
              or{" "}
              <Link href="/contact/" className="font-semibold text-[var(--accent-buyer)]">
                contact
              </Link>{" "}
              Dr. Jan Duffy.
              {telHref ? (
                <>
                  {" "}
                  Call{" "}
                  <a href={telHref} className="font-semibold text-[var(--accent-buyer)]">
                    {contact.telephone}
                  </a>
                  .
                </>
              ) : null}
            </p>
          </div>
        </section>
        <MobileHomeBuyerBar telHref={telHref || undefined} />
      </main>
      <PageChrome omitListingsFooter />
    </>
  );
}
