import LinkButton from "@/components/LinkButton";
import type { PaginatedResult } from "@/lib/pagination";

type PaginationProps<T> = {
  page: PaginatedResult<T>;
};

function IconArrowLeft({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function IconArrowRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export default function Pagination<T>({ page }: PaginationProps<T>) {
  if (page.lastPage <= 1) {
    return null;
  }

  return (
    <nav className="mt-auto mb-8 flex justify-center" aria-label="Pagination">
      <LinkButton
        disabled={!page.prevUrl}
        href={page.prevUrl ?? "#"}
        className={`mr-4 select-none ${!page.prevUrl ? "opacity-50" : ""}`}
        ariaLabel="Previous"
      >
        <IconArrowLeft className="inline-block" />
        Prev
      </LinkButton>
      {page.currentPage} / {page.lastPage}
      <LinkButton
        disabled={!page.nextUrl}
        href={page.nextUrl ?? "#"}
        className={`ml-4 select-none ${!page.nextUrl ? "opacity-50" : ""}`}
        ariaLabel="Next"
      >
        Next
        <IconArrowRight className="inline-block" />
      </LinkButton>
    </nav>
  );
}
