import { Card } from "@/components/Card";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { Main } from "@/components/Main";
import { PageChrome } from "@/components/PageChrome";
import { Tag } from "@/components/Tag";
import { SITE } from "@/config";
import { buildPageMetadata, buildStructuredData } from "@/lib/json-ld";
import { getAllPosts } from "@/lib/posts";
import getUniqueTags from "@/utils/getUniqueTags";

export const dynamic = "force-static";

const title = `Tags | ${SITE.title}`;
const description =
  "Blog topics and tags for Sunstone Las Vegas Homes—Las Vegas real estate, buyer resources, and site updates.";

export const metadata = buildPageMetadata({
  title,
  description,
  canonicalPath: "/tags/",
});

export default function TagsPage() {
  const tags = getUniqueTags(getAllPosts());

  return (
    <>
      <JsonLd
        data={buildStructuredData({
          title,
          description,
          canonicalPath: "/tags/",
        })}
      />
      <Header />
      <Main
        pageTitle="Tags"
        pageDesc="Explore posts by topic. Main buyer resources: home search, buying process, location, and market pages."
      >
        <ul>
          {tags.map(({ tag, tagName }) => (
            <Tag key={tag} tag={tag} tagName={tagName} size="lg" />
          ))}
        </ul>
      </Main>
      <PageChrome omitListingsFooter />
    </>
  );
}
