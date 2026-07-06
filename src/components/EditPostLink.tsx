import Link from "next/link";
import IconEdit from "@/assets/icons/IconEdit.svg";
import { SITE } from "@/config";
import type { BlogPost } from "@/lib/posts";
import { cn } from "@/lib/utils";

type EditPostLinkProps = {
  post: BlogPost;
  hideEditPost?: boolean;
  className?: string;
};

export function EditPostLink({ post, hideEditPost, className }: EditPostLinkProps) {
  const href = `${SITE.editPost.url}${post.filePath}`;
  const showEditPost =
    SITE.editPost.enabled && !hideEditPost && href.trim() !== "";

  if (!showEditPost) return null;

  return (
    <div className={cn("opacity-80", className)}>
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
        <span className="italic max-sm:text-sm sm:inline">{SITE.editPost.text}</span>
      </a>
    </div>
  );
}
