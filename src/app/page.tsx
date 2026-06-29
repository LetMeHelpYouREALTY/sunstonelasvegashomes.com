import Link from "next/link";

import Card from "@/components/Card";
import Hr from "@/components/Hr";
import HomeTimeOfDay from "@/components/home/HomeTimeOfDay";
import KcmNationalFeedSection from "@/components/home/KcmNationalFeedSection";
import MarketingHero from "@/components/marketing/MarketingHero";
import MarketingPage from "@/components/marketing/MarketingPage";
import RealScoutListingSection from "@/components/home/RealScoutListingSection";
import { SITE } from "@/config";
import { getSortedPosts } from "@/lib/blog";
import { getKcmFeedItems } from "@/lib/kcm-feed";
import {
  createPageMetadata,
  createStructuredDataScript,
} from "@/lib/page-metadata";
import { getSiteContact } from "@/lib/site-contact";
import { getPublicEnv } from "@/lib/env";

export const metadata = createPageMetadata({
  title: `${SITE.title} | Sunstone & Trilogy Sunset, Las Vegas`,
  description: SITE.desc,
  canonicalPath: "/",
});

export default async function HomePage() {
  const contact = getSiteContact();
  const telHref = contact.telephone
    ? `tel:${contact.telephone.replace(/\D/g, "")}`
    : "";

  const sortedPosts = await getSortedPosts();
  const featuredPosts = sortedPosts.filter(post => post.data.featured);
  const kcmHomeItems = await getKcmFeedItems(SITE.postPerIndex);

  const facebook = getPublicEnv("SOCIAL_FACEBOOK");
  const linkedin = getPublicEnv("SOCIAL_LINKEDIN");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: createStructuredDataScript({
            title: `${SITE.title} | Sunstone & Trilogy Sunset, Las Vegas`,
            description: SITE.desc,
            canonicalPath: "/",
          }),
        }}
      />

      <MarketingPage
        omitListingsFooter
        showMobileHomeBuyerBar
        mobileHomeBuyerBarTelHref={telHref || undefined}
      >
        <MarketingHero
          title="Find your Sunstone or Trilogy Sunset home"
          headingId="home-hero-heading"
          eyebrow={<HomeTimeOfDay />}
          lede="Buyer-focused MLS search, neighborhood context, and a clear path from first tour to keys—with Dr. Jan Duffy, Berkshire Hathaway HomeServices Nevada Properties."
          tagline="Search listings on your schedule, ask questions when you are ready, and move at a pace that fits your life."
          trust={`Nevada license ${contact.licenseNumber} · ${contact.brokerageName}`}
        >
          <Link href="/#browse-listings" className="slv-cta slv-cta--primary">
            Search MLS listings
          </Link>
          <Link href="/buyers/" className="slv-cta slv-cta--secondary">
            Home buyer guide
          </Link>
          <Link href="/faq/" className="slv-cta slv-cta--secondary">
            FAQ
          </Link>
          <Link href="/contact/" className="slv-cta slv-cta--secondary">
            Contact
          </Link>
          {telHref ? (
            <Link href={telHref} className="slv-cta slv-cta--ghost">
              Call {contact.telephone}
            </Link>
          ) : null}
        </MarketingHero>

        <RealScoutListingSection tightTop />

        <section className="start-here" aria-labelledby="start-here-heading">
          <h2 id="start-here-heading" className="slv-section-title">
            What do you want to do next?
          </h2>
          <p className="slv-section-sub">
            Pick a path—search homes first, explore the Sunstone masterplan, or
            get answers before you tour.
          </p>
          <div className="slv-card-grid">
            {[
              {
                title: "Search & tour homes",
                text: "Live MLS listings and AI-assisted search—filter by price and property type, then reach out for tours.",
                href: "/#browse-listings",
                label: "Open home search",
                emphasis: true,
              },
              {
                title: "Sunstone masterplan guide",
                text: "Northwest Las Vegas context, builder collections, and resale vs new—without leaving this site.",
                href: "/sunstone/",
                label: "Read the Sunstone guide",
                emphasis: true,
              },
              {
                title: "Plan your purchase",
                text: "Step-by-step buyer path, neighborhood context, and market reading in one place.",
                href: "/buyers/",
                label: "Home buyer guide",
              },
              {
                title: "Quick answers",
                text: "Service area, brokerage, MLS search, and how to contact Dr. Jan Duffy.",
                href: "/faq/",
                label: "Read the FAQ",
              },
              {
                title: "Get in touch",
                text: "Phone, directions, reviews, and next steps—aligned with Google Business Profile.",
                href: "/contact/",
                label: "Contact",
              },
              {
                title: "Selling a home",
                text: "Pricing, prep, MLS exposure, and what to expect from list to close.",
                href: "/sellers/",
                label: "Seller overview",
              },
            ].map(card => (
              <article
                key={card.title}
                className={
                  card.emphasis
                    ? "start-card start-card--emphasis"
                    : "start-card"
                }
              >
                <h3 className="start-card-title">{card.title}</h3>
                <p className="start-card-text">{card.text}</p>
                <Link href={card.href} className="start-card-link">
                  {card.label}
                </Link>
              </article>
            ))}
          </div>
        </section>

        {featuredPosts.length > 0 ? (
          <>
            <section id="featured" className="pt-10 pb-6">
              <h2 className="text-2xl font-semibold tracking-wide">Featured</h2>
              <ul>
                {featuredPosts.map(post => (
                  <Card key={post.id} post={post} variant="h3" />
                ))}
              </ul>
            </section>
            {kcmHomeItems.length > 0 ? <Hr /> : null}
          </>
        ) : null}

        {kcmHomeItems.length > 0 ? (
          <div className="pt-8 pb-6">
            <KcmNationalFeedSection
              items={kcmHomeItems}
              heading="National market headlines"
              intro="Headlines from the Simplifying the Market RSS feed (Keeping Current Matters). Articles open in a new tab—third-party content for education only; pair with local Las Vegas guidance from Dr. Jan Duffy."
              headingId="home-kcm-heading"
              sectionId="home-market-headlines"
              showDates
            />
          </div>
        ) : null}

        <div className="my-6 text-center">
          <Link href="/posts/" className="text-accent underline-offset-2 hover:underline">
            All posts →
          </Link>
        </div>

        <section id="intro" className="blog-follow-cta pt-8 pb-6">
          <h2 className="text-xl font-semibold tracking-wide">Blog &amp; updates</h2>
          <p className="mt-2 max-w-xl text-foreground/90">
            Market notes and how-tos for Sunstone, Trilogy Sunset, and Las Vegas
            real estate—subscribe or connect for more.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <a
              href="/rss.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-accent"
            >
              RSS Feed
            </a>
            {(facebook || linkedin) && (
              <div className="flex flex-col gap-2 text-sm text-foreground/80 sm:flex-row sm:items-center">
                <span>Connect:</span>
                <div className="flex gap-3">
                  {facebook ? (
                    <a href={facebook} target="_blank" rel="noopener noreferrer" className="text-accent">
                      Facebook
                    </a>
                  ) : null}
                  {linkedin ? (
                    <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-accent">
                      LinkedIn
                    </a>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        </section>
      </MarketingPage>
    </>
  );
}
