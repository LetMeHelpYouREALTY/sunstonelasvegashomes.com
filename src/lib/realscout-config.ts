/**
 * RealScout web components (em.realscout.com/widgets/realscout-web-components.umd.js).
 */

import { publicEnv } from "@/lib/env";

const DEFAULT_AGENT_ENCODED_ID = "QWdlbnQtMjI1MDUw";

const trim = (v: string | undefined) => v?.trim() ?? "";

export function getRealScoutAgentEncodedId(): string {
  return trim(publicEnv("REALSCOUT_AGENT_ENCODED_ID")) || DEFAULT_AGENT_ENCODED_ID;
}

export function getOfficeListingsWidgetProps(): Record<string, string> {
  const id = getRealScoutAgentEncodedId();
  const out: Record<string, string> = {
    "agent-encoded-id": id,
    "sort-order": trim(publicEnv("REALSCOUT_SORT_ORDER")) || "PRICE_LOW",
    "listing-status": trim(publicEnv("REALSCOUT_LISTING_STATUS")) || "For Sale",
    "property-types": trim(publicEnv("REALSCOUT_PROPERTY_TYPES")) || ",SFR",
    "price-min": trim(publicEnv("REALSCOUT_PRICE_MIN")) || "500000",
    "price-max": trim(publicEnv("REALSCOUT_PRICE_MAX")) || "800000",
  };
  const includeSeller = trim(publicEnv("REALSCOUT_INCLUDE_SELLER_LISTINGS"));
  if (includeSeller === "true") {
    out["include-seller-listings"] = "true";
  }
  const dateStart = trim(publicEnv("REALSCOUT_LISTING_DATE_START"));
  const dateEnd = trim(publicEnv("REALSCOUT_LISTING_DATE_END"));
  if (dateStart) out["listing-date-start"] = dateStart;
  if (dateEnd) out["listing-date-end"] = dateEnd;
  return out;
}
