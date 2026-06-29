import type { ReactNode } from "react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MobileHomeBuyerBar from "@/components/MobileHomeBuyerBar";
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
    <>
      <Header />
      <main
        id="main-content"
        className="marketing-surface slv-page slv-mobile-pad"
      >
        {children}
      </main>
      {showMobileHomeBuyerBar ? (
        <MobileHomeBuyerBar telHref={mobileHomeBuyerBarTelHref} />
      ) : null}
      {!omitListingsFooter ? <RealScoutListingSection /> : null}
      <Footer noMarginTop={footerNoMarginTop} />
    </>
  );
}
