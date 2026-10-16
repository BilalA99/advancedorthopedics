# FAQ server-rendering audit + Google Preferred Sources

Two pieces of work, done together because they answer the same question from
opposite ends: **is the content on this site actually readable by Google and by
LLMs, and can a reader tell Google they want more of it?**

| Document | What it covers |
| --- | --- |
| [`00-faq-ssr-audit.md`](./00-faq-ssr-audit.md) | Full FAQ server-rendering audit: 18 page families, 117 Q&A pairs, one real defect found and fixed |
| [`01-preferred-sources.md`](./01-preferred-sources.md) | Preferred Sources implementation, the deeplink-vs-script decision, and the visual design |

## Headline results

**FAQ SSR: 18/18 page families pass, 117 Q&A pairs verified.** Every FAQ answer on
the site is in the HTML the server sends, before any JavaScript runs.

**One genuine defect, fixed.** `/treatments/orthopedic-injections` emitted FAQPage
JSON-LD whose answers did not match the page — three described content that was
nowhere in the document, including a claim about PPO insurance coverage. Cause: two
hand-maintained copies of the same FAQs, one in `page.tsx` and one in `layout.tsx`.
The schema is now derived from a single source.

**Preferred Sources: live on blogs, treatments and conditions.** Server-rendered
link, no third-party script, 5 placements, 24/24 viewport checks.

## Reproduce

```bash
npm start                                      # production build, port 3000

npm run audit:faq-ssr          http://localhost:3000    # 18 pages, plain fetch
npm run audit:preferred-source http://localhost:3000    # 5 pages, 10 checks each
node scripts/qa/preferred-source-visual.mjs http://localhost:3000   # 24 viewports

npm run validate:faq-ssr       # static gate, also runs in prebuild
```

## The build gate

`scripts/validate-faq-ssr-contract.mjs` runs in `prebuild`, so a build fails rather
than shipping FAQ content a crawler cannot read. Three checks, each verified to
**fail** when its invariant is deliberately broken:

1. **FAQ answers are always mounted** — an accordion may hide an answer visually,
   never create it on click. This is the exact bug that existed here historically:
   answers rendered inside `{openItem === index && (…)}` within an
   `AnimatePresence`, so the served HTML carried every question and only the first
   answer.
2. **The injections FAQPage schema is derived, not hand-written** — the regression
   that this work found.
3. **The preferred-source control stays a server-rendered link** — not a
   third-party script, with a bare-domain deeplink, an accessible name and
   `rel="noopener"`.

The runtime audits need a live server and so cannot run in `prebuild`; the gate
covers the structural invariants whose violation caused every defect found here.

## Two audit bugs worth knowing about

Both would have produced a confident wrong answer, and both are now fixed:

- Comparing the raw `acceptedAnswer` string (which legitimately contains
  `<strong>`) against tag-stripped page text reported every bolded answer as
  missing — about a dozen phantom failures that would have buried the one real
  defect.
- Stripping an inline tag leaves a space before the punctuation that followed it
  (`per year</strong>.` → `per year .`), failing a substring match on
  character-identical text.

The lesson generalises: an audit that reads prose as code, or markup as content,
fails in the direction of looking thorough. Both were caught by checking whether
the "missing" text was genuinely absent from the page rather than trusting the
comparison.
