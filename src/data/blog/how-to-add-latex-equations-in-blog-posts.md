---
author: Dr. Jan Duffy
pubDatetime: 2024-09-08T20:58:52.737Z
modDatetime: 2026-03-21T12:00:00.000Z
title: "LaTeX in blog posts (for market math when you need it)"
slug: how-to-add-latex-equations-in-blog-posts
tags:
  - docs
  - las-vegas
description: "LaTeX and KaTeX on AstroPaper—formatting payment or rate examples clearly on Sunstone Las Vegas Homes without cluttering mobile layouts."
---

> **Las Vegas & Sunstone** — Published by **Dr. Jan Duffy** (Nevada license S.0197614.LLC, Berkshire Hathaway HomeServices Nevada Properties). Technical reference for [Sunstone Las Vegas Homes](https://www.sunstonelasvegashomes.com/). This is **not** tax or lending advice—consult licensed professionals for your situation.

---

This document shows how **LaTeX** can render in Markdown on AstroPaper when you need precise formulas (for example illustrating **payment** or **rate** relationships in educational posts). Use sparingly on real estate sites so mobile readers stay focused on **homes and neighborhoods**.

<figure>
  <img
    src="https://images.pexels.com/photos/22690748/pexels-photo-22690748/free-photo-of-close-up-of-complicated-equations-written-on-a-blackboard.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    alt="Free Close-up of complex equations on a chalkboard, showcasing chemistry and math symbols. Stock Photo"
  />
  <figcaption class="text-center">
    Photo by <a href="https://www.pexels.com/photo/close-up-of-complicated-equations-written-on-a-blackboard-22690748/">Vitaly Gariev</a>
  </figcaption>
</figure>

## Table of contents

## Instructions

In this section, you will find instructions on how to add support for LaTeX in your Markdown files for AstroPaper.

1. Install the necessary remark and rehype plugins by running:

   ```bash
   pnpm install rehype-katex remark-math katex
   ```

2. Update the Astro configuration (`astro.config.ts`) to use the these plugins:

   ```ts
   // other imports
   import remarkMath from "remark-math";
   import rehypeKatex from "rehype-katex";

   export default defineConfig({
     // other configs
     markdown: {
       remarkPlugins: [
         remarkMath, // <- new plugin
         remarkToc,
         [remarkCollapse, { test: "Table of contents" }],
       ],
       rehypePlugins: [rehypeKatex], // <- new plugin
       shikiConfig: {
         // For more themes, visit https://shiki.style/themes
         themes: { light: "min-light", dark: "night-owl" },
         wrap: true,
       },
     },
     // other configs
   });
   ```

3. Import KaTeX CSS in the main layout file `src/layouts/Layout.astro`

   ```astro
   ---
   import { SITE } from "@config";

   // astro code
   ---

   <!doctype html>
   <!-- others... -->
   <script is:inline src="/toggle-theme.js"></script>

   <link
     rel="stylesheet"
     href="https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/katex.min.css"
   />

   <body>
     <slot />
   </body>
   ```

4. As the last step, add a text-color for `katex` in `src/styles/typography.css`.

   ```css
   @plugin '@tailwindcss/typography';

   @layer base {
     /* other classes */

     /* Katex text color */
     .prose .katex-display {
       @apply text-foreground;
     }

     /* ===== Code Blocks & Syntax Highlighting ===== */
     /* other classes */
   }
   ```

And _voilà_, this setup allows you to write LaTeX equations in your Markdown files, which will be rendered properly when the site is built. Once you do it, the rest of the document will appear rendered correctly.

---

## Inline Equations

Inline equations are written between single dollar signs `$...$`. Here are some examples:

1. The famous mass-energy equivalence formula: `$E = mc^2$`
2. The quadratic formula: `$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$`
3. Euler's identity: `$e^{i\pi} + 1 = 0$`

---

## Block Equations

For more complex equations or when you want the equation to be displayed on its own line, use double dollar signs `$$...$$`:

The Gaussian integral:

```bash
$$ \int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi} $$
```

The definition of the Riemann zeta function:

```bash
$$ \zeta(s) = \sum_{n=1}^{\infty} \frac{1}{n^s} $$
```

Maxwell's equations in differential form:

```bash
$$
\begin{aligned}
\nabla \cdot \mathbf{E} &= \frac{\rho}{\varepsilon_0} \\
\nabla \cdot \mathbf{B} &= 0 \\
\nabla \times \mathbf{E} &= -\frac{\partial \mathbf{B}}{\partial t} \\
\nabla \times \mathbf{B} &= \mu_0\left(\mathbf{J} + \varepsilon_0 \frac{\partial \mathbf{E}}{\partial t}\right)
\end{aligned}
$$
```

---

## Using Mathematical Symbols

LaTeX provides a wide range of mathematical symbols:

- Greek letters: `$\alpha$`, `$\beta$`, `$\gamma$`, `$\delta$`, `$\epsilon$`, `$\pi$`
- Operators: `$\sum$`, `$\prod$`, `$\int$`, `$\partial$`, `$\nabla$`
- Relations: `$\leq$`, `$\geq$`, `$\approx$`, `$\sim$`, `$\propto$`
- Logical symbols: `$\forall$`, `$\exists$`, `$\neg$`, `$\wedge$`, `$\vee$`
