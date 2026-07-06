# Sunstone Las Vegas Homes

Next.js 15 marketing site for Dr. Jan Duffy — Sunstone & Trilogy Sunset real estate in Las Vegas.

## Stack

- **Next.js 15** App Router (React 19, static generation)
- **Tailwind CSS 4**
- **Markdown blog** (`src/data/blog/`)
- **RealScout** MLS widgets, **KCM** national feed, **Pagefind** search

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build & deploy

```bash
npm run build
npm start
```

Deploy to Vercel. Set env vars from `.env.example` (`NEXT_PUBLIC_*` or legacy `PUBLIC_*` both work).

## Project structure

```
src/
├── app/              # App Router pages & API routes
├── components/       # React components
├── data/blog/        # Markdown posts
├── lib/              # NAP, SEO, feeds, posts loader
└── utils/            # Paths, tags, sorting
```

See `docs/fleet-rollout-checklist.md` for per-domain rollout.
