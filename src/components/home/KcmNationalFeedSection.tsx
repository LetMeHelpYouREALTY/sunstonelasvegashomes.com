import type { KcmFeedItem } from "@/lib/kcm-feed";
import { LinkButton } from "@/components/LinkButton";
import IconArrowRight from "@/assets/icons/IconArrowRight.svg";

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

function formatDate(d: Date | null): string {
  if (!d) return "";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function KcmNationalFeedSection({
  items,
  heading,
  intro,
  headingId = "kcm-national-heading",
  sectionId,
  showDates = false,
  ctaHref = "/market-news/",
  ctaLabel = "More market news",
}: KcmNationalFeedSectionProps) {
  if (items.length === 0) return null;

  return (
    <section
      className="mx-auto mb-12 max-w-[1200px] px-1"
      id={sectionId}
      aria-labelledby={headingId}
    >
      <h2 id={headingId} className="mb-2 text-2xl font-semibold text-[#0a2540]">
        {heading}
      </h2>
      <p className="mb-5 max-w-2xl text-[0.95rem] leading-6 text-[#0a2540] opacity-90">
        {intro}
      </p>
      <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5 p-0">
        {items.map(item => (
          <li key={item.link}>
            <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white text-[#0a2540] shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
              {item.image && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block aspect-video shrink-0 overflow-hidden bg-gradient-to-b from-[rgba(10,37,64,0.04)] to-[#f7f9fc]"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    width={400}
                    height={200}
                    className="block h-full w-full object-cover object-top"
                  />
                </a>
              )}
              <div className="flex flex-1 flex-col p-4">
                {showDates && item.pubDate && (
                  <time
                    className="mb-1 block text-xs leading-snug text-[#0a2540] opacity-75"
                    dateTime={item.pubDate.toISOString()}
                  >
                    {formatDate(item.pubDate)}
                  </time>
                )}
                <h3 className="m-0 text-base leading-snug font-semibold">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-inherit no-underline hover:text-[#3a8dde] hover:underline"
                  >
                    {item.title}
                  </a>
                </h3>
                {item.excerpt && (
                  <p className="mt-2 line-clamp-3 text-sm leading-snug opacity-90">
                    {item.excerpt}
                  </p>
                )}
              </div>
            </article>
          </li>
        ))}
      </ul>
      <div className="mt-6 text-center">
        <LinkButton href={ctaHref}>
          {ctaLabel}
          <IconArrowRight className="inline-block" />
        </LinkButton>
      </div>
    </section>
  );
}
