import Link from "next/link";

import Card from "@/components/Card";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import BlogMain from "@/components/blog/BlogMain";
import { SITE } from "@/config";
import { getSortedPosts } from "@/lib/blog";
import { excerptForQuery, searchPosts } from "@/lib/blog-search";
import {
  createPageMetadata,
  createStructuredDataScript,
} from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: `Search | ${SITE.title}`,
  description:
    "Search the Sunstone Las Vegas Homes blog — Las Vegas real estate, Sunstone, Trilogy Sunset, and local market topics.",
  canonicalPath: "/search/",
});

type SearchPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const posts = await getSortedPosts();
  const results = query ? searchPosts(posts, query) : [];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: createStructuredDataScript({
            title: `Search | ${SITE.title}`,
            description:
              "Search the Sunstone Las Vegas Homes blog — Las Vegas real estate, Sunstone, Trilogy Sunset, and local market topics.",
            canonicalPath: "/search/",
          }),
        }}
      />
      <Header />
      <BlogMain
        pageTitle="Search"
        pageDesc="Find articles by keyword—titles, descriptions, tags, and full post text are indexed."
        earlyListings={false}
      >
        <form method="get" className="mb-6 flex flex-col gap-2 sm:flex-row">
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="Search posts…"
            className="w-full rounded-md border border-border bg-background px-3 py-2"
            autoComplete="off"
          />
          <button
            type="submit"
            className="rounded-md bg-accent px-4 py-2 font-medium text-background"
          >
            Search
          </button>
        </form>
        {query ? (
          results.length > 0 ? (
            <>
              <p className="mb-4 text-sm text-foreground/80">
                {results.length} result{results.length === 1 ? "" : "s"} for{" "}
                <strong>{query}</strong>
              </p>
              <ul>
                {results.map(post => {
                  const excerpt = excerptForQuery(post, query);
                  return (
                    <li key={post.id} className="mb-4">
                      <Card post={post} />
                      {excerpt ? (
                        <p className="mt-1 text-sm text-foreground/80">{excerpt}</p>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </>
          ) : (
            <p>
              No posts matched <strong>{query}</strong>. Try fewer words or browse{" "}
              <Link href="/posts/" className="text-accent underline">
                all posts
              </Link>
              .
            </p>
          )
        ) : (
          <p>Enter a keyword to search blog posts.</p>
        )}
      </BlogMain>
      <Footer />
    </>
  );
}
