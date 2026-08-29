# Notion Task Reconciliation — 2026-08-29

**Notion was not writable this session.** Only `authenticate` is exposed by the
Notion connector, so no task could be read or updated. This file is the staged
update: statuses below are *proposed*, based on verified evidence, and none have
been applied in Notion. Connect Notion and these can be pasted or synced.

Because live task content could not be read, "prior status" is taken from the
brief's last-known values and may itself be stale.

| Task | Prior (per brief) | Evidence this session | Proposed | Blocker / owner |
|---|---|---|---|---|
| **SHARED-02** — GA4/GTM duplicate lead firing | In Progress / Critical | Work was uncommitted in the working tree, not missing. Committed, rebased onto upstream, tests 8/8. Duplicate `gtag` bootstrap removed; `form_submit`/`form_submission` aliases removed; thank-you conversion restore removed. | **In Progress** | Not deployed. Legacy GTM triggers must not be retired until after deploy. Tag Assistant proof outstanding. Owner: Bilal |
| **SHARED-03** — Lead event + click-ID persistence | In Progress / Critical | `lib/lead-contract.ts` committed; server-issued UUID; gbraid/wbraid captured with validation; **production migration applied and verified** (1,142 rows backfilled, 0 nulls, unique index). | **In Progress** | Server-side idempotency still open; live GA4/CRM verification outstanding. Owner: Bilal |
| **FL-11** — Florida location-page upgrades | In Progress / Critical | Miami→South Miami entity corrected with 301. PBG: Free Second Opinion added to the decision path, all FL tel links now E.164, no placeholder data. Fabricated schema removed sitewide. | **In Progress** | Not deployed; CallRail/GTM proof outstanding before paid launch. Owner: Bilal |
| **FL-10** — Florida location content packs | In Progress | Miami canonical-naming decision resolved (South Miami). PBG contact/content defects re-checked: most were stale in the brief. | **In Progress** | Per-clinic hours, same-day availability, and per-site service lists still unverified. Owner: clinic |
| **SHARED-12** — Medical claims & authorship | Not started | 22-row audit delivered; 10 fabricated claims removed from schema; 8 flagged as waiting on clinic confirmation. | **In Progress** | Hours, same-day, review provenance, "laser spine surgery", "faster recovery". Owner: clinic |
| **SHARED-11** — FL/NJ/NY location data accuracy | Not started | 23-location source-of-truth CSV delivered. Build-gating validator added (`npm run validate:locations`) covering placeholder phones, out-of-state coordinates, address/state mismatch, duplicate canonical routes, retired-slug collisions. | **In Progress** | 12 locations still lack `placeId`/`cid`. Owner: Bilal |
| **SHARED-09** — Technical SEO remediation | Not started | 4 redirecting URLs confirmed still live in the sitemap and fixed; audit script added to prevent drift. | **In Progress** | Remaining queue (orphans, multiple H1s, links-to-redirects) not yet worked. |
| **SHARED-06** — CallRail attribution & routing | In Progress / Critical | Established that NJ/NY numbers on FL pages come from the site-wide footer by design, not leakage. Non-E.164 `tel:` link fixed. | **In Progress** | No CallRail access; dynamic number insertion and pool routing unproven. Owner: Bilal |
| **SHARED-15** — `/conditions/spine` hub | Not started / High | **Route does not exist.** This is a create, not a rebuild. | **Not started** | — |
| **SHARED-13** — Optional insurance field | Not started | Gated behind SHARED-03 live proof, which is outstanding. | **Not started** | Depends on SHARED-03 |
| SHARED-04, SHARED-05, SHARED-07, SHARED-08, SHARED-10, SHARED-14, SHARED-16, SHARED-17, SHARED-18 | various | Not worked this session. | unchanged | — |
| NJ-08, NJ-11, NJ-12, NJ-13 | Waiting / Not started | Not worked this session. | unchanged | — |
| **NJ-14** — Activate NJ injection page | Not started / Critical | Not worked. **Not indexed, not published.** | **Not started** | Requires explicit Bilal approval — deliberately untouched |

## Status-word discipline

Nothing is proposed as **Done**. Every item above either lacks production
deployment or lacks live verification in a system this session could not reach
(GA4, GTM, CallRail, Google Ads, Notion). Per the brief's own rule, Done
requires implementation *and* deployment *and* live QA.
