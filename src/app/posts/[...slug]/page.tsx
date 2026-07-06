import { notFound } from "next/navigation";
import Link from "next/link";
import IconChevronLeft from "@/assets/icons/IconChevronLeft.svg";
import IconChevronRight from "@/assets/icons/IconChevronRight.svg";
import { Datetime } from "@/components/Datetime";
import { EditPostLink } from "@/components/EditPostLink";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { MarkdownContent } from "@/components/MarkdownContent";
import { PageChrome } from "@/components/PageChrome";
import { BlogPostCta, PostBackButton } from "@/components/PostExtras";
import { ShareLinks } from "@/components/ShareLinks";
import { Tag } from "@/components/Tag";
import { RealScoutListingSection } from "@/components/home/RealScoutListingSection";
import { SITE } from "@/config";
import { buildPageMetadata, buildStructuredData } from "@/lib/json-ld";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { getSiteContact } from "@/lib/site-contact";
import { getPath } from "@/utils/getPath";
import { slugifyStr } from "@/utils/slugify";

export const dynamic = "force-static";

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

export function generateStaticParams() {
  return getAllPosts().map(post => ({
    slug: getPath(post.id, post.filePath, false).split("/").filter(Boolean),
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const canonicalPath = getPath(post.id, post.filePath);
  let ogImage: string | undefined;
  if (post.data.ogImage) {
    ogImage = post.data.ogImage;
  } else if (SITE.dynamicOgImage) {
    ogImage = `${canonicalPath}/index.png`;
  }

  return buildPageMetadata({
    title: `${post.data.title} | ${SITE.title}`,
    description: post.data.description,
    canonicalPath,
    pubDatetime: post.data.pubDatetime,
    modDatetime: post.data.modDatetime,
    ogImage,
  });
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const {
    title,
    description,
    ogImage: initOgImage,
    pubDatetime,
    modDatetime,
    timezone,
    tags,
    hideEditPost,
  } = post.data;

  const canonicalPath = getPath(post.id, post.filePath);
  let ogImageUrl: string | undefined;
  if (typeof initOgImage === "string") {
    ogImageUrl = initOgImage;
  } else if (!ogImageUrl && SITE.dynamicOgImage) {
    ogImageUrl = `${canonicalPath}/index.png`;
  }

  const pageTitle = `${title} | ${SITE.title}`;
  const contact = getSiteContact();

  const allPosts = getAllPosts().map(p => ({ slug: p.id, title: p.data.title }));
  const currentPostIndex = allPosts.findIndex(a => a.slug === post.id);
  const prevPost = currentPostIndex > 0 ? allPosts[currentPostIndex - 1] : null;
  const nextPost =
    currentPostIndex >= 0 && currentPostIndex < allPosts.length - 1
      ? allPosts[currentPostIndex + 1]
      : null;

  return (
    <>
      <JsonLd
        data={buildStructuredData({
          title: pageTitle,
          description,
          canonicalPath,
          pubDatetime,
          modDatetime,
          ogImage: ogImageUrl,
        })}
      />
      <Header />
      <PostBackButton />
      <main
        id="main-content"
        className={`mx-auto w-full max-w-3xl px-4 pb-12${SITE.showBackButton ? "" : " mt-8"}`}
        data-pagefind-body
      >
        <h1
          style={{ viewTransitionName: slugifyStr(title) } as React.CSSProperties}
          className="inline-block text-2xl font-bold text-accent sm:text-3xl"
        >
          {title}
        </h1>
        <div className="flex items-center gap-4">
          <Datetime
            pubDatetime={pubDatetime}
            modDatetime={modDatetime}
            timezone={timezone}
            size="lg"
            className="my-2"
          />
          <EditPostLink className="max-sm:hidden" hideEditPost={hideEditPost} post={post} />
        </div>
        <RealScoutListingSection tightTop />
        <article id="article" className="prose mx-auto mt-8 max-w-3xl">
          <MarkdownContent content={post.content} />
        </article>

        <BlogPostCta telephone={contact.telephone} />

        <hr className="my-8 border-dashed" />

        <EditPostLink className="sm:hidden" hideEditPost={hideEditPost} post={post} />

        <ul className="mt-4 mb-8 sm:my-8">
          {tags.map(tag => (
            <Tag key={tag} tag={slugifyStr(tag)} tagName={tag} />
          ))}
        </ul>

        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-end sm:gap-4">
          <ShareLinks />
          <a
            href="#main-content"
            className="focus-outline py-1 whitespace-nowrap hover:opacity-75"
          >
            <IconChevronLeft className="inline-block rotate-90" />
            <span>Back to Top</span>
          </a>
        </div>

        <hr className="my-6 border-dashed" />

        <div data-pagefind-ignore className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {prevPost && (
            <Link href={`/posts/${prevPost.slug}/`} className="flex w-full gap-1 hover:opacity-75">
              <IconChevronLeft className="inline-block flex-none" />
              <div>
                <span>Previous Post</span>
                <div className="text-sm text-accent/85">{prevPost.title}</div>
              </div>
            </Link>
          )}
          {nextPost && (
            <Link
              href={`/posts/${nextPost.slug}/`}
              className="flex w-full justify-end gap-1 text-right hover:opacity-75 sm:col-start-2"
            >
              <div>
                <span>Next Post</span>
                <div className="text-sm text-accent/85">{nextPost.title}</div>
              </div>
              <IconChevronRight className="inline-block flex-none" />
            </Link>
          )}
        </div>
      </main>
      <PageChrome omitListingsFooter />
    </>
  );
}
