import { notFound } from "next/navigation";
import { Card } from "@/components/Card";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { Main } from "@/components/Main";
import { PageChrome } from "@/components/PageChrome";
import { SITE } from "@/config";
import { buildPageMetadata, buildStructuredData } from "@/lib/json-ld";
import { getAllPosts } from "@/lib/posts";
import getPostsByGroupCondition from "@/utils/getPostsByGroupCondition";

export const dynamic = "force-static";

const title = `Archives | ${SITE.title}`;
const description =
  "Browse past articles by month — Dr. Jan Duffy, Sunstone and Trilogy Sunset, Las Vegas real estate.";

export const metadata = buildPageMetadata({
  title,
  description,
  canonicalPath: "/archives/",
});

const months = [
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

export default function ArchivesPage() {
  if (!SITE.showArchives) {
    notFound();
  }

  const posts = getAllPosts();
  const byYear = getPostsByGroupCondition(posts, post =>
    post.data.pubDatetime.getFullYear(),
  );

  return (
    <>
      <JsonLd
        data={buildStructuredData({
          title,
          description,
          canonicalPath: "/archives/",
        })}
      />
      <Header />
      <Main
        pageTitle="Archives"
        pageDesc="Older posts and updates, organized by month, for Sunstone Las Vegas Homes."
      >
        {Object.entries(byYear)
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
                      <span className="font-bold">{months[Number(month) - 1]}</span>
                      <sup className="text-xs">{monthGroup.length}</sup>
                    </div>
                    <ul>
                      {monthGroup
                        .sort(
                          (a, b) =>
                            Math.floor(
                              new Date(b.data.pubDatetime).getTime() / 1000,
                            ) -
                            Math.floor(
                              new Date(a.data.pubDatetime).getTime() / 1000,
                            ),
                        )
                        .map(post => (
                          <Card key={post.id} {...post} />
                        ))}
                    </ul>
                  </div>
                ))}
            </div>
          ))}
      </Main>
      <PageChrome omitListingsFooter />
    </>
  );
}
