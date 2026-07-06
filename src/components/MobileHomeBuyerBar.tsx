import Link from "next/link";

type MobileHomeBuyerBarProps = {
  telHref?: string;
};

export function MobileHomeBuyerBar({ telHref }: MobileHomeBuyerBarProps) {
  const hasCall = Boolean(telHref?.length);

  return (
    <nav
      className="fixed right-0 bottom-0 left-0 z-40 flex items-stretch border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom,0px)] text-foreground shadow-[0_-4px_20px_rgba(0,0,0,0.06)] backdrop-blur-md md:hidden"
      aria-label="Quick homebuyer actions"
    >
      <a
        href="/#browse-listings"
        className="flex max-w-[50%] min-h-[3.25rem] flex-1 items-center justify-center px-2 py-3 text-center text-sm font-semibold text-accent no-underline hover:bg-muted/40"
      >
        Search listings
      </a>
      {hasCall ? (
        <a
          href={telHref}
          className="flex max-w-[50%] min-h-[3.25rem] flex-1 items-center justify-center border-l border-border px-2 py-3 text-center text-sm font-semibold text-foreground no-underline hover:bg-muted/40"
        >
          Call
        </a>
      ) : (
        <Link
          href="/about/"
          className="flex max-w-[50%] min-h-[3.25rem] flex-1 items-center justify-center border-l border-border px-2 py-3 text-center text-sm font-semibold text-foreground no-underline hover:bg-muted/40"
        >
          About
        </Link>
      )}
    </nav>
  );
}
