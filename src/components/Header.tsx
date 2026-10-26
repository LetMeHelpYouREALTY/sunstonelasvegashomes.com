"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Hr } from "@/components/Hr";
import { LinkButton } from "@/components/LinkButton";
import { SITE } from "@/config";
import { cn } from "@/lib/utils";
import IconX from "@/assets/icons/IconX.svg";
import IconMoon from "@/assets/icons/IconMoon.svg";
import IconSearch from "@/assets/icons/IconSearch.svg";
import IconArchive from "@/assets/icons/IconArchive.svg";
import IconSunHigh from "@/assets/icons/IconSunHigh.svg";
import IconMenuDeep from "@/assets/icons/IconMenuDeep.svg";

function isActive(pathname: string, path: string) {
  const currentPath =
    pathname.endsWith("/") && pathname !== "/"
      ? pathname.slice(0, -1)
      : pathname;
  const currentPathArray = currentPath.split("/").filter(p => p.trim());
  const pathArray = path.split("/").filter(p => p.trim());
  return currentPath === path || currentPathArray[0] === pathArray[0];
}

const navLinkClass =
  "block rounded-md px-3 py-2.5 text-center text-sm font-medium hover:text-accent sm:px-2 sm:py-1.5 sm:text-left";

export function Header() {
  const pathname = usePathname() ?? "/";
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

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
              type="button"
              className="focus-outline ml-auto shrink-0 p-2 sm:hidden"
              aria-label={menuOpen ? "Close Menu" : "Open Menu"}
              aria-expanded={menuOpen}
              aria-controls="menu-items"
              onClick={() => setMenuOpen(o => !o)}
            >
              {menuOpen ? (
                <IconX id="close-icon" />
              ) : (
                <IconMenuDeep id="menu-icon" />
              )}
            </button>
            <ul
              id="menu-items"
              className={cn(
                "mt-3 grid w-full grid-cols-1 gap-0 sm:mx-0 sm:mt-0 sm:flex sm:flex-wrap sm:items-center sm:justify-end sm:gap-x-1 sm:gap-y-1 md:gap-x-2",
                menuOpen ? "grid" : "hidden sm:flex",
              )}
            >
              <li className="nav-section-label col-span-1 px-3 pt-1 pb-0 text-[0.65rem] font-semibold tracking-wider text-foreground/55 uppercase sm:hidden">
                Shop for a home
              </li>
              {[
                { href: "/#browse-listings", label: "Search homes", active: pathname === "/" },
                { href: "/buyers/", label: "Buyers", active: isActive(pathname, "/buyers") },
                { href: "/faq/", label: "FAQ", active: isActive(pathname, "/faq") },
                { href: "/buying-process/", label: "Buying process", active: isActive(pathname, "/buying-process") },
                { href: "/location/", label: "Sunstone & Trilogy", active: isActive(pathname, "/location") },
                { href: "/amenities/", label: "Nearby amenities", active: isActive(pathname, "/amenities") },
                { href: "/sunstone/", label: "Sunstone guide", active: isActive(pathname, "/sunstone") },
                { href: "/market/", label: "Las Vegas market", active: isActive(pathname, "/market") },
              ].map(item => (
                <li key={item.href} className="col-span-1">
                  <Link
                    href={item.href}
                    className={cn(navLinkClass, item.active && "active-nav")}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="nav-section-label col-span-1 px-3 pt-3 pb-0 text-[0.65rem] font-semibold tracking-wider text-foreground/55 uppercase sm:hidden">
                Agent &amp; insights
              </li>
              {[
                { href: "/about/", label: "About", active: isActive(pathname, "/about") },
                { href: "/contact/", label: "Contact", active: isActive(pathname, "/contact") },
                { href: "/sellers/", label: "Sellers", active: isActive(pathname, "/sellers") },
                { href: "/posts/", label: "Blog", active: isActive(pathname, "/posts") },
                { href: "/market-news/", label: "Market news", active: isActive(pathname, "/market-news") },
              ].map(item => (
                <li key={item.href} className="col-span-1">
                  <Link
                    href={item.href}
                    className={cn(navLinkClass, item.active && "active-nav")}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              {SITE.showArchives && (
                <li className="col-span-1 sm:ml-1">
                  <LinkButton
                    href="/archives/"
                    className={cn(
                      "focus-outline flex justify-center rounded-md p-3 sm:inline-flex sm:p-1.5",
                      isActive(pathname, "/archives") && "active-nav [&>svg]:stroke-accent",
                    )}
                    ariaLabel="archives"
                    title="Archives"
                  >
                    <IconArchive className="hidden sm:inline-block" />
                    <span className="sm:sr-only">Archives</span>
                  </LinkButton>
                </li>
              )}
              <li className="col-span-1 flex items-center justify-center sm:ml-0">
                <LinkButton
                  href="/search/"
                  className={cn(
                    "focus-outline flex p-3 sm:p-1",
                    isActive(pathname, "/search") && "[&>svg]:stroke-accent",
                  )}
                  ariaLabel="search"
                  title="Search"
                >
                  <IconSearch />
                  <span className="sr-only">Search</span>
                </LinkButton>
              </li>
              {SITE.lightAndDarkMode && (
                <li className="col-span-1 flex items-center justify-center">
                  <button
                    id="theme-btn"
                    type="button"
                    className="focus-outline relative size-12 p-4 sm:size-8 hover:[&>svg]:stroke-accent"
                    title="Toggles light & dark"
                    aria-label="auto"
                    aria-live="polite"
                  >
                    <IconMoon className="absolute top-[50%] left-[50%] -translate-[50%] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                    <IconSunHigh className="absolute top-[50%] left-[50%] -translate-[50%] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
      <Hr />
    </header>
  );
}
