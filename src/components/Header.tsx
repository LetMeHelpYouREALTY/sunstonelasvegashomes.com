"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import LinkButton from "@/components/LinkButton";
import Hr from "@/components/Hr";
import { SITE } from "@/config";
import { useTheme } from "@/components/ThemeProvider";

function stripTrailingSlash(value: string): string {
  return value.endsWith("/") && value !== "/" ? value.slice(0, -1) : value;
}

function IconX({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function IconMoon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3a6.75 6.75 0 1 0 9 9A9 9 0 1 1 12 3Z" />
    </svg>
  );
}

function IconSearch({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function IconArchive({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 7h16" />
      <path d="M5 7h14v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7Z" />
      <path d="M9 11h6" />
      <path d="M7 4h10v3H7z" />
    </svg>
  );
}

function IconSunHigh({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.9 4.9 1.4 1.4" />
      <path d="m17.7 17.7 1.4 1.4" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.3 17.7-1.4 1.4" />
      <path d="m19.1 4.9-1.4 1.4" />
    </svg>
  );
}

function IconMenuDeep({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

const shopLinks = [
  { href: "/#browse-listings", label: "Search homes" },
  { href: "/buyers/", label: "Buyers" },
  { href: "/faq/", label: "FAQ" },
  { href: "/buying-process/", label: "Buying process" },
  { href: "/location/", label: "Sunstone & Trilogy" },
  { href: "/sunstone/", label: "Sunstone guide" },
  { href: "/market/", label: "Las Vegas market" },
] as const;

const insightLinks = [
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
  { href: "/sellers/", label: "Sellers" },
  { href: "/posts/", label: "Blog" },
  { href: "/market-news/", label: "Market news" },
] as const;

export default function Header() {
  const pathname = usePathname() ?? "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const currentPath = stripTrailingSlash(pathname);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (path: string) => {
    const targetPath = stripTrailingSlash(path.split("#")[0] || "/");

    if (targetPath === "/") {
      return currentPath === "/";
    }

    const currentSegments = currentPath.split("/").filter(Boolean);
    const targetSegments = targetPath.split("/").filter(Boolean);
    return currentPath === targetPath || currentSegments[0] === targetSegments[0];
  };

  return (
    <header>
      <a
        id="skip-to-content"
        href="#main-content"
        className="absolute -top-full left-16 z-50 bg-background px-3 py-2 text-accent backdrop-blur-lg transition-all focus:top-4"
      >
        Skip to content
      </a>

      <div
        id="nav-container"
        className="mx-auto flex max-w-3xl flex-col items-stretch justify-between sm:flex-row sm:items-center"
      >
        <div
          id="top-nav-wrap"
          className="flex w-full min-w-0 items-center justify-between gap-3 bg-background p-4 sm:py-5"
        >
          <Link
            href="/"
            className="min-w-0 py-1 text-left text-xl leading-snug font-semibold tracking-tight sm:text-2xl sm:leading-7"
          >
            <span className="block sm:inline">{SITE.title}</span>
          </Link>

          <nav
            id="nav-menu"
            className="flex min-w-0 flex-1 flex-col items-stretch sm:ml-2 sm:flex-row sm:items-center sm:justify-end sm:space-x-3 sm:py-0 md:space-x-4"
            aria-label="Primary"
          >
            <button
              id="menu-btn"
              className="ml-auto shrink-0 p-2 sm:hidden"
              aria-label={menuOpen ? "Close Menu" : "Open Menu"}
              aria-expanded={menuOpen}
              aria-controls="menu-items"
              onClick={() => setMenuOpen(open => !open)}
              type="button"
            >
              {menuOpen ? (
                <IconX className="size-6" />
              ) : (
                <IconMenuDeep className="size-6" />
              )}
            </button>

            <ul
              id="menu-items"
              className={[
                "mt-3 w-full grid-cols-1 gap-0 sm:mx-0 sm:mt-0 sm:flex sm:flex-wrap sm:items-center sm:justify-end sm:gap-x-1 sm:gap-y-1 md:gap-x-2",
                "[&>li>a]:block [&>li>a]:rounded-md [&>li>a]:px-3 [&>li>a]:py-2.5 [&>li>a]:text-center [&>li>a]:text-sm [&>li>a]:font-medium [&>li>a]:hover:text-accent sm:[&>li>a]:px-2 sm:[&>li>a]:py-1.5 sm:[&>li>a]:text-left",
                menuOpen ? "grid" : "hidden",
                "sm:flex",
              ].join(" ")}
            >
              <li className="nav-section-label col-span-1 px-3 pt-1 pb-0 text-[0.65rem] font-semibold tracking-wider text-foreground/55 uppercase sm:hidden">
                Shop for a home
              </li>

              {shopLinks.map(link => (
                <li key={link.href} className="col-span-1">
                  <Link
                    href={link.href}
                    className={link.href === "/#browse-listings" && currentPath === "/" ? "active-nav" : isActive(link.href) ? "active-nav" : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

              <li className="nav-section-label col-span-1 px-3 pt-3 pb-0 text-[0.65rem] font-semibold tracking-wider text-foreground/55 uppercase sm:hidden">
                Agent &amp; insights
              </li>

              {insightLinks.map(link => (
                <li key={link.href} className="col-span-1">
                  <Link
                    href={link.href}
                    className={isActive(link.href) ? "active-nav" : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

              {SITE.showArchives ? (
                <li className="col-span-1 sm:ml-1">
                  <LinkButton
                    href="/archives/"
                    className={[
                      "flex justify-center rounded-md p-3 sm:inline-flex sm:p-1.5",
                      isActive("/archives/") ? "active-nav [&>svg]:stroke-accent" : "",
                    ].join(" ")}
                    ariaLabel="archives"
                    title="Archives"
                    onClick={() => setMenuOpen(false)}
                  >
                    <IconArchive className="hidden size-5 sm:inline-block" />
                    <span className="sm:sr-only">Archives</span>
                  </LinkButton>
                </li>
              ) : null}

              <li className="col-span-1 flex items-center justify-center sm:ml-0">
                <LinkButton
                  href="/search/"
                  className={[
                    "flex p-3 sm:p-1",
                    isActive("/search/") ? "[&>svg]:stroke-accent" : "",
                  ].join(" ")}
                  ariaLabel="search"
                  title="Search"
                  onClick={() => setMenuOpen(false)}
                >
                  <IconSearch className="size-5" />
                  <span className="sr-only">Search</span>
                </LinkButton>
              </li>

              {SITE.lightAndDarkMode ? (
                <li className="col-span-1 flex items-center justify-center">
                  <button
                    id="theme-btn"
                    className="relative size-12 p-4 hover:[&>svg]:stroke-accent sm:size-8"
                    title="Toggles light & dark"
                    aria-label={theme}
                    aria-live="polite"
                    onClick={toggleTheme}
                    type="button"
                  >
                    <IconMoon
                      className={`absolute top-1/2 left-1/2 size-5 -translate-x-1/2 -translate-y-1/2 transition-all ${
                        theme === "light"
                          ? "scale-100 rotate-0"
                          : "scale-0 -rotate-90"
                      }`}
                    />
                    <IconSunHigh
                      className={`absolute top-1/2 left-1/2 size-5 -translate-x-1/2 -translate-y-1/2 transition-all ${
                        theme === "dark"
                          ? "scale-100 rotate-0"
                          : "scale-0 rotate-90"
                      }`}
                    />
                  </button>
                </li>
              ) : null}
            </ul>
          </nav>
        </div>
      </div>

      <Hr />
    </header>
  );
}
