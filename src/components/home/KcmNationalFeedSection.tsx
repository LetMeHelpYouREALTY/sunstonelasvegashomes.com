"use client";

import LinkButton from "@/components/LinkButton";
import type { KcmFeedItem } from "@/lib/kcm-feed";

type KcmNationalFeedSectionProps = {
  items: KcmFeedItem[];
  heading: string;
  intro: string;
  headingId?: string;
  sectionId?: string;
  showDates?: boolean;
  ctaHref?: string;
  ctaLabel?: string;
};

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function formatDate(date: Date | null): string {
  if (!date) {
    return "";
  }

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function KcmNationalFeedSection({
  items,
  heading,
  intro,
  headingId = "kcm-national-heading",
  sectionId,
  showDates = false,
  ctaHref = "/market-news/",
  ctaLabel = "More market news",
}: KcmNationalFeedSectionProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="kcm-teaser" id={sectionId} aria-labelledby={headingId}>
      <h2 id={headingId} className="kcm-teaser-title">
        {heading}
      </h2>
      <p className="kcm-teaser-intro">{intro}</p>

      <ul className="kcm-teaser-grid">
        {items.map(item => (
          <li key={item.link}>
            <article className="kcm-teaser-card">
              {item.image ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="kcm-teaser-img-wrap"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    width={400}
                    height={200}
                    className="kcm-teaser-img"
                  />
                </a>
              ) : null}

              <div className="kcm-teaser-body">
                {showDates && item.pubDate ? (
                  <time
                    className="kcm-teaser-date"
                    dateTime={item.pubDate.toISOString()}
                  >
                    {formatDate(item.pubDate)}
                  </time>
                ) : null}

                <h3 className="kcm-teaser-item-title">
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </a>
                </h3>

                {item.excerpt ? (
                  <p className="kcm-teaser-excerpt">{item.excerpt}</p>
                ) : null}
              </div>
            </article>
          </li>
        ))}
      </ul>

      <div className="kcm-teaser-cta">
        <LinkButton href={ctaHref}>
          {ctaLabel}
          <ArrowRightIcon className="ml-1 inline-block size-4 align-text-bottom" />
        </LinkButton>
      </div>

      <style jsx global>{`
        .kcm-teaser {
          max-width: 1200px;
          margin: 0 auto 3rem;
          padding: 0 0.25rem;
        }

        .kcm-teaser-title {
          margin: 0 0 0.5rem;
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--primary);
        }

        .kcm-teaser-intro {
          max-width: 42rem;
          margin: 0 0 1.25rem;
          font-size: 0.95rem;
          line-height: 1.5;
          color: var(--primary);
          opacity: 0.9;
        }

        .kcm-teaser-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.25rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .kcm-teaser-card {
          display: flex;
          height: 100%;
          flex-direction: column;
          overflow: hidden;
          border-radius: 1rem;
          background: #fff;
          color: var(--primary);
          box-shadow: var(--box-shadow);
        }

        .kcm-teaser-img-wrap {
          display: block;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          flex-shrink: 0;
          background: linear-gradient(
            180deg,
            rgba(10, 37, 64, 0.04) 0%,
            var(--slv-surface, #f7f9fc) 100%
          );
        }

        .kcm-teaser-img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
        }

        .kcm-teaser-body {
          display: flex;
          flex: 1;
          flex-direction: column;
          padding: 1rem 1.15rem 1.15rem;
        }

        .kcm-teaser-date {
          display: block;
          margin-bottom: 0.35rem;
          font-size: 0.8rem;
          line-height: 1.3;
          color: var(--primary);
          opacity: 0.75;
        }

        .kcm-teaser-item-title {
          margin: 0;
          font-size: 1rem;
          font-weight: 600;
          line-height: 1.35;
        }

        .kcm-teaser-item-title a {
          color: inherit;
          text-decoration: none;
        }

        .kcm-teaser-item-title a:hover {
          color: var(--accent-buyer);
          text-decoration: underline;
        }

        .kcm-teaser-excerpt {
          margin: 0.5rem 0 0;
          display: -webkit-box;
          overflow: hidden;
          font-size: 0.85rem;
          line-height: 1.45;
          opacity: 0.88;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }

        .kcm-teaser-cta {
          margin-top: 1.5rem;
          text-align: center;
        }
      `}</style>
    </section>
  );
}
