"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  AMENITY_CATEGORIES,
  COMMUNITY_MAP,
  DEFAULT_AMENITY_CATEGORY,
  type AmenityCategoryId,
} from "@/lib/community-map";
import { AmenityMapFallback } from "@/components/amenities/AmenityMapFallback";
import { cn } from "@/lib/utils";

type AmenityMapProps = {
  apiKey: string;
  mapId?: string;
  /** Taller map on the dedicated amenities page */
  variant?: "section" | "page";
  initialCategory?: AmenityCategoryId;
};

type PlaceResult = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  address?: string;
  rating?: number;
  mapsUri?: string;
};

const MAP_HEIGHT = {
  section: "min-h-[420px] h-[min(420px,55vh)]",
  page: "min-h-[480px] h-[min(520px,65vh)]",
} as const;

let mapsScriptPromise: Promise<void> | null = null;

function loadGoogleMapsScript(apiKey: string): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Maps unavailable during SSR"));
  }
  if (typeof window.google?.maps?.importLibrary === "function") {
    return Promise.resolve();
  }
  if (mapsScriptPromise) {
    return mapsScriptPromise;
  }

  mapsScriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-amenity-map="true"]',
    );
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () =>
        reject(new Error("Maps script failed")),
      );
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
      apiKey,
    )}&loading=async`;
    script.async = true;
    script.defer = true;
    script.dataset.amenityMap = "true";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Maps script failed"));
    document.head.appendChild(script);
  });

  return mapsScriptPromise;
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
  const [places, setPlaces] = useState<PlaceResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [mapError, setMapError] = useState(false);
  const [apiReady, setApiReady] = useState(false);

  const filterGroupId = useId();

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

  const showInfo = useCallback(
    (content: string, position: google.maps.LatLngLiteral) => {
      if (!mapRef.current) return;
      if (!infoWindowRef.current) {
        infoWindowRef.current = new google.maps.InfoWindow();
      }
      infoWindowRef.current.setContent(content);
      infoWindowRef.current.setPosition(position);
      infoWindowRef.current.open({ map: mapRef.current });
    },
    [],
  );

  const initMap = useCallback(async () => {
    if (!mapContainerRef.current || mapRef.current) return;

    try {
      await loadGoogleMapsScript(apiKey);
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
          `<div style="max-width:220px"><strong>${COMMUNITY_MAP.name}</strong><br/>${COMMUNITY_MAP.city}, ${COMMUNITY_MAP.state} ${COMMUNITY_MAP.postalCode}</div>`,
          center,
        );
      });

      setApiReady(true);
    } catch {
      setMapError(true);
    }
  }, [apiKey, mapId, showInfo]);

  const fetchPlaces = useCallback(
    async (categoryId: AmenityCategoryId) => {
      if (!mapRef.current || !apiReady) return;
      const category = AMENITY_CATEGORIES.find(c => c.id === categoryId);
      if (!category) return;

      setLoading(true);
      clearPlaceMarkers();

      try {
        const { Place } = (await google.maps.importLibrary(
          "places",
        )) as google.maps.PlacesLibrary;

        const center = new google.maps.LatLng(
          COMMUNITY_MAP.latitude,
          COMMUNITY_MAP.longitude,
        );

        const request = {
          fields: [
            "id",
            "displayName",
            "location",
            "formattedAddress",
            "rating",
            "googleMapsURI",
          ],
          locationRestriction: {
            center,
            radius: COMMUNITY_MAP.searchRadiusMeters,
          },
          includedPrimaryTypes: category.placeTypes,
          maxResultCount: 15,
        };

        const { places: nearby } = await Place.searchNearby(request);
        const parsed: PlaceResult[] = [];

        nearby?.forEach(place => {
          const loc = place.location;
          if (!loc) return;
          const name = place.displayName ?? "Place";
          parsed.push({
            id: place.id ?? `${name}-${loc.lat()}`,
            name,
            lat: loc.lat(),
            lng: loc.lng(),
            address: place.formattedAddress ?? undefined,
            rating: place.rating ?? undefined,
            mapsUri: place.googleMapsURI ?? undefined,
          });
        });

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
          const ratingLine =
            place.rating !== undefined
              ? `<br/>Rating: ${place.rating.toFixed(1)}`
              : "";
          const addressLine = place.address
            ? `<br/>${place.address}`
            : "";
          marker.addListener("click", () => {
            showInfo(
              `<div style="max-width:240px"><strong>${place.name}</strong>${ratingLine}${addressLine}<br/><a href="${directionsHref}" target="_blank" rel="noopener">Directions</a></div>`,
              { lat: place.lat, lng: place.lng },
            );
          });
          placeMarkersRef.current.push(marker);
        });
      } catch {
        setPlaces([]);
      } finally {
        setLoading(false);
      }
    },
    [apiReady, clearPlaceMarkers, showInfo],
  );

  useEffect(() => {
    if (!apiKey || !inView || mapError) return;
    void initMap();
  }, [apiKey, inView, mapError, initMap]);

  useEffect(() => {
    if (!apiReady) return;
    void fetchPlaces(activeCategory);
  }, [activeCategory, apiReady, fetchPlaces]);

  if (!apiKey || mapError) {
    return (
      <div ref={rootRef}>
        <AmenityMapFallback
          activeCategory={activeCategory}
          showFullList={variant === "page"}
          mapHeightClass={MAP_HEIGHT[variant]}
        />
      </div>
    );
  }

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
        className={`relative w-full overflow-hidden rounded-xl border border-[rgba(10,37,64,0.12)] bg-[#e8eef5] ${MAP_HEIGHT[variant]}`}
      >
        {!inView ? (
          <div
            className="flex h-full items-center justify-center px-4 text-center text-sm text-[#0a2540]/80"
            aria-hidden="true"
          >
            Map loads as you scroll…
          </div>
        ) : null}
        <div ref={mapContainerRef} className="absolute inset-0 h-full w-full" />
      </div>

      {places.length > 0 ? (
        <ul className="m-0 grid list-none gap-2 p-0 sm:grid-cols-2">
          {places.slice(0, 6).map(place => (
            <li
              key={place.id}
              className="rounded-lg border border-[rgba(10,37,64,0.08)] bg-white px-3 py-2 text-sm text-[#0a2540]"
            >
              <span className="font-semibold">{place.name}</span>
              {place.rating !== undefined ? (
                <span className="opacity-80"> · {place.rating.toFixed(1)}</span>
              ) : null}
              {place.address ? (
                <p className="m-0 mt-1 text-xs opacity-85">{place.address}</p>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
