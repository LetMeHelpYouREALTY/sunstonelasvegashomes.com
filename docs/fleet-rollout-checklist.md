# Fleet rollout checklist (per domain)

Use this when cloning the Astro template for a new agent or broker brand. Pair with [Google Search Console runbook](./gsc-search-console-runbook.md). Last aligned with **March 2026** hyperlocal SEO practice: unique intent per URL, verifiable NAP and license, no thin duplicate FAQ farms, canonical host consistency, and validated JSON-LD.

## Principles

- **One canonical host** — `SITE.website`, HTML `canonical`, sitemap URLs, and the GSC property must use the same origin (apex vs `www` decided once).
- **Single source of truth** — Phone, address, brokerage, license, and service area flow from env + `site-contact` into footer and structured data; do not hand-edit conflicting NAP in page copy.
- **Content integrity** — Do not fabricate rankings, sales volume, or review counts. Local copy should reflect real service areas and MLS/broker rules.

## Rollout steps

| Step | Action | Owner |
| ---- | ------ | ----- |
| 1 | Set **canonical host** in `src/config.ts` (`SITE.website`) to match production and the GSC property. | Dev |
| 2 | Fill **env** from `.env.example`: NAP, maps, reviews, optional `PUBLIC_GOOGLE_BUSINESS_PROFILE_URL`, `PUBLIC_GOOGLE_SITE_VERIFICATION`, RealScout IDs. | Dev / agent |
| 3 | Update **`AREA_SERVED`** and community names in `src/lib/site-contact.ts` for the true service area. | Dev |
| 4 | Rewrite **homepage and money pages** (about, location, market, buying-process): unique title and meta description, one **H1** each, locally specific body—not city swap only. | Content |
| 5 | **FAQ + JSON-LD** — Keep visible Q&A and `faqSchema` strings in sync; avoid promising a footer phone if NAP env is empty. | Content |
| 6 | **Deploy** — View source: footer NAP, `application/ld+json` graph, canonical link. | QA |
| 7 | **Rich Results Test** on homepage + one FAQ-bearing page; fix errors. | QA |
| 8 | **GSC** — Add property, submit `sitemap-index.xml`, URL Inspection on homepage + 2 money URLs. Follow `docs/gsc-search-console-runbook.md`. | Ops |
| 9 | **GBP** — Align categories, hours, service area, and site link; spot-check NAP match. | Agent |
| 10 | **Quarterly** — Re-check GSC coverage and CWV, schema validity, and env NAP vs GBP after any office move. | Ops |

## Clone vs localize (typical split)

- **Env only** — Phone, street, postal, lat/lng, Google Maps / reviews / GBP URLs, social URLs, GSC verification, RealScout filters.
- **Code (per brand)** — `SITE.title`, `SITE.desc`, `SITE.profile`, `SITE.website`; `AREA_SERVED` and neighborhood routes; hero and FAQ on `index` and marketing pages.
- **Avoid** — Identical FAQ blocks across many URLs with only the city name changed.

## Repo map (this codebase)

| Concern | Primary files |
| ------- | ------------- |
| Site title, origin, default description | `src/config.ts` |
| NAP, `AREA_SERVED`, `sameAs` | `src/lib/site-contact.ts` |
| Title helper | `src/lib/seo-helpers.ts` |
| JSON-LD, FAQ, RealScout | `src/layouts/Layout.astro` |
| Footer | `src/components/Footer.astro` |
| RealScout | `src/lib/realscout-config.ts` |
| Sitemap changefreq | `astro.config.ts` |
| Robots | `src/pages/robots.txt.ts` |
| Env template | `.env.example` |

## Ongoing cadence (summary)

| When | What |
| ---- | ---- |
| After deploy | Spot-check homepage: canonical, JSON-LD, footer NAP if env set. |
| Monthly | GSC anomalies, CWV spot-check. |
| Quarterly | NAP vs GBP; Rich Results Test on homepage + one FAQ route; internal links on money pages. |
| MLS/broker policy change | Review IDX/disclaimer; do not fork vendor IDX without approval. |
