import { getSocialLinks } from "@/lib/social-links";
import { cn } from "@/lib/utils";
import IconFacebook from "@/assets/icons/IconFacebook.svg";
import IconLinkedin from "@/assets/icons/IconLinkedin.svg";

type SocialsProps = {
  centered?: boolean;
};

const iconMap = {
  facebook: IconFacebook,
  linkedin: IconLinkedin,
} as const;

export function Socials({ centered = false }: SocialsProps) {
  const links = getSocialLinks();
  if (links.length === 0) return null;

  return (
    <ul
      className={cn(
        "flex flex-wrap gap-3",
        centered ? "justify-center" : "justify-start",
      )}
    >
      {links.map(link => {
        const Icon = iconMap[link.icon];
        return (
          <li key={link.name}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              title={link.linkTitle}
              aria-label={link.linkTitle}
              className="inline-flex p-1 hover:[&>svg]:stroke-accent"
            >
              <Icon className="size-6" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
