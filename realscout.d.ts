import "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "realscout-advanced-search": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { "agent-encoded-id"?: string },
        HTMLElement
      >;
      "realscout-office-listings": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
