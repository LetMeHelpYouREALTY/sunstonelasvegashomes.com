import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { MobileHomeBuyerBar } from "@/components/MobileHomeBuyerBar";
import { PageChrome } from "@/components/PageChrome";
import { RealScoutListingSection } from "@/components/home/RealScoutListingSection";
import { getSpokeBySlug, getSunstoneSpokeSlugs } from "@/data/sunstone-content";
import { buildPageMetadata, buildStructuredData } from "@/lib/json-ld";
import { uniquePageTitle } from "@/lib/seo-helpers";
import { getSiteContact } from "@/lib/site-contact";

export const dynamic = "force-static";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getSunstoneSpokeSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const spoke = getSpokeBySlug(slug);
  if (!spoke) return {};

  return buildPageMetadata({
    title: uniquePageTitle(spoke.pageTitle),
    description: spoke.metaDescription,
    canonicalPath: `/sunstone/${slug}/`,
  });
}

export default async function SunstoneSpokePage({ params }: PageProps) {
  const { slug } = await params;
  const spoke = getSpokeBySlug(slug);
  if (!spoke) notFound();

  const contact = getSiteContact();
  const telHref = contact.telephone
    ? `tel:${contact.telephone.replace(/\D/g, "")}`
    : "";

  const pageTitle = uniquePageTitle(spoke.pageTitle);

  return (
    <>
      <JsonLd
        data={buildStructuredData({
          title: pageTitle,
          description: spoke.metaDescription,
          canonicalPath: `/sunstone/${slug}/`,
        })}
      />
      <Header />
      <main
        id="main-content"
        className="marketing-surface min-h-[50vh] pb-[calc(5rem+env(safe-area-inset-bottom,0px))] md:pb-0"
      >
        <section className="slv-marketing-hero flex min-h-[200px] flex-col justify-center px-8 py-12 text-center text-white">
          <h1 className="text-3xl font-bold">{spoke.h1}</h1>
          <p className="mt-2 text-white/90">Sunstone &amp; Trilogy Sunset — Las Vegas real estate</p>
        </section>

        <RealScoutListingSection tightTop />

        <section className="mx-auto my-8 grid max-w-[900px] gap-6 rounded-2xl bg-white p-8 shadow-[var(--box-shadow)] text-[var(--primary)]">
          <p className="m-0 text-[1.05rem] leading-relaxed">{spoke.lede}</p>
          {spoke.sections.map(section => (
            <div key={section.heading}>
              <h2 className="mb-2 text-[1.15rem] font-semibold">{section.heading}</h2>
              <p className="m-0 text-base leading-relaxed">{section.body}</p>
            </div>
          ))}
          <p className="m-0 border-t border-[rgba(10,37,64,0.1)] pt-2 text-[0.95rem] leading-relaxed">
            <Link href="/sunstone/" className="font-semibold text-[var(--accent-buyer)]">
              Sunstone masterplan guide
            </Link>
            {" · "}
            <a href="#browse-listings" className="font-semibold text-[var(--accent-buyer)]">
              MLS home search
            </a>
            {" · "}
            <Link href="/contact/" className="font-semibold text-[var(--accent-buyer)]">
              Contact
            </Link>
            {telHref ? (
              <>
                {" · "}
                <a href={telHref} className="font-semibold text-[var(--accent-buyer)]">
                  Call {contact.telephone}
                </a>
              </>
            ) : null}
          </p>
        </section>
        <MobileHomeBuyerBar telHref={telHref || undefined} />
      </main>
      <PageChrome omitListingsFooter />
    </>
  );
}
