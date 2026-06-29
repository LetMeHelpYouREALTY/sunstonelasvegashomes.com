import Link from "next/link";

import Hr from "@/components/Hr";
import { SITE } from "@/config";
import { getSiteContact } from "@/lib/site-contact";

type FooterProps = {
  noMarginTop?: boolean;
};

type SocialLink = {
  href: string;
  label: string;
  icon: ({ className }: { className?: string }) => React.JSX.Element;
};

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M13.5 22v-8.1h2.7l.4-3.1h-3.1V8.8c0-.9.3-1.6 1.7-1.6H16.7V4.4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.2H7.2v3.1H10V22h3.5Z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M6.8 8.7H3.5V20h3.3V8.7Zm.2-3.5a1.9 1.9 0 1 0-3.9 0 1.9 1.9 0 0 0 3.9 0ZM20.5 20v-6.3c0-3.4-1.8-5-4.2-5-1.9 0-2.8 1.1-3.2 1.8h-.1V8.7H9.8c0 1.2 0 11.3 0 11.3H13v-6.3c0-.3 0-.7.1-.9.2-.7.8-1.5 1.9-1.5 1.4 0 2 1.1 2 2.8V20h3.5Z" />
    </svg>
  );
}

export default function Footer({ noMarginTop = false }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const contact = getSiteContact();
  const hasAddress =
    contact.streetAddress.length > 0 && contact.postalCode.length > 0;
  const addressLine = hasAddress
    ? `${contact.streetAddress}, ${contact.addressLocality}, ${contact.addressRegion} ${contact.postalCode}`
    : "";

  const socialLinks = [
    contact.socialFacebookUrl
      ? {
          href: contact.socialFacebookUrl,
          label: `${SITE.title} on Facebook`,
          icon: FacebookIcon,
        }
      : null,
    contact.socialLinkedInUrl
      ? {
          href: contact.socialLinkedInUrl,
          label: `${SITE.title} on LinkedIn`,
          icon: LinkedInIcon,
        }
      : null,
  ].filter((value): value is SocialLink => value !== null);

  return (
    <footer className={noMarginTop ? "w-full" : "mt-auto w-full"}>
      <Hr noPadding />
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-6 text-center sm:text-left">
        <div className="text-sm leading-relaxed">
          <p className="font-semibold text-foreground">{contact.agentName}</p>
          <p className="text-foreground/90">{contact.brokerageName}</p>
          <p className="mt-1 text-foreground/80">
            Nevada license {contact.licenseNumber}
          </p>

          {hasAddress ? (
            <p className="mt-2 text-foreground/90">{addressLine}</p>
          ) : null}

          {contact.telephone ? (
            <p className="mt-2">
              <a
                className="font-medium text-accent underline-offset-2 hover:underline"
                href={`tel:${contact.telephone.replace(/\D/g, "")}`}
              >
                {contact.telephone}
              </a>
            </p>
          ) : null}

          <p className="mt-2 text-foreground/80">{SITE.desc}</p>

          <div className="mt-3 flex flex-wrap justify-center gap-3 sm:justify-start">
            {contact.googleMapsUrl ? (
              <a
                href={contact.googleMapsUrl}
                className="text-accent underline-offset-2 hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                Directions
              </a>
            ) : null}

            {contact.googleReviewsUrl ? (
              <a
                href={contact.googleReviewsUrl}
                className="text-accent underline-offset-2 hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                Google reviews
              </a>
            ) : null}

            {contact.googleBusinessProfileUrl ? (
              <a
                href={contact.googleBusinessProfileUrl}
                className="text-accent underline-offset-2 hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                Google Business Profile
              </a>
            ) : null}
          </div>

          <p className="mt-3 flex flex-wrap justify-center gap-x-3 gap-y-1 text-sm sm:justify-start">
            <Link href="/contact/" className="text-accent underline-offset-2 hover:underline">
              Contact
            </Link>
            <span className="text-foreground/40" aria-hidden="true">
              |
            </span>
            <Link href="/sellers/" className="text-accent underline-offset-2 hover:underline">
              Sellers
            </Link>
            <span className="text-foreground/40" aria-hidden="true">
              |
            </span>
            <Link href="/privacy/" className="text-accent underline-offset-2 hover:underline">
              Privacy
            </Link>
          </p>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row-reverse sm:items-start">
          {socialLinks.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  aria-label={label}
                  className="inline-flex items-center justify-center rounded-md p-2 text-foreground/90 hover:text-accent"
                >
                  <Icon className="size-5" />
                </a>
              ))}
            </div>
          ) : null}

          <div className="flex flex-col items-center whitespace-nowrap sm:items-start">
            <span>
              Copyright &#169; {currentYear} {SITE.title}
            </span>
            <span>All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
