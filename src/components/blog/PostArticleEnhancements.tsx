"use client";

import { useEffect } from "react";

export default function PostArticleEnhancements() {
  useEffect(() => {
    function createProgressBar() {
      if (document.querySelector(".progress-container")) {
        return;
      }

      const progressContainer = document.createElement("div");
      progressContainer.className =
        "progress-container fixed top-0 z-10 h-1 w-full bg-background";

      const progressBar = document.createElement("div");
      progressBar.className = "progress-bar h-1 w-0 bg-accent";
      progressBar.id = "myBar";

      progressContainer.appendChild(progressBar);
      document.body.appendChild(progressContainer);
    }

    function updateScrollProgress() {
      const onScroll = () => {
        const winScroll =
          document.body.scrollTop || document.documentElement.scrollTop;
        const height =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight;
        const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
        const myBar = document.getElementById("myBar");
        if (myBar) {
          myBar.style.width = `${scrolled}%`;
        }
      };

      document.addEventListener("scroll", onScroll);
      return () => document.removeEventListener("scroll", onScroll);
    }

    function addHeadingLinks() {
      const headings = Array.from(
        document.querySelectorAll("h2, h3, h4, h5, h6"),
      );

      for (const heading of headings) {
        if (!heading.id) {
          continue;
        }

        heading.classList.add("group");
        const link = document.createElement("a");
        link.className =
          "heading-link ml-2 opacity-0 group-hover:opacity-100 focus:opacity-100";
        link.href = `#${heading.id}`;

        const span = document.createElement("span");
        span.ariaHidden = "true";
        span.innerText = "#";
        link.appendChild(span);
        heading.appendChild(link);
      }
    }

    function attachCopyButtons() {
      const copyButtonLabel = "Copy";
      const codeBlocks = Array.from(document.querySelectorAll("pre"));

      for (const codeBlock of codeBlocks) {
        if (codeBlock.querySelector(".copy-code")) {
          continue;
        }

        const wrapper = document.createElement("div");
        wrapper.style.position = "relative";

        const copyButton = document.createElement("button");
        copyButton.type = "button";
        copyButton.className =
          "copy-code absolute right-3 -top-3 rounded bg-muted px-2 py-1 text-xs leading-4 text-foreground font-medium";
        copyButton.innerHTML = copyButtonLabel;
        codeBlock.setAttribute("tabindex", "0");
        codeBlock.appendChild(copyButton);

        codeBlock.parentNode?.insertBefore(wrapper, codeBlock);
        wrapper.appendChild(codeBlock);

        copyButton.addEventListener("click", async () => {
          const code = codeBlock.querySelector("code");
          const text = code?.innerText ?? "";
          await navigator.clipboard.writeText(text);
          copyButton.innerText = "Copied";
          setTimeout(() => {
            copyButton.innerText = copyButtonLabel;
          }, 700);
        });
      }
    }

    function backToTop() {
      const button = document.querySelector("#back-to-top");
      const onClick = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      };
      button?.addEventListener("click", onClick);
      return () => button?.removeEventListener("click", onClick);
    }

    createProgressBar();
    const removeScroll = updateScrollProgress();
    addHeadingLinks();
    attachCopyButtons();
    const removeBackToTop = backToTop();

    return () => {
      removeScroll();
      removeBackToTop();
      document.querySelector(".progress-container")?.remove();
    };
  }, []);

  return null;
}
