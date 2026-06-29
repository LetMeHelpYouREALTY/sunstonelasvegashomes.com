import type { MetadataRoute } from "next";

import { SITE } from "@/config";

export default function robots(): MetadataRoute.Robots {
  const sitemap = `${SITE.website.replace(/\/$/, "")}/sitemap.xml`;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap,
  };
}
