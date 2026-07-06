import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/config";
import { buildPageMetadata, buildStructuredData } from "@/lib/json-ld";
import { SearchPageClient } from "./SearchPageClient";

export const dynamic = "force-static";

const title = `Search | ${SITE.title}`;
const description =
  "Search the Sunstone Las Vegas Homes blog — Las Vegas real estate, Sunstone, Trilogy Sunset, and local market topics.";

export const metadata = buildPageMetadata({
  title,
  description,
  canonicalPath: "/search/",
});

export default function SearchPage() {
  return (
    <>
      <JsonLd
        data={buildStructuredData({
          title,
          description,
          canonicalPath: "/search/",
        })}
      />
      <SearchPageClient />
    </>
  );
}
