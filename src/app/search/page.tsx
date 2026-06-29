import Card from "@/components/Card";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import BlogMain from "@/components/blog/BlogMain";
import { SITE } from "@/config";
import { getSortedPosts } from "@/lib/blog";
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
  const query = q.trim().toLowerCase();
  const posts = await getSortedPosts();
  const results = query
    ? posts.filter(post => {
        const haystack = [
          post.data.title,
          post.data.description,
          post.data.tags.join(" "),
        ]
          .join(" ")
          .toLowerCase();
        return haystack.includes(query);
      })
    : [];

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
        pageDesc="Find articles by keyword—Sunstone, Trilogy Sunset, Las Vegas market notes, and buyer resources."
        earlyListings={false}
      >
        <form method="get" className="mb-6 flex gap-2">
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="Search posts…"
            className="w-full rounded-md border border-border bg-background px-3 py-2"
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
            <ul>
              {results.map(post => (
                <Card key={post.id} post={post} />
              ))}
            </ul>
          ) : (
            <p>No posts matched your search.</p>
          )
        ) : (
          <p>Enter a keyword to search blog posts.</p>
        )}
      </BlogMain>
      <Footer />
    </>
  );
}
