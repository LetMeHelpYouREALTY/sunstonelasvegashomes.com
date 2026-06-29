export function getPublicEnv(key: string): string | undefined {
  return process.env[`NEXT_PUBLIC_${key}`] ?? process.env[`PUBLIC_${key}`];
}
