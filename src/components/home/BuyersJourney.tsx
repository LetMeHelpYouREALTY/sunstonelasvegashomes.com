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
        <h2 id="buyer-steps-heading" className="slv-section-title">
          Next steps for home buyers
        </h2>

        <div className="slv-card-grid slv-steps-grid">
          <article className="slv-card slv-step-card">
            <h3 className="slv-card__title">Search live MLS listings</h3>
            <p className="slv-card__text">
              Use the MLS home search at the bottom of this site (or from the
              homepage) to filter by price, property type, and status, then save
              favorites and reach out when you are ready to tour.
            </p>
            <Link href="/#browse-listings" className="slv-card__link">
              Go to home search
            </Link>
          </article>

          <article className="slv-card slv-step-card">
            <h3 className="slv-card__title">Explore Sunstone &amp; Trilogy Sunset</h3>
            <p className="slv-card__text">
              See location, lifestyle context, and what makes these communities a
              fit before you narrow your short list.
            </p>
            <Link href="/location/" className="slv-card__link">
              View location &amp; area
            </Link>
          </article>

          <article className="slv-card slv-step-card">
            <h3 className="slv-card__title">Understand the Las Vegas market</h3>
            <p className="slv-card__text">
              Get context on trends and timing so your offer strategy matches
              current conditions, not last year&apos;s headlines.
            </p>
            <Link href="/market/" className="slv-card__link">
              Las Vegas market overview
            </Link>
          </article>
        </div>
      </section>

      <section
        className="pillars slv-card-grid"
        aria-label="Why buyers choose this guidance"
      >
        <article className="slv-card">
          <h2 className="slv-card__title">Neighborhood intel</h2>
          <p className="slv-card__text">
            Sunstone and Trilogy Sunset inventory, pricing, and what it feels
            like to live here, not generic national headlines.
          </p>
        </article>
        <article className="slv-card">
          <h2 className="slv-card__title">Offer to closing</h2>
          <p className="slv-card__text">
            From first tour through inspection and closing, milestones and
            paperwork are explained in plain language.
          </p>
        </article>
        <article className="slv-card">
          <h2 className="slv-card__title">Your pace</h2>
          <p className="slv-card__text">
            Compare homes, refine your offer strategy, and decide on your
            timeline, without pressure.
          </p>
        </article>
      </section>

      <KcmNationalFeedSection
        items={kcmFeedTeaser}
        heading="What buyers are reading (national context)"
        intro="Short articles from Simplifying the Market on affordability, offers, and trends (opens in a new tab). Pair these with local guidance for Sunstone and Trilogy Sunset from Dr. Jan Duffy."
        headingId="kcm-teaser-heading"
      />
    </>
  );
}
