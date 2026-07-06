import { Hr } from "@/components/Hr";
import { Socials } from "@/components/Socials";
import { SITE } from "@/config";
import { getSiteContact } from "@/lib/site-contact";
import { cn } from "@/lib/utils";
import Link from "next/link";

type FooterProps = {
  noMarginTop?: boolean;
};

export function Footer({ noMarginTop = false }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const contact = getSiteContact();
  const hasAddress =
    contact.streetAddress.length > 0 && contact.postalCode.length > 0;
  const addressLine = hasAddress
    ? `${contact.streetAddress}, ${contact.addressLocality}, ${contact.addressRegion} ${contact.postalCode}`
    : "";

  return (
    <footer className={cn("w-full", !noMarginTop && "mt-auto")}>
      <Hr noPadding />
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-6 text-center sm:text-left">
        <div className="text-sm leading-relaxed">
          <p className="font-semibold text-foreground">{contact.agentName}</p>
          <p className="text-foreground/90">{contact.brokerageName}</p>
          <p className="mt-1 text-foreground/80">
            Nevada license {contact.licenseNumber}
          </p>
          {hasAddress && (
            <p className="mt-2 text-foreground/90">{addressLine}</p>
          )}
          {contact.telephone && (
            <p className="mt-2">
              <a
                className="font-medium text-accent underline-offset-2 hover:underline"
                href={`tel:${contact.telephone.replace(/\D/g, "")}`}
              >
                {contact.telephone}
              </a>
            </p>
          )}
          <p className="mt-2 text-foreground/80">{SITE.desc}</p>
          <div className="mt-3 flex flex-wrap justify-center gap-3 sm:justify-start">
            {contact.googleMapsUrl && (
              <a
                href={contact.googleMapsUrl}
                className="text-accent underline-offset-2 hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                Directions
              </a>
            )}
            {contact.googleReviewsUrl && (
              <a
                href={contact.googleReviewsUrl}
                className="text-accent underline-offset-2 hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                Google reviews
              </a>
            )}
            {contact.googleBusinessProfileUrl && (
              <a
                href={contact.googleBusinessProfileUrl}
                className="text-accent underline-offset-2 hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                Google Business Profile
              </a>
            )}
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
          <Socials centered />
          <div className="flex flex-col items-center whitespace-nowrap sm:items-start">
            <span>
              Copyright &#169; {currentYear} {SITE.title}
            </span>
            <span className="hidden sm:inline">&nbsp;|&nbsp;</span>
            <span>All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
