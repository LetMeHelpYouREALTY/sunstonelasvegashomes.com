import type { BlogPost } from "@/lib/blog";

function stripMarkdown(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]+`/g, " ")
    .replace(/!\[[^\]]*]\([^)]+\)/g, " ")
    .replace(/\[[^\]]*]\([^)]+\)/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_~|-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function buildHaystack(post: BlogPost): string {
  return [
    post.data.title,
    post.data.description,
    post.data.tags.join(" "),
    stripMarkdown(post.content),
  ]
    .join(" ")
    .toLowerCase();
}

export function searchPosts(posts: BlogPost[], query: string): BlogPost[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) {
    return [];
  }

  const terms = normalizedQuery.split(/\s+/).filter(Boolean);

  return posts.filter(post => {
    const haystack = buildHaystack(post);
    return terms.every(term => haystack.includes(term));
  });
}

export function excerptForQuery(
  post: BlogPost,
  query: string,
  maxLength = 180,
): string | null {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) {
    return null;
  }

  const plain = stripMarkdown(post.content);
  const lowerPlain = plain.toLowerCase();
  const firstTerm = normalizedQuery.split(/\s+/).find(Boolean);
  if (!firstTerm) {
    return null;
  }

  const index = lowerPlain.indexOf(firstTerm);
  if (index === -1) {
    return post.data.description || null;
  }

  const start = Math.max(0, index - 60);
  const end = Math.min(plain.length, index + maxLength);
  const snippet = plain.slice(start, end).trim();

  if (snippet.length <= maxLength) {
    return snippet;
  }

  return `${snippet.slice(0, maxLength).trim()}…`;
}
