import Link from "next/link";

import type { FaqEntry } from "@/data/faq-entries";

type FaqBlockProps = {
  entries: FaqEntry[];
  hideHeading?: boolean;
};

export default function FaqBlock({
  entries,
  hideHeading = false,
}: FaqBlockProps) {
  return (
    <section
      id="faq"
      className="faq-section"
      aria-labelledby={hideHeading ? undefined : "faq-heading"}
      aria-label={hideHeading ? "FAQ answers" : undefined}
    >
      {!hideHeading ? (
        <h1 id="faq-heading" className="slv-section-title">
          Frequently asked questions
        </h1>
      ) : null}

      <div className="slv-card-grid">
        {entries.map(entry => (
          <article key={entry.question} className="slv-card">
            <h2 className="slv-card__title">{entry.question}</h2>
            <p className="slv-card__text">{entry.answer}</p>
          </article>
        ))}
      </div>

      <p className="faq-cta">
        Ready to see listings in your range?{" "}
        <Link className="slv-link" href="#browse-listings">
          Open the home search
        </Link>
        .
      </p>
    </section>
  );
}
