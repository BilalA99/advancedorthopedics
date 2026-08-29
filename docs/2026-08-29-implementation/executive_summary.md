# Executive Summary — 2026-08-29

## Outcome

Branch `HomeSEO` is now on the **latest upstream `AppFlow-Studio/main` (`5c99f1b`)**
with 11 commits of remediation on top. Everything below is committed, builds
clean, and is verified against production build output — but **nothing is
deployed**, so no live conversion or ranking claim can be made yet.

The single most consequential thing found was not on the roadmap: the
SHARED-02/03 measurement fix was **sitting uncommitted in the working tree**,
and the production database was **missing the columns that code writes**.
Deploying in that state would have returned 500 on every form submission —
zero leads captured, with confirmation emails still going out to patients.
That hazard is now closed.

## What was fixed

**Measurement integrity.** One canonical `lead_form_submit_success`, deduped by
a server-issued submission ID, emitted only after accepted persistence. Legacy
`form_submit`/`form_submission` aliases removed, thank-you conversion restore
removed, duplicate GA4 bootstrap removed. GBRAID/WBRAID now captured and stored
alongside GCLID. Persistence made authoritative (throws rather than silently
swallowing) and moved **before** email send, so a lead can no longer be lost
after the patient has already been emailed. Migration applied to production and
verified: 1,142 rows backfilled, 0 nulls, unique index in place.

**Medical claim truth.** Removed every fabricated rating and review the audit
could substantiate as unsupported: homepage 5.0/200, `/find-care/book-an-appointment`
**4.8/1247**, injections 5.0/54, and three invented named patient testimonials
asserting specific clinical outcomes. Removed a single global "Mon–Sun 8AM–8PM"
applied to all 23 clinics and an identical 11-procedure offer catalog attached
to every location. Retained per-location ratings, which reconcile with the
GBP-derived dataset (23 locations, 530 reviews, 4.98 weighted average).

**Location identity.** The "Miami Beach" clinic is South Miami — its name,
region, coordinates, address and GBP listing all said so while the URL and title
did not. Renamed to `/locations/florida/south-miami-orthopedics` with 301s from
both old URL forms and every slug-derived reference updated.

**Crawlability.** `/conditions` and `/treatments` — the two largest hubs —
shipped **zero** headings and **zero** links in server HTML, because both hub
bodies call `useSearchParams()` and sat behind a Suspense boundary whose
fallback was a grey skeleton. They now server-render a real H1 and a complete
crawlable link list (110 and 121 links respectively).

**Duplicate headings.** Root cause was `TextAnimate` defaulting to `as="h1"`,
compounded by hidden `sr-only` H1s injected in 10 layouts and in the three
area-of-pain clients. Across the built site, pages with anything other than
exactly one H1 went from **390 to 1**.

**Duplicate content.** 390 `/area-of-pain/*` pages were indexable and
self-canonicalising while duplicating `/conditions/*` and being excluded from
the sitemap. 324 now cross-canonical to their `/conditions/` equivalent; the
remaining 66 correctly keep their own canonical because no valid target exists.

**Guardrails.** `npm run validate:locations` now gates the build on placeholder
phones, out-of-state coordinates, address/state mismatches, duplicate canonical
routes and retired-slug collisions — with a 10-probe self-test, because a
validator that always passes is worse than none. `scripts/audit-sitemap-vs-redirects.mjs`
enforces that the sitemap never lists a redirect source.

## Measured before / after

| Metric | Before | After |
|---|---|---|
| Redirecting URLs in sitemap | 4 | **0** (333 → 329 URLs) |
| `/conditions` links in server HTML | 0 | **110** |
| `/treatments` links in server HTML | 0 | **121** |
| Indexable pages without exactly one H1 (of 693) | 390 | **0** |
| `/area-of-pain` pages self-canonicalising as duplicates | 390 | **66** (324 cross-canonical) |
| Fabricated rating claims in schema | 3 | **0** |
| Invented patient reviews in schema | 3 | **0** |
| Clinics with global fake hours in JSON-LD | 23 | **0** |
| `forms` rows lacking a submission ID | 1,142 | **0** |
| Measurement contract tests | none | **8/8** |
| Typecheck errors | 43 | 43 (no regressions) |

## Where the brief was wrong

Several premises were stale and acting on them would have caused damage —
Hollywood's coordinates are correct, PBG's address is complete, location
metadata does not force FL, review authors are real names, the homepage count
was 200 not 250,000, and the `(123) 456-7890` hits are form input placeholders,
which are correct UX. `TreatmentDetailsClient.tsx` — flagged for client-side
JSON-LD injection — is dead code imported nowhere. NJ/NY numbers on Florida
pages come from the site-wide footer by design, not leakage. Full list in
`source_and_data_manifest.md`.

## What remains, and why

**Not deployed.** No production URL, GA4 event, or ranking change has been
observed. Every "after" number above is from build output or a local server.

**Blocked on systems I cannot reach:** Notion (only `authenticate` exposed, so
task updates are staged in `notion_task_reconciliation.md`), GA4/GTM/Tag
Assistant, CallRail, and Google Ads.

**Blocked on clinic facts:** real per-location hours, same-day appointment
availability, per-site service and provider lists, and the provenance of
per-location review bodies. Logged with status in
`medical_claims_and_authorship_audit.csv`. The visible "8AM–8PM, 7 days a week"
copy is deliberately left in place across 17 FAQ answers and 6 components rather
than blanking hours sitewide on my own judgement.

**Not started:** Waves 3–5 are largely untouched. `/conditions/spine` does not
exist and still needs building. The orphan-page and links-to-redirects queues
need a real crawl. The insurance page rebuild, blog conversion module,
treatment/condition template consolidation, design-token layer, motion system,
and the 42 legacy `layout="fill"` image props are all outstanding.

**Environment limit worth knowing:** this machine has 7.3 GB RAM and repeatedly
dropped below 1 GB free. Three production builds were killed mid-run by the OS
(`STATUS_STACK_BUFFER_OVERRUN`) before succeeding. That is a host constraint,
not a code fault, but it materially slowed verification.

## Honest completion statement

This is **not** a completed five-wave program. Wave 1 is substantially done and
Wave 2 is partly done; Waves 3–5 are mostly not started. Nothing is deployed,
no live conversion has been proven, no clinic fact has been verified, and Notion
has not been updated. Palm Beach Gardens is materially closer to launch-ready —
the page now carries the Free Second Opinion offer and correct E.164 phone links
— but the launch gate still depends on CallRail routing and one-time conversion
firing being proven on a deployed site.
