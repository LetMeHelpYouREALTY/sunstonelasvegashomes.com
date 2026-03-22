# Google Search Console runbook (hyperlocal realtor sites)

Use this checklist after deploy and monthly. Scheduled browser automation is optional; most steps are manual in the GSC UI. For multi-domain launches, also see [Fleet rollout checklist](./fleet-rollout-checklist.md).

## One-time setup

1. **Property type** — Add a property that matches how the site is served (URL-prefix `https://www.example.com/` vs `https://example.com/` vs Domain property). Keep **Search Console**, **canonical URLs in HTML**, **`site` in `astro.config`**, and **sitemap** on the **same** host.
2. **Ownership** — Complete the recommended verification method (DNS TXT, HTML file, or meta tag). This repo supports `PUBLIC_GOOGLE_SITE_VERIFICATION` for the meta tag in `Layout.astro`.
3. **Sitemap** — Submit `https://<your-domain>/sitemap-index.xml` (or `/sitemap.xml` if your integration emits a single file). Confirm **Success** under Sitemaps.
4. **Robots** — Confirm `/robots.txt` lists `Sitemap:` with the same origin as the live site. Do not blanket-disallow static assets needed for rendering.

## After each deploy (high priority URLs)

1. **URL Inspection** — Test the homepage and 2–3 “money” pages (e.g. `/about/`, `/contact/`, `/location/`, `/market/`, **`/buyers/`**, **`/faq/`**, **`/sellers/`**). Use **Live URL** test if needed.
2. **Request indexing** — Only for **new or materially changed** URLs; avoid bulk requests.
3. **Rich Results Test** (separate tool) — Validate **FAQPage** (`/faq/`) and agent-related JSON-LD on pages that use them.

## After routing or template changes

When you add or split routes (e.g. moving FAQ off the homepage to `/faq/`), submit the sitemap if you have not already, then use **URL Inspection** on the new URLs. **Request indexing** sparingly for high-priority pages only.

## Monthly review

1. **Performance** — Search **Pages**: watch impressions/clicks for core queries; fix titles/descriptions that underperform.
2. **Page indexing** — Investigate **Not indexed** / **Soft 404** / **Duplicate**; fix `noindex`, redirects, canonical mismatches.
3. **Core Web Vitals** — Address LCP/INP regressions (images, embeds, fonts).
4. **Enhancements** — Fix structured data errors reported for FAQ or other rich results.

## Expectations

- **Discovered – currently not indexed** often reflects crawl priority, not necessarily a bug—if sitemap + canonical + `noindex` are correct, wait and improve internal links to that URL.
- **Blocked by robots.txt** for `/_astro/` or similar assets** — remove overly broad `Disallow` rules so crawlers can fetch static chunks.
- Reports can lag **days to weeks** after fixes.

## Related env (NAP + entity alignment)

Set `PUBLIC_SITE_*`, maps, reviews, and optional `PUBLIC_GOOGLE_BUSINESS_PROFILE_URL` so footer copy, JSON-LD `sameAs`, and GBP stay aligned.
