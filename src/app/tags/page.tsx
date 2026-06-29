import Footer from "@/components/Footer";
import Header from "@/components/Header";
import BlogMain from "@/components/blog/BlogMain";
import Tag from "@/components/blog/Tag";
import { SITE } from "@/config";
import { getAllPosts } from "@/lib/blog";
import { getUniqueTags } from "@/lib/blog-tags";
import {
  createPageMetadata,
  createStructuredDataScript,
} from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: `Tags | ${SITE.title}`,
  description:
    "Blog topics and tags for Sunstone Las Vegas Homes—Las Vegas real estate, buyer resources, and site updates.",
  canonicalPath: "/tags/",
});

export default async function TagsIndexPage() {
  const tags = getUniqueTags(await getAllPosts());

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: createStructuredDataScript({
            title: `Tags | ${SITE.title}`,
            description:
              "Blog topics and tags for Sunstone Las Vegas Homes—Las Vegas real estate, buyer resources, and site updates.",
            canonicalPath: "/tags/",
          }),
        }}
      />
      <Header />
      <BlogMain
        pageTitle="Tags"
        pageDesc="Explore posts by topic—Sunstone, Trilogy Sunset, Las Vegas market notes, and buyer resources."
      >
        <ul>
          {tags.map(({ tag, tagName }) => (
            <Tag key={tag} tag={tag} tagName={tagName} size="lg" />
          ))}
        </ul>
      </BlogMain>
      <Footer />
    </>
  );
}
