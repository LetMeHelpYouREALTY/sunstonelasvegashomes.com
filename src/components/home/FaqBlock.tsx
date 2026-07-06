import type { FaqEntry } from "@/data/faq-entries";

type FaqBlockProps = {
  entries: FaqEntry[];
  hideHeading?: boolean;
};

export function FaqBlock({ entries, hideHeading = false }: FaqBlockProps) {
  return (
    <section
      id="faq"
      className="mx-auto mb-12 max-w-2xl px-2"
      aria-labelledby={hideHeading ? undefined : "faq-heading"}
      aria-label={hideHeading ? "FAQ answers" : undefined}
    >
      {!hideHeading && (
        <h1 id="faq-heading" className="mb-5 text-2xl font-semibold text-[#0a2540]">
          Frequently asked questions
        </h1>
      )}
      <div className="flex flex-col gap-5">
        {entries.map(entry => (
          <div
            key={entry.question}
            className="rounded-2xl bg-white p-5 text-[#0a2540] shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
          >
            <h2 className="mb-2 text-[1.05rem] font-semibold">{entry.question}</h2>
            <p className="m-0 text-[0.95rem] leading-relaxed">{entry.answer}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-center text-[0.95rem] text-[#0a2540]">
        Ready to see listings in your range?{" "}
        <a className="font-semibold text-[#3a8dde]" href="#browse-listings">
          Open the home search
        </a>
        .
      </p>
    </section>
  );
}
