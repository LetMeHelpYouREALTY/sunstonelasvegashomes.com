import Link from "next/link";

import PageShell from "@/components/PageShell";
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
      <PageShell className="mx-auto max-w-3xl px-4" showMobileHomeBuyerBar={false}>
        <h1 className="text-2xl font-semibold">National market news</h1>
        <p className="mt-2 text-foreground/90">
          Headlines from the Simplifying the Market RSS feed (Keeping Current Matters).
        </p>
        <RealScoutListingSection tightTop />
        <aside className="my-6 rounded-lg border border-border bg-muted/30 p-4 text-sm">
          Third-party content for education only—pair with local Las Vegas guidance from{" "}
          <Link href="/about/" className="text-accent underline">
            Dr. Jan Duffy
          </Link>
          .
        </aside>
        {items.length === 0 ? (
          <p>Feed temporarily unavailable. Try again later.</p>
        ) : (
          <ul className="space-y-6">
            {items.map(item => (
              <li key={item.link}>
                <article>
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
                  <time className="text-sm text-foreground/70">
                    {item.pubDate ? formatDate(item.pubDate.toISOString()) : null}
                  </time>
                  <h2 className="text-lg font-semibold">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
                    >
                      {item.title}
                    </a>
                  </h2>
                  {item.excerpt ? (
                    <p className="mt-1 text-sm text-foreground/85">{item.excerpt}</p>
                  ) : null}
                </article>
              </li>
            ))}
          </ul>
        )}
      </PageShell>
    </>
  );
}
