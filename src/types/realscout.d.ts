import type { DetailedHTMLProps, HTMLAttributes } from "react";

type RealScoutElementProps = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
>;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "realscout-advanced-search": RealScoutElementProps & {
        "agent-encoded-id"?: string;
      };
      "realscout-office-listings": RealScoutElementProps & {
        "agent-encoded-id"?: string;
        "sort-order"?: string;
        "listing-status"?: string;
        "property-types"?: string;
        "price-min"?: string;
        "price-max"?: string;
        "listing-date-start"?: string;
        "listing-date-end"?: string;
        "include-seller-listings"?: string;
      };
    }
  }
}

export {};
