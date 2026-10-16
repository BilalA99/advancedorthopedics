# 05 — Desktop test matrix

All runs against a **production build** (`next build` + `next start`) on
`http://localhost:3000`, driven by Puppeteer. Puppeteer rather than the user's
Chrome because that browser can sit in DevTools device emulation and pin the
viewport regardless of the size requested.

## Automated suites

| Suite | Command | Result |
| --- | --- | --- |
| Measurement unit / integration | `npm run test:measurement` | **146 / 146 pass** |
| Measurement contract (prebuild gate) | `npm run validate:measurement` | **14 / 14 checks pass** |
| Production build | `npm run build` | **exit 0, 768 / 768 static pages** |
| Server contract (live endpoint) | `scripts/qa/intake-server-contract.mjs` | **all pass** |
| Site-wide form audit | `scripts/qa/intake-form-audit.mjs … desktop` | **16 forms / 10 pages, 0 problems** |
| Visual matrix | `scripts/qa/intake-visual-matrix.mjs … desktop` | **10 / 10 viewports pass** |
| E2E — ConsultationForm | `scripts/qa/intake-e2e-flows.mjs … desktop` | **44 / 44 pass** |
| E2E — other surfaces | `scripts/qa/intake-e2e-multi.mjs … desktop` | **all pass** (see below) |

## Visual matrix — 1280×720, 1366×768, 1440×900, 1536×864, 1920×1080

Pages: `/` (homepage) and `/insurance-policy`. Per viewport, all of:

- ZIP field present, visible, non-zero size, inside the viewport
- ZIP labelled for screen readers (`aria-label`)
- ZIP `inputmode="numeric"`, `autocomplete="postal-code"`
- insurance dropdown present and not clipped
- "Best Time To Contact" absent **from the intake form**
- no horizontal overflow (`scrollWidth ≤ clientWidth`)
- no console errors, no hydration warnings
- CSS actually applied (probed with an unconditional `hidden` utility, because an
  unstyled page renders the mobile and desktop trees at once and every measurement
  after that is plausible and wrong)

**10 / 10 pass.** Screenshots in `evidence/desktop/`.

## E2E — ConsultationForm (44 checks, 1440×900)

The submission endpoint is intercepted so no real lead rows and no emails to the
clinic are produced. The stub returns exactly what the real handler returns, and
the real handler's own behaviour is covered by the server-contract run and the unit
tests.

### Accepted insurance / PPO

| Check | Result |
| --- | --- |
| Navigates to `/thank-you` | pass |
| Fires exactly one `lead_form_submit_success` | pass |
| ZIP submitted to the endpoint (`"33463"`) | pass |
| Insurance submitted (`"PPO"`) | pass |
| Best-time **not** in the payload | pass |
| All 8 attribution keys present (gclid, gbraid, wbraid, 5× utm) | pass |
| ZIP absent from the canonical event | pass |
| Canonical event carries exactly the 6 operational keys | pass |
| No insurance or qualification value anywhere in the event | pass |
| Exactly one network request | pass |

### Other / not listed

| Check | Result |
| --- | --- |
| Navigates to `/thank-you/other` | pass |
| Fires **zero** qualified conversions | pass |
| Emits **no** lead dataLayer event at all | pass |
| Lead still delivered to the endpoint | pass |
| ZIP still submitted | pass |
| Attribution still submitted | pass |

### Validation

| Case | Result |
| --- | --- |
| Empty ZIP blocks submission, shows "Please enter a valid ZIP code" | pass |
| Invalid ZIP (`123`) blocks submission | pass |
| **Leading-zero ZIP (`02134`) accepted and submitted intact** | pass |
| Nine bare digits normalize to `33463-1234` before submission | pass |
| Missing insurance blocks submission, shows "Please select your insurance" | pass |
| Invalid email blocks submission | pass |
| Invalid phone blocks submission | pass |
| Server ZIP rejection fires no conversion, keeps the patient on the form, surfaces the server's message | pass |

### Errors, retries, duplicates

| Case | Result |
| --- | --- |
| 500 fires no conversion, keeps the patient on the form, re-enables submit, **preserves the entered ZIP** | pass |
| In-flight submission keeps the button disabled and shows "Sending…" | pass |
| Triple-click creates exactly **one** lead and **one** conversion | pass |
| One conversion after the first submit | pass |
| Back does not fire another conversion | pass |
| Direct visit to `/thank-you` fires zero conversions | pass |
| Refresh of `/thank-you` fires zero conversions | pass |
| Direct visit to `/thank-you/other` fires zero conversions | pass |
| Refresh of `/thank-you/other` fires zero conversions | pass |

## E2E — the other intake surfaces

Run against the surfaces the advertising spend actually lands on.

| Surface | PPO → `/thank-you`, 1 conversion | Other → `/thank-you/other`, 0 conversions |
| --- | --- | --- |
| `DoctorContactForm` @ `/find-care/book-an-appointment` | pass | pass |
| `BodyPartHeroForm` @ `/lp/adult-scoliosis-treatment` (paid) | pass | pass |
| `StateHeroForm` @ `/locations/florida` | pass | pass |

Each also asserts best-time is absent from the payload, insurance is present, and
the "Other" lead is still delivered.

The booking page's form opens from a CTA into a Radix Dialog. An earlier revision
of this document wrongly recorded it as unsubmittable; see the correction in
`FINAL-CLOSEOUT.md`.

## Server contract — the live endpoint

Run against the real `/api/forms/consultation`, restricted to requests the handler
rejects **before** it emails or persists anything, so it creates no leads:

| Case | Result |
| --- | --- |
| `123`, `334634`, `abcde`, `33463-12`, `3346a` → 400 | pass |
| Response is `{ ok:false, error:"Please enter a valid ZIP code", field:"postalCode" }` | pass |
| No submission id issued | pass |
| No qualification issued | pass |
| A PPO submission with a bad ZIP yields no qualified decision | pass |
| A non-US submission is redirected (307) to `/unavailable` | pass |

An absent ZIP is deliberately **not** tested here: it is now accepted by design
(MiniContactForm collects none), so the request would proceed and create a real
lead row plus a real email to the clinic.

## The gate was verified to fail

A gate that cannot fail is decoration. Each new check was confirmed to fail when
its invariant is deliberately broken, then restored:

| Deliberate break | Gate output |
| --- | --- |
| Rename the ZIP field in `ContactForm` | `components/ContactForm.tsx no longer renders the ZIP field` |
| Remove server-side ZIP validation | `app/api/forms/consultation/route.ts no longer validates ZIP server-side` |
| Stop writing the `postal_code` column | `ZIP stays in the intake form` fails |
| Re-add `bestTime` to intake | `references best time to contact, which the 2026-09-24 meeting removed` |
| Make a form navigate unconditionally to `/thank-you` | `still navigates unconditionally to the qualified thank-you page` |

After restoring each, the gate returns to 14/14.
