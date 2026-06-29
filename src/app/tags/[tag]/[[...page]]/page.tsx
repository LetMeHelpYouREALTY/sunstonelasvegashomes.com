import { notFound } from "next/navigation";

import Card from "@/components/Card";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import BlogMain from "@/components/blog/BlogMain";
import Pagination from "@/components/blog/Pagination";
import { SITE } from "@/config";
import { getAllPosts } from "@/lib/blog";
import { getPostsByTag, getUniqueTags } from "@/lib/blog-tags";
import {
  createPageMetadata,
  createStructuredDataScript,
} from "@/lib/page-metadata";
import { paginate, tagPageUrl } from "@/lib/pagination";

type TagPostsPageProps = {
  params: Promise<{ tag: string; page?: string[] }>;
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  const tags = getUniqueTags(posts);
  const params: { tag: string; page?: string[] }[] = [];

  for (const { tag } of tags) {
    const tagPosts = getPostsByTag(posts, tag);
    const lastPage = Math.max(1, Math.ceil(tagPosts.length / SITE.postPerPage));
    params.push({ tag });

    for (let page = 2; page <= lastPage; page += 1) {
      params.push({ tag, page: [String(page)] });
    }
  }

  return params;
}

export async function generateMetadata({ params }: TagPostsPageProps) {
  const { tag, page: pageSegments } = await params;
  const pageNumber =
    pageSegments?.[0] && /^\d+$/.test(pageSegments[0])
      ? Number(pageSegments[0])
      : 1;
  const tags = getUniqueTags(await getAllPosts());
  const tagName = tags.find(entry => entry.tag === tag)?.tagName ?? tag;

  return createPageMetadata({
    title: `${tagName} (tag) | ${SITE.title}`,
    description: `Blog posts tagged “${tagName}” — Dr. Jan Duffy, Sunstone Las Vegas Homes.`,
    canonicalPath: tagPageUrl(tag, pageNumber),
  });
}

export default async function TagPostsPage({ params }: TagPostsPageProps) {
  const { tag, page: pageSegments } = await params;
  const pageNumber =
    pageSegments?.[0] && /^\d+$/.test(pageSegments[0])
      ? Number(pageSegments[0])
      : 1;

  const posts = await getAllPosts();
  const tags = getUniqueTags(posts);
  const tagMeta = tags.find(entry => entry.tag === tag);

  if (!tagMeta) {
    notFound();
  }

  const tagPosts = getPostsByTag(posts, tag);
  const page = paginate(tagPosts, pageNumber, SITE.postPerPage, p =>
    tagPageUrl(tag, p),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: createStructuredDataScript({
            title: `${tagMeta.tagName} (tag) | ${SITE.title}`,
            description: `Blog posts tagged “${tagMeta.tagName}” — Dr. Jan Duffy, Sunstone Las Vegas Homes.`,
            canonicalPath: tagPageUrl(tag, pageNumber),
          }),
        }}
      />
      <Header />
      <BlogMain
        pageTitle={["Tag:", tagMeta.tagName]}
        pageDesc={`Posts with the “${tagMeta.tagName}” tag. For listings and tours, start from the home search.`}
      >
        <ul>
          {page.data.map(post => (
            <Card key={post.id} post={post} />
          ))}
        </ul>
      </BlogMain>
      <Pagination page={page} />
      <Footer noMarginTop={page.lastPage > 1} />
    </>
  );
}
