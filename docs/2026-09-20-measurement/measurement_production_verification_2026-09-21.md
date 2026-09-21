# Production end-to-end verification — 2026-09-21

Two labelled test leads submitted on production with explicit owner authorization.

## Test records — EXCLUDE FROM REPORTING

| Market | submission_id | Identity | Form |
|---|---|---|---|
| **FL** | `a4548235-0dd1-47ee-863a-51d3b664948f` | ZZTest MeasurementQA · qa+measurement-fl-2026-09-21@appflowstudio.io · (561) 555-0100 · 33463 | DoctorContactForm / book-appointment |
| **NJ** | `bd4bdfa3-b96e-4fa9-9ec3-e99654f6d6e7` | ZZTest MeasurementQA · qa+measurement-nj-2026-09-21@appflowstudio.io · (973) 555-0100 · 07652 | DoctorContactForm / book-appointment |

Both used reserved `555-0100` non-routable numbers. Free-text Consultation Reason
carried a canary string (`QA-MEASUREMENT-CANARY-…`) specifically to test for leakage.
No insurance card was uploaded.

## Results — website layer: PASS

Canonical event, both leads, exactly one each:

```json
{ "event":"lead_form_submit_success", "form_id":"DoctorContactForm",
  "form_source":"book-appointment", "page_path":"/find-care/book-an-appointment",
  "market":"FL|NJ", "submission_id":"<server uuid>" }
```

- `market` correct in both cases (FL, NJ) — the uppercase-code contract holds on production
- `submission_id` is a real server-issued UUID
- exactly one canonical event per accepted lead; zero legacy `form_submit`
- **step one of the two-step modal fired NO conversion** — confirmed on a real production form
- **canary leak check: 0.** No occurrence of the canary string, name, email, phone, ZIP,
  market or "Florida"/"New Jersey" in ANY outgoing Meta or Google Ads request
- Meta adapter called correctly: `fbq('track','Lead',{},{eventID:'<submission_id>'})`
  — empty custom_data, eventID = server submission id

## Meta `Lead` is BLOCKED BY META — not a code defect

The Lead event is called correctly but never leaves the browser. Meta's own pixel
config for dataset `1114353070995808` contains:

```json
"eventValidation": {
  "unverifiedEventNames": [],
  "enableEventSanitization": null,
  "restrictedEventNames": ["Lead"]
}
```

`fbevents.js` drops any event in `restrictedEventNames` client-side and raises
`RESTRICTED_EVENT`. Proven by elimination in the live browser:

| Event | Sends? |
|---|---|
| `PageView` | yes (2 per page-load cycle: initial + thank-you transition) |
| `Contact` | **yes** |
| `Lead` | **no** — silently dropped |

Dispatch is alive (Contact proves it), consent is granted, the pixel is initialized,
and the call arguments are correct. This is a Meta-side account restriction, almost
certainly the dataset's data-source category for a healthcare advertiser.

### Do NOT work around this

Renaming `Lead` to a custom event to evade the restriction would be disguising a
restricted event and is explicitly out of bounds. Resolve it in Events Manager:

1. Events Manager → dataset `1114353070995808` → **Settings** → check
   **Data Source Category** / restricted-category status.
2. Review whether the business category classification is correct with Meta.
3. Until it is lifted, **`Contact` is the only usable Meta conversion signal** and
   `PageView` remains available for audience building.

The website-side implementation requires no change — the moment Meta lifts the
restriction, Leads will flow with the correct eventID and deduplicate against any
Meta-managed CAPI server event automatically.

## Google Ads

Both accounts: Customer data terms **Accepted**, **Recording Enhanced Conversions**.

| Account | Markets | Destination | EC method |
|---|---|---|---|
| `721-766-1742` (ocid 7322556646) | FL, GA | AW-17270956371 | Google Tag **Manager** |
| `147-098-7566` (ocid 8060035325) | NJ, NY, PA | AW-17988324873 | Google **Tag** |

The method discrepancy is unresolved — the detail panel would not expand because the
browser profile's ad blocker degrades the Ads UI. Worth confirming automatic
user-provided-data collection is off on `147-098-7566`.

Only FL and NJ are running ads. NY, PA and GA are configured but have no spend, so
no paid reconciliation is possible for those three yet.
