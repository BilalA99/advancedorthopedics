# Performance Report — 2026-08-29

Measured from `next build` output on branch `HomeSEO`. Route figures are
**first-load JS**. Shared baseline across all routes: **102 kB**.

## Before / after

| Route | Before | After | Change |
|---|---:|---:|---:|
| `/area-of-pain/back-pain/[PainArea]` | 729 kB | **325 kB** | −404 kB (−55%) |
| `/area-of-pain/neck-and-shoulder-pain/[PainArea]` | 729 kB | **325 kB** | −404 kB (−55%) |
| `/area-of-pain/foot-pain/[FootSlug]` | 724 kB | **320 kB** | −404 kB (−56%) |
| `/conditions` | 461 kB | **274 kB** | −187 kB (−41%) |
| `/treatments` | 422 kB | **273 kB** | −149 kB (−35%) |
| **Top-5 combined** | **3,206 kB** | **2,092 kB** | **−1,114 kB (−35%)** |

The area-of-pain reduction applies across roughly 390 prerendered pages.

## Root cause

Five `'use client'` components imported `components/data/conditions.tsx`
(1.3 MB of source) and `components/data/treatments.tsx` (867 kB) directly.

A bundler cannot tree-shake individual entries out of a single array literal,
so the entire dataset — including every long-form JSX content field that no
client component reads — was shipped to the browser. `/area-of-pain/*` was
sending ~600 kB of medical prose to render at most fourteen links.

This is the same failure mode `components/data/clinicsForMap.generated.ts` was
created to prevent; its header comment describes the problem exactly. The fix
takes the same shape.

## Fix

`scripts/generate-taxonomy-index.mjs` emits
`components/data/taxonomyIndex.generated.ts` containing only the five fields
client components actually read — `slug`, `title`, `tag`, `body`, `card_img` —
for 112 conditions and 121 treatments, in 159 kB.

Verified field requirements before slimming rather than assuming:
`ConditionCard` and `TreatmentCard` each read exactly those five.

Two supporting pieces were required because the source modules import image
assets and embed JSX, which plain Node cannot evaluate:

- `scripts/asset-stub-loader.mjs` resolves asset specifiers to an inert module.
- The generator self-registers that loader and installs a minimal React shim
  before dynamically importing, so `--check` runs in prebuild without the
  caller setting `NODE_OPTIONS`.

`generate-taxonomy-index.mjs --check` is wired into `prebuild`, so the index
cannot drift from the source data.

## Not changed, and why

- **`ConditionsSearchBar`** looked like a sixth offender in a plain grep, but
  its import is `import type { ConditionInfoProp }` — type-only, erased at
  compile time. It never bundled the data.
- **`/conditions/[slug]` (538 kB)** and **`/treatments/[TreatmentDetails]`
  (486 kB)** are still heavy. They are server components, so the weight comes
  from client components further down their trees. Not yet traced.
- **41 legacy `next/image` `layout` props.** Investigated and deliberately left:
  Next 15 renders them correctly (`data-nimg="fill"`, full `srcSet` on 100% of
  sampled images). Deprecation debt, not a defect; converting 41 call sites
  without visual regression testing would be unverifiable churn.

## Verified after the change

Both hubs render correctly in a production build served locally: H1, body-part
chips, 9 cards with images, pagination, search, and no horizontal overflow at
either desktop (1411 px) or mobile (486 px). Area-of-pain pages still render 9
related-condition and 6 related-treatment links with their cross-canonical
intact.

## Not measured

No Lighthouse run, no field data, and therefore **no LCP / INP / CLS figures**.
Core Web Vitals were not measured: this machine could not hold a browser, a
production server and a Lighthouse run concurrently — free RAM sat between
270 MB and 2 GB throughout, and screenshot capture timed out twice under load.
Bundle size is a strong proxy but is not a substitute for measuring the vitals
themselves.
