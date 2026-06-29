export type PaginatedResult<T> = {
  data: T[];
  currentPage: number;
  lastPage: number;
  prevUrl: string | null;
  nextUrl: string | null;
};

export function paginate<T>(
  items: T[],
  page: number,
  pageSize: number,
  buildPageUrl: (page: number) => string,
): PaginatedResult<T> {
  const lastPage = Math.max(1, Math.ceil(items.length / pageSize));
  const currentPage = Math.min(Math.max(1, page), lastPage);
  const start = (currentPage - 1) * pageSize;
  const data = items.slice(start, start + pageSize);

  return {
    data,
    currentPage,
    lastPage,
    prevUrl: currentPage > 1 ? buildPageUrl(currentPage - 1) : null,
    nextUrl: currentPage < lastPage ? buildPageUrl(currentPage + 1) : null,
  };
}

export function postsPageUrl(page: number): string {
  return page <= 1 ? "/posts/" : `/posts/${page}/`;
}

export function tagPageUrl(tag: string, page: number): string {
  return page <= 1 ? `/tags/${tag}/` : `/tags/${tag}/${page}/`;
}
