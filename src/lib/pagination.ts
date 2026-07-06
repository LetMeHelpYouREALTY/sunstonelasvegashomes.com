import { SITE } from "@/config";
import type { BlogPost } from "@/lib/posts";

export type PaginatedResult = {
  posts: BlogPost[];
  currentPage: number;
  totalPages: number;
  hasPrev: boolean;
  hasNext: boolean;
};

export function paginatePosts(posts: BlogPost[], page: number): PaginatedResult {
  const pageSize = SITE.postPerPage;
  const totalPages = Math.max(1, Math.ceil(posts.length / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * pageSize;

  return {
    posts: posts.slice(start, start + pageSize),
    currentPage,
    totalPages,
    hasPrev: currentPage > 1,
    hasNext: currentPage < totalPages,
  };
}

export function postsPageUrl(page: number): string {
  return page <= 1 ? "/posts/" : `/posts/page/${page}/`;
}

export function tagPageUrl(tag: string, page: number): string {
  return page <= 1 ? `/tags/${tag}/` : `/tags/${tag}/page/${page}/`;
}
