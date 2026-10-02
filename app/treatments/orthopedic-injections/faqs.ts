import type { FAQItem } from './InjectionsFAQ';

/**
 * The FAQ content for /treatments/orthopedic-injections.
 *
 * ONE source, used by two consumers that must never disagree:
 *
 *   page.tsx   renders these to the visitor
 *   layout.tsx derives the FAQPage JSON-LD from them
 *
 * They used to be two hand-maintained copies. The schema drifted: three answers
 * in the JSON-LD described content that was nowhere on the rendered page, and the
 * block's own comment claimed "ALL 9 questions (must match page content exactly)"
 * while carrying 11 that did not. Structured data asserting content a page does
 * not show is a Google violation and, for an LLM reading the page, a straight
 * contradiction between what it is told and what it can see.
 *
 * Follows the same convention as the injury pages, which each keep a faqs.ts
 * beside their page and layout.
 *
 * Answers use `**bold**`, which InjectionsFAQ renders as <strong> and
 * generateFAQPageSchema strips for the schema's plain-text `acceptedAnswer`.
 */
export const INJECTION_FAQS: FAQItem[] = [
  {
    question: 'How long does a cortisone shot last?',
    answer:
      'Varies by injection type and location. **Cortisone shots** for joints typically provide 4–8 weeks of significant relief; some patients experience 3–6 months. **Epidural steroid injections** for back or neck pain often last 3–6 months. Hyaluronic acid (gel) knee injections typically provide 6 months or more. Individual results vary based on severity of condition, patient age, and activity level. Your specialist will discuss realistic expectations based on your specific diagnosis. Some patients receive periodic injections as part of an ongoing pain management plan.',
  },
  {
    question: 'Does a cortisone shot hurt?',
    answer:
      'Most patients report mild discomfort — similar to a blood draw or vaccine. A local anesthetic is applied to numb the skin before the injection, significantly reducing pain. The injection itself may cause brief pressure or a burning sensation as medication enters the joint or spinal space, which typically resolves within seconds. For spinal injections, image guidance ensures the needle is precisely placed, minimizing discomfort and improving safety. Post-injection soreness at the site for 24–48 hours is normal and usually managed with ice. Most patients are pleasantly surprised by how tolerable the procedure is.',
  },
  {
    question: 'How many cortisone shots can I get per year?',
    answer:
      'The generally accepted limit is **3–4 cortisone shots per joint per year**. Frequent corticosteroid injections can weaken cartilage and tendons over time. Your orthopedic specialist will evaluate whether additional injections are appropriate based on your response to prior injections and overall treatment goals. If cortisone shots are no longer providing adequate relief, your doctor may recommend alternative injections (such as hyaluronic acid for knees) or discuss whether a minimally invasive surgical option might offer more lasting results.',
  },
  {
    question: 'What is the difference between a cortisone shot and a gel injection?',
    answer:
      '**Cortisone shots** (corticosteroid injections) deliver anti-inflammatory medication to reduce swelling and pain — they work by calming the inflammatory response. **Gel injections** (hyaluronic acid or viscosupplementation) add lubricating fluid to the joint, primarily used for knee osteoarthritis. Gel injections mimic natural joint fluid, reducing friction and pain. Cortisone works faster (2–7 days) with stronger immediate effect; gel injections build more gradually but may last longer (6+ months) for appropriate candidates. Your doctor will recommend the right type based on your diagnosis, imaging, and prior treatment history.',
  },
  {
    question: 'Do I need a referral for an orthopedic injection?',
    answer:
      'No. At Mountain Spine & Orthopedics, you do not need a referral to schedule a consultation for injection therapy. You can book directly online or by calling your nearest location. If your insurance requires a referral for coverage purposes, we can help you navigate that process — but you do not need a referral to start the conversation with our specialists. PPO insurance plans allow direct access to specialists.',
  },
  {
    question: 'What is an epidural steroid injection?',
    answer:
      'An **epidural steroid injection** (ESI) delivers corticosteroid medication directly into the epidural space surrounding the spinal cord and nerve roots. It is most commonly used for back pain caused by herniated discs, spinal stenosis, or nerve compression causing sciatica. The injection reduces inflammation around irritated nerve roots, providing relief from radiating pain into the legs (lumbar ESI) or arms (cervical ESI). ESIs are performed under fluoroscopy guidance, typically take 15–20 minutes, and are performed as an outpatient procedure. Many patients experience significant relief within 3–7 days.',
  },
  {
    question: 'What is a facet joint injection?',
    answer:
      '**Facet joint injections** treat pain originating from the small joints along the spine that connect vertebrae to each other. Facet joint arthritis or injury causes localized back or neck pain that often worsens with extension or rotation. The injection delivers corticosteroid medication directly into the affected facet joint under fluoroscopy guidance. Relief typically lasts several months. Facet injections also serve a diagnostic function — if they provide significant temporary relief, it confirms the facet joint as the pain source, which guides further treatment decisions including radiofrequency ablation for longer-lasting results.',
  },
  {
    question: 'How much does a cortisone shot cost with insurance?',
    answer:
      'With PPO insurance, your out-of-pocket cost for a **cortisone shot** at an orthopedic specialist is typically your standard specialist copay plus any deductible responsibility. PPO insurance plans cover medically necessary orthopedic injections when documented as treatment for a diagnosed condition. Mountain Spine & Orthopedics accepts PPO insurance plans. Call our office or check our website to verify your coverage before your appointment.',
  },
  {
    question: 'Who qualifies for the free MRI review?',
    answer:
      'The **complimentary MRI review** is available to patients who carry PPO insurance and have existing MRI imaging (within the last 2 years) of the spine, knee, shoulder, hip, or other affected joint. During the review, one of our board-certified specialists evaluates your imaging and discusses whether an orthopedic injection, further diagnostics, or another treatment path is the right next step. There is no obligation to proceed with treatment. To find out if you qualify, call our office or submit your information online — a patient coordinator will confirm eligibility before your appointment.',
  },
  {
    question: 'Does insurance cover orthopedic injections?',
    answer:
      'Yes. **PPO insurance plans** cover medically necessary orthopedic injections — including cortisone shots, epidural steroid injections, facet joint injections, SI joint injections, and nerve blocks — when ordered by a physician for a documented diagnosis. Mountain Spine & Orthopedics accepts Aetna, Blue Cross Blue Shield, Cigna, UnitedHealthcare, and other PPO carriers. Call (561) 223-9959 or use our online tool to verify your specific coverage before your appointment.',
  },
  {
    question: 'How quickly can I get an orthopedic injection appointment?',
    answer:
      'Mountain Spine & Orthopedics offers **same-week appointments** at 23 locations across Florida, New Jersey, New York, Pennsylvania, and Georgia. **No referral is required** for PPO-insured patients. You can book online 24/7 or call (561) 223-9959 to speak with a patient coordinator. Most new patients are seen within 2–5 business days. If you have an existing MRI, bring it to your first appointment — in many cases we can proceed with your injection the same day as your consultation.',
  },
];
