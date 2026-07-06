/** Read public env — supports both NEXT_PUBLIC_* and legacy PUBLIC_* (Astro). */
export function publicEnv(key: string): string {
  const nextKey = key.startsWith("NEXT_PUBLIC_") ? key : `NEXT_PUBLIC_${key}`;
  const legacyKey = key.startsWith("PUBLIC_") ? key : `PUBLIC_${key}`;
  return (
    process.env[nextKey]?.trim() ??
    process.env[legacyKey]?.trim() ??
    ""
  );
}

export function isDev(): boolean {
  return process.env.NODE_ENV === "development";
}
