import { Footer } from "@/components/Footer";
import { RealScoutListingSection } from "@/components/home/RealScoutListingSection";

type PageChromeProps = {
  omitListingsFooter?: boolean;
  footerNoMarginTop?: boolean;
};

export function PageChrome({
  omitListingsFooter = false,
  footerNoMarginTop = false,
}: PageChromeProps) {
  return (
    <>
      {!omitListingsFooter && <RealScoutListingSection />}
      <Footer noMarginTop={footerNoMarginTop} />
    </>
  );
}
