"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Main } from "@/components/Main";
import { PageChrome } from "@/components/PageChrome";

type SearchResult = {
  url: string;
  meta?: { title?: string };
  excerpt?: string;
};

type PagefindApi = {
  init: () => Promise<void>;
  search: (query: string) => Promise<{
    results: Array<{ data: () => Promise<SearchResult> }>;
  }>;
};

declare global {
  interface Window {
    pagefind?: PagefindApi;
  }
}

function loadPagefind(): Promise<PagefindApi> {
  if (window.pagefind) {
    return Promise.resolve(window.pagefind);
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "/pagefind/pagefind.js";
    script.async = true;
    script.onload = () => {
      if (window.pagefind) {
        resolve(window.pagefind);
        return;
      }
      reject(new Error("Pagefind failed to load"));
    };
    script.onerror = () => reject(new Error("Pagefind script missing"));
    document.body.appendChild(script);
  });
}

export function SearchPageClient() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "empty">("idle");

  const runSearch = useCallback(async (term: string) => {
    const trimmed = term.trim();
    if (!trimmed) {
      setResults([]);
      setStatus("idle");
      return;
    }

    setStatus("loading");

    try {
      const pagefind = await loadPagefind();
      await pagefind.init();
      const search = await pagefind.search(trimmed);
      const data = await Promise.all(search.results.map(result => result.data()));
      setResults(data);
      setStatus(data.length > 0 ? "idle" : "empty");
    } catch {
      setStatus("error");
    }
  }, []);

  return (
    <>
      <Header />
      <Main
        pageTitle="Search"
        pageDesc="Find articles by keyword. For MLS listings, use the home search on the homepage."
        earlyListings={false}
      >
        <form
          className="space-y-4"
          onSubmit={event => {
            event.preventDefault();
            void runSearch(query);
          }}
        >
          <label className="block text-sm font-medium" htmlFor="site-search">
            Search blog posts
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="site-search"
              name="q"
              type="search"
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="Keywords, topics, neighborhoods…"
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground"
            />
            <button
              type="submit"
              className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-background"
            >
              Search
            </button>
          </div>
        </form>

        {status === "loading" && <p className="mt-6 text-sm italic">Searching…</p>}
        {status === "error" && (
          <div className="mt-6 rounded-md bg-muted/75 p-4 text-sm">
            <p className="font-semibold">Search index not available yet.</p>
            <p className="mt-2">
              Run <code className="rounded bg-black px-2 py-1 text-white">pnpm run build</code> to
              generate the Pagefind index, or browse{" "}
              <Link href="/posts/" className="text-accent underline">
                all posts
              </Link>{" "}
              and{" "}
              <Link href="/tags/" className="text-accent underline">
                tags
              </Link>
              .
            </p>
          </div>
        )}
        {status === "empty" && (
          <p className="mt-6 text-sm text-foreground/80">No matches for that query.</p>
        )}
        {results.length > 0 && (
          <ul className="mt-6 space-y-4">
            {results.map(result => (
              <li key={result.url} className="border-b border-border pb-4">
                <Link href={result.url} className="text-lg font-medium text-accent hover:underline">
                  {result.meta?.title ?? result.url}
                </Link>
                {result.excerpt && (
                  <p
                    className="mt-1 text-sm text-foreground/80"
                    dangerouslySetInnerHTML={{ __html: result.excerpt }}
                  />
                )}
              </li>
            ))}
          </ul>
        )}

        <p className="mt-8 text-sm text-foreground/80">
          Powered by{" "}
          <Link href="https://pagefind.app/" className="text-accent underline">
            Pagefind
          </Link>
          .
        </p>
      </Main>
      <PageChrome />
    </>
  );
}
