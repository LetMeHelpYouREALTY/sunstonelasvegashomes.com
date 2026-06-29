import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";

type LinkButtonProps = {
  id?: string;
  href: string;
  className?: string;
  ariaLabel?: string;
  title?: string;
  disabled?: boolean;
  target?: string;
  rel?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  children: ReactNode;
};

function isInternalHref(href: string): boolean {
  return href.startsWith("/") || href.startsWith("#");
}

export default function LinkButton({
  id,
  href,
  className = "",
  ariaLabel,
  title,
  disabled = false,
  target,
  rel,
  onClick,
  children,
}: LinkButtonProps) {
  if (disabled) {
    return (
      <span
        id={id}
        className={`group inline-block ${className}`}
        title={title}
        aria-disabled="true"
      >
        {children}
      </span>
    );
  }

  const sharedClassName = `group inline-block hover:text-accent ${className}`.trim();

  if (isInternalHref(href)) {
    return (
      <Link
        id={id}
        href={href}
        className={sharedClassName}
        aria-label={ariaLabel}
        title={title}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }

  return (
    <a
      id={id}
      href={href}
      className={sharedClassName}
      aria-label={ariaLabel}
      title={title}
      target={target}
      rel={rel}
      onClick={onClick}
    >
      {children}
    </a>
  );
}
