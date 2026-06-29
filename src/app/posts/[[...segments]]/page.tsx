import { notFound } from "next/navigation";

import Card from "@/components/Card";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import BlogMain from "@/components/blog/BlogMain";
import Pagination from "@/components/blog/Pagination";
import PostDetails from "@/components/blog/PostDetails";
import { SITE } from "@/config";
import { getPostBySlug, getSortedPosts } from "@/lib/blog";
import {
  createArticleMetadata,
  createPageMetadata,
  createStructuredDataScript,
} from "@/lib/page-metadata";
import { paginate, postsPageUrl } from "@/lib/pagination";
import { getPath } from "@/utils/getPath";

type PostsRouteProps = {
  params: Promise<{ segments?: string[] }>;
};

function isNumericPage(segment: string): boolean {
  return /^\d+$/.test(segment);
}

export async function generateStaticParams() {
  const posts = await getSortedPosts();
  const lastPage = Math.max(1, Math.ceil(posts.length / SITE.postPerPage));
  const params: { segments: string[] }[] = [{ segments: [] }];

  for (let page = 2; page <= lastPage; page += 1) {
    params.push({ segments: [String(page)] });
  }

  for (const post of posts) {
    params.push({ segments: post.id.split("/") });
  }

  return params;
}

export async function generateMetadata({ params }: PostsRouteProps) {
  const { segments = [] } = await params;

  if (segments.length === 0 || (segments.length === 1 && isNumericPage(segments[0]))) {
    const page = segments.length === 0 ? 1 : Number(segments[0]);
    return createPageMetadata({
      title: page > 1 ? `Posts (page ${page}) | ${SITE.title}` : `Posts | ${SITE.title}`,
      description:
        "Market notes, buyer tips, and updates from Dr. Jan Duffy — Sunstone, Trilogy Sunset, and Las Vegas real estate.",
      canonicalPath: postsPageUrl(page),
    });
  }

  const post = await getPostBySlug(segments.join("/"));
  if (!post) {
    return createPageMetadata({ title: `Post not found | ${SITE.title}` });
  }

  const canonicalPath = `${getPath(post.id, post.filePath)}/`;
  const ogImage =
    post.data.ogImage ||
    (SITE.dynamicOgImage ? `${canonicalPath}og.png` : "/og.png");

  return createArticleMetadata({
    title: `${post.data.title} | ${SITE.title}`,
    description: post.data.description,
    canonicalPath,
    ogImage,
    pubDatetime: post.data.pubDatetime,
    modDatetime: post.data.modDatetime,
  });
}

export default async function PostsRoute({ params }: PostsRouteProps) {
  const { segments = [] } = await params;

  if (segments.length === 0 || (segments.length === 1 && isNumericPage(segments[0]))) {
    const pageNumber = segments.length === 0 ? 1 : Number(segments[0]);
    const posts = await getSortedPosts();
    const page = paginate(posts, pageNumber, SITE.postPerPage, postsPageUrl);

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: createStructuredDataScript({
              title: `Posts | ${SITE.title}`,
              description:
                "Market notes, buyer tips, and updates from Dr. Jan Duffy — Sunstone, Trilogy Sunset, and Las Vegas real estate.",
              canonicalPath: postsPageUrl(pageNumber),
            }),
          }}
        />
        <Header />
        <BlogMain
          pageTitle="Posts"
          pageDesc="Articles on Las Vegas real estate, Sunstone and Trilogy Sunset, and how to search and buy with confidence."
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

  const post = await getPostBySlug(segments.join("/"));
  if (!post) {
    notFound();
  }

  const sortedPosts = await getSortedPosts();
  const canonicalPath = `${getPath(post.id, post.filePath)}/`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: createStructuredDataScript({
            title: `${post.data.title} | ${SITE.title}`,
            description: post.data.description,
            canonicalPath,
            pubDatetime: post.data.pubDatetime,
            modDatetime: post.data.modDatetime,
            ogImage: post.data.ogImage,
          }),
        }}
      />
      <Header />
      <PostDetails post={post} posts={sortedPosts} canonicalPath={canonicalPath} />
      <Footer />
    </>
  );
}
