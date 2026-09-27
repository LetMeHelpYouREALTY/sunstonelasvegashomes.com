import Link from "next/link";
import { AmenityMap } from "@/components/amenities/AmenityMap";
import { COMMUNITY_MAP } from "@/lib/community-map";
import {
  getGoogleMapsApiKey,
  getGoogleMapsMapId,
} from "@/lib/google-maps-env";

type AmenityMapSectionProps = {
  /** e.g. "whats-nearby-heading" */
  headingId?: string;
  title?: string;
  intro?: string;
  showViewAllLink?: boolean;
  className?: string;
};

export function AmenityMapSection({
  headingId = "whats-nearby-heading",
  title = `Life near ${COMMUNITY_MAP.name}`,
  intro = `Explore grocery, healthcare, golf, parks, and everyday errands around ${COMMUNITY_MAP.shortName} in northwest Las Vegas. Filter the map, then open the full amenities guide for commute notes and FAQs.`,
  showViewAllLink = true,
  className = "",
}: AmenityMapSectionProps) {
  const apiKey = getGoogleMapsApiKey();
  const mapId = getGoogleMapsMapId();

  return (
    <section
      className={`mx-auto my-8 max-w-[1200px] rounded-2xl bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)] md:p-8 ${className}`}
      aria-labelledby={headingId}
    >
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <h2
            id={headingId}
            className="text-[1.35rem] font-semibold text-[#0a2540]"
          >
            {title}
          </h2>
          <p className="mt-2 text-[0.98rem] leading-relaxed text-[#0a2540]/90">
            {intro}
          </p>
        </div>
        {showViewAllLink ? (
          <Link
            href="/amenities/"
            className="shrink-0 font-semibold text-[#3a8dde] no-underline hover:underline"
          >
            Full nearby amenities guide →
          </Link>
        ) : null}
      </div>
      <AmenityMap apiKey={apiKey} mapId={mapId || undefined} variant="section" />
    </section>
  );
}
