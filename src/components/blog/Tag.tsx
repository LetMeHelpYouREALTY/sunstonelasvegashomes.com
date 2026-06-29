import Link from "next/link";

type TagProps = {
  tag: string;
  tagName: string;
  size?: "sm" | "lg";
};

function IconHash({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18" />
    </svg>
  );
}

export default function Tag({ tag, tagName, size = "sm" }: TagProps) {
  return (
    <li
      className={`group inline-block group-hover:cursor-pointer ${
        size === "sm" ? "my-1 underline-offset-4" : "mx-1 my-3 underline-offset-8"
      }`}
    >
      <Link
        href={`/tags/${tag}/`}
        className={`relative pr-2 text-lg underline decoration-dashed group-hover:-top-0.5 group-hover:text-accent focus-visible:p-1 ${
          size === "sm" ? "text-sm" : ""
        }`}
      >
        <IconHash
          className={`inline-block opacity-80 ${
            size === "sm" ? "-mr-3.5 size-4" : "-mr-5 size-6"
          }`}
        />
        &nbsp;<span>{tagName}</span>
      </Link>
    </li>
  );
}
