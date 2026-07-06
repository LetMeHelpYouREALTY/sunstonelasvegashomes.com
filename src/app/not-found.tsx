import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { LinkButton } from "@/components/LinkButton";
import { PageChrome } from "@/components/PageChrome";
import { RealScoutListingSection } from "@/components/home/RealScoutListingSection";
import { SITE } from "@/config";
import { buildPageMetadata, buildStructuredData } from "@/lib/json-ld";

const title = `Page not found | ${SITE.title}`;
const description =
  "This URL is not on Sunstone Las Vegas Homes. Return home or open the MLS search, buying process, or about page.";

export const metadata = buildPageMetadata({
  title,
  description,
  canonicalPath: "/404/",
});

export default function NotFound() {
  return (
    <>
      <JsonLd
        data={buildStructuredData({
          title,
          description,
          canonicalPath: "/404/",
        })}
      />
      <Header />
      <main
        id="main-content"
        className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center px-4 py-10"
      >
        <div className="mb-8 flex flex-col items-center justify-center">
          <p className="text-9xl leading-none font-bold text-accent">404</p>
          <h1 className="mt-4 text-2xl sm:text-3xl">Page not found</h1>
          <p className="mt-3 max-w-md text-center text-foreground/80">
            That URL is not on this site. Try home, MLS search, or the links below.
          </p>
        </div>
        <RealScoutListingSection tightTop />
        <div className="flex flex-col items-center justify-center">
          <LinkButton
            href="/"
            className="my-6 text-lg underline decoration-dashed underline-offset-8"
          >
            Go back home
          </LinkButton>
          <nav
            className="flex max-w-md flex-col gap-3 text-center sm:flex-row sm:flex-wrap sm:justify-center"
            aria-label="Popular pages"
          >
            <LinkButton
              href="#browse-listings"
              className="text-base underline decoration-dashed underline-offset-8"
            >
              Find homes
            </LinkButton>
            <LinkButton
              href="/buyers/"
              className="text-base underline decoration-dashed underline-offset-8"
            >
              Home buyer guide
            </LinkButton>
            <LinkButton
              href="/faq/"
              className="text-base underline decoration-dashed underline-offset-8"
            >
              FAQ
            </LinkButton>
            <LinkButton
              href="/buying-process/"
              className="text-base underline decoration-dashed underline-offset-8"
            >
              Buying process
            </LinkButton>
            <LinkButton
              href="/about/"
              className="text-base underline decoration-dashed underline-offset-8"
            >
              About Dr. Jan Duffy
            </LinkButton>
            <LinkButton
              href="/contact/"
              className="text-base underline decoration-dashed underline-offset-8"
            >
              Contact
            </LinkButton>
            <LinkButton
              href="/sellers/"
              className="text-base underline decoration-dashed underline-offset-8"
            >
              Sellers
            </LinkButton>
          </nav>
        </div>
      </main>
      <PageChrome omitListingsFooter />
    </>
  );
}
