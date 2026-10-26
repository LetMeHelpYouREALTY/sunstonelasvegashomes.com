import { COMMUNITY_MAP, googleMapsEmbedUrl } from "@/lib/community-map";
import { StaticAmenityList } from "@/components/amenities/StaticAmenityList";
import type { AmenityCategoryId } from "@/lib/community-map";

type AmenityMapFallbackProps = {
  activeCategory?: AmenityCategoryId;
  showFullList?: boolean;
  mapHeightClass?: string;
};

export function AmenityMapFallback({
  activeCategory,
  showFullList = false,
  mapHeightClass = "h-[min(420px,60vh)]",
}: AmenityMapFallbackProps) {
  const embedSrc = googleMapsEmbedUrl(
    COMMUNITY_MAP.latitude,
    COMMUNITY_MAP.longitude,
  );

  return (
    <div className="flex flex-col gap-4">
      <div
        className={`relative w-full overflow-hidden rounded-xl border border-[rgba(10,37,64,0.12)] bg-[#e8eef5] ${mapHeightClass}`}
        aria-label={`Map centered on ${COMMUNITY_MAP.name}`}
      >
        <iframe
          title={`Map of ${COMMUNITY_MAP.name}, ${COMMUNITY_MAP.city}`}
          src={embedSrc}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <p className="m-0 text-sm text-[#0a2540]/85">
        Verified nearby places for this area are listed below—open directions in
        Google Maps for current hours.
      </p>
      <StaticAmenityList
        category={showFullList ? undefined : activeCategory}
        limit={showFullList ? undefined : 6}
      />
    </div>
  );
}
