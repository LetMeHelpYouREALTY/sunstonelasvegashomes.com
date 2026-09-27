import type { AmenityCategoryId } from "@/lib/community-map";
import { AMENITY_CATEGORIES, COMMUNITY_MAP } from "@/lib/community-map";

export type NearbyPlaceResult = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  address?: string;
  mapsUri?: string;
};

function placeDisplayName(
  displayName: google.maps.places.Place["displayName"],
): string {
  if (!displayName) return "Place";
  if (typeof displayName === "string") return displayName;
  const named = displayName as { text?: string };
  return named.text ?? "Place";
}

function latLngFromPlace(
  location: google.maps.places.Place["location"],
): { lat: number; lng: number } | null {
  if (!location) return null;
  if (typeof location.lat === "function") {
    return { lat: location.lat(), lng: location.lng() };
  }
  const json = location.toJSON?.();
  if (json) return { lat: json.lat, lng: json.lng };
  return null;
}

function parsePlaces(places: google.maps.places.Place[]): NearbyPlaceResult[] {
  const parsed: NearbyPlaceResult[] = [];
  for (const place of places) {
    const coords = latLngFromPlace(place.location);
    if (!coords) continue;
    const name = placeDisplayName(place.displayName);
    parsed.push({
      id: place.id ?? `${name}-${coords.lat}`,
      name,
      lat: coords.lat,
      lng: coords.lng,
      address: place.formattedAddress ?? undefined,
      mapsUri: place.googleMapsURI ?? undefined,
    });
  }
  return parsed;
}

const cache = new Map<string, Promise<NearbyPlaceResult[]>>();

export function searchCategory(
  categoryId: AmenityCategoryId,
): Promise<NearbyPlaceResult[]> {
  const category = AMENITY_CATEGORIES.find(c => c.id === categoryId);
  if (!category) return Promise.resolve([]);

  let p = cache.get(categoryId);
  if (!p) {
    const center: google.maps.LatLngLiteral = {
      lat: COMMUNITY_MAP.latitude,
      lng: COMMUNITY_MAP.longitude,
    };
    p = (async () => {
      const { Place } = (await google.maps.importLibrary(
        "places",
      )) as google.maps.PlacesLibrary;
      const { places } = await Place.searchNearby({
        fields: [
          "id",
          "displayName",
          "location",
          "formattedAddress",
          "googleMapsURI",
        ],
        locationRestriction: {
          center,
          radius: COMMUNITY_MAP.searchRadiusMeters,
        },
        includedPrimaryTypes: category.placeTypes,
        maxResultCount: 10,
        // String enum avoids deprecated RankPreference namespace (Places API New).
        rankPreference:
          "POPULARITY" as google.maps.places.SearchNearbyRankPreference,
      });
      return parsePlaces(places ?? []);
    })();
    p.catch(() => cache.delete(categoryId));
    cache.set(categoryId, p);
  }
  return p;
}
