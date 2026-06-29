import type { ReactNode } from "react";
import Script from "next/script";

import ThemeProvider from "@/components/ThemeProvider";
import { SITE } from "@/config";
import { getPublicEnv } from "@/lib/env";
import "./globals.css";

const THEME_COLOR = "#0a2540";

export default function RootLayout({ children }: { children: ReactNode }) {
  const googleSiteVerification = getPublicEnv("GOOGLE_SITE_VERIFICATION");

  return (
    <html lang={SITE.lang ?? "en"} suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="sitemap" href="/sitemap.xml" />
        <meta name="theme-color" content={THEME_COLOR} />
        {googleSiteVerification ? (
          <meta
            name="google-site-verification"
            content={googleSiteVerification}
          />
        ) : null}
        <Script id="theme-init" strategy="beforeInteractive">
          {`
            (function () {
              var stored = localStorage.getItem("theme");
              var theme = stored === "light" || stored === "dark"
                ? stored
                : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
              document.documentElement.setAttribute("data-theme", theme);
            })();
          `}
        </Script>
      </head>
      <body className="flex min-h-svh flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
