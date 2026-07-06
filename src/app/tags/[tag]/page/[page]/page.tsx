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
  params: Promise<{ tag: string; page: string }>;
};

export function generateStaticParams() {
  const allPosts = getAllPosts();
  const tags = getUniqueTags(allPosts);

  return tags.flatMap(({ tag }) => {
    const tagPosts = getPostsByTag(allPosts, tag);
    const totalPages = Math.ceil(tagPosts.length / SITE.postPerPage);
    return Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => ({
      tag,
      page: String(i + 2),
    }));
  });
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

export default async function TagPaginatedPage({ params }: PageProps) {
  const { tag, page: pageParam } = await params;
  const page = Number(pageParam);

  if (!Number.isInteger(page) || page < 2) {
    notFound();
  }

  const tagMeta = getUniqueTags(getAllPosts()).find(t => t.tag === tag);
  if (!tagMeta) notFound();

  const tagPosts = getPostsByTag(getAllPosts(), tag);
  const { posts, currentPage, totalPages, hasPrev, hasNext } = paginatePosts(
    tagPosts,
    page,
  );

  if (currentPage !== page) {
    notFound();
  }

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
