# Change Manifest — 2026-08-29

Branch `HomeSEO`, rebased onto `upstream/main` (AppFlow-Studio) @ `5c99f1b`.
9 commits, 76 files, +1187 / −478. Nothing pushed or deployed.

```
3f49b11  fix(a11y/seo): one H1 per page — remove hidden layout headings
83f0a62  fix(sitemap): stop advertising four redirecting condition URLs
90d2b68  feat(locations): surface Free Second Opinion and fix non-E.164 tel links
7e8f03f  build: gate builds on location data validation
1c6318a  feat(data): derive review figures from GBP data and guard location facts
bd26942  fix(locations): correct Miami Beach entity to South Miami with 301
d61157f  fix(schema): remove fabricated ratings, reviews, hours and offer claims
57a2a08  fix(leads): persist accepted lead before sending any email
bdcf3bb  fix(measurement): single accepted-lead event with server-issued submission ID
```

## By area

### Measurement (`bdcf3bb`, `57a2a08`)
- `lib/lead-contract.ts` *(new)* — canonical event name, form-source resolution, acceptance parsing.
- `utils/enhancedConversions.ts` — one `lead_form_submit_success`, deduped by submission ID; legacy aliases removed.
- `lib/gclid.ts` — gbraid/wbraid capture, click-ID validation, newer Google click replaces the older set.
- `lib/stateUtils.ts` — `normalizeStateCode` storage/measurement boundary.
- `components/email/sendcontactemail.ts` — persistence is the authoritative acceptance boundary, throws on failure, issues a server-side UUID, and now runs **before** any email send.
- `app/layout.tsx` — duplicate hard-coded `gtag` bootstrap removed.
- `app/thank-you/page.tsx` — conversion restoration removed.
- 5 API routes + ~14 form components — pass through the acceptance shape.
- `supabase/migrations/202608090001_add_google_braid_attribution.sql` *(new)* — **applied to production**.
- `tests/measurement-contract.test.ts` *(new)* — 8 assertions.

### Location truth (`bd26942`, `1c6318a`, `7e8f03f`)
- `components/data/clinics.tsx` — South Miami canonical slug, `oldSlugs`, corrected title/description and testimonial copy.
- `lib/locationRedirects.ts`, `next.config.ts` — 301s for both old URL forms.
- `lib/injuryLocations.ts`, `components/InjuryHotspots.tsx`, `lib/reviewLinks.ts` — every slug-derived URL updated.
- `components/data/clinicsForMap.generated.ts`, `components/data/reviewAggregate.generated.ts` *(new)* — regenerated.
- `scripts/generate-clinics-for-map.mjs` — now emits and checks the review aggregate.
- `scripts/validate-location-data.mjs` *(new)* — build gate with a 10-probe self-test.
- `package.json` — validator wired into `prebuild`.

### Claims and schema (`d61157f`)
- `lib/generateLocationSchema.ts` — openingHours, openingHoursSpecification, hasOfferCatalog removed.
- `lib/injuryPageSchema.ts` — hardcoded openingHours removed.
- `app/page.tsx`, `app/find-care/book-an-appointment/page.tsx`, `app/treatments/orthopedic-injections/layout.tsx` — fabricated ratings and 3 invented patient reviews removed.
- 4 injury clients — hardcoded `5 / 327` replaced with generated constants.

### Structure (`83f0a62`, `3f49b11`, `90d2b68`)
- `lib/sitemap-exclusions.ts` *(new)* + `app/sitemap.xml/route.ts` — redirecting URLs excluded.
- 10 layouts — hidden `h1`/`h2` pairs removed.
- `components/ConditionCheckSection.tsx` — 3 misused `h1` → `span`.
- `components/SecondOpinionCallout.tsx` *(new)* + location page — offer in the decision path.
- `lib/locationConstants.ts` — `href` per state, `MAIN_PHONE_HREF`.
- `scripts/audit-sitemap-vs-redirects.mjs` *(new)*.

## Deployment order

1. Migration — **already applied**; no longer blocking.
2. Deploy application.
3. Verify one `lead_form_submit_success` per accepted lead (Tag Assistant / GA4 DebugView).
4. Only then retire legacy GTM `form_submit` / `form_submission` triggers.
5. Repoint the Miami PMax asset group (`ads_destination_handoff.csv`).

## Verification status

| Check | Result |
|---|---|
| `npm run test:measurement` | 8/8 pass |
| `npx tsc --noEmit` | 43 errors, identical set to baseline — zero regressions |
| `npm run check:clinics-map` | both generated files current |
| `npm run validate:locations` | 23 clinics pass, 4 intentional warnings |
| self-test | 10/10 probes |
| `npm run build` | passed at `90d2b68`; later runs blocked by host memory (see executive summary) |
| sitemap audit | 329 URLs, no redirect sources, no duplicates |
