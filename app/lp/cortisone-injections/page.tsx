import React from 'react';
import Link from 'next/link';
import InjectionsLandingPage, {
  type InjectionsLpConfig,
} from '../_shared/InjectionsLandingPage';

/**
 * Paid-search landing page: cortisone injections (general intent).
 *
 * This page serves the searcher who has decided they want "a cortisone shot"
 * but has not localised the problem — so unlike the spine and joint pages,
 * its job is triage: explain what cortisone does and does not do, and route
 * the visitor's actual complaint to the right evaluation.
 *
 * Content rules followed here, and worth keeping if this page is edited:
 *   - No relief-duration promises and no outcome claims.
 *   - Cortisone's limits are stated plainly (it treats inflammation, not
 *     structure) — that honesty is the page's differentiator.
 *   - No links to any of the ten locked pilot slugs
 *     (docs/seo/post-launch-measurement.md §16).
 */

const linkClass = 'underline text-[#252932] hover:text-[#2358AC]';

const config: InjectionsLpConfig = {
  badge: 'Cortisone Injections',
  h1: 'Cortisone Injection Treatment',
  heroIntro:
    'Cortisone calms inflammation — but only if it is placed where the inflammation actually is. Our physicians examine you and your imaging first, then place the injection at the spine level, joint, or bursa your evaluation implicates.',
  formBodyPartTitle: 'Pain',
  sourceLabel: 'Cortisone Injections Paid Landing Page',
  domains: ['pain-management', 'spine', 'knee-hip'],
  trustPoints: [
    {
      label: 'Board-certified physicians',
      detail:
        'Cortisone injections are placed by physicians in a surgical orthopedic practice, informed by your examination and imaging.',
    },
    {
      label: 'Diagnosis before injection',
      detail:
        'A cortisone shot in the wrong place helps nobody. The structure is identified first; the injection follows.',
    },
    {
      label: 'Complimentary MRI review',
      detail: 'Already have imaging? Have it reviewed before booking a full consultation.',
    },
    {
      label: 'Most major PPO plans accepted',
      detail: 'Coverage is verified before your visit.',
    },
  ],
  symptomsHeading: 'Is this what you are dealing with?',
  symptomsIntro:
    'Cortisone helps inflammatory pain — and does little for pain with other causes. The evaluation exists to tell those apart. If several of these describe your situation, it is a reasonable next step.',
  symptoms: [
    {
      title: 'Pain that flares and settles',
      body: 'Pain that swells up with activity and calms with rest — the rhythm of active inflammation, which is what cortisone addresses.',
    },
    {
      title: 'A joint or tendon that is warm or swollen',
      body: 'Visible swelling, warmth, or thickening around a knee, shoulder, elbow, or heel.',
    },
    {
      title: 'Back or neck pain with radiating symptoms',
      body: 'Pain travelling into an arm or leg, with tingling or numbness — a pattern where a targeted spine injection may apply rather than a general one.',
    },
    {
      title: 'Morning stiffness that loosens with movement',
      body: 'A joint that takes half an hour or more to get going in the morning — an inflammatory pattern worth examining.',
    },
    {
      title: 'A previous cortisone shot that helped, then wore off',
      body: 'Relief that faded is information: it confirms inflammation was part of the problem and raises the question of what keeps re-igniting it.',
    },
    {
      title: 'You were told "try a cortisone shot" without a diagnosis',
      body: 'Cortisone works when it is placed at a diagnosed pain generator. If nobody has named yours yet, that is the first step — not the injection.',
    },
  ],
  aboutHeading: 'What cortisone does — and does not do',
  aboutParagraphs: [
    <>
      Cortisone is a corticosteroid: a potent anti-inflammatory delivered directly to
      an inflamed structure — a spinal nerve&apos;s epidural space, an arthritic
      joint, or a swollen bursa. Placed accurately, a small dose acts exactly where
      the inflammation is, which is why it can succeed where weeks of oral
      medication have not. It is used across the practice, from{' '}
      <Link href="/treatments/cortisone-injections-for-back-pain" className={linkClass}>
        cortisone injections for back pain
      </Link>{' '}
      to{' '}
      <Link
        href="/treatments/anti-inflammatory-injections-for-joint-and-spine-pain"
        className={linkClass}
      >
        joint and spine anti-inflammatory injections
      </Link>
      .
    </>,
    <>
      What cortisone does not do is repair anything. It does not regrow cartilage,
      shrink a herniated disc, or mend a torn tendon. When pain comes back after a
      well-placed injection, the honest conclusion is usually that a structural
      problem is re-igniting the inflammation — and the injection&apos;s real value
      was proving where that problem lives.
    </>,
  ],
  evaluationHeading: 'How the evaluation works',
  evaluationSteps: [
    {
      step: 'Locate the pain generator',
      body: 'Examination and history first: which movements provoke the pain, where it travels, and what that pattern implicates — spine, joint, tendon, or bursa.',
    },
    {
      step: 'Confirm inflammation is the driver',
      body: 'Imaging is reviewed or ordered to separate inflammatory pain, which cortisone treats, from mechanical or structural pain, which it does not.',
    },
    {
      step: 'Place the injection precisely',
      body: 'The injection is delivered to the specific structure identified — under image guidance where the target requires it.',
    },
    {
      step: 'Reassess and plan',
      body: 'Your response determines what comes next: monitoring, a different target, or a structural conversation if relief does not hold.',
    },
  ],
  pathwaysHeading: 'Where cortisone is used',
  pathwaysIntro:
    'The evaluation decides both whether cortisone applies and where it should go. Not every option applies to every patient.',
  pathways: [
    {
      heading: 'Spine',
      intro: 'Targeted spinal injections when the pain generator is a nerve, facet joint, or SI joint.',
      items: [
        <>
          <Link href="/treatments/epidural-steroid-injection" className={linkClass}>
            Epidural steroid injections
          </Link>{' '}
          for radiating nerve pain
        </>,
        <>
          <Link href="/treatments/cortisone-injections-for-back-pain" className={linkClass}>
            Cortisone injections for back pain
          </Link>
        </>,
        <>
          <Link href="/treatments/sacroiliac-joint-injection" className={linkClass}>
            SI joint injections
          </Link>{' '}
          for one-sided low back and buttock pain
        </>,
      ],
    },
    {
      heading: 'Joints, tendons, and bursae',
      intro: 'Direct injection into the inflamed structure around a painful joint.',
      items: [
        <>
          Injections for{' '}
          <Link href="/conditions/knee-arthritis" className={linkClass}>
            knee
          </Link>
          ,{' '}
          <Link href="/conditions/shoulder-arthritis" className={linkClass}>
            shoulder
          </Link>
          , and{' '}
          <Link href="/conditions/hip-arthritis" className={linkClass}>
            hip arthritis
          </Link>
        </>,
        <>
          Bursa injections for{' '}
          <Link href="/conditions/bursitis" className={linkClass}>
            bursitis
          </Link>{' '}
          of the hip, shoulder, or knee
        </>,
        <>Tendon-sheath injections where the examination supports them</>,
      ],
    },
  ],
  physiciansIntro:
    'Cortisone injections at Mountain Spine & Orthopedics are part of a full orthopedic evaluation — performed by physicians who can also tell you when cortisone is the wrong tool, and what the right one is.',
  faqs: [
    {
      question: 'How fast does a cortisone injection work?',
      answer:
        'The local anesthetic mixed with it works within minutes and wears off the same day; the corticosteroid itself typically begins working over the following days. Some patients notice a brief flare of soreness in between — that is common and expected.',
    },
    {
      question: 'How long does cortisone last?',
      answer:
        'It varies by condition and by person, and it cannot be promised in advance. The more your pain is driven by inflammation rather than by structural damage, the more cortisone has to offer. Either way, your response is diagnostic: it tells the physician how much of the pain the treated structure explains.',
    },
    {
      question: 'Are there limits on how much cortisone I can have?',
      answer:
        'Yes. Corticosteroid dosing is deliberately limited and spaced, because repeated frequent injections can affect the very tissue they are meant to help. A structure that keeps needing cortisone to stay comfortable is telling you something — and that finding redirects the plan.',
    },
    {
      question: 'Is cortisone a steroid like athletes use?',
      answer:
        'No. Corticosteroids are anti-inflammatory medications and are unrelated to anabolic steroids in both chemistry and effect. A local corticosteroid injection does not build tissue — it calms inflammation in the structure it is placed into.',
    },
    {
      question: 'Do you accept my insurance?',
      answer:
        'Most major PPO plans are accepted. Coverage, copay, and authorization requirements vary by plan, so our team verifies your specific benefits before your visit.',
    },
  ],
  finalHeading: 'Find out whether cortisone is the right tool for your pain',
  finalBody:
    'Request an evaluation and our team will follow up to arrange your appointment and verify your insurance.',
  trackLocation: 'Paid Cortisone Injections LP - Final CTA',
};

export default function CortisoneInjectionsPaidLandingPage() {
  return <InjectionsLandingPage config={config} />;
}
