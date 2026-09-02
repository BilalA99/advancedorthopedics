# ⚠️ PENDING TEMUR APPROVAL — INSURANCE COPY, DO NOT PUBLISH UNREVIEWED

**Status:** drafted, **not shipped**. None of the copy below is live.
**Page:** `/treatments/adult-scoliosis-surgery`
**Drafted:** 2026-08-31

`/treatments/adult-scoliosis-surgery` shipped without any insurance copy. The page
renders, passes every gate, and ranks for its cluster without this. Two queries are
therefore currently unserved on that page:

| Query | Volume/mo | Difficulty | CPC |
|---|---|---|---|
| how much is scoliosis surgery with insurance | 100 | 0 | $1.80 |
| does insurance cover scoliosis surgery | 70 | 0 | $1.40 |

Apply the patch below **only after Temur has reviewed and approved the wording.**

---

## Patch 1 — new FAQ entry (required)

In `components/data/treatmentFAQs.ts`, inside the `"adult-scoliosis-surgery"` array,
insert this object **immediately after** the "How much does adult scoliosis surgery
cost?" entry (the last one in the array), and delete the `NOTE:` comment above the
`"adult-scoliosis-surgery"` key that points at this file:

```ts
    {
      question: "Does insurance cover adult scoliosis surgery?",
      answer: "<strong>Mountain Spine &amp; Orthopedics accepts PPO plans.</strong> Adult scoliosis surgery is generally treated as medically necessary rather than elective when a curve is progressing, nerves are compressed, or spinal balance has been lost - but coverage is determined by your individual plan, not by the diagnosis alone, and most plans require prior authorisation supported by imaging and a documented course of conservative care. Our team handles that documentation and can verify your specific benefits before you commit to a surgical date. <a href=\"/find-care/book-an-appointment\">Schedule a consultation</a> to have your coverage reviewed alongside your imaging."
    }
```

Add a comma after the preceding entry's closing brace.

## Patch 2 — cost FAQ sentence (optional, same approval)

The shipped "How much does adult scoliosis surgery cost?" answer deliberately omits
payer language. If approved, append this sentence to that answer, before the final
`<a href=\"/find-care/book-an-appointment\">` sentence:

```
What you personally pay depends on your plan's deductible, co-insurance, and out-of-pocket maximum rather than on the sticker price of the procedure.
```

---

## Why it was held back

Per the standing rule that any sentence mentioning insurance, PPO, or coverage is
gated on internal approval before going live. Note that this constraint is *not*
currently applied consistently across the site: several existing treatment records
(OLIF, non-surgical pain management, chronic pain) already carry hardcoded
"We accept PPO plans" / "PPO insurance accepted" copy in their `benefits` and
`overview` fields. Those predate this rule and were left untouched — flagged here
because a reviewer looking at the site will see them and may reasonably ask why the
new page is held to a stricter standard than its neighbours.

## Verification after applying

```bash
npx tsc --noEmit                      # expect the documented 50-error baseline, no new errors
curl -s localhost:3000/treatments/adult-scoliosis-surgery | grep -c "FAQPage"   # 1
```

The FAQPage schema in `app/treatments/[TreatmentDetails]/layout.tsx:349` reads
`treatmentFAQs.ts` directly, so the new question enters structured data automatically
once the entry is added. No other file needs to change.
