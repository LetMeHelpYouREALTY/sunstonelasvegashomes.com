import Link from "next/link";
import IconHash from "@/assets/icons/IconHash.svg";
import { cn } from "@/lib/utils";

type TagProps = {
  tag: string;
  tagName: string;
  size?: "sm" | "lg";
};

export function Tag({ tag, tagName, size = "sm" }: TagProps) {
  return (
    <li
      className={cn(
        "group inline-block group-hover:cursor-pointer",
        size === "sm" ? "my-1 underline-offset-4" : "mx-1 my-3 underline-offset-8",
      )}
    >
      <Link
        href={`/tags/${tag}/`}
        className={cn(
          "relative pr-2 text-lg underline decoration-dashed group-hover:-top-0.5 group-hover:text-accent focus-visible:p-1",
          { "text-sm": size === "sm" },
        )}
      >
        <IconHash
          className={cn("inline-block opacity-80", {
            "-mr-3.5 size-4": size === "sm",
            "-mr-5 size-6": size === "lg",
          })}
        />
        &nbsp;<span>{tagName}</span>
      </Link>
    </li>
  );
}
