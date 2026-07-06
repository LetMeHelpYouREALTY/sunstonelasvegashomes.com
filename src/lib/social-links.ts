import { SITE } from "@/config";
import { publicEnv } from "@/lib/env";
import type { SocialLink } from "@/constants";

export function getSocialLinks(): SocialLink[] {
  const links: SocialLink[] = [];
  const facebook = publicEnv("SOCIAL_FACEBOOK");
  if (facebook) {
    links.push({
      name: "Facebook",
      href: facebook,
      linkTitle: `${SITE.title} on Facebook`,
      icon: "facebook",
    });
  }
  const linkedin = publicEnv("SOCIAL_LINKEDIN");
  if (linkedin) {
    links.push({
      name: "LinkedIn",
      href: linkedin,
      linkTitle: `${SITE.title} on LinkedIn`,
      icon: "linkedin",
    });
  }
  return links;
}
