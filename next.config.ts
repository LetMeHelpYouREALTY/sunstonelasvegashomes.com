import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  async redirects() {
    return [
      // URLs from the pre-July-2026 Astro build (frontmatter slugs and numbered pagination)
      {
        source: "/posts/adding-new-posts-in-astropaper-theme",
        destination: "/posts/adding-new-post/",
        permanent: true,
      },
      {
        source: "/posts/dynamic-og-image-generation-in-astropaper-blog-posts",
        destination: "/posts/dynamic-og-images/",
        permanent: true,
      },
      {
        source: "/posts/:page(\\d+)",
        destination: "/posts/page/:page/",
        permanent: true,
      },
      {
        source: "/tags/:tag/:page(\\d+)",
        destination: "/tags/:tag/page/:page/",
        permanent: true,
      },
    ];
  },
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
