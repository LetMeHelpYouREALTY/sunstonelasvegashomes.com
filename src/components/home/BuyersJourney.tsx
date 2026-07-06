import type { KcmFeedItem } from "@/lib/kcm-feed";
import { KcmNationalFeedSection } from "@/components/home/KcmNationalFeedSection";

type BuyersJourneyProps = {
  kcmFeedTeaser: KcmFeedItem[];
};

const steps = [
  {
    title: "Search live MLS listings",
    text: "Use the MLS home search at the bottom of this site (or from the homepage) to filter by price, property type, and status—then save favorites and reach out when you are ready to tour.",
    href: "/#browse-listings",
    linkLabel: "Go to home search",
  },
  {
    title: "Explore Sunstone & Trilogy Sunset",
    text: "See location, lifestyle context, and what makes these communities a fit before you narrow your short list.",
    href: "/location/",
    linkLabel: "View location & area",
  },
  {
    title: "Understand the Las Vegas market",
    text: "Get context on trends and timing so your offer strategy matches current conditions—not last year's headlines.",
    href: "/market/",
    linkLabel: "Las Vegas market overview",
  },
] as const;

const pillars = [
  {
    title: "Neighborhood intel",
    text: "Sunstone and Trilogy Sunset inventory, pricing, and what it feels like to live here—not generic national headlines.",
  },
  {
    title: "Offer to closing",
    text: "From first tour through inspection and closing, milestones and paperwork are explained in plain language.",
  },
  {
    title: "Your pace",
    text: "Compare homes, refine your offer strategy, and decide on your timeline—without pressure.",
  },
] as const;

export function BuyersJourney({ kcmFeedTeaser }: BuyersJourneyProps) {
  return (
    <>
      <section
        className="mx-auto mb-10 max-w-[1200px] px-1"
        aria-labelledby="buyer-steps-heading"
      >
        <h2
          id="buyer-steps-heading"
          className="mb-5 text-center text-[1.35rem] font-semibold text-[#0a2540]"
        >
          Next steps for home buyers
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5 [counter-reset:buyer-step]">
          {steps.map(step => (
            <article
              key={step.title}
              className="relative flex flex-col rounded-2xl border border-[rgba(10,37,64,0.06)] bg-white p-5 text-[#0a2540] shadow-[0_2px_8px_rgba(0,0,0,0.08)] before:absolute before:top-4 before:right-4 before:flex before:h-7 before:w-7 before:items-center before:justify-center before:rounded-full before:bg-[rgba(58,141,222,0.12)] before:text-sm before:font-bold before:text-[#3a8dde] before:content-[counter(buyer-step)] [counter-increment:buyer-step]"
            >
              <h3 className="mb-2 pr-8 text-[1.05rem] font-semibold">{step.title}</h3>
              <p className="m-0 flex-1 text-[0.92rem] leading-6 opacity-90">{step.text}</p>
              <a
                href={step.href}
                className="mt-4 font-semibold text-[#3a8dde] no-underline hover:underline"
              >
                {step.linkLabel}
              </a>
            </article>
          ))}
        </div>
      </section>

      <section
        className="my-8 mb-12 grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6"
        aria-label="Why buyers choose this guidance"
      >
        {pillars.map(pillar => (
          <div
            key={pillar.title}
            className="rounded-2xl bg-white p-6 text-[#0a2540] shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
          >
            <h2 className="mb-2 text-lg font-semibold">{pillar.title}</h2>
            <p className="m-0 text-[0.95rem] leading-6">{pillar.text}</p>
          </div>
        ))}
      </section>

      <KcmNationalFeedSection
        items={kcmFeedTeaser}
        heading="What buyers are reading (national context)"
        intro="Short articles from Simplifying the Market—affordability, offers, and trends (opens in a new tab). Pair these with local guidance for Sunstone and Trilogy Sunset from Dr. Jan Duffy."
        headingId="kcm-teaser-heading"
      />
    </>
  );
}
