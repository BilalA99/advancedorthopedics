# 00 — Baseline

Recorded 2026-09-27, before any change in this workstream.

## Repository and environment

| Field | Value |
| --- | --- |
| Repository | `advancedorthopedics` (`C:\Users\Bilal\appflows\ortho\advancedorthopedics`) |
| Branch | `feat/intake-insurance-routing` |
| Commit at start | `388d7f7` |
| `origin` | `https://github.com/BilalA99/advancedorthopedics.git` — **this fork's `main` is production** |
| `upstream` | `https://github.com/AppFlow-Studio/advancedorthopedics.git` |
| Framework | Next.js 15.3.6, App Router, React 18 |
| Deployment | Vercel, auto-deploys from `origin/main` |
| Production URL | `https://mountainspineorthopedics.com` |
| Supabase (prod) | project `bwrnnmzqipnoakmdbevz` (`mountainspine`), Postgres 15, lead table `public.forms` |
| Email | Resend (`RESEND_API_KEY`), staff inbox `info@mountainspineorthopedics.com` |
| Canonical lead event | `lead_form_submit_success` (`lib/lead-contract.ts`) |

`git status` at start showed four modified files unrelated to this work
(`app/layout.tsx`, `docs/meta-tracking.md`, `lib/meta-pixel.ts`,
`tests/measurement-meta-pixel.test.ts`) plus untracked `audit-shots/`,
`audit-shots-updated/` and a report CSV. **All were preserved**; nothing in this
workstream touched them.

Mid-session, `origin/HomeSEO` was merged in at the user's request. It contained
two merge commits (PRs #99 and #101) whose content was already in this branch, so
the merge was clean and changed no files.

## Starting test state

| Gate | Result |
| --- | --- |
| `npm run test:measurement` | 95/95 pass |
| `npm run validate:measurement` | 10/10 checks pass |
| `npx tsc --noEmit` | **unusable** — see below |

### Typecheck is broken in this environment, pre-existing

`npx tsc --noEmit` reports ~20,664 errors, dominated by
`Property 'div' does not exist on type 'JSX.IntrinsicElements'` in files nobody
touched (`components/data/clinics.tsx` alone accounts for 3,918). The cause is a
dependency mismatch: `@types/react@18.0.38` imports `scheduler/tracing`, which
`scheduler@0.23.2` no longer ships, which collapses the global JSX namespace.

This is not caused by this change and is not fixed here — `next.config.ts` already
sets `typescript.ignoreBuildErrors`, so the build never depended on it. Type
confidence for this work therefore comes from the production build, the 146-test
measurement suite, and the in-browser end-to-end runs, not from `tsc`.

Fixing it is a one-line dependency bump (`@types/react` to a version matching
`scheduler@0.23`) and is recommended as separate work.

## What the previous commit on this branch had done

`388d7f7` ("feat(intake): insurance-based qualification routing with explicit PPO")
implemented the insurance dropdown and routing on `ContactForm.tsx`, but **also
removed the ZIP / postal code field**, which the 2026-09-24 meeting had explicitly
kept. Correcting that is the origin of this workstream.

It also left the carrier list behind an `INSURANCE_LIST_APPROVED = false` flag with
a hand-written `APPROVED_PLANS` array, and referenced a documentation directory
(`docs/2026-09-26-intake/`) that was never created.

## Baseline findings that shaped the work

1. **ZIP was never stored.** `public.forms` had no ZIP column at all (1,243 rows;
   `best_time` and `insurance_type` existed, ZIP did not), and
   `logLeadToSupabase` never wrote one. ZIP reached only the client-side Google Ads
   Enhanced Conversions payload and was then discarded. See `02` and `04`.
2. **An authoritative plan list already existed** in
   `components/data/insurancePlans.ts`, published to patients on `/insurance-policy`,
   with 13 entries and a per-plan `accepted` / `partial` / `not-accepted` status.
   The previous commit had duplicated part of it behind a flag. See `02`.
3. **Nine form components post patient intake, not one.** Only `ContactForm`
   had been changed. See `01`.
4. **`/find-care/book-an-appointment` does not render `ConsultationForm`** —
   `<ConsultationForm />` is commented out in `FindCardContactUsSection.tsx` and the
   page renders `DoctorContactForm` instead. Found by reading the live DOM, not the
   source. See `01`.
5. **`MiniContactForm` was unsubmittable.** Its zod schema required `bestTime`
   (`min(1)`) while no input for it was ever rendered, so the resolver could never
   pass. Pre-existing; fixed as a side effect of this work. See `04`.
6. Neither thank-you page contains any analytics call, so a direct visit or a
   refresh could not fire a conversion even before this change. Confirmed and now
   enforced by a test.

## Baseline screenshots

`evidence/desktop/` and `evidence/mobile/` hold the after-state captures at all
required breakpoints. Before-state captures of the *pre-388d7f7* form are not
reproducible from this working tree without reverting the branch; the field-level
before/after is recorded instead in `04-implementation-summary.md` and is
verifiable from `git show 388d7f7`.
