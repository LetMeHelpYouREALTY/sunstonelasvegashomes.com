import LinkButton from "@/components/LinkButton";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import RealScoutListingSection from "@/components/home/RealScoutListingSection";
import { SITE } from "@/config";

export const metadata = {
  title: `Page not found | ${SITE.title}`,
  description:
    "This URL is not on Sunstone Las Vegas Homes. Return home or open the MLS search, buying process, or about page.",
  robots: { index: false, follow: false },
};

export default function NotFoundPage() {
  return (
    <>
      <Header />
      <main className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-12">
        <div>
          <p className="text-9xl font-bold text-accent/20">404</p>
          <h1 className="text-2xl font-semibold">Page not found</h1>
          <p className="mt-2 text-foreground/85">
            This URL is not on Sunstone Las Vegas Homes. Try the home search or a
            popular page below.
          </p>
        </div>
        <RealScoutListingSection tightTop />
        <div>
          <LinkButton href="/">Go back home</LinkButton>
          <nav className="mt-6 flex flex-wrap gap-3" aria-label="Popular pages">
            <LinkButton href="/#browse-listings">MLS search</LinkButton>
            <LinkButton href="/buyers/">Buyers</LinkButton>
            <LinkButton href="/faq/">FAQ</LinkButton>
            <LinkButton href="/buying-process/">Buying process</LinkButton>
            <LinkButton href="/about/">About</LinkButton>
            <LinkButton href="/contact/">Contact</LinkButton>
            <LinkButton href="/sellers/">Sellers</LinkButton>
          </nav>
        </div>
      </main>
      <Footer />
    </>
  );
}
