import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { SITE } from "@/config";
import { publicEnv } from "@/lib/env";
import { buildPageMetadata } from "@/lib/json-ld";
import "./globals.css";

const THEME_COLOR = "#0a2540";

const defaultMetadata = buildPageMetadata({
  title: SITE.title,
  description: SITE.desc,
  canonicalPath: "/",
});

export const metadata: Metadata = {
  ...defaultMetadata,
  metadataBase: new URL(SITE.website),
  icons: { icon: "/favicon.svg" },
  verification: publicEnv("GOOGLE_SITE_VERIFICATION")
    ? { google: publicEnv("GOOGLE_SITE_VERIFICATION") }
    : undefined,
};

export const viewport: Viewport = {
  themeColor: THEME_COLOR,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={SITE.lang ?? "en"} suppressHydrationWarning>
      <body>
        {children}
        <Script src="/toggle-theme.js" strategy="beforeInteractive" />
        <Script
          src="https://em.realscout.com/widgets/realscout-web-components.umd.js"
          type="module"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
