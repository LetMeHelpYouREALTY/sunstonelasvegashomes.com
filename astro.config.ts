import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap, { ChangeFreqEnum } from "@astrojs/sitemap";
import type { SitemapItem } from "@astrojs/sitemap";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import { SITE } from "./src/config";

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  integrations: [
    sitemap({
      filter: page => SITE.showArchives || !page.endsWith("/archives"),
      /** Nudge crawl priority for money pages (absolute URLs from integration). */
      serialize(item: SitemapItem): SitemapItem {
        const pathname = new URL(item.url).pathname.replace(/\/$/, "") || "/";
        const money = new Set([
          "/",
          "/about",
          "/contact",
          "/location",
          "/market",
          "/buying-process",
          "/buyers",
          "/faq",
          "/sellers",
        ]);
        if (money.has(pathname)) {
          return { ...item, priority: 0.95, changefreq: ChangeFreqEnum.WEEKLY };
        }
        if (pathname.startsWith("/posts/") && pathname !== "/posts") {
          return { ...item, priority: 0.65, changefreq: ChangeFreqEnum.MONTHLY };
        }
        return { ...item, priority: 0.7, changefreq: ChangeFreqEnum.MONTHLY };
      },
    }),
  ],
  markdown: {
    remarkPlugins: [remarkToc, [remarkCollapse, { test: "Table of contents" }]],
    shikiConfig: {
      // For more themes, visit https://shiki.style/themes
      themes: { light: "min-light", dark: "night-owl" },
      wrap: true,
    },
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  image: {
    // Used for all Markdown images; not configurable per-image
    // Used for all `<Image />` and `<Picture />` components unless overridden with a prop
    experimentalLayout: "responsive",
  },
});
