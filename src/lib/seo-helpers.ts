import { SITE } from "@/config";

/**
 * Hyperlocal page titles: unique per route, brand last.
 * Pair every page with a distinct meta description in the page frontmatter.
 */
export function uniquePageTitle(topic: string): string {
  return `${topic} | ${SITE.title}`;
}
