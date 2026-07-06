import Link from "next/link";
import { Header } from "@/components/Header";
import { Hr } from "@/components/Hr";
import { LinkButton } from "@/components/LinkButton";
import { Card } from "@/components/Card";
import { Socials } from "@/components/Socials";
import { PageChrome } from "@/components/PageChrome";
import { MobileHomeBuyerBar } from "@/components/MobileHomeBuyerBar";
import { RealScoutListingSection } from "@/components/home/RealScoutListingSection";
import { KcmNationalFeedSection } from "@/components/home/KcmNationalFeedSection";
import { HomeTimeGreeting } from "@/components/home/HomeTimeGreeting";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/config";
import { getKcmFeedItems } from "@/lib/kcm-feed";
import { buildPageMetadata, buildStructuredData } from "@/lib/json-ld";
import { getSocialLinks } from "@/lib/social-links";
import { getSiteContact } from "@/lib/site-contact";
import { getAllPosts } from "@/lib/posts";
import IconRss from "@/assets/icons/IconRss.svg";
import IconArrowRight from "@/assets/icons/IconArrowRight.svg";

export const dynamic = "force-static";

const pageTitle = `${SITE.title} | Sunstone & Trilogy Sunset, Las Vegas`;

export const metadata = buildPageMetadata({
  title: pageTitle,
  description: SITE.desc,
  canonicalPath: "/",
});

const startCards = [
  {
    title: "Search & tour homes",
    text: "Live MLS listings and AI-assisted search—filter by price and property type, then reach out for tours.",
    href: "/#browse-listings",
    link: "Open home search",
    emphasis: true,
  },
  {
    title: "Sunstone masterplan guide",
    text: "Northwest Las Vegas context, builder collections, and resale vs new—without leaving this site.",
    href: "/sunstone/",
    link: "Read the Sunstone guide",
    emphasis: true,
  },
  {
    title: "Plan your purchase",
    text: "Step-by-step buyer path, neighborhood context, and market reading in one place.",
    href: "/buyers/",
    link: "Home buyer guide",
    emphasis: false,
  },
  {
    title: "Quick answers",
    text: "Service area, brokerage, MLS search, and how to contact Dr. Jan Duffy.",
    href: "/faq/",
    link: "Read the FAQ",
    emphasis: false,
  },
  {
    title: "Get in touch",
    text: "Phone, directions, reviews, and next steps—aligned with Google Business Profile.",
    href: "/contact/",
    link: "Contact",
    emphasis: false,
  },
  {
    title: "Selling a home",
    text: "Pricing, prep, MLS exposure, and what to expect from list to close.",
    href: "/sellers/",
    link: "Seller overview",
    emphasis: false,
  },
] as const;

