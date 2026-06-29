import Link from "next/link";
import { notFound } from "next/navigation";

import PageShell, { getTelHref } from "@/components/PageShell";
import MarketingHero from "@/components/marketing/MarketingHero";
import RealScoutListingSection from "@/components/home/RealScoutListingSection";
import {
  getSpokeBySlug,
  getSunstoneSpokeSlugs,
} from "@/data/sunstone-content";
import {
  createPageMetadata,
  createStructuredDataScript,
} from "@/lib/page-metadata";
import { uniquePageTitle } from "@/lib/seo-helpers";
import { getSiteContact } from "@/lib/site-contact";

type SunstoneSpokePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getSunstoneSpokeSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: SunstoneSpokePageProps) {
  const { slug } = await params;
  const spoke = getSpokeBySlug(slug);

  if (!spoke) {
    return createPageMetadata({ title: "Page not found" });
  }

  return createPageMetadata({
    title: uniquePageTitle(spoke.pageTitle),
    description: spoke.metaDescription,
    canonicalPath: `/sunstone/${slug}/`,
  });
}

export default async function SunstoneSpokePage({ params }: SunstoneSpokePageProps) {
  const { slug } = await params;
  const spoke = getSpokeBySlug(slug);

  if (!spoke) {
    notFound();
  }

  const contact = getSiteContact();
  const telHref = getTelHref(contact.telephone);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: createStructuredDataScript({
            title: uniquePageTitle(spoke.pageTitle),
            description: spoke.metaDescription,
            canonicalPath: `/sunstone/${slug}/`,
          }),
        }}
      />
      <PageShell mobileHomeBuyerBarTelHref={telHref || undefined}>
        <MarketingHero
          title={spoke.h1}
          headingId="sunstone-spoke-h1"
          tagline="Sunstone & Trilogy Sunset — Las Vegas real estate"
        />
        <RealScoutListingSection tightTop />
        <section className="slv-panel slv-panel--narrow slv-panel--stack">
          <p className="slv-prose m-0">{spoke.lede}</p>
          {spoke.sections.map(section => (
            <article key={section.heading} className="slv-prose">
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
            </article>
          ))}
          <p className="slv-prose m-0">
            <Link href="/sunstone/" className="slv-link">
              Sunstone guide
            </Link>{" "}
            ·{" "}
            <Link href="/#browse-listings" className="slv-link">
              MLS search
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
        </section>
      </PageShell>
    </>
  );
}
