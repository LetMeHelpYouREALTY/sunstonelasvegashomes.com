import Link from "next/link";
import { notFound } from "next/navigation";

import PageShell, { getTelHref } from "@/components/PageShell";
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
      <PageShell
        className="sunstone-spoke-page"
        mobileHomeBuyerBarTelHref={telHref || undefined}
      >
        <section className="sunstone-spoke-hero">
          <h1>{spoke.h1}</h1>
          <p>Sunstone &amp; Trilogy Sunset — Las Vegas real estate</p>
        </section>
        <RealScoutListingSection tightTop />
        <section className="sunstone-spoke-content">
          <p className="sunstone-spoke-lede">{spoke.lede}</p>
          {spoke.sections.map(section => (
            <div key={section.heading} className="sunstone-spoke-block">
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
            </div>
          ))}
          <p className="sunstone-spoke-back">
            <Link href="/sunstone/">Sunstone guide</Link> ·{" "}
            <Link href="/#browse-listings">MLS search</Link> ·{" "}
            <Link href="/contact/">Contact</Link>
            {telHref ? (
              <>
                {" "}
                · <Link href={telHref}>Call {contact.telephone}</Link>
              </>
            ) : null}
          </p>
        </section>
      </PageShell>
    </>
  );
}
