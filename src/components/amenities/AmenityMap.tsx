"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  AMENITY_CATEGORIES,
  COMMUNITY_MAP,
  DEFAULT_AMENITY_CATEGORY,
  googleMapsEmbedUrl,
  type AmenityCategoryId,
} from "@/lib/community-map";
import { curatedAmenitiesForCategory } from "@/data/nearby-amenities-curated";
import { StaticAmenityList } from "@/components/amenities/StaticAmenityList";
import {
  loadGoogleMaps,
  mapsAuthFailed,
} from "@/lib/google-maps-loader";
import { searchCategory, type NearbyPlaceResult } from "@/lib/places-search";
import { cn } from "@/lib/utils";

type AmenityMapProps = {
  apiKey: string;
  mapId?: string;
  /** Taller map on the dedicated amenities page */
  variant?: "section" | "page";
  initialCategory?: AmenityCategoryId;
};

const MAP_HEIGHT = {
  section: "min-h-[420px] h-[min(420px,55vh)]",
  page: "min-h-[480px] h-[min(520px,65vh)]",
} as const;

function buildInfoWindowNode(
  title: string,
  lines: string[],
  directionsHref?: string,
): HTMLElement {
  const wrap = document.createElement("div");
  wrap.style.maxWidth = "240px";
  const strong = document.createElement("strong");
  strong.textContent = title;
  wrap.appendChild(strong);
  for (const line of lines) {
    wrap.appendChild(document.createElement("br"));
    const span = document.createElement("span");
    span.textContent = line;
    wrap.appendChild(span);
  }
  if (directionsHref) {
    wrap.appendChild(document.createElement("br"));
    const link = document.createElement("a");
    link.href = directionsHref;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Directions";
    wrap.appendChild(link);
  }
  return wrap;
}

