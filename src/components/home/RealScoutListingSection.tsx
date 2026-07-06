"use client";

import {
  getOfficeListingsWidgetProps,
  getRealScoutAgentEncodedId,
} from "@/lib/realscout-config";
import { cn } from "@/lib/utils";

type RealScoutListingSectionProps = {
  tightTop?: boolean;
};

export function RealScoutListingSection({
  tightTop = false,
}: RealScoutListingSectionProps) {
  const realScoutAgentEncodedId = getRealScoutAgentEncodedId();
  const officeListingsProps = getOfficeListingsWidgetProps();

  return (
    <section
      id="browse-listings"
      className={cn(
        "rs-footer-widget mx-auto max-w-3xl scroll-mt-8 px-4 pb-12",
        tightTop ? "pt-4 md:pt-6" : "pt-8",
      )}
      aria-label="MLS home search and AI-assisted search"
    >
      <style jsx global>{`
        realscout-advanced-search {
          --rs-as-background-color: transparent;
          --rs-as-button-color: #0a2540;
          --rs-as-button-text-color: #ffffff;
          --rs-as-font-family: ui-monospace, SFMono-Regular, Menlo, Monaco,
            Consolas, "Liberation Mono", "Courier New", monospace;
          --rs-as-widget-width: 100%;
          display: block;
          margin-bottom: 2rem;
        }
        realscout-office-listings {
          --rs-listing-divider-color: #0e64c8;
          --rs-wc-font-family: ui-monospace, SFMono-Regular, Menlo, Monaco,
            Consolas, "Liberation Mono", "Courier New", monospace;
          width: 100%;
        }
      `}</style>
      <h2 className="mb-2 text-center text-xl font-semibold text-foreground">
        Search homes for sale
      </h2>
      <p className="mb-4 text-center text-sm text-foreground/85">
        Describe what you want in plain language, then browse live MLS listings for
        Las Vegas and Henderson—filter by price, beds, and more. Listings update as
        the market changes.
      </p>
      <realscout-advanced-search agent-encoded-id={realScoutAgentEncodedId} />
      <h3
        className="mb-3 text-center text-lg font-semibold text-foreground"
        id="browse-listings-grid-heading"
      >
        Featured homes
      </h3>
      <p className="mb-4 text-center text-sm text-foreground/80">
        Office listings from RealScout in your default range—adjust filters in the
        widget to match your budget and timeline. Highlights are set in RealScout;
        this grid reflects your office search rules.
      </p>
      <realscout-office-listings {...officeListingsProps} />
    </section>
  );
}
