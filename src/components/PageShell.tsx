import type { ReactNode } from "react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MobileHomeBuyerBar from "@/components/MobileHomeBuyerBar";

type PageShellProps = {
  children: ReactNode;
  showMobileHomeBuyerBar?: boolean;
  mobileHomeBuyerBarTelHref?: string;
  className?: string;
  bare?: boolean;
};

export function getTelHref(telephone: string): string {
  return telephone ? `tel:${telephone.replace(/\D/g, "")}` : "";
}

export default function PageShell({
  children,
  showMobileHomeBuyerBar = true,
  mobileHomeBuyerBarTelHref,
  className = "",
  bare = false,
}: PageShellProps) {
  const mainClassName = bare
    ? `pb-[calc(5rem+env(safe-area-inset-bottom,0px))] md:pb-0 ${className}`.trim()
    : `marketing-surface slv-page slv-mobile-pad min-h-[50vh] ${className}`.trim();

  return (
    <>
      <Header />
      <main id="main-content" className={mainClassName}>
        {children}
        {showMobileHomeBuyerBar ? (
          <MobileHomeBuyerBar telHref={mobileHomeBuyerBarTelHref} />
        ) : null}
      </main>
      <Footer />
    </>
  );
}
