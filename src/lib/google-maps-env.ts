import { publicEnv } from "@/lib/env";

/** Public Maps JavaScript API key (never commit a real value). */
export function getGoogleMapsApiKey(): string {
  return publicEnv("GOOGLE_MAPS_API_KEY");
}

/** Optional Map ID for Advanced Markers styling. */
export function getGoogleMapsMapId(): string {
  return publicEnv("GOOGLE_MAPS_MAP_ID");
}
