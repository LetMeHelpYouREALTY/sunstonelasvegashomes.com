import { RealScoutListingSection } from "@/components/home/RealScoutListingSection";
import { SITE } from "@/config";

type MainBaseProps = {
  pageDesc?: string;
  earlyListings?: boolean;
  children: React.ReactNode;
};

type StringTitleProps = MainBaseProps & {
  pageTitle: string;
};

type ArrayTitleProps = MainBaseProps & {
  pageTitle: [string, string];
  titleTransition?: string;
};

export type MainProps = StringTitleProps | ArrayTitleProps;

export function Main(props: MainProps) {
  const { pageDesc, earlyListings = true, children } = props;
  const backUrl = SITE.showBackButton ? undefined : "/";

  return (
    <main
      data-backurl={backUrl}
      id="main-content"
      className="mx-auto w-full max-w-3xl px-4 pb-4"
    >
      {"titleTransition" in props ? (
        <h1 className="text-2xl font-semibold sm:text-3xl">
          {props.pageTitle[0]}
          <span>{props.pageTitle[1]}</span>
        </h1>
      ) : (
        <h1 className="text-2xl font-semibold sm:text-3xl">{props.pageTitle}</h1>
      )}
      {pageDesc && <p className="mt-2 mb-6 italic">{pageDesc}</p>}
      {earlyListings && <RealScoutListingSection tightTop />}
      {children}
    </main>
  );
}