export default async function HomePage() {
  const contact = getSiteContact();
  const telHref = contact.telephone
    ? `tel:${contact.telephone.replace(/\D/g, "")}`
    : "";
  const posts = getAllPosts();
  const featuredPosts = posts.filter(p => p.data.featured);
  const kcmHomeItems = await getKcmFeedItems(SITE.postPerIndex);
  const socialLinks = getSocialLinks();

  return (
    <>
      <JsonLd
        data={buildStructuredData({
          title: pageTitle,
          description: SITE.desc,
          canonicalPath: "/",
        })}
      />
      <Header />
      <main
        id="main-content"
        data-layout="index"
        className="marketing-surface pb-[calc(5rem+env(safe-area-inset-bottom,0px))] md:pb-0"
      >
        <section
          className="hero slv-marketing-hero flex min-h-80 flex-col justify-center px-8 py-16 text-center md:px-8"
          aria-labelledby="home-hero-heading"
        >
          <HomeTimeGreeting />
          <h1
            id="home-hero-heading"
            className="text-balance leading-tight tracking-tight"
          >
            Find your Sunstone or Trilogy Sunset home
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-[1.05rem] leading-relaxed opacity-95">
            Buyer-focused MLS search, neighborhood context, and a clear path from
            first tour to keys—with Dr. Jan Duffy, Berkshire Hathaway HomeServices
            Nevada Properties.
          </p>
          <p className="mx-auto mt-4 max-w-[34rem] text-[1.02rem] opacity-90">
            Search listings on your schedule, ask questions when you are ready, and
            move at a pace that fits your life.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/#browse-listings"
              className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-2.5 text-base font-semibold text-[#0a2540] no-underline shadow-md transition hover:-translate-y-px"
            >
              Search MLS listings
            </Link>
            <Link
              href="/buyers/"
              className="inline-flex items-center justify-center rounded-lg border-2 border-white/90 px-5 py-2.5 text-base font-semibold text-white no-underline hover:bg-white/10"
            >
              Home buyer guide
            </Link>
            <Link
              href="/faq/"
              className="inline-flex items-center justify-center rounded-lg border-2 border-white/90 px-5 py-2.5 text-base font-semibold text-white no-underline hover:bg-white/10"
            >
              FAQ
            </Link>
            <Link
              href="/contact/"
              className="inline-flex items-center justify-center rounded-lg border-2 border-white/90 px-5 py-2.5 text-base font-semibold text-white no-underline hover:bg-white/10"
            >
              Contact
            </Link>
            {contact.telephone && (
              <a
                href={telHref}
                className="px-2 py-2.5 text-base font-semibold text-white/95 underline underline-offset-[3px]"
              >
                Call {contact.telephone}
              </a>
            )}
          </div>
          <p className="mx-auto mt-5 max-w-xl text-center text-xs leading-snug text-white/90">
            Nevada license {contact.licenseNumber} · {contact.brokerageName}
          </p>
        </section>

        <RealScoutListingSection tightTop />

        <section
          className="mx-auto mt-8 mb-4 max-w-[1200px] rounded-2xl px-1 pt-6"
          aria-labelledby="start-here-heading"
        >
          <h2
            id="start-here-heading"
            className="mb-2 text-center text-[1.35rem] font-semibold text-[#0a2540]"
          >
            What do you want to do next?
          </h2>
          <p className="mx-auto mb-5 max-w-xl text-center text-[0.98rem] leading-normal text-[#0a2540] opacity-90">
            Pick a path—search homes first, explore the Sunstone masterplan, or get
            answers before you tour.
          </p>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5">
            {startCards.map(card => (
              <article
                key={card.title}
                className={`rounded-2xl border bg-white p-5 text-[#0a2540] shadow-[0_2px_8px_rgba(0,0,0,0.08)] ${
                  card.emphasis
                    ? "border-[rgba(58,141,222,0.35)] shadow-[0_2px_8px_rgba(0,0,0,0.08),0_0_0_1px_rgba(58,141,222,0.12)]"
                    : "border-[rgba(10,37,64,0.06)]"
                }`}
              >
                <h3 className="mb-2 text-[1.05rem] font-semibold">{card.title}</h3>
                <p className="m-0 text-sm leading-normal opacity-90">{card.text}</p>
                <Link
                  href={card.href}
                  className="mt-3 inline-block font-semibold text-[#3a8dde] no-underline hover:underline"
                >
                  {card.link}
                </Link>
              </article>
            ))}
          </div>
        </section>

        {featuredPosts.length > 0 && (
          <>
            <section id="featured" className="py-10 pb-6">
              <h2 className="text-2xl font-semibold tracking-wide">Featured</h2>
              <ul>
                {featuredPosts.map(post => (
                  <Card key={post.id} {...post} variant="h3" />
                ))}
              </ul>
            </section>
            {kcmHomeItems.length > 0 && <Hr />}
          </>
        )}

        {kcmHomeItems.length > 0 && (
          <div className="py-8 pb-6">
            <KcmNationalFeedSection
              items={kcmHomeItems}
              heading="National market headlines"
              intro="Headlines from the Simplifying the Market RSS feed (Keeping Current Matters). Articles open in a new tab—third-party content for education only; pair with local Las Vegas guidance from Dr. Jan Duffy."
              headingId="home-kcm-heading"
              sectionId="home-market-headlines"
              showDates
            />
          </div>
        )}

        <div className="my-6 text-center">
          <LinkButton href="/posts/">
            All posts
            <IconArrowRight className="inline-block" />
          </LinkButton>
        </div>

        <section
          id="intro"
          className="mx-auto max-w-2xl px-2 py-8 pb-6"
        >
          <h2 className="text-xl font-semibold tracking-wide">Blog &amp; updates</h2>
          <p className="mt-2 max-w-xl text-foreground/90">
            Market notes and how-tos for Sunstone, Trilogy Sunset, and Las Vegas real
            estate—subscribe or connect for more.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="/rss.xml"
              className="inline-flex items-center gap-2 font-semibold text-accent"
              aria-label="RSS feed"
              title="RSS Feed"
            >
              <IconRss width={20} height={20} className="scale-125 stroke-accent stroke-3" />
              RSS Feed
            </a>
            {socialLinks.length > 0 && (
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <span className="text-sm text-foreground/80">Connect:</span>
                <Socials />
              </div>
            )}
          </div>
        </section>

        <MobileHomeBuyerBar telHref={telHref || undefined} />
      </main>
      <PageChrome omitListingsFooter />
    </>
  );
}
