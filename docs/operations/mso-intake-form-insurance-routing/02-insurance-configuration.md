# 02 — Insurance configuration

## One list, not two

The dropdown, the qualification rule, the server's routing decision and the tests
all read the same source:

```
components/data/insurancePlans.ts   ← the practice's authoritative plan list
          │                            (also published to patients on /insurance-policy)
          ▼
lib/insurance-routing.ts            ← derives the options and the qualification
          │
          ├── every form component (getInsuranceOptions)
          ├── lib/intake-submission.ts → every /api/forms/* endpoint
          └── tests + the prebuild gate
```

`insurancePlans.ts` already existed and is what the clinic maintains. It carries
each plan's `name`, its `aliases`, an `accepted | partial | not-accepted` status,
an `isPpoCarrier` flag and a patient-facing note explaining the status.

The previous commit on this branch had instead hand-written a second array,
`APPROVED_PLANS`, behind an `INSURANCE_LIST_APPROVED = false` flag. Both are now
gone. A second copy of a list that already exists is how the form comes to offer a
plan the website says is not accepted — the exact contradiction the routing split
exists to prevent.

**To add, remove or re-order a carrier, edit `insurancePlans.ts`.** The dropdown,
the conversion decision and the public page all move together. No code change.

## Status → qualification

| `status` | Qualification | Why |
| --- | --- | --- |
| `accepted` | **qualified** | the practice participates and can bill the plan |
| `partial` | unqualified | Medicare / Medicaid: not for spine surgery, "please call" |
| `not-accepted` | unqualified | HMO products, Medicare/Medicaid HMO |

`partial` deliberately lands on the unqualified side. Those are real leads the
clinic still receives — they are simply not accepted-insurance conversions, and
reporting them as such would feed Smart Bidding leads the practice cannot serve for
the advertised procedure.

Workers' Compensation and Auto / Personal Injury (PIP) are `accepted` without being
PPO carriers, and they **qualify**: the practice treats those patients and bills
those payers. The conversion signal tracks "can we serve this patient", not "is it
a PPO".

## The rendered list

15 options, in this order. Order is: the explicit PPO answer, then PPO carriers,
then the other accepted payers, then the plans that are not accepted, then Other.

| # | Option | Qualification |
| --- | --- | --- |
| 0 | PPO (any carrier) | qualified |
| 1 | Blue Cross Blue Shield PPO | qualified |
| 2 | UnitedHealthcare PPO | qualified |
| 3 | Cigna PPO | qualified |
| 4 | Aetna PPO | qualified |
| 5 | Meritain Health PPO | qualified |
| 6 | MultiPlan / PHCS PPO | qualified |
| 7 | Bright Health PPO | qualified |
| 8 | Workers’ Compensation | qualified |
| 9 | Auto / Personal Injury (PIP) | qualified |
| 10 | HMO plans (any carrier) | unqualified |
| 11 | Medicare | unqualified |
| 12 | Medicaid | unqualified |
| 13 | Medicare or Medicaid HMO | unqualified |
| 14 | Other / not listed | unqualified |

### PPO is explicit (meeting decision D11)

`PPO (any carrier)` leads the list. It answers the question for the largest group
of patients before the carrier name matters, and it means a patient who knows they
hold a PPO is never pushed into "Other". Its stored value is the bare string `PPO`,
so the label can be reworded without invalidating stored data.

### "Other" is respectful and never a dead end

`Other / not listed` is always last and always unqualified. An "Other" submission
is stored, keeps its ZIP and its full attribution, emails the clinic, and lands on
`/thank-you/other`, which explains the practice is PPO-based, says the team will go
over the options including self-pay and out-of-network benefits, and gives a phone
number. It does not say "rejected", "unqualified", "not eligible", "ineligible",
"denied" or "declined" — a test asserts each of those words is absent from the
patient-facing copy.

## Option shape

```ts
export interface InsuranceOption {
  readonly value: string;                        // stored in forms.insurance_type
  readonly label: string;                        // shown to the patient
  readonly qualification: "qualified" | "unqualified";
}
```

Display order and active/inactive status are expressed by position in, and presence
in, `INSURANCE_PLANS` — the list the clinic already curates — rather than by
duplicate `order` and `active` fields that could disagree with it.

## Fail-closed classification

`classifyInsurance` matches case- and whitespace-insensitively against the options
currently offered, and returns `unqualified` for anything else: an empty string, an
unknown carrier, a stale value from a cached page, a hand-crafted POST.

A false `unqualified` costs one under-counted conversion. A false `qualified`
corrupts Smart Bidding with a lead the practice cannot serve. The asymmetry is the
whole reason it fails closed.

A bare carrier name is **not** an answer and does not qualify:

```
classifyInsurance('Aetna PPO')  === 'qualified'
classifyInsurance('Aetna')      === 'unqualified'
classifyInsurance('Aetna HMO')  === 'unqualified'
```

which matches what the practice tells patients publicly: an Aetna PPO is accepted,
an Aetna HMO is not.

## Privacy boundary

The selected plan reaches `forms.insurance_type` and the internal staff email, and
nothing else. It is never added to the canonical lead event, never placed in a URL,
and never sent to GA4, Google Ads or Meta. An unqualified lead therefore emits **no
dataLayer event at all** — a distinctly-named `lead_form_submit_unqualified` event
was considered and rejected, because the event name alone would carry the insurance
answer into analytics. See `03-tracking-audit.md`.

Two prebuild checks enforce this: the measurement modules may not name a carrier or
reference `insurance_type`, and `buildCanonicalLeadEvent` may not gain an insurance
field.
