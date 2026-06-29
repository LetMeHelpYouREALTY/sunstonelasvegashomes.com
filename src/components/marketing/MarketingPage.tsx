"use client";

import type { ReactNode } from "react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MobileHomeBuyerBar from "@/components/MobileHomeBuyerBar";
import ThemeProvider from "@/components/ThemeProvider";
import RealScoutListingSection from "@/components/home/RealScoutListingSection";

type MarketingPageProps = {
  children: ReactNode;
  showMobileHomeBuyerBar?: boolean;
  mobileHomeBuyerBarTelHref?: string;
  omitListingsFooter?: boolean;
  footerNoMarginTop?: boolean;
};

export default function MarketingPage({
  children,
  showMobileHomeBuyerBar = false,
  mobileHomeBuyerBarTelHref,
  omitListingsFooter = false,
  footerNoMarginTop = false,
}: MarketingPageProps) {
  return (
    <ThemeProvider>
      <Header />
      <main id="main-content" className="marketing-surface slv-page slv-mobile-pad">
        {children}
      </main>
      {showMobileHomeBuyerBar ? (
        <MobileHomeBuyerBar telHref={mobileHomeBuyerBarTelHref} />
      ) : null}
      {!omitListingsFooter ? <RealScoutListingSection /> : null}
      <Footer noMarginTop={footerNoMarginTop} />

      <style jsx global>{`
        .slv-page {
          width: 100%;
          max-width: 100%;
          padding-top: 0;
          padding-bottom: 0;
        }

        .slv-mobile-pad {
          padding-bottom: calc(5rem + env(safe-area-inset-bottom, 0px));
        }

        @media (min-width: 768px) {
          .slv-mobile-pad {
            padding-bottom: 0;
          }
        }
      `}</style>
    </ThemeProvider>
  );
}
