import Link from "next/link";
import { cn } from "@/lib/utils";

type LinkButtonProps = {
  href: string;
  className?: string;
  ariaLabel?: string;
  title?: string;
  children: React.ReactNode;
};

export function LinkButton({
  href,
  className,
  ariaLabel,
  title,
  children,
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-1 font-semibold text-accent hover:underline",
        className,
      )}
      aria-label={ariaLabel}
      title={title}
    >
      {children}
    </Link>
  );
}
