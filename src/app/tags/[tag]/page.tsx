import { notFound } from "next/navigation";
import { Card } from "@/components/Card";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { Main } from "@/components/Main";
import { PageChrome } from "@/components/PageChrome";
import { Pagination } from "@/components/Pagination";
import { SITE } from "@/config";
import { buildPageMetadata, buildStructuredData } from "@/lib/json-ld";
import { paginatePosts, tagPageUrl } from "@/lib/pagination";
import { getAllPosts } from "@/lib/posts";
import getPostsByTag from "@/utils/getPostsByTag";
import getUniqueTags from "@/utils/getUniqueTags";

export const dynamic = "force-static";

type PageProps = {
  params: Promise<{ tag: string }>;
};

export function generateStaticParams() {
  return getUniqueTags(getAllPosts()).map(({ tag }) => ({ tag }));
}

export async function generateMetadata({ params }: PageProps) {
  const { tag } = await params;
  const tagMeta = getUniqueTags(getAllPosts()).find(t => t.tag === tag);
  if (!tagMeta) return {};

  const title = `${tagMeta.tagName} (tag) | ${SITE.title}`;
  const description = `Blog posts tagged “${tagMeta.tagName}” — Dr. Jan Duffy, Sunstone Las Vegas Homes.`;

  return buildPageMetadata({
    title,
    description,
    canonicalPath: `/tags/${tag}/`,
  });
}

export default async function TagPage({ params }: PageProps) {
  const { tag } = await params;
  const tagMeta = getUniqueTags(getAllPosts()).find(t => t.tag === tag);
  if (!tagMeta) notFound();

  const tagPosts = getPostsByTag(getAllPosts(), tag);
  const { posts, currentPage, totalPages, hasPrev, hasNext } = paginatePosts(
    tagPosts,
    1,
  );

  const title = `${tagMeta.tagName} (tag) | ${SITE.title}`;
  const description = `Blog posts tagged “${tagMeta.tagName}” — Dr. Jan Duffy, Sunstone Las Vegas Homes.`;

  return (
    <>
      <JsonLd
        data={buildStructuredData({
          title,
          description,
          canonicalPath: `/tags/${tag}/`,
        })}
      />
      <Header />
      <Main
        pageTitle={["Tag:", tagMeta.tagName]}
        titleTransition={tag}
        pageDesc={`Posts with the “${tagMeta.tagName}” tag. For listings and tours, start from the home search.`}
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
        prevUrl={hasPrev ? tagPageUrl(tag, currentPage - 1) : undefined}
        nextUrl={hasNext ? tagPageUrl(tag, currentPage + 1) : undefined}
      />
      <PageChrome footerNoMarginTop={totalPages > 1} omitListingsFooter />
    </>
  );
}
