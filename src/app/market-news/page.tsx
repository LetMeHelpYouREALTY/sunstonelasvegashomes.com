import Link from "next/link";

import PageShell from "@/components/PageShell";
import MarketingHero from "@/components/marketing/MarketingHero";
import RealScoutListingSection from "@/components/home/RealScoutListingSection";
import { getKcmFeedItems } from "@/lib/kcm-feed";
import { SITE } from "@/config";
import {
  createPageMetadata,
  createStructuredDataScript,
} from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: `National market news (Simplifying the Market) | ${SITE.title}`,
  description:
    "Curated national housing headlines from Simplifying the Market (English feed)—read full articles on their site. Local Las Vegas guidance: Dr. Jan Duffy.",
  canonicalPath: "/market-news/",
});

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function MarketNewsPage() {
  const items = await getKcmFeedItems(30);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: createStructuredDataScript({
            title: `National market news | ${SITE.title}`,
            description:
              "Curated national housing headlines from Simplifying the Market.",
            canonicalPath: "/market-news/",
          }),
        }}
      />
      <PageShell showMobileHomeBuyerBar={false}>
        <MarketingHero
          title="National market news"
          headingId="market-news-h1"
          lede="Headlines from the Simplifying the Market RSS feed (Keeping Current Matters)."
        />
        <RealScoutListingSection tightTop />
        <section className="slv-panel slv-panel--narrow slv-panel--stack">
          <aside className="slv-attribution">
            <p>
              Third-party content for education only—pair with local Las Vegas guidance from{" "}
              <Link href="/about/" className="slv-link">
                Dr. Jan Duffy
              </Link>
              .
            </p>
          </aside>
          {items.length === 0 ? (
            <p className="slv-prose m-0">Feed temporarily unavailable. Try again later.</p>
          ) : (
            <ul className="m-0 list-none space-y-6 p-0">
              {items.map(item => (
                <li key={item.link}>
                  <article className="slv-card">
                    {item.image ? (
                      <a href={item.link} target="_blank" rel="noopener noreferrer">
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          className="mb-3 aspect-[2/1] w-full rounded-lg object-cover"
                        />
                      </a>
                    ) : null}
                    <time className="slv-meta block">
                      {item.pubDate ? formatDate(item.pubDate.toISOString()) : null}
                    </time>
                    <h2 className="slv-card__title mt-1">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="slv-link"
                      >
                        {item.title}
                      </a>
                    </h2>
                    {item.excerpt ? (
                      <p className="slv-card__text">{item.excerpt}</p>
                    ) : null}
                  </article>
                </li>
              ))}
            </ul>
          )}
        </section>
      </PageShell>
    </>
  );
}
