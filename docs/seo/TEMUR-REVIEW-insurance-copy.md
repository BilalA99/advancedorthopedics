# Insurance & payer copy — review required

**For:** Temur · **Prepared:** 2026-09-02 · **Status:** nothing here is approved
**Branch:** prepared on `temur/insurance-copy`. **Must never merge into the main PR.**

---

## The decision you are being asked to make

This is not a request to pick a nicer sentence. **The site has been publishing a
contradiction about which patients it accepts, and the answer a patient gets depends
entirely on which page they land on first.**

Mountain Spine & Orthopedics accepts **PPO plans, workers' compensation, and PIP**
(personal injury protection — the no-fault coverage that pays for auto-accident care in
Florida and New Jersey, both mandatory-PIP states). Confirmed by the business, 2026-09-02.

Here is how the site currently describes that:

| Surface | Mentions of workers' comp | What it tells the patient |
|---|---|---|
| `components/data/clinics.tsx` (location pages) | **104** | Workers' comp accepted |
| `components/data/treatments.tsx` (122 treatment pages) | **0** | *(see note)* |
| `app/insurance-policy/*` (the dedicated insurance page) | **0** | "Mountain Spine & Orthopedics is a **PPO practice**" |
| `components/data/insurancePlans.ts` (the plan checker) | ✅ handled | Workers' comp **and** PIP both accepted |

The insurance page's own meta description — the text shown in Google results for anyone
searching whether this practice takes their insurance — currently reads:

> "Mountain Spine & Orthopedics is a **PPO practice**. We accept PPO plans from Aetna, Blue
> Cross Blue Shield, Cigna, UnitedHealthcare…"

No mention of workers' compensation or PIP.

**The practical consequence.** A workers' comp patient who lands on a location page is told
they are welcome. The same patient landing on the insurance page is told this is a PPO
practice. Both pages were live simultaneously.

---

## Already actioned — needs ratification only

**105 lines in `components/data/treatments.tsx` have been reverted to the approved wording**
and are already back to what production serves.

An earlier commit had replaced the approved string with `"We accept PPO plans."` on 105
lines. That was reverted for two reasons: payer copy is gated on your approval, and — more
importantly — `"We accept PPO plans."` full stop reads as excluding workers' comp and PIP
patients, whom the practice does accept.

Restored to production's exact wording. Production carries four genuine variants and all
four were restored verbatim rather than normalised:

| Variant | Count |
|---|---|
| `**We accept most major insurance plans. PPO preferred.**` | 80 |
| `<strong>We accept most major insurance plans. PPO preferred.</strong>` | 14 |
| `We accept most major insurance plans (PPO preferred)` | 8 |
| `We accept most major insurance (PPO preferred)` — no "plans" | 3 |

Verified byte-identical to production across all 290 payer-bearing lines.

**No action needed unless you want different wording.** Flagged so you know it happened.

> ### ⚠️ The revert was partial, by design
>
> The treatment records were restored. **The insurance page was not.** The same unapproved
> string — `We accept PPO plans` — is **still live at headline scale** on
> `/insurance-policy` as `PPO_HEADLINE` (`components/data/insurancePlans.ts:28`), and the
> meta description still frames the practice as PPO-only.
>
> That was deliberate: reverting 105 data records is a mechanical restore of wording you
> already approved, whereas the insurance page's framing is a genuine editorial decision
> that is yours to make. It is held for you rather than reverted.
>
> **So do not read the revert as "already handled."** The most prominent instance of the
> string is the one still waiting on this review.

---

## Review by surface

Ordered by risk. **This ordering was corrected after checking the code — see the note under
surface 3.**

### Surface 1 — the insurance page framing 🔴 HIGHEST RISK

**Files:** `app/insurance-policy/page.tsx`, `layout.tsx`, `InsurancePolicyClient.tsx`,
plus `PPO_HEADLINE` / `PPO_SUBLINE` in `components/data/insurancePlans.ts`

This is the page a patient reaches by searching "does Mountain Spine take my insurance",
and it is the surface that states the practice's payer position most authoritatively.

| Location | Current string |
|---|---|
| `insurancePlans.ts:28` | `PPO_HEADLINE = 'We accept PPO plans'` |
| `insurancePlans.ts:29` | `PPO_SUBLINE = 'Mountain Spine & Orthopedics is a PPO practice. …'` |
| `page.tsx` meta title | `PPO Insurance Accepted \| Mountain Spine & Orthopedics` |
| `page.tsx` meta description | `…is a PPO practice. We accept PPO plans from Aetna…` |

**The problem.** The headline and framing assert a PPO-only identity. The checker directly
beneath them says workers' comp and PIP are accepted. The page contradicts itself, and the
meta description — the only part that appears in search results — carries the exclusionary
half.

`'We accept PPO plans'` is also the same unapproved string that was reverted from the
treatment records, still live here as the page headline.

### Surface 2 — the PPO hero panel 🟠 MEDIUM RISK

**File:** `app/insurance-policy/InsurancePolicyClient.tsx` (commit `8650893`)

