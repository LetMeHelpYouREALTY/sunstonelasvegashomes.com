"use client";

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
        <h1 id="faq-heading" className="faq-heading">
          Frequently asked questions
        </h1>
      ) : null}

      <div className="faq-list">
        {entries.map(entry => (
          <div key={entry.question} className="faq-item">
            <h2 className="faq-q">{entry.question}</h2>
            <p>{entry.answer}</p>
          </div>
        ))}
      </div>

      <p className="faq-cta">
        Ready to see listings in your range?{" "}
        <Link className="faq-cta-link" href="#browse-listings">
          Open the home search
        </Link>
        .
      </p>

      <style jsx global>{`
        .faq-section {
          max-width: 42rem;
          margin: 0 auto 3rem;
          padding: 0 0.5rem;
        }

        .faq-heading {
          margin-bottom: 1.25rem;
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--primary);
        }

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .faq-item {
          background: #fff;
          border-radius: 1rem;
          box-shadow: var(--box-shadow);
          padding: 1.25rem 1.5rem;
          color: var(--primary);
        }

        .faq-q {
          margin: 0 0 0.5rem;
          font-size: 1.05rem;
          font-weight: 600;
        }

        .faq-item p {
          margin: 0;
          font-size: 0.95rem;
          line-height: 1.55;
        }

        .faq-cta {
          margin: 1.5rem 0 0;
          text-align: center;
          font-size: 0.95rem;
          color: var(--primary);
        }

        .faq-cta-link {
          font-weight: 600;
          color: var(--accent-buyer);
        }
      `}</style>
    </section>
  );
}
