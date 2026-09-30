# FAQ server-rendering audit

## The question this answers

Is the FAQ **answer text** in the HTML the server sends, before any JavaScript
runs? That is what a non-rendering crawler reads, what most LLM fetchers read, and
what Google's structured-data validator compares its FAQPage JSON-LD against.

Verified with a plain `fetch`, deliberately **not** a browser. Rendering the page
in Puppeteer would run React, hydrate, and show the answers whether or not they
were ever in the server HTML — which is precisely the failure the audit exists to
detect. The raw response is the source of truth.

Reproduce: `node scripts/qa/faq-ssr-audit.mjs <baseUrl>`

## Result

**Every FAQ surface on the site server-renders its answers.** 17 page families,
96 Q&A pairs checked. One genuine defect was found and fixed (below).

| Page family | Component | Q&A | Answers in server HTML |
| --- | --- | --- | --- |
| `/about/faqs` | `FaqsSection` | 28 | yes |
| `/find-care/second-opinion` | `FaqsSection` | 5 | yes |
| `/find-care/free-mri-review` | `FaqsSection` | — | no FAQ schema (see below) |
| `/find-care/candidacy-check` | `FaqsSection` | — | no FAQ schema (see below) |
| `/conditions/[slug]` | `ConditionFAQ` | 5 each | yes |
| `/treatments/[TreatmentDetails]` | `TreatmentFAQ` | 4–6 each | yes |
| `/treatments/orthopedic-injections` | `InjectionsFAQ` | 11 | yes — **after the fix below** |
| `/locations/[state]/[location]` | `LocationFAQSection` | 8 | yes |
| `/locations/[state]` | `state-faqs` | 5 | yes |
| `/injuries/*` (4 pages) | `faqs.ts` | 10 each | yes |
| `/area-of-pain/*` | inline | — | no FAQ schema |
| `/lp/*` (4 paid landing pages) | inline `<details>` | — | no FAQ schema |

## The one real defect, and the fix

**`/treatments/orthopedic-injections` emitted FAQPage JSON-LD describing content
that was not on the page.**

Three of its eleven `acceptedAnswer` strings had no counterpart in the rendered
document. They were not "hidden by an accordion" — they were different text
entirely:

```
schema : "...deliver anti-inflammatory medication to reduce swelling and pain. Gel in…"
page   : "...deliver anti-inflammatory medication, local anesthetic, or other therapeutic…"

schema : "...typically your standard specialist copay plus any remaining deductible…"
page   : "...typically your standard specialist copay plus any deductible responsibility…"
```

A third schema answer ("Yes. PPO insurance plans cover medically necessary
orthopedic injections, including cortisone shots, epidural steroid injections…")
appeared nowhere on the page at all.

### Cause

Two hand-maintained copies of the same content:

- `page.tsx` held `INJECTION_FAQS`, which the visitor reads.
- `layout.tsx` held a hand-written `FAQPage` block, which Google reads.

The layout's own comment read `// ── 6. FAQPage — ALL 9 questions (must match page
content exactly) ──` while carrying eleven questions, three of which did not
match. A comment asserting an invariant is not an invariant.

### Why it matters

Google's structured-data policy requires FAQPage content to be visible on the
page. Schema that asserts otherwise risks a manual action, and at minimum wastes
the rich-result eligibility. For an LLM the failure is sharper: it reads the JSON-LD
as an authoritative summary and the body as the article, and here the two
contradicted each other on insurance coverage — a topic where being wrong has
consequences for a patient.

### Fix

The FAQ content moved to `app/treatments/orthopedic-injections/faqs.ts` — the
convention the four injury pages already use — and `layout.tsx` now derives its
`mainEntity` from it:

```ts
mainEntity: INJECTION_FAQS.map((faq) => ({
  '@type': 'Question',
  name: faq.question,
  acceptedAnswer: { '@type': 'Answer', text: faq.answer.replace(/\*\*/g, '') },
})),
```

The schema is now a projection of exactly what the visitor reads. That class of
drift is no longer possible — the same reasoning that put the insurance dropdown
behind a single canonical list.

## Two false alarms worth recording

Both were bugs in the **audit**, not the site, and both would have produced a
confident wrong answer:

1. **HTML inside `acceptedAnswer`.** Google permits limited markup in answer text
   and this site uses `<strong>`. Comparing the raw schema string against
   tag-stripped page text reported every bolded answer as missing. The audit now
   strips tags from both sides.
2. **Punctuation spacing.** Stripping `<strong>per year</strong>.` leaves
   `per year .`, which fails a naive substring match against identical text. The
   audit now normalises space-before-punctuation.

Had either gone unnoticed, this document would have reported roughly a dozen
phantom failures and buried the one real defect among them.

## Pages with FAQ-style content but no FAQPage schema

Not defects — recorded so the choice is deliberate rather than accidental.

- **`/find-care/free-mri-review`, `/find-care/candidacy-check`** render
  `FaqsSection` but emit no FAQPage JSON-LD. Both are lead-capture questionnaires;
  their FAQ is short and conversion-oriented rather than reference content.
- **`/area-of-pain/*`** has inline Q&A prose without schema.
- **`/lp/*`** (four paid landing pages) use native `<details>` elements with no
  schema. Worth knowing: `<details>` content is in the DOM and indexable, but
  Google treats collapsed content as lower-weight, and these are ad landing pages
  where organic ranking is not the goal.

Adding FAQPage schema to any of these is a content decision, not a bug fix. The
prerequisite is the same in every case: the answers must stay visible on the page.

## Why `'use client'` on a FAQ component is not the problem

`ConditionFAQ` and `TreatmentFAQ` carry `'use client'`. That is unnecessary — they
hold no state and no handlers — but it is **not** an SSR problem: in the App
Router a client component is still server-rendered into the initial HTML. The audit
confirms their answers are present in the raw response.

What *would* break SSR is conditional mounting, and that bug did exist here
historically: `FaqsSection` used to render answers inside
`{openItem === index && (…)}`, so a collapsed answer was created on click and
existed nowhere in the served document. It was fixed before this audit (commits
`b683fd6`, `38fca5c`, `43ef058`) and the component now carries a comment saying so:
*"gate visibility, never mounting."* That rule is the one that matters, and this
audit is what keeps it honest.

## Structural notes from the audit

- `aria-hidden="true"` appears on 6–98 elements per page. These are decorative
  icons and SVGs, which is correct usage. None sit on FAQ answer text — checked by
  confirming every schema answer is present in the tag-stripped visible text.
- Inline `display:none` appears on several pages, again on decorative and
  responsive-variant elements rather than FAQ content.
- `/lp/*` pages use `<details>`; see above.
