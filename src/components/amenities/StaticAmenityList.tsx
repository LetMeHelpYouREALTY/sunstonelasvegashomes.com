import {
  CURATED_AMENITIES,
  type CuratedAmenity,
} from "@/data/nearby-amenities-curated";
import type { AmenityCategoryId } from "@/lib/community-map";

type StaticAmenityListProps = {
  category?: AmenityCategoryId;
  limit?: number;
  className?: string;
};

function formatAddress(item: CuratedAmenity): string {
  const zip = item.postalCode ? ` ${item.postalCode}` : "";
  if (item.address) {
    return `${item.address}, ${item.locality}, ${item.region}${zip}`;
  }
  return `${item.locality}, ${item.region}${zip}`;
}

export function StaticAmenityList({
  category,
  limit,
  className = "",
}: StaticAmenityListProps) {
  let items = category
    ? CURATED_AMENITIES.filter(a => a.category === category)
    : [...CURATED_AMENITIES];
  if (limit !== undefined) {
    items = items.slice(0, limit);
  }

  if (items.length === 0) {
    return (
      <p className="text-sm text-[#0a2540]/80">
        Curated picks for this category are being updated—use the map filters when
        the interactive map is available.
      </p>
    );
  }

  return (
    <ul className={`m-0 flex list-none flex-col gap-3 p-0 ${className}`}>
      {items.map(item => {
        const address = formatAddress(item);
        const mapsSearch = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          `${item.name} ${address}`,
        )}`;
        return (
          <li
            key={`${item.name}-${item.address ?? item.sourceUrl}`}
            className="rounded-xl border border-[rgba(10,37,64,0.08)] bg-[#f7f9fc] p-4 text-[#0a2540]"
          >
            <p className="m-0 font-semibold">{item.name}</p>
            <p className="m-0 mt-1 text-sm leading-relaxed opacity-90">{address}</p>
            {item.note ? (
              <p className="m-0 mt-2 text-sm leading-relaxed opacity-85">
                {item.note}
              </p>
            ) : null}
            <a
              href={mapsSearch}
              className="mt-2 inline-block text-sm font-semibold text-[#3a8dde] underline-offset-2 hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              Directions
            </a>
          </li>
        );
      })}
    </ul>
  );
}
