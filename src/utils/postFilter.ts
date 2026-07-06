import type { BlogPost } from "@/lib/posts";
import { SITE } from "@/config";
import { isDev } from "@/lib/env";

const postFilter = (post: BlogPost) => {
  const isPublishTimePassed =
    Date.now() >
    new Date(post.data.pubDatetime).getTime() - SITE.scheduledPostMargin;
  return !post.data.draft && (isDev() || isPublishTimePassed);
};

export default postFilter;
