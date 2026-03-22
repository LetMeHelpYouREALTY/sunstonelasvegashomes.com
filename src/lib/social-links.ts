import IconFacebook from "@/assets/icons/IconFacebook.svg";
import IconLinkedin from "@/assets/icons/IconLinkedin.svg";
import { SITE } from "@/config";
import type { SocialLink } from "@/constants";

/**
 * GBP-aligned profile URLs from env (set on Vercel). Icons match common
 * Berkshire Hathaway / agent profiles.
 */
export function getSocialLinks(): SocialLink[] {
  const links: SocialLink[] = [];
  const facebook = (
    import.meta.env.PUBLIC_SOCIAL_FACEBOOK as string | undefined
  )?.trim();
  if (facebook) {
    links.push({
      name: "Facebook",
      href: facebook,
      linkTitle: `${SITE.title} on Facebook`,
      icon: IconFacebook,
    });
  }
  const linkedin = (
    import.meta.env.PUBLIC_SOCIAL_LINKEDIN as string | undefined
  )?.trim();
  if (linkedin) {
    links.push({
      name: "LinkedIn",
      href: linkedin,
      linkTitle: `${SITE.title} on LinkedIn`,
      icon: IconLinkedin,
    });
  }
  return links;
}
