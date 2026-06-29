import { notFound } from "next/navigation";

import { SITE } from "@/config";
import { filterPublished, getAllPosts, getPostBySlug } from "@/lib/blog";
import { generateOgImageForPost } from "@/utils/generateOgImages";

type PostOgRouteProps = {
  params: Promise<{ segments?: string[] }>;
};

function isNumericPage(segment: string): boolean {
  return /^\d+$/.test(segment);
}

export async function generateStaticParams() {
  if (!SITE.dynamicOgImage) {
    return [];
  }

  const posts = filterPublished(await getAllPosts()).filter(
    post => !post.data.ogImage,
  );

  return posts.map(post => ({
    segments: post.id.split("/"),
  }));
}

export async function GET(_request: Request, { params }: PostOgRouteProps) {
  if (!SITE.dynamicOgImage) {
    return new Response("Not found", { status: 404 });
  }

  const { segments = [] } = await params;

  if (
    segments.length === 0 ||
    (segments.length === 1 && isNumericPage(segments[0]))
  ) {
    notFound();
  }

  const post = await getPostBySlug(segments.join("/"));

  if (!post || post.data.ogImage) {
    notFound();
  }

  const image = await generateOgImageForPost(post);

  return new Response(image, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400, immutable",
    },
  });
}
