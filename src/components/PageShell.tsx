import type { ReactNode } from "react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MobileHomeBuyerBar from "@/components/MobileHomeBuyerBar";

type PageShellProps = {
  children: ReactNode;
  showMobileHomeBuyerBar?: boolean;
  mobileHomeBuyerBarTelHref?: string;
  className?: string;
};

export function getTelHref(telephone: string): string {
  return telephone ? `tel:${telephone.replace(/\D/g, "")}` : "";
}

export default function PageShell({
  children,
  showMobileHomeBuyerBar = true,
  mobileHomeBuyerBarTelHref,
  className = "",
}: PageShellProps) {
  return (
    <>
      <Header />
      <main
        id="main-content"
        className={`pb-[calc(5rem+env(safe-area-inset-bottom,0px))] md:pb-0 ${className}`.trim()}
      >
        {children}
        {showMobileHomeBuyerBar ? (
          <MobileHomeBuyerBar telHref={mobileHomeBuyerBarTelHref} />
        ) : null}
      </main>
      <Footer />
    </>
  );
}
