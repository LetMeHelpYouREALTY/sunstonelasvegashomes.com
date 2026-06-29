import type { BlogPost } from "@/lib/blog";
import { filterPublished } from "@/lib/blog";
import { slugifyStr } from "@/utils/slugify";

export type BlogTag = {
  tag: string;
  tagName: string;
};

export function slugifyTags(tags: string[]): string[] {
  return tags.map(tag => slugifyStr(tag));
}

export function getUniqueTags(posts: BlogPost[]): BlogTag[] {
  return filterPublished(posts)
    .flatMap(post => post.data.tags)
    .map(tagName => ({ tag: slugifyStr(tagName), tagName }))
    .filter(
      (value, index, self) =>
        self.findIndex(entry => entry.tag === value.tag) === index,
    )
    .sort((left, right) => left.tag.localeCompare(right.tag));
}

export function getPostsByTag(posts: BlogPost[], tag: string): BlogPost[] {
  return posts.filter(post => slugifyTags(post.data.tags).includes(tag));
}
