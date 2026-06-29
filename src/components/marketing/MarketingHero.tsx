import type { ReactNode } from "react";

type MarketingHeroProps = {
  title: string;
  eyebrow?: ReactNode;
  lede?: ReactNode;
  tagline?: string;
  trust?: ReactNode;
  headingId?: string;
  flush?: boolean;
  className?: string;
  children?: ReactNode;
};

export default function MarketingHero({
  title,
  eyebrow,
  lede,
  tagline,
  trust,
  headingId = "slv-hero-heading",
  flush = false,
  className = "",
  children,
}: MarketingHeroProps) {
  return (
    <section
      className={`slv-marketing-hero ${flush ? "slv-marketing-hero--flush" : ""} ${className}`.trim()}
      aria-labelledby={headingId}
    >
      {eyebrow ? <p className="slv-marketing-hero__eyebrow">{eyebrow}</p> : null}
      <h1 id={headingId}>{title}</h1>
      {lede ? (
        typeof lede === "string" ? (
          <p className="slv-marketing-hero__lede">{lede}</p>
        ) : (
          <div className="slv-marketing-hero__lede">{lede}</div>
        )
      ) : null}
      {tagline ? <p className="slv-marketing-hero__tagline">{tagline}</p> : null}
      {children ? (
        <div className="slv-marketing-hero__actions">{children}</div>
      ) : null}
      {trust ? <p className="slv-marketing-hero__trust">{trust}</p> : null}
    </section>
  );
}
