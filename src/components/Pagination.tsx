import IconArrowLeft from "@/assets/icons/IconArrowLeft.svg";
import IconArrowRight from "@/assets/icons/IconArrowRight.svg";
import { LinkButton } from "@/components/LinkButton";
import { cn } from "@/lib/utils";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  prevUrl?: string;
  nextUrl?: string;
};

export function Pagination({
  currentPage,
  totalPages,
  prevUrl,
  nextUrl,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav className="mt-auto mb-8 flex justify-center" aria-label="Pagination">
      <LinkButton
        href={prevUrl ?? "#"}
        className={cn("mr-4 select-none", { "pointer-events-none opacity-50": !prevUrl })}
        ariaLabel="Previous"
      >
        <IconArrowLeft className="inline-block" />
        Prev
      </LinkButton>
      {currentPage} / {totalPages}
      <LinkButton
        href={nextUrl ?? "#"}
        className={cn("ml-4 select-none", { "pointer-events-none opacity-50": !nextUrl })}
        ariaLabel="Next"
      >
        Next
        <IconArrowRight className="inline-block" />
      </LinkButton>
    </nav>
  );
}
