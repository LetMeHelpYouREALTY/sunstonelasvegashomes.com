"use client";

import { useEffect } from "react";
import Link from "next/link";
import IconChevronLeft from "@/assets/icons/IconChevronLeft.svg";
import { SITE } from "@/config";

export function PostBackButton() {
  useEffect(() => {
    const backButton = document.querySelector<HTMLAnchorElement>("#back-button");
    const backUrl = sessionStorage.getItem("backUrl");
    if (backUrl && backButton) {
      backButton.href = backUrl;
    }
  }, []);

  if (!SITE.showBackButton) return null;

  return (
    <div className="mx-auto flex w-full max-w-3xl items-center justify-start px-2">
      <Link
        id="back-button"
        href="/"
        className="focus-outline mt-8 mb-2 inline-flex items-center gap-1 font-semibold text-accent hover:text-foreground/75"
      >
        <IconChevronLeft className="inline-block size-6" />
        <span>Go back</span>
      </Link>
    </div>
  );
}

type BlogPostCtaProps = {
  telephone?: string;
};

export function BlogPostCta({ telephone }: BlogPostCtaProps) {
  const telHref = telephone ? `tel:${telephone.replace(/\D/g, "")}` : "";

  return (
    <aside
      className="not-prose my-10 rounded-xl border border-border bg-muted/40 px-5 py-6 text-foreground"
      aria-labelledby="post-cta-heading"
    >
      <h2 id="post-cta-heading" className="mb-2 text-lg font-semibold text-accent">
        Looking for homes in Sunstone or Trilogy Sunset?
      </h2>
      <p className="mb-4 text-sm leading-relaxed text-foreground/90">
        Browse live MLS listings on this site, then reach out when you are ready to
        tour or compare options with Dr. Jan Duffy.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <Link
          href="/#browse-listings"
          className="inline-flex items-center justify-center rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-background no-underline hover:opacity-90"
        >
          Search MLS listings
        </Link>
        {telHref && (
          <a
            href={telHref}
            className="inline-flex items-center justify-center rounded-md border-2 border-accent px-4 py-2.5 text-sm font-semibold text-accent no-underline hover:bg-accent/10"
          >
            Call {telephone}
          </a>
        )}
        <Link
          href="/about/"
          className="text-sm font-medium text-accent underline-offset-2 hover:underline"
        >
          About Dr. Jan Duffy
        </Link>
      </div>
    </aside>
  );
}
