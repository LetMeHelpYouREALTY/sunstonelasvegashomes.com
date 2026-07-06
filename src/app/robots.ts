import { SITE } from "@/config";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const origin = SITE.website.replace(/\/$/, "");
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${origin}/sitemap.xml`,
  };
}
