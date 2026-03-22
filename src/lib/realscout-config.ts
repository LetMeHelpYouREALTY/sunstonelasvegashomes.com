/**
 * RealScout web components (em.realscout.com/widgets/realscout-web-components.umd.js).
 * `realscout-office-listings` supports: agent-encoded-id, listing-status, sort-order,
 * property-types, price-min, price-max, listing-date-start, listing-date-end,
 * include-seller-listings.
 * `realscout-advanced-search` supports: agent-encoded-id (+ theme CSS vars).
 */

const DEFAULT_AGENT_ENCODED_ID = "QWdlbnQtMjI1MDUw";

const trim = (v: string | undefined) => v?.trim() ?? "";

export function getRealScoutAgentEncodedId(): string {
  return (
    trim(import.meta.env.PUBLIC_REALSCOUT_AGENT_ENCODED_ID as string | undefined) ||
    DEFAULT_AGENT_ENCODED_ID
  );
}

/** Defaults tuned for Sunstone / Trilogy Sunset buyer traffic; override via PUBLIC_REALSCOUT_* env on Vercel. */
export function getOfficeListingsWidgetProps(): Record<string, string> {
  const id = getRealScoutAgentEncodedId();
  const out: Record<string, string> = {
    "agent-encoded-id": id,
    "sort-order":
      trim(import.meta.env.PUBLIC_REALSCOUT_SORT_ORDER as string | undefined) ||
      "PRICE_LOW",
    "listing-status":
      trim(import.meta.env.PUBLIC_REALSCOUT_LISTING_STATUS as string | undefined) ||
      "For Sale",
    "property-types":
      trim(import.meta.env.PUBLIC_REALSCOUT_PROPERTY_TYPES as string | undefined) ||
      ",SFR",
    "price-min":
      trim(import.meta.env.PUBLIC_REALSCOUT_PRICE_MIN as string | undefined) ||
      "500000",
    "price-max":
      trim(import.meta.env.PUBLIC_REALSCOUT_PRICE_MAX as string | undefined) ||
      "800000",
  };
  /** Only set when explicitly true—omit otherwise (safer than passing the string "false"). */
  const includeSeller = trim(
    import.meta.env.PUBLIC_REALSCOUT_INCLUDE_SELLER_LISTINGS as
      | string
      | undefined,
  );
  if (includeSeller === "true") {
    out["include-seller-listings"] = "true";
  }
  const dateStart = trim(
    import.meta.env.PUBLIC_REALSCOUT_LISTING_DATE_START as string | undefined,
  );
  const dateEnd = trim(
    import.meta.env.PUBLIC_REALSCOUT_LISTING_DATE_END as string | undefined,
  );
  if (dateStart) out["listing-date-start"] = dateStart;
  if (dateEnd) out["listing-date-end"] = dateEnd;
  return out;
}
