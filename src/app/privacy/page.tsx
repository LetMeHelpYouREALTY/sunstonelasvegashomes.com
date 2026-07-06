import Link from "next/link";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { MobileHomeBuyerBar } from "@/components/MobileHomeBuyerBar";
import { PageChrome } from "@/components/PageChrome";
import { RealScoutListingSection } from "@/components/home/RealScoutListingSection";
import { buildPageMetadata, buildStructuredData } from "@/lib/json-ld";
import { getSiteContact } from "@/lib/site-contact";
import { uniquePageTitle } from "@/lib/seo-helpers";

export const dynamic = "force-static";

const pageTitle = uniquePageTitle("Privacy");
const pageDesc =
  "How Sunstone Las Vegas Homes handles theme preferences, MLS search tools, and contact. Dr. Jan Duffy, Berkshire Hathaway HomeServices Nevada Properties.";
const canonicalPath = "/privacy/";

export const metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDesc,
  canonicalPath,
});

export default function PrivacyPage() {
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
          canonicalPath,
        })}
      />
      <Header />
      <main
        id="main-content"
        className="mx-auto max-w-3xl px-4 pb-[calc(5rem+env(safe-area-inset-bottom,0px))] pt-8 md:pb-0"
      >
        <h1 className="mb-3 text-[clamp(1.5rem,4vw,1.85rem)] font-bold text-[#0a2540]">
          Privacy
        </h1>
        <p className="mb-6 text-base leading-relaxed text-foreground/90">
          This site is operated by {contact.agentName} ({contact.brokerageName},
          Nevada license {contact.licenseNumber}). The summary below describes
          common browser behavior on this site—not legal advice.
        </p>

        <RealScoutListingSection tightTop />

        <section className="mb-6" aria-labelledby="privacy-local">
          <h2 id="privacy-local" className="mb-2 text-[1.1rem] font-semibold text-[#0a2540]">
            Local storage &amp; theme
          </h2>
          <p className="mb-3 text-[0.98rem] leading-relaxed">
            Your browser may store a <strong>theme</strong> preference (light or
            dark) in <code className="text-[0.9em]">localStorage</code> so the layout stays consistent when
            you return. We do not use that value to identify you across sites.
          </p>
        </section>

        <section className="mb-6" aria-labelledby="privacy-third">
          <h2 id="privacy-third" className="mb-2 text-[1.1rem] font-semibold text-[#0a2540]">
            MLS search &amp; listings
          </h2>
          <p className="mb-3 text-[0.98rem] leading-relaxed">
            Property search and listings on this site may load through third-party
            tools (for example RealScout). Those providers have their own
            terms and privacy practices. Use the search tools only if you accept
            their normal operation in your browser.
          </p>
        </section>

        <section className="mb-6" aria-labelledby="privacy-contact">
          <h2 id="privacy-contact" className="mb-2 text-[1.1rem] font-semibold text-[#0a2540]">
            Contacting us
          </h2>
          <p className="mb-3 text-[0.98rem] leading-relaxed">
            If you call, email, or message us, we use that information to respond
            to your real estate questions and to follow up as you request. We do
            not sell your contact information.
          </p>
          <p className="text-[0.98rem] leading-relaxed">
            <Link href="/contact/" className="font-semibold text-[#3a8dde] underline underline-offset-2">
              Contact page
            </Link>
            {telHref ? (
              <>
                {" · "}
                <a href={telHref} className="font-semibold text-[#3a8dde] underline underline-offset-2">
                  {contact.telephone}
                </a>
              </>
            ) : null}
          </p>
        </section>

        <section className="mb-6" aria-labelledby="privacy-updates">
          <h2 id="privacy-updates" className="mb-2 text-[1.1rem] font-semibold text-[#0a2540]">
            Updates
          </h2>
          <p className="text-[0.98rem] leading-relaxed">
            We may update this page when the site&apos;s features change. The last
            substantive review is noted in the site repository; for questions,
            reach out via the contact page.
          </p>
        </section>

        <MobileHomeBuyerBar telHref={telHref || undefined} />
      </main>
      <PageChrome omitListingsFooter />
    </>
  );
}
