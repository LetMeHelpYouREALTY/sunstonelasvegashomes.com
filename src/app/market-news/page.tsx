import Link from "next/link";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { PageChrome } from "@/components/PageChrome";
import { RealScoutListingSection } from "@/components/home/RealScoutListingSection";
import { SITE } from "@/config";
import { getKcmFeedItems } from "@/lib/kcm-feed";
import { buildPageMetadata, buildStructuredData } from "@/lib/json-ld";

export const dynamic = "force-static";

const pageTitle = `National market news (Simplifying the Market) | ${SITE.title}`;
const pageDesc =
  "Curated national housing headlines from Simplifying the Market (English feed)—read full articles on their site. Local Las Vegas guidance: Dr. Jan Duffy.";
const canonicalPath = "/market-news/";

function formatDate(d: Date | null): string {
  if (!d) return "";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export const metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDesc,
  canonicalPath,
});

export default async function MarketNewsPage() {
  const items = await getKcmFeedItems(30);

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
      <main id="main-content" className="mx-auto max-w-3xl px-4 pt-8 pb-16">
        <h1 className="mb-2 text-3xl font-bold text-foreground">
          National market news
        </h1>
        <p className="mb-6 text-foreground/85">
          Headlines from the Simplifying the Market RSS feed (Keeping Current
          Matters). Click through to read the full article on their site—not
          affiliated content; shared for education only.
        </p>

        <RealScoutListingSection tightTop />

        <aside
          className="mb-10 rounded-lg border border-foreground/15 bg-foreground/5 p-4 text-sm text-foreground/90"
          aria-label="Attribution"
        >
          <p className="m-0 font-medium">Third-party content</p>
          <p className="mt-2 mb-0">
            Articles © Simplifying the Market / Keeping Current Matters. Dr. Jan
            Duffy and {SITE.title} do not control or endorse third-party pages.
            For local Las Vegas and Henderson strategy,{" "}
            <Link className="text-accent underline-offset-2 hover:underline" href="/about/">
              contact Dr. Jan Duffy
            </Link>
            .
          </p>
        </aside>

        {items.length === 0 ? (
          <p className="text-foreground/80">
            Market headlines are temporarily unavailable. Please try again later.
          </p>
        ) : (
          <ul className="flex list-none flex-col gap-8 p-0">
            {items.map(item => (
              <li key={item.link}>
                <article className="overflow-hidden rounded-xl border border-foreground/10 bg-background shadow-sm">
                  {item.image ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block aspect-[2/1] w-full overflow-hidden bg-foreground/5"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                        width={800}
                        height={400}
                      />
                    </a>
                  ) : null}
                  <div className="p-4 sm:p-5">
                    {item.pubDate ? (
                      <time
                        className="text-sm text-foreground/70"
                        dateTime={item.pubDate.toISOString()}
                      >
                        {formatDate(item.pubDate)}
                      </time>
                    ) : null}
                    <h2 className="mt-1 text-xl leading-snug font-semibold text-foreground">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-accent"
                      >
                        {item.title}
                      </a>
                    </h2>
                    {item.excerpt ? (
                      <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                        {item.excerpt}
                      </p>
                    ) : null}
                    <p className="mt-3 mb-0">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex font-medium text-accent underline-offset-2 hover:underline"
                      >
                        Read at Simplifying the Market (opens in new tab)
                      </a>
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </main>
      <PageChrome omitListingsFooter />
    </>
  );
}
