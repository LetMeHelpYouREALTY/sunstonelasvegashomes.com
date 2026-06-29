import Link from "next/link";

import BackButton from "@/components/blog/BackButton";
import BlogPostCta from "@/components/blog/BlogPostCta";
import EditPost from "@/components/blog/EditPost";
import PostArticleEnhancements from "@/components/blog/PostArticleEnhancements";
import ShareLinks from "@/components/blog/ShareLinks";
import Tag from "@/components/blog/Tag";
import Datetime from "@/components/Datetime";
import RealScoutListingSection from "@/components/home/RealScoutListingSection";
import { SITE } from "@/config";
import type { BlogPost } from "@/lib/blog";
import { markdownToHtml } from "@/lib/markdown";
import { getPath } from "@/utils/getPath";
import { slugifyStr } from "@/utils/slugify";

type PostDetailsProps = {
  post: BlogPost;
  posts: BlogPost[];
  canonicalPath: string;
};

function IconChevronLeft({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function IconChevronRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export default async function PostDetails({
  post,
  posts,
  canonicalPath,
}: PostDetailsProps) {
  const {
    title,
    pubDatetime,
    modDatetime,
    timezone,
    tags,
    hideEditPost,
  } = post.data;

  const html = await markdownToHtml(post.content);

  const allPosts = posts.map(({ data: postData, id }) => ({
    slug: id,
    title: postData.title,
  }));

  const currentPostIndex = allPosts.findIndex(entry => entry.slug === post.id);
  const prevPost =
    currentPostIndex > 0 ? allPosts[currentPostIndex - 1] : null;
  const nextPost =
    currentPostIndex >= 0 && currentPostIndex < allPosts.length - 1
      ? allPosts[currentPostIndex + 1]
      : null;

  return (
    <>
      <BackButton />
      <main
        id="main-content"
        className={`mx-auto w-full max-w-3xl px-4 pb-12 ${SITE.showBackButton ? "" : "mt-8"}`}
      >
        <h1
          className="inline-block text-2xl font-bold text-accent sm:text-3xl"
          style={{ viewTransitionName: slugifyStr(title) }}
        >
          {title}
        </h1>
        <div className="flex items-center gap-4">
          <Datetime
            pubDatetime={pubDatetime}
            modDatetime={modDatetime}
            timezoneName={timezone}
          />
          <EditPost className="max-sm:hidden" hideEditPost={hideEditPost} post={post} />
        </div>
        <RealScoutListingSection tightTop />
        <article
          id="article"
          className="prose mx-auto mt-8 max-w-3xl"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <BlogPostCta />

        <hr className="my-8 border-dashed" />

        <EditPost className="sm:hidden" hideEditPost={hideEditPost} post={post} />

        <ul className="mt-4 mb-8 sm:my-8">
          {tags.map(tag => (
            <Tag key={tag} tag={slugifyStr(tag)} tagName={tag} />
          ))}
        </ul>

        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-end sm:gap-4">
          <ShareLinks path={canonicalPath} />

          <button
            id="back-to-top"
            type="button"
            className="focus-outline py-1 whitespace-nowrap hover:opacity-75"
          >
            <IconChevronLeft className="inline-block rotate-90" />
            <span>Back to Top</span>
          </button>
        </div>

        <hr className="my-6 border-dashed" />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {prevPost ? (
            <Link
              href={getPath(prevPost.slug, undefined)}
              className="flex w-full gap-1 hover:opacity-75"
            >
              <IconChevronLeft className="inline-block flex-none" />
              <div>
                <span>Previous Post</span>
                <div className="text-sm text-accent/85">{prevPost.title}</div>
              </div>
            </Link>
          ) : null}
          {nextPost ? (
            <Link
              href={getPath(nextPost.slug, undefined)}
              className="flex w-full justify-end gap-1 text-right hover:opacity-75 sm:col-start-2"
            >
              <div>
                <span>Next Post</span>
                <div className="text-sm text-accent/85">{nextPost.title}</div>
              </div>
              <IconChevronRight className="inline-block flex-none" />
            </Link>
          ) : null}
        </div>
      </main>
      <PostArticleEnhancements />
    </>
  );
}
