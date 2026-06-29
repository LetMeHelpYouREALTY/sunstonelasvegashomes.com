import Link from "next/link";

import Datetime from "@/components/Datetime";
import type { BlogPost } from "@/lib/blog";
import { getPath } from "@/utils/getPath";
import { slugifyStr } from "@/utils/slugify";

type CardProps = {
  post: BlogPost;
  variant?: "h2" | "h3";
};

export default function Card({ post, variant = "h2" }: CardProps) {
  const { title, description, pubDatetime, modDatetime, timezone } = post.data;
  const href = getPath(post.id, post.filePath);
  const Heading = variant === "h2" ? "h2" : "h3";

  return (
    <li className="my-6">
      <Link
        href={href}
        className="inline-block text-lg font-medium text-accent decoration-dashed underline-offset-4 hover:underline focus-visible:no-underline focus-visible:underline-offset-0"
      >
        <Heading
          className="text-lg font-medium decoration-dashed hover:underline"
          style={{ viewTransitionName: slugifyStr(title) }}
        >
          {title}
        </Heading>
      </Link>
      <Datetime
        pubDatetime={pubDatetime}
        modDatetime={modDatetime}
        timezoneName={timezone}
      />
      <p>{description}</p>
    </li>
  );
}
