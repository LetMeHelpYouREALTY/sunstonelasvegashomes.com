"use client";

import { useEffect } from "react";

import {
  getOfficeListingsWidgetProps,
  getRealScoutAgentEncodedId,
} from "@/lib/realscout-config";

const REALSCOUT_WIDGET_SCRIPT =
  "https://em.realscout.com/widgets/realscout-web-components.umd.js";

function escapeAttribute(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function serializeAttributes(attributes: Record<string, string>): string {
  return Object.entries(attributes)
    .map(([key, value]) => `${key}="${escapeAttribute(value)}"`)
    .join(" ");
}

export default function RealScoutWidgets() {
  const agentEncodedId = getRealScoutAgentEncodedId();
  const officeListingsProps = getOfficeListingsWidgetProps();

  useEffect(() => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[data-realscout-widgets="true"]',
    );

    if (existingScript) {
      return;
    }

    const script = document.createElement("script");
    script.src = REALSCOUT_WIDGET_SCRIPT;
    script.type = "module";
    script.dataset.realscoutWidgets = "true";
    document.body.appendChild(script);
  }, []);

  return (
    <>
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

      <div
        dangerouslySetInnerHTML={{
          __html: `<realscout-advanced-search agent-encoded-id="${escapeAttribute(agentEncodedId)}"></realscout-advanced-search>`,
        }}
      />

      <h3
        className="mb-3 text-center text-lg font-semibold text-foreground"
        id="browse-listings-grid-heading"
      >
        Featured homes
      </h3>
      <p className="mb-4 text-center text-sm text-foreground/80">
        Office listings from RealScout in your default range. Adjust filters in
        the widget to match your budget and timeline. Highlights are set in
        RealScout; this grid reflects your office search rules.
      </p>

      <div
        dangerouslySetInnerHTML={{
          __html: `<realscout-office-listings ${serializeAttributes(officeListingsProps)}></realscout-office-listings>`,
        }}
      />
    </>
  );
}
