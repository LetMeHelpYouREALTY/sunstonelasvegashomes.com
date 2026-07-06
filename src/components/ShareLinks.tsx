"use client";

import { usePathname } from "next/navigation";
import { LinkButton } from "@/components/LinkButton";
import { SHARE_LINKS } from "@/constants";

export function ShareLinks() {
  const pathname = usePathname() ?? "";
  const url =
    typeof window !== "undefined"
      ? window.location.origin + pathname
      : `https://www.sunstonelasvegashomes.com${pathname}`;

  return (
    <div className="flex flex-col flex-wrap items-center justify-center gap-1 sm:items-start">
      <span className="italic">Share this post on:</span>
      <div className="text-center">
        {SHARE_LINKS.map(social => (
          <LinkButton
            key={social.name}
            href={`${social.href}${encodeURIComponent(url)}`}
            className="scale-90 p-2 hover:rotate-6 sm:p-1"
            title={social.linkTitle}
          >
            <span className="sr-only">{social.linkTitle}</span>
            <span aria-hidden="true" className="text-xs font-semibold uppercase">
              {social.name.slice(0, 1)}
            </span>
          </LinkButton>
        ))}
      </div>
    </div>
  );
}