An at-a-glance panel presenting PPO as the organising fact. Same framing issue as Surface 1,
one level less prominent. Reads correctly if the practice's position is genuinely
"PPO-first, other arrangements handled separately"; reads as exclusionary if a patient stops
there.

### Surface 3 — the plan checker ✅ LOW RISK — **already correct**

**Files:** `components/InsurancePlanChecker.tsx` (236 lines),
`components/data/insurancePlans.ts` (125 lines), commit `9c48991`

> **Correction to an earlier assessment.** This surface was initially flagged as the highest
> risk, on the reasoning that an interactive tool giving a workers' comp patient a "not
> covered" answer at the highest-intent moment would be worse than a wrong sentence on a
> treatment page. **That reasoning was sound but the premise was wrong.** The paths exist and
> are correct — verified in the data, in the component, and on the rendered page.

`insurancePlans.ts` contains both, each `status: 'accepted'`:

| Entry | Aliases it matches | Note shown |
|---|---|---|
| **Workers' Compensation** | `workers comp`, `workmans comp`, `work injury`, `workers compensation` | "Handled separately from PPO benefits. We treat work-related injuries and coordinate directly with adjusters and case managers." |
| **Auto / Personal Injury (PIP)** | `pip`, `auto insurance`, `car accident`, `letter of protection`, `lop` | "Handled separately from PPO benefits. We treat auto-accident injuries and can work with your attorney where a letter of protection applies." |

The component renders `INSURANCE_PLANS` unfiltered, and both entries appear on the live page.
A patient typing "workers comp" or "pip" gets an accurate accepted result.

**The checker is the only surface on the site that describes the practice's payer position
correctly.** It is a model for what the other surfaces should say, not a liability.

Its only defect is inheriting `PPO_HEADLINE` / `PPO_SUBLINE` from Surface 1.

---

## The wording decision

| Option | String | Trade-off |
|---|---|---|
| **A — restore** | `We accept most major insurance plans. PPO preferred.` | **Approved wording, and the current state after the revert.** Softer, so it invites some non-PPO calls the front desk has to turn away. Does not name workers' comp or PIP, so it does not fix the contradiction — it only stops making it worse. |
| **B — as shipped** | `We accept PPO plans.` | Pre-qualifies hardest, best PPO ratio. **Reads as excluding workers' comp and PIP patients, whom the practice accepts.** This is the string that was reverted. |
| **C — your wording** | *(blank — for you to write)* | Accurate on all three payer types while staying PPO-forward. **Deliberately left empty.** |

### What Option C needs to cover

Not a draft — a specification. Any wording you write should account for:

1. **PPO plans** — the primary path, no referral needed, HMO explicitly excluded.
2. **Workers' compensation** — a distinct billing path, not health insurance. Patients
   describe themselves as "hurt at work"; billing goes to an adjuster or case manager.
3. **PIP / auto accident** — patients describe the *event* ("car accident"), while the
   *coverage* is PIP. Florida and New Jersey are mandatory no-fault PIP states, so this is a
   material share of the patient base in two of the five states served. Letter-of-protection
   arrangements also apply where an attorney is involved.
4. **Where it appears** — the same wording is reused across 105 treatment records, the
   insurance page headline and meta description, and the checker's subline. It must read
   correctly at page-headline scale and inside a sentence.

**No draft sentence is provided here, deliberately.** Invented payer language in a review
document gets copied into production by someone who does not know it was a placeholder.

---

## Also staged for this review

### The `ItemList` contradiction

Several `TreatmentContent` records hardcode payer copy in their `benefits` and `overview`
fields. Those strings reach **`/treatments/adult-scoliosis-surgery`'s structured data**
through the related-treatments list — so that page emits payer claims in schema even though
its own visible copy says nothing about insurance. The page was deliberately built with no
insurance copy pending this review; it is inheriting it anyway.

**Two resolutions. Recommending one, implementing neither:**

- **Recommended:** exclude `benefits`/`overview` from the `ItemList` schema. The related
  items still need a name and URL; the payer sentence adds nothing to structured data and
  its presence there is incidental.
- **Alternative:** give the page its own approved insurance copy, so what it emits is
  intentional rather than inherited.

### `docs/seo/PENDING-temur-insurance-faq-adult-scoliosis-surgery.md`

A drafted insurance FAQ for the adult scoliosis surgery page, withheld from launch pending
approval. Two queries are currently unserved on that page as a result:
`how much is scoliosis surgery with insurance` (100/mo) and
`does insurance cover scoliosis surgery` (70/mo).

---

## Summary of what needs your decision

1. **The contradiction** — how should the site describe workers' comp and PIP acceptance, given location pages say yes 104 times and the insurance page frames the practice as PPO-only?
2. **Option A, B, or C** for the shared payer string; if C, the wording.
3. **The insurance page headline, subline and meta description** — Surface 1.
4. **The `ItemList` resolution** — exclude the fields, or give the page its own copy.
5. **The withheld scoliosis insurance FAQ** — publish as drafted, amend, or continue to hold.
