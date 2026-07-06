import { Card } from "@/components/Card";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { Main } from "@/components/Main";
import { PageChrome } from "@/components/PageChrome";
import { Pagination } from "@/components/Pagination";
import { SITE } from "@/config";
import { buildPageMetadata, buildStructuredData } from "@/lib/json-ld";
import { paginatePosts, postsPageUrl } from "@/lib/pagination";
import { getAllPosts } from "@/lib/posts";

export const dynamic = "force-static";

const title = `Posts | ${SITE.title}`;
const description =
  "Market notes, buyer tips, and updates from Dr. Jan Duffy — Sunstone, Trilogy Sunset, and Las Vegas real estate.";

export const metadata = buildPageMetadata({
  title,
  description,
  canonicalPath: "/posts/",
});

export default function PostsPage() {
  const allPosts = getAllPosts();
  const { posts, currentPage, totalPages, hasPrev, hasNext } = paginatePosts(
    allPosts,
    1,
  );

  return (
    <>
      <JsonLd
        data={buildStructuredData({
          title,
          description,
          canonicalPath: "/posts/",
        })}
      />
      <Header />
      <Main
        pageTitle="Posts"
        pageDesc="Articles on Las Vegas real estate, Sunstone and Trilogy Sunset, and how to search and buy with confidence."
      >
        <ul>
          {posts.map(post => (
            <Card key={post.id} {...post} />
          ))}
        </ul>
      </Main>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        prevUrl={hasPrev ? postsPageUrl(currentPage - 1) : undefined}
        nextUrl={hasNext ? postsPageUrl(currentPage + 1) : undefined}
      />
      <PageChrome footerNoMarginTop={totalPages > 1} omitListingsFooter />
    </>
  );
}
