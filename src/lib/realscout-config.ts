/**
 * RealScout web components (em.realscout.com/widgets/realscout-web-components.umd.js).
 * `realscout-office-listings` supports: agent-encoded-id, listing-status, sort-order,
 * property-types, price-min, price-max, listing-date-start, listing-date-end,
 * include-seller-listings.
 * `realscout-advanced-search` supports: agent-encoded-id (+ theme CSS vars).
 */

import { getPublicEnv } from "@/lib/env";

const DEFAULT_AGENT_ENCODED_ID = "QWdlbnQtMjI1MDUw";

const trim = (v: string | undefined) => v?.trim() ?? "";

export function getRealScoutAgentEncodedId(): string {
  return trim(getPublicEnv("REALSCOUT_AGENT_ENCODED_ID")) || DEFAULT_AGENT_ENCODED_ID;
}

/** Defaults tuned for Sunstone / Trilogy Sunset buyer traffic; override via public env on Vercel. */
export function getOfficeListingsWidgetProps(): Record<string, string> {
  const id = getRealScoutAgentEncodedId();
  const out: Record<string, string> = {
    "agent-encoded-id": id,
    "sort-order": trim(getPublicEnv("REALSCOUT_SORT_ORDER")) || "PRICE_LOW",
    "listing-status":
      trim(getPublicEnv("REALSCOUT_LISTING_STATUS")) || "For Sale",
    "property-types": trim(getPublicEnv("REALSCOUT_PROPERTY_TYPES")) || ",SFR",
    "price-min": trim(getPublicEnv("REALSCOUT_PRICE_MIN")) || "500000",
    "price-max": trim(getPublicEnv("REALSCOUT_PRICE_MAX")) || "800000",
  };
  /** Only set when explicitly true—omit otherwise (safer than passing the string "false"). */
  const includeSeller = trim(getPublicEnv("REALSCOUT_INCLUDE_SELLER_LISTINGS"));
  if (includeSeller === "true") {
    out["include-seller-listings"] = "true";
  }
  const dateStart = trim(getPublicEnv("REALSCOUT_LISTING_DATE_START"));
  const dateEnd = trim(getPublicEnv("REALSCOUT_LISTING_DATE_END"));
  if (dateStart) out["listing-date-start"] = dateStart;
  if (dateEnd) out["listing-date-end"] = dateEnd;
  return out;
}
