import { CCSD_ZONING_LOOKUP_URL } from "@/lib/calendly-links";

/**
 * One short resale-context paragraph (2026-11-09 weekly ship).
 * Sources: Lennar newsroom 2019-10-15; lennar.com Sunstone; City of Las Vegas Sunstone planning exhibit A (2019).
 */
export function SunstoneResaleBlurb() {
  return (
    <p className="mx-auto mt-4 max-w-[36rem] text-[0.98rem] leading-relaxed opacity-90">
      Sunstone resale homes on MLS are primarily in ZIP{" "}
      <strong>89143</strong>, off US-95 near the Kyle Canyon Rd / O&apos;Hare Rd
      corridor (City of Las Vegas Sunstone planning exhibit, 2019; lennar.com
      visitor address, verified 2026-11-09). The masterplan includes work from
      Lennar, Shea Homes, and Woodside Homes (Lennar newsroom, 2019-10-15), with
      community parks and trails such as Sun Mountain Park and Nature Paseo noted
      on lennar.com. Assigned schools vary by address—lennar.com lists{" "}
      <a
        href={CCSD_ZONING_LOOKUP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold underline underline-offset-2"
      >
        William &amp; Mary Scherkenbach Elementary
      </a>
      , James Bilbray Elementary, Ralph Cadwallader Middle, and Arbor View High;
      confirm assignment with the{" "}
      <a
        href={CCSD_ZONING_LOOKUP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold underline underline-offset-2"
      >
        CCSD zoning lookup
      </a>
      .
    </p>
  );
}
