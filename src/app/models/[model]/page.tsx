import Link from "next/link";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { MobileHomeBuyerBar } from "@/components/MobileHomeBuyerBar";
import { PageChrome } from "@/components/PageChrome";
import { RealScoutListingSection } from "@/components/home/RealScoutListingSection";
import { buildPageMetadata, buildStructuredData } from "@/lib/json-ld";
import { uniquePageTitle } from "@/lib/seo-helpers";
import { getSiteContact } from "@/lib/site-contact";

export const dynamic = "force-static";

const MODELS = ["sunstone", "trilogy-sunset"] as const;

const labels: Record<string, string> = {
  sunstone: "Sunstone",
  "trilogy-sunset": "Trilogy Sunset",
};

const modelIntro: Record<string, string> = {
  sunstone:
    "Sunstone model homes showcase layouts and finishes you can expect in this northwest Las Vegas masterplan. Use models to compare flow, storage, and indoor–outdoor living before you tour active listings that match your budget. See the Sunstone guide for collection context.",
  "trilogy-sunset":
    "Trilogy Sunset model homes highlight how this community packages floor plans and amenities for active-adult living in Las Vegas. Walking the models helps you decide what matters—single-level living, guest space, and how the home supports your daily routine.",
};

type PageProps = {
  params: Promise<{ model: string }>;
};

export function generateStaticParams() {
  return MODELS.map(model => ({ model }));
}

export async function generateMetadata({ params }: PageProps) {
  const { model } = await params;
  const label = labels[model] ?? model;
  const pageTitle = uniquePageTitle(`${label} model homes`);
  const pageDesc = `Explore ${label} floor plans, finishes, and tours with Dr. Jan Duffy — Berkshire Hathaway HomeServices Nevada Properties.`;

  return buildPageMetadata({
    title: pageTitle,
    description: pageDesc,
    canonicalPath: `/models/${model}/`,
  });
}

export default async function ModelPage({ params }: PageProps) {
  const { model } = await params;
  const label = labels[model] ?? model;
  const intro = modelIntro[model] ?? modelIntro.sunstone;
  const contact = getSiteContact();
  const telHref = contact.telephone
    ? `tel:${contact.telephone.replace(/\D/g, "")}`
    : "";

  const pageTitle = uniquePageTitle(`${label} model homes`);
  const pageDesc = `Explore ${label} floor plans, finishes, and tours with Dr. Jan Duffy — Berkshire Hathaway HomeServices Nevada Properties.`;

  return (
    <>
      <JsonLd
        data={buildStructuredData({
          title: pageTitle,
          description: pageDesc,
          canonicalPath: `/models/${model}/`,
        })}
      />
      <Header />
      <main
        id="main-content"
        className="marketing-surface min-h-[50vh] pb-[calc(5rem+env(safe-area-inset-bottom,0px))] md:pb-0"
      >
        <section className="slv-marketing-hero flex min-h-[220px] flex-col justify-center px-8 py-12 text-center text-white">
          <h1 className="text-3xl font-bold">{label} model portfolio</h1>
          <p className="mt-2 text-white/90">Floor plans, finishes, and tour-ready highlights</p>
        </section>

        <RealScoutListingSection tightTop />

        <section className="mx-auto my-8 max-w-[900px] rounded-2xl bg-white p-8 shadow-[var(--box-shadow)]">
          <div className="text-[1.05rem] leading-relaxed text-[var(--primary)]">
            <p>{intro}</p>
            <p className="mt-4">
              Start with the{" "}
              <a href="#browse-listings" className="text-[var(--accent-buyer)] underline underline-offset-2">
                MLS home search
              </a>{" "}
              on this site to see current inventory, then ask Dr. Jan Duffy to align model visits
              with real listings. For financing and contingencies, review the{" "}
              <Link href="/buying-process/" className="text-[var(--accent-buyer)] underline underline-offset-2">
                buying process
              </Link>{" "}
              page. Context on the area is on{" "}
              <Link href="/sunstone/" className="text-[var(--accent-buyer)] underline underline-offset-2">
                Sunstone guide
              </Link>
              ,{" "}
              <Link href="/location/" className="text-[var(--accent-buyer)] underline underline-offset-2">
                location
              </Link>
              , and{" "}
              <Link href="/community/" className="text-[var(--accent-buyer)] underline underline-offset-2">
                community
              </Link>
              .
            </p>
            <p className="mt-4">
              {telHref ? (
                <span>
                  Prefer to talk first? Call{" "}
                  <a href={telHref} className="text-[var(--accent-buyer)] underline underline-offset-2">
                    {contact.telephone}
                  </a>{" "}
                  or use the mobile bar below.
                </span>
              ) : (
                <span>Use the mobile bar below to search or get connected.</span>
              )}
            </p>
          </div>
        </section>
        <MobileHomeBuyerBar telHref={telHref || undefined} />
      </main>
      <PageChrome omitListingsFooter />
    </>
  );
}
