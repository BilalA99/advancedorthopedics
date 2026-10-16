# 03 — Tracking audit

## The single success path

One event marks an accepted lead:

```js
{
  event: "lead_form_submit_success",
  form_id: "<component name>",
  form_source: "<one of the FORM_SOURCES>",
  page_path: "<submitting page>",
  market: "<2-letter state>",
  submission_id: "<server-minted UUID>"
}
```

Six keys, no more. A test asserts the exact key set, so the payload cannot quietly
gain a seventh — an insurance field, a ZIP, a qualification flag.

It is built once, in `buildCanonicalLeadEvent` (`lib/lead-contract.ts`), and pushed
once, in `pushFormSubmit` (`utils/enhancedConversions.ts`). No form builds the
event itself and no form pushes to `dataLayer` directly; two prebuild checks
enforce both.

## Where the qualification gate sits

Inside `pushFormSubmit`, in this order:

```
1. parse + validate the acceptance (server-issued submission id)
2. if this submission id was already emitted → return        ← dedupe
3. register the submission id                                ← registered BEFORE the gate
4. if lead_qualification === 'unqualified' → return          ← D10 gate
5. push the canonical lead event                             ← consent-INDEPENDENT
6. Meta Lead, for eligible form sources only
7. if !isAdvertisingAllowed() → return
8. Enhanced Conversions identity push                        ← consent-GATED, isolated
```

Step 3 before step 4 is deliberate: the submission id is spent even for an
unqualified lead, so a retry of the same submission cannot come back claiming to be
qualified and mint a conversion. There is a test for exactly that.

Step 4 before step 5 is what a prebuild check verifies structurally — it fails the
build if the gate is removed, if it stops returning, or if it is reordered after the
push. Verified to fail by deliberately breaking each of those.

The gate is **not** consent-shaped. It asks what kind of lead this is, never what
the visitor permitted, so the consent-independence contract is untouched.

## Why an unqualified lead emits no event at all

A distinctly-named `lead_form_submit_unqualified` event was considered and
rejected. The event name alone would carry the insurance answer into GA4 and any
tag reading the dataLayer — which is precisely the thing the privacy boundary
exists to prevent. Unqualified volume stays measurable from Supabase, which is what
Appflow Analytics reads, and it is now richer there than an event would have been
because the exact plan is stored in `forms.insurance_type`.

The consequence to be aware of: **GA4 sees fewer `lead_form_submit_success` events
after this change than before**, because "Other" leads no longer emit one. That is
the intended effect, not a regression. Total lead volume is unchanged and visible
in Supabase.

## What must never reach an advertising payload

Name, email, phone, insurance carrier, qualification, symptoms, diagnosis and free
text are absent from the canonical event by construction — it is a closed set of
six operational keys.

**ZIP is the one nuance, and it is deliberate.** ZIP appears in exactly one place
on the dataLayer: inside the isolated `enhanced_conversion_data` payload, as
`address.postal_code`, unhashed — which is where Google's Enhanced Conversions spec
puts it, and hashing it would break matching. It is never a loose event parameter,
never in the canonical event, never in a URL. Tests assert both halves: that ZIP is
present in the Enhanced Conversions payload (dropping it silently degrades Google
Ads match quality) and that it appears nowhere else.

This is the pre-existing, approved user-provided-data flow. It was already live
before this change; restoring ZIP restored it, because the previous commit had
dropped ZIP from the `pushAcceptedLead` call and silently degraded match rates.

### A consent nuance worth flagging

`utils/enhancedConversions.ts` gates the Enhanced Conversions push on
`isAdvertisingAllowed()`, which returns **true for an undecided visitor** — the site
owner's 2026-09-21 decision for US traffic. So hashed identity and unhashed ZIP are
transmitted for visitors who have not answered the banner, and stop only on an
explicit refusal. A test covers both behaviours.

The docstring on `isAdvertisingAllowed` says Enhanced Conversions "remain gated on
`hasMarketingConsent()`", which does not match what the code does. **The comment is
wrong, not the code** — every EC path checks `isAdvertisingAllowed()`. This is
pre-existing and was not changed here, because changing it would alter consent
behaviour and reduce conversions, which is an owner decision rather than an
engineering one. Flagged for Bilal in `FINAL-CLOSEOUT.md`.

## Legacy `form_submit` overlap

Verified still correct. `scripts/validate-measurement-contract.mjs` carries an
`obsolete form_submit stays retired` check, which passes. No form references the
legacy event, and nothing in this change reactivated a retired trigger.

The GTM-side configuration this depends on:

```
Thank You Page GTM      → Primary form conversion
Offline Form Lead – FL  → Secondary, primary_for_goal=false
Click-to-call           → CALL_FROM_ADS
Local actions           → not a qualified form submission
```

No GTM change is required by this work, and none was made. The qualified conversion
continues to fire from `lead_form_submit_success`; unqualified leads simply never
emit that event, so the existing trigger needs no new condition. See
`08-gtm-verification.md`.

## Duplicate-conversion protections

Summarised in `01-form-flow-map.md`. In tracking terms the important ones are:

- `emittedSubmissionIds`, an in-page set keyed on the server's submission id, so a
  refresh, a retry or a repeated call for one submission emits once.
- Neither thank-you page contains any emitter, so arriving at one — by direct link,
  reload or back/forward — is worth zero conversions. A test asserts the absence of
  `dataLayer`, `pushEvent`, `pushFormSubmit`, `pushAcceptedLead`,
  `restoreECFromSession` and `gtag(` in all four thank-you files.
- A synchronous `submittingRef` guard in each form, plus not re-enabling the submit
  button before navigation completes.

## Prebuild checks that protect all of this

`npm run validate:measurement` — 14 checks, run automatically in `prebuild`:

1. accepted-lead event is consent-independent
2. unqualified leads cannot fire the qualified conversion
3. insurance selections stay first-party
4. **ZIP stays in the intake form** (new)
5. **best time to contact stays removed from intake** (new)
6. **every intake form gates the qualified conversion** (new)
7. **ZIP is not an advertising parameter** (new)
8. exactly one canonical push per submission path
9. canonical event shape and market contract
10. obsolete `form_submit` stays retired
11. every form uses the shared success path
12. thank-you navigation is not the conversion source
13. Consent Mode declares a US default and an EEA carve-out
14. Meta form-source triage

Checks 4–7 were each verified to **fail** when the invariant is deliberately
broken — a gate that cannot fail is decoration. Evidence in
`05-desktop-test-matrix.md`.
