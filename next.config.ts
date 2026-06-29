import type { NextConfig } from "next";

const REALSCOUT_SCRIPT = "https://em.realscout.com";
const REALSCOUT_API = "https://www.realscout.com";

/**
 * CSP for RealScout widgets (script loads from em.realscout.com, API from www.realscout.com).
 * Based on Next.js 15 CSP guide — static headers for fully static marketing site.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${REALSCOUT_SCRIPT}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https: blob:",
  "font-src 'self' data:",
  `connect-src 'self' ${REALSCOUT_SCRIPT} ${REALSCOUT_API}`,
  "frame-src 'self' https://www.google.com https://maps.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const nextConfig: NextConfig = {
  trailingSlash: true,
  serverExternalPackages: ["@resvg/resvg-js"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "files.keepingcurrentmatters.com" },
      { protocol: "https", hostname: "www.simplifyingthemarket.com" },
      { protocol: "https", hostname: "**.simplifyingthemarket.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: csp,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
