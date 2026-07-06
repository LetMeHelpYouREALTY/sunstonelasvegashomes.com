import Link from "next/link";
import type { BlogPost } from "@/lib/posts";
import { getPath } from "@/utils/getPath";
import { slugifyStr } from "@/utils/slugify";
import { Datetime } from "@/components/Datetime";

type CardProps = BlogPost & {
  variant?: "h2" | "h3";
};

export function Card({ variant = "h2", data, id, filePath }: CardProps) {
  const { title, description, pubDatetime, modDatetime, timezone } = data;
  const href = getPath(id, filePath);
  const headerStyle = { viewTransitionName: slugifyStr(title) } as React.CSSProperties;

  const Heading = variant === "h2" ? "h2" : "h3";

  return (
    <li className="my-6">
      <Link
        href={href}
        className="inline-block text-lg font-medium text-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
      >
        <Heading
          style={headerStyle}
          className="text-lg font-medium decoration-dashed hover:underline"
        >
          {title}
        </Heading>
      </Link>
      <Datetime pubDatetime={pubDatetime} modDatetime={modDatetime} timezone={timezone} />
      <p>{description}</p>
    </li>
  );
}
