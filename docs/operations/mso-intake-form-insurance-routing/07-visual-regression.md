# 07 — Visual regression

## What this project supports, and what was done instead

There is no visual-regression harness in this repository — no Playwright, no
Percy, no stored baseline images, and no `test:visual` script. `puppeteer@^23` is a
devDependency and is what the SEO tooling already uses, so that is what the visual
checks here are built on.

Rather than claim a baseline comparison that does not exist, the visual work is
**assertion-based**: each screenshot is accompanied by machine-checked properties
of the rendered DOM, so a regression fails a check rather than relying on someone
noticing a pixel difference.

## What is asserted per viewport

Run by `scripts/qa/intake-visual-matrix.mjs` across 5 desktop and 9 mobile
viewports, on two pages each:

| Property | Why it is checked rather than eyeballed |
| --- | --- |
| ZIP field exists, is visible, has non-zero size | The regression this whole workstream corrects was ZIP silently disappearing. |
| ZIP is inside the viewport (no clipping left or right) | A field pushed off-canvas is invisible but still "present". |
| ZIP `inputmode`, `autocomplete`, `aria-label` | Attributes that only matter on a real device and never show in a screenshot. |
| Insurance dropdown exists and is not clipped | The added control is the one most likely to overflow a narrow column. |
| Best-time absent **from the intake form** | Scoped to the form, because other components on the same page legitimately carried the field during the rollout. |
| `scrollWidth ≤ clientWidth` | Horizontal overflow is invisible in a fixed-width screenshot. |
| No console errors, no hydration warnings | Never visible in a screenshot at all. |
| CSS actually applied | See below. |

### The CSS sanity probe

Every measurement is preceded by injecting a `<div class="hidden">` and asserting
its computed `display` is `none`. An unstyled page renders the mobile and desktop
trees simultaneously, so DOM-order and geometry checks return plausible, wrong
answers — and a broken `.next` build serves HTML fine while returning 400 for every
stylesheet. Without this probe a whole matrix can pass while measuring nonsense.

`hidden` is used deliberately rather than `sm:hidden`, which does nothing below
640px and would be a useless probe at exactly the widths that matter.

### Scrolling before capture

The intake form sits below the fold inside a reveal animation whose ancestor starts
at `opacity: 0`. Screenshotting without scrolling it into view produces a blank
image of a form that is present and correct. Every capture scrolls the ZIP field to
centre and waits for the reveal to settle.

## Screenshots

```
evidence/desktop/   home-{1280x720,1366x768,1440x900,1536x864,1920x1080}-form.png
                    insurance-policy-{…same five…}-form.png
evidence/mobile/    home-{320x568,360x800,375x667,390x844,393x852,412x915,414x896,768x1024,820x1180}-form.png
                    insurance-policy-{…same nine…}-form.png
```

Machine-readable results: `evidence/visual-matrix-results.json`.

All captures use synthetic data only (`Testpatient Synthetic`,
`qa+intake@example.com`, ZIP `33463`). No real patient data appears in any
evidence artefact.

## Before / after

Before-state captures of the *pre-`388d7f7`* form are not reproducible from this
working tree without reverting the branch, so they are not fabricated here. The
field-level before/after is recorded in `04-implementation-summary.md` and is
independently verifiable from `git show 388d7f7`.

What the after-state screenshots do show, at every breakpoint:

- ZIP / Postal Code present, labelled, required-marked
- Insurance present, labelled, required-marked, PPO first in the list
- no "Best Time To Contact" anywhere in the intake form

## Two layout findings, both recorded rather than silently absorbed

1. **14px fields at ≥768px.** shadcn's `Input` carries `md:text-sm`, so every field
   in every form is 14px from 768px up, which triggers iOS focus-zoom on iPad.
   Pre-existing and sitewide; reported by the matrix, not failed on.
2. **Duplicate `id="postal_code"`.** Five components use the same id, and the
   homepage lazily mounts `DoctorContactForm`, so a page can contain two. This
   caused a real measurement bug in the harness (measuring a hidden field) and
   would have caused a real label-association bug had the intake label kept its
   hardcoded `htmlFor`. The `htmlFor` was removed; de-duplicating the ids is
   recorded as follow-up work.

A third was found and **fixed**: `DoctorContactForm` rendered two layout variants
that both emitted `id="doctor_insurance_type"`. The second is now
`doctor_compact_insurance_type`.

## Recommended follow-up

If visual regression becomes a standing requirement, the smallest useful step is to
add `@playwright/test` with `toHaveScreenshot()` and commit baselines for these
same two pages at these same fourteen viewports. The assertion checks above should
be kept either way — they catch the failures a screenshot diff cannot see.
