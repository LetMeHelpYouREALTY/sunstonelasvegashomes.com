import Link from "next/link";
import { notFound } from "next/navigation";

import PageShell, { getTelHref } from "@/components/PageShell";
import MarketingHero from "@/components/marketing/MarketingHero";
import RealScoutListingSection from "@/components/home/RealScoutListingSection";
import {
  createPageMetadata,
  createStructuredDataScript,
} from "@/lib/page-metadata";
import { uniquePageTitle } from "@/lib/seo-helpers";
import { getSiteContact } from "@/lib/site-contact";

const LABELS: Record<string, string> = {
  sunstone: "Sunstone",
  "trilogy-sunset": "Trilogy Sunset",
};

const MODEL_INTRO: Record<string, string> = {
  sunstone:
    "Sunstone model homes showcase builder elevations, finishes, and layout options across collections in the northwest Las Vegas masterplan—pair tours with MLS resale comparisons.",
  "trilogy-sunset":
    "Trilogy Sunset model homes highlight active-adult living near Sunstone—compare lifestyle amenities with resale inventory before you choose new construction timing.",
};

type ModelPageProps = {
  params: Promise<{ model: string }>;
};

export async function generateStaticParams() {
  return [{ model: "sunstone" }, { model: "trilogy-sunset" }];
}

export async function generateMetadata({ params }: ModelPageProps) {
  const { model } = await params;
  const label = LABELS[model];

  if (!label) {
    return createPageMetadata({ title: "Page not found" });
  }

  return createPageMetadata({
    title: uniquePageTitle(`${label} model homes`),
    description: `Explore ${label} floor plans, finishes, and tours with Dr. Jan Duffy — Berkshire Hathaway HomeServices Nevada Properties.`,
    canonicalPath: `/models/${model}/`,
  });
}

export default async function ModelPage({ params }: ModelPageProps) {
  const { model } = await params;
  const label = LABELS[model];
  const intro = MODEL_INTRO[model];

  if (!label || !intro) {
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
            title: uniquePageTitle(`${label} model homes`),
            description: `Explore ${label} floor plans, finishes, and tours with Dr. Jan Duffy.`,
            canonicalPath: `/models/${model}/`,
          }),
        }}
      />
      <PageShell mobileHomeBuyerBarTelHref={telHref || undefined}>
        <MarketingHero
          title={`${label} model portfolio`}
          headingId="model-h1"
          tagline="Floor plans, finishes, and tour-ready highlights"
        />
        <RealScoutListingSection tightTop />
        <section className="slv-panel slv-panel--narrow">
          <div className="slv-prose">
            <p>{intro}</p>
            <p>
              Compare live inventory via{" "}
              <Link href="/#browse-listings" className="slv-link">
                MLS search
              </Link>
              , review the{" "}
              <Link href="/buying-process/" className="slv-link">
                buying process
              </Link>
              , and explore{" "}
              <Link href="/sunstone/" className="slv-link">
                Sunstone
              </Link>
              ,{" "}
              <Link href="/location/" className="slv-link">
                location
              </Link>
              , and{" "}
              <Link href="/community/" className="slv-link">
                community
              </Link>{" "}
              context.
            </p>
            {telHref ? (
              <p>
                Questions? Call{" "}
                <Link href={telHref} className="slv-link">
                  {contact.telephone}
                </Link>
                .
              </p>
            ) : null}
          </div>
        </section>
      </PageShell>
    </>
  );
}
