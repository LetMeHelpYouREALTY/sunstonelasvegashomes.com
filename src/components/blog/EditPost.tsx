import path from "node:path";

import type { BlogPost } from "@/lib/blog";
import { SITE } from "@/config";

type EditPostProps = {
  post: BlogPost;
  hideEditPost?: boolean;
  className?: string;
};

function IconEdit({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

export default function EditPost({
  post,
  hideEditPost = false,
  className = "",
}: EditPostProps) {
  const relativePath = path.relative(process.cwd(), post.filePath).replace(/\\/g, "/");
  const href = `${SITE.editPost.url}${relativePath}`;
  const showEditPost =
    SITE.editPost.enabled && !hideEditPost && href.trim() !== "";

  if (!showEditPost) {
    return null;
  }

  return (
    <div className={`opacity-80 ${className}`.trim()}>
      <span aria-hidden="true" className="max-sm:hidden">
        |
      </span>
      <a
        className="space-x-1.5 hover:opacity-75"
        href={href}
        rel="noopener noreferrer"
        target="_blank"
      >
        <IconEdit className="inline-block size-6" />
        <span className="italic max-sm:text-sm sm:inline">
          {SITE.editPost.text}
        </span>
      </a>
    </div>
  );
}
