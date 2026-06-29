import RealScoutWidgets from "@/components/home/RealScoutWidgets";

type RealScoutListingSectionProps = {
  tightTop?: boolean;
};

export default function RealScoutListingSection({
  tightTop = false,
}: RealScoutListingSectionProps) {
  return (
    <section
      id="browse-listings"
      className={[
        "rs-footer-widget mx-auto max-w-3xl scroll-mt-8 px-4 pb-12",
        tightTop ? "pt-4 md:pt-6" : "pt-8",
      ].join(" ")}
      aria-label="MLS home search and AI-assisted search"
    >
      <h2 className="mb-2 text-center text-xl font-semibold text-foreground">
        Search homes for sale
      </h2>
      <p className="mb-4 text-center text-sm text-foreground/85">
        Describe what you want in plain language, then browse live MLS listings
        for Las Vegas and Henderson, then filter by price, beds, and more.
        Listings update as the market changes.
      </p>
      <RealScoutWidgets />
    </section>
  );
}
