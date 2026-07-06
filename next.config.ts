import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "files.keepingcurrentmatters.com" },
      { protocol: "https", hostname: "www.simplifyingthemarket.com" },
      { protocol: "https", hostname: "**.keepingcurrentmatters.com" },
    ],
    minimumCacheTTL: 86400,
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find(
      (rule: { test?: { test?: (s: string) => boolean } }) =>
        rule.test?.test?.(".svg"),
    );
    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/i;
    }
    config.module.rules.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
