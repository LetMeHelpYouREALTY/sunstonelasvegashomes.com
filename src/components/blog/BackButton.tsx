"use client";

import { useEffect } from "react";

import LinkButton from "@/components/LinkButton";
import { SITE } from "@/config";

function IconChevronLeft({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

export default function BackButton() {
  useEffect(() => {
    const backButton = document.querySelector<HTMLAnchorElement>("#back-button");
    const backUrl = sessionStorage.getItem("backUrl");
    if (backUrl && backButton) {
      backButton.href = backUrl;
    }
  }, []);

  if (!SITE.showBackButton) {
    return null;
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl items-center justify-start px-2">
      <LinkButton
        id="back-button"
        href="/"
        className="focus-outline mt-8 mb-2 flex hover:text-foreground/75"
      >
        <IconChevronLeft className="inline-block size-6" />
        <span>Go back</span>
      </LinkButton>
    </div>
  );
}
