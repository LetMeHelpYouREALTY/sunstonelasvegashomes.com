import { buildSitemapEntries } from "@/lib/sitemap-entries";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemapEntries();
}