export function AmenityMap({
  apiKey,
  mapId,
  variant = "section",
  initialCategory = DEFAULT_AMENITY_CATEGORY,
}: AmenityMapProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const communityMarkerRef = useRef<google.maps.Marker | null>(null);
  const placeMarkersRef = useRef<google.maps.Marker[]>([]);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  const [inView, setInView] = useState(false);
  const [activeCategory, setActiveCategory] =
    useState<AmenityCategoryId>(initialCategory);
  const [places, setPlaces] = useState<NearbyPlaceResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [useFallback, setUseFallback] = useState(!apiKey || mapsAuthFailed);
  const [showCuratedForCategory, setShowCuratedForCategory] = useState(false);
  const [apiReady, setApiReady] = useState(false);

  const filterGroupId = useId();
  const heightClass = MAP_HEIGHT[variant];

  useEffect(() => {
    const onAuthFailure = () => setUseFallback(true);
    globalThis.addEventListener("gmaps:auth-failure", onAuthFailure);
    return () =>
      globalThis.removeEventListener("gmaps:auth-failure", onAuthFailure);
  }, []);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(e => e.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "120px", threshold: 0.1 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const clearPlaceMarkers = useCallback(() => {
    placeMarkersRef.current.forEach(m => m.setMap(null));
    placeMarkersRef.current = [];
  }, []);

  const teardownMap = useCallback(() => {
    clearPlaceMarkers();
    communityMarkerRef.current?.setMap(null);
    communityMarkerRef.current = null;
    infoWindowRef.current?.close();
    infoWindowRef.current = null;
    mapRef.current = null;
    if (mapContainerRef.current) {
      mapContainerRef.current.replaceChildren();
    }
    setApiReady(false);
  }, [clearPlaceMarkers]);

  const showInfo = useCallback(
    (
      title: string,
      lines: string[],
      position: google.maps.LatLngLiteral,
      directionsHref?: string,
    ) => {
      if (!mapRef.current) return;
      if (!infoWindowRef.current) {
        infoWindowRef.current = new google.maps.InfoWindow();
      }
      infoWindowRef.current.setContent(
        buildInfoWindowNode(title, lines, directionsHref),
      );
      infoWindowRef.current.setPosition(position);
      infoWindowRef.current.open({ map: mapRef.current });
    },
    [],
  );

  const enterFallback = useCallback(() => {
    teardownMap();
    setUseFallback(true);
  }, [teardownMap]);

  const initMap = useCallback(async () => {
    if (!mapContainerRef.current || mapRef.current || useFallback) return;
    if (mapsAuthFailed) {
      enterFallback();
      return;
    }

    try {
      await loadGoogleMaps(apiKey);
      const { Map } = (await google.maps.importLibrary(
        "maps",
      )) as google.maps.MapsLibrary;

      const center = {
        lat: COMMUNITY_MAP.latitude,
        lng: COMMUNITY_MAP.longitude,
      };

      const mapOptions: google.maps.MapOptions = {
        center,
        zoom: COMMUNITY_MAP.defaultZoom,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
      };
      if (mapId) {
        mapOptions.mapId = mapId;
      }

      const map = new Map(mapContainerRef.current, mapOptions);
      mapRef.current = map;

      const communityMarker = new google.maps.Marker({
        map,
        position: center,
        title: COMMUNITY_MAP.name,
        label: {
          text: "★",
          color: "#ffffff",
          fontSize: "14px",
        },
        zIndex: 1000,
      });
      communityMarkerRef.current = communityMarker;
      communityMarker.addListener("click", () => {
        showInfo(
          COMMUNITY_MAP.name,
          [
            `${COMMUNITY_MAP.city}, ${COMMUNITY_MAP.state} ${COMMUNITY_MAP.postalCode}`,
          ],
          center,
        );
      });

      setApiReady(true);
    } catch {
      enterFallback();
    }
  }, [apiKey, mapId, showInfo, useFallback, enterFallback]);

  const fetchPlaces = useCallback(
    async (categoryId: AmenityCategoryId) => {
      if (!mapRef.current || !apiReady || useFallback) return;

      setLoading(true);
      setShowCuratedForCategory(false);
      clearPlaceMarkers();

      try {
        const parsed = await searchCategory(categoryId);
        setPlaces(parsed);

        parsed.forEach(place => {
          const marker = new google.maps.Marker({
            map: mapRef.current!,
            position: { lat: place.lat, lng: place.lng },
            title: place.name,
          });
          const directionsHref =
            place.mapsUri ??
            `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`;
          const lines: string[] = [];
          if (place.address) lines.push(place.address);
          marker.addListener("click", () => {
            showInfo(place.name, lines, { lat: place.lat, lng: place.lng }, directionsHref);
          });
          placeMarkersRef.current.push(marker);
        });

        if (parsed.length === 0) {
          setShowCuratedForCategory(true);
        }
      } catch {
        setPlaces([]);
        setShowCuratedForCategory(true);
      } finally {
        setLoading(false);
      }
    },
    [apiReady, clearPlaceMarkers, showInfo, useFallback],
  );

  useEffect(() => {
    if (!apiKey || !inView || useFallback) return;
    void initMap();
  }, [apiKey, inView, useFallback, initMap]);

  useEffect(() => {
    if (!apiReady || useFallback) return;
    void fetchPlaces(activeCategory);
  }, [activeCategory, apiReady, fetchPlaces, useFallback]);

  const embedSrc = googleMapsEmbedUrl(
    COMMUNITY_MAP.latitude,
    COMMUNITY_MAP.longitude,
  );

  const curatedCount = curatedAmenitiesForCategory(activeCategory).length;

  return (
    <div ref={rootRef} className="flex flex-col gap-3">
      <div
        role="tablist"
        aria-label="Filter nearby amenities by category"
        className="flex flex-wrap gap-2"
        id={filterGroupId}
      >
        {AMENITY_CATEGORIES.map(cat => {
          const selected = cat.id === activeCategory;
          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${filterGroupId}-panel`}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3a8dde]",
                selected
                  ? "border-[#3a8dde] bg-[#3a8dde] text-white"
                  : "border-[rgba(10,37,64,0.15)] bg-white text-[#0a2540] hover:border-[#3a8dde]/50",
              )}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      <div
        id={`${filterGroupId}-panel`}
        role="tabpanel"
        aria-live="polite"
        aria-busy={loading}
        className={`relative w-full overflow-hidden rounded-xl border border-[rgba(10,37,64,0.12)] bg-[#e8eef5] ${heightClass}`}
      >
        {!inView && !useFallback ? (
          <div
            className="flex h-full items-center justify-center px-4 text-center text-sm text-[#0a2540]/80"
            aria-hidden="true"
          >
            Map loads as you scroll…
          </div>
        ) : null}
        {useFallback ? (
          <iframe
            title={`Map of ${COMMUNITY_MAP.name}, ${COMMUNITY_MAP.city}`}
            src={embedSrc}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : (
          <div ref={mapContainerRef} className="absolute inset-0 h-full w-full" />
        )}
      </div>

      {useFallback ? (
        <p className="m-0 text-sm text-[#0a2540]/85">
          Showing a map centered on {COMMUNITY_MAP.shortName}. Verified nearby
          places for the selected category are listed below—open directions in
          Google Maps for current hours.
        </p>
      ) : null}

      {useFallback ? (
        <StaticAmenityList
          category={variant === "page" ? undefined : activeCategory}
          limit={variant === "page" ? undefined : 6}
        />
      ) : null}

      {!useFallback && places.length > 0 ? (
        <ul className="m-0 grid list-none gap-2 p-0 sm:grid-cols-2">
          {places.slice(0, 6).map(place => (
            <li
              key={place.id}
              className="rounded-lg border border-[rgba(10,37,64,0.08)] bg-white px-3 py-2 text-sm text-[#0a2540]"
            >
              <span className="font-semibold">{place.name}</span>
              {place.address ? (
                <p className="m-0 mt-1 text-xs opacity-85">{place.address}</p>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}

      {!useFallback && showCuratedForCategory && curatedCount > 0 ? (
        <div>
          <p className="mb-2 text-sm text-[#0a2540]/85">
            Live search did not return results for this filter—here are verified
            nearby picks:
          </p>
          <StaticAmenityList category={activeCategory} />
        </div>
      ) : null}
    </div>
  );
}
