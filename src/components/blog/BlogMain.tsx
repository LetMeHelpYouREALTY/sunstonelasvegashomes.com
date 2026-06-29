"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

import Breadcrumb from "@/components/blog/Breadcrumb";
import RealScoutListingSection from "@/components/home/RealScoutListingSection";
import { SITE } from "@/config";

type BlogMainProps = {
  pageTitle: string | [string, string];
  pageDesc?: string;
  earlyListings?: boolean;
  children: ReactNode;
};

export default function BlogMain({
  pageTitle,
  pageDesc,
  earlyListings = true,
  children,
}: BlogMainProps) {
  const pathname = usePathname();
  const backUrl = SITE.showBackButton ? pathname : "/";

  useEffect(() => {
    sessionStorage.setItem("backUrl", backUrl);
  }, [backUrl]);

  return (
    <>
      <Breadcrumb />
      <main
        data-backurl={backUrl}
        id="main-content"
        className="mx-auto w-full max-w-3xl px-4 pb-4"
      >
        {Array.isArray(pageTitle) ? (
          <h1 className="text-2xl font-semibold sm:text-3xl">
            {pageTitle[0]}
            <span>{pageTitle[1]}</span>
          </h1>
        ) : (
          <h1 className="text-2xl font-semibold sm:text-3xl">{pageTitle}</h1>
        )}
        {pageDesc ? <p className="mt-2 mb-6 italic">{pageDesc}</p> : null}
        {earlyListings ? <RealScoutListingSection tightTop /> : null}
        {children}
      </main>
    </>
  );
}
