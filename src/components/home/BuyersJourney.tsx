"use client";

import Link from "next/link";

import KcmNationalFeedSection from "@/components/home/KcmNationalFeedSection";
import type { KcmFeedItem } from "@/lib/kcm-feed";

type BuyersJourneyProps = {
  kcmFeedTeaser: KcmFeedItem[];
};

export default function BuyersJourney({
  kcmFeedTeaser,
}: BuyersJourneyProps) {
  return (
    <>
      <section className="buyer-steps" aria-labelledby="buyer-steps-heading">
        <h2 id="buyer-steps-heading" className="buyer-steps-heading">
          Next steps for home buyers
        </h2>

        <div className="buyer-steps-grid">
          <article className="buyer-step-card">
            <h3 className="buyer-step-title">Search live MLS listings</h3>
            <p className="buyer-step-text">
              Use the MLS home search at the bottom of this site (or from the
              homepage) to filter by price, property type, and status, then save
              favorites and reach out when you are ready to tour.
            </p>
            <Link href="/#browse-listings" className="buyer-step-link">
              Go to home search
            </Link>
          </article>

          <article className="buyer-step-card">
            <h3 className="buyer-step-title">Explore Sunstone &amp; Trilogy Sunset</h3>
            <p className="buyer-step-text">
              See location, lifestyle context, and what makes these communities a
              fit before you narrow your short list.
            </p>
            <Link href="/location/" className="buyer-step-link">
              View location &amp; area
            </Link>
          </article>

          <article className="buyer-step-card">
            <h3 className="buyer-step-title">
              Understand the Las Vegas market
            </h3>
            <p className="buyer-step-text">
              Get context on trends and timing so your offer strategy matches
              current conditions, not last year&apos;s headlines.
            </p>
            <Link href="/market/" className="buyer-step-link">
              Las Vegas market overview
            </Link>
          </article>
        </div>
      </section>

      <section className="pillars" aria-label="Why buyers choose this guidance">
        <div className="pillar">
          <h2 className="pillar-title">Neighborhood intel</h2>
          <p>
            Sunstone and Trilogy Sunset inventory, pricing, and what it feels
            like to live here, not generic national headlines.
          </p>
        </div>
        <div className="pillar">
          <h2 className="pillar-title">Offer to closing</h2>
          <p>
            From first tour through inspection and closing, milestones and
            paperwork are explained in plain language.
          </p>
        </div>
        <div className="pillar">
          <h2 className="pillar-title">Your pace</h2>
          <p>
            Compare homes, refine your offer strategy, and decide on your
            timeline, without pressure.
          </p>
        </div>
      </section>

      <KcmNationalFeedSection
        items={kcmFeedTeaser}
        heading="What buyers are reading (national context)"
        intro="Short articles from Simplifying the Market on affordability, offers, and trends (opens in a new tab). Pair these with local guidance for Sunstone and Trilogy Sunset from Dr. Jan Duffy."
        headingId="kcm-teaser-heading"
      />

      <style jsx global>{`
        .buyer-steps {
          max-width: 1200px;
          margin: 0 auto 2.5rem;
          padding: 0 0.25rem;
        }

        .buyer-steps-heading {
          margin: 0 0 1.25rem;
          font-size: 1.35rem;
          font-weight: 600;
          color: var(--primary);
          text-align: center;
        }

        .buyer-steps-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.25rem;
          counter-reset: buyer-step;
        }

        .buyer-step-card {
          position: relative;
          display: flex;
          flex-direction: column;
          padding: 1.35rem 1.25rem;
          border: 1px solid rgba(10, 37, 64, 0.06);
          border-radius: 1rem;
          background: #fff;
          color: var(--primary);
          box-shadow: var(--box-shadow);
        }

        .buyer-step-card::before {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 1.75rem;
          height: 1.75rem;
          border-radius: 999px;
          background: rgba(58, 141, 222, 0.12);
          color: var(--accent-buyer);
          content: counter(buyer-step);
          counter-increment: buyer-step;
          font-size: 0.85rem;
          font-weight: 700;
          line-height: 1.75rem;
          text-align: center;
        }

        .buyer-step-title {
          margin: 0 0 0.5rem;
          padding-right: 2rem;
          font-size: 1.05rem;
          font-weight: 600;
        }

        .buyer-step-text {
          flex: 1;
          margin: 0;
          font-size: 0.92rem;
          line-height: 1.5;
          opacity: 0.92;
        }

        .buyer-step-link {
          margin-top: 1rem;
          font-weight: 600;
          color: var(--accent-buyer);
          text-decoration: none;
        }

        .buyer-step-link:hover {
          text-decoration: underline;
        }

        .pillars {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          margin: 2rem 0 3rem;
        }

        .pillar {
          border-radius: 1rem;
          background: #fff;
          color: var(--primary);
          box-shadow: var(--box-shadow);
          padding: 1.5rem 1.25rem;
        }

        .pillar-title {
          margin: 0 0 0.5rem;
          font-size: 1.125rem;
          font-weight: 600;
        }

        .pillar p {
          margin: 0;
          font-size: 0.95rem;
          line-height: 1.5;
        }
      `}</style>
    </>
  );
}
