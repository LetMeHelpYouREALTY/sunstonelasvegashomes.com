"use client";

import type { ReactNode } from "react";

type MarketingHeroProps = {
  title: string;
  eyebrow?: ReactNode;
  lede?: string;
  tagline?: string;
  headingId?: string;
  children?: ReactNode;
};

export default function MarketingHero({
  title,
  eyebrow,
  lede,
  tagline,
  headingId = "marketing-hero-heading",
  children,
}: MarketingHeroProps) {
  return (
    <section
      className="slv-marketing-hero slv-marketing-hero-block"
      aria-labelledby={headingId}
    >
      {eyebrow ? <p className="slv-hero-eyebrow">{eyebrow}</p> : null}
      <h1 id={headingId} className="slv-hero-title">
        {title}
      </h1>
      {lede ? <p className="slv-hero-lede">{lede}</p> : null}
      {tagline ? <p className="slv-hero-tagline">{tagline}</p> : null}
      {children ? <div className="slv-hero-actions">{children}</div> : null}

      <style jsx global>{`
        .slv-marketing-hero-block {
          padding: 2.5rem 1.5rem;
          text-align: center;
          border-radius: var(--slv-radius, 1rem);
        }

        .slv-hero-eyebrow {
          margin: 0 0 0.5rem;
          font-size: 1rem;
          opacity: 0.85;
        }

        .slv-hero-title {
          margin: 0;
          font-size: clamp(1.75rem, 5vw, 2.5rem);
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: -0.02em;
          text-wrap: balance;
        }

        .slv-hero-lede,
        .slv-hero-tagline {
          margin-left: auto;
          margin-right: auto;
          max-width: 40rem;
          line-height: 1.55;
        }

        .slv-hero-lede {
          margin-top: 0.85rem;
          font-size: 1.05rem;
          opacity: 0.96;
        }

        .slv-hero-tagline {
          margin-top: 1rem;
          font-size: 1rem;
          opacity: 0.9;
        }

        .slv-hero-actions {
          margin-top: 1.5rem;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
        }

        @media (max-width: 768px) {
          .slv-marketing-hero-block {
            padding: 2rem 1rem;
          }
        }
      `}</style>
    </section>
  );
}
