import { notFound } from "next/navigation";

import Card from "@/components/Card";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import BlogMain from "@/components/blog/BlogMain";
import { SITE } from "@/config";
import { filterPublished, getAllPosts } from "@/lib/blog";
import { getPostsByGroupCondition } from "@/lib/blog-archives";
import {
  createPageMetadata,
  createStructuredDataScript,
} from "@/lib/page-metadata";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const metadata = createPageMetadata({
  title: `Archives | ${SITE.title}`,
  description:
    "Browse past articles by month — Dr. Jan Duffy, Sunstone and Trilogy Sunset, Las Vegas real estate.",
  canonicalPath: "/archives/",
});

export default async function ArchivesPage() {
  if (!SITE.showArchives) {
    notFound();
  }

  const posts = filterPublished(await getAllPosts());

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: createStructuredDataScript({
            title: `Archives | ${SITE.title}`,
            description:
              "Browse past articles by month — Dr. Jan Duffy, Sunstone and Trilogy Sunset, Las Vegas real estate.",
            canonicalPath: "/archives/",
          }),
        }}
      />
      <Header />
      <BlogMain
        pageTitle="Archives"
        pageDesc="Older posts and updates, organized by month, for Sunstone Las Vegas Homes."
      >
        {Object.entries(
          getPostsByGroupCondition(posts, post =>
            post.data.pubDatetime.getFullYear(),
          ),
        )
          .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
          .map(([year, yearGroup]) => (
            <div key={year}>
              <span className="text-2xl font-bold">{year}</span>
              <sup className="text-sm">{yearGroup.length}</sup>
              {Object.entries(
                getPostsByGroupCondition(
                  yearGroup,
                  post => post.data.pubDatetime.getMonth() + 1,
                ),
              )
                .sort(([monthA], [monthB]) => Number(monthB) - Number(monthA))
                .map(([month, monthGroup]) => (
                  <div key={`${year}-${month}`} className="flex flex-col sm:flex-row">
                    <div className="mt-6 min-w-36 text-lg sm:my-6">
                      <span className="font-bold">
                        {MONTHS[Number(month) - 1]}
                      </span>
                      <sup className="text-xs">{monthGroup.length}</sup>
                    </div>
                    <ul>
                      {monthGroup
                        .sort(
                          (left, right) =>
                            Math.floor(
                              right.data.pubDatetime.getTime() / 1000,
                            ) -
                            Math.floor(left.data.pubDatetime.getTime() / 1000),
                        )
                        .map(post => (
                          <Card key={post.id} post={post} />
                        ))}
                    </ul>
                  </div>
                ))}
            </div>
          ))}
      </BlogMain>
      <Footer />
    </>
  );
}
