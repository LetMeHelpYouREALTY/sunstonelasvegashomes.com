import type { ReactNode } from "react";

type CalendlyOutboundLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

/** Plain Calendly link with screen-reader new-tab notice (ship rule). */
export function CalendlyOutboundLink({
  href,
  className,
  children,
}: CalendlyOutboundLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
      <span className="sr-only"> (opens Calendly in a new tab)</span>
    </a>
  );
}
