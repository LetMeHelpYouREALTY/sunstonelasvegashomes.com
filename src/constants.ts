/** Shape for footer/blog social icons. */
export type SocialLink = {
  name: string;
  href: string;
  linkTitle: string;
  icon: "facebook" | "linkedin";
};

export const SHARE_LINKS = [
  {
    name: "WhatsApp",
    href: "https://wa.me/?text=",
    linkTitle: "Share this post via WhatsApp",
    icon: "whatsapp",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/sharer.php?u=",
    linkTitle: "Share this post on Facebook",
    icon: "facebook",
  },
  {
    name: "X",
    href: "https://x.com/intent/post?url=",
    linkTitle: "Share this post on X",
    icon: "x",
  },
  {
    name: "Telegram",
    href: "https://t.me/share/url?url=",
    linkTitle: "Share this post via Telegram",
    icon: "telegram",
  },
  {
    name: "Pinterest",
    href: "https://pinterest.com/pin/create/button/?url=",
    linkTitle: "Share this post on Pinterest",
    icon: "pinterest",
  },
  {
    name: "Mail",
    href: "mailto:?subject=See%20this%20post&body=",
    linkTitle: "Share this post via email",
    icon: "mail",
  },
] as const;
