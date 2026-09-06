import React from 'react';
import Link from 'next/link';
import InjectionsLandingPage, {
  type InjectionsLpConfig,
} from '../_shared/InjectionsLandingPage';

/**
 * Paid-search landing page: knee, shoulder & hip injections.
 *
 * Content rules followed here, and worth keeping if this page is edited:
 *   - No relief-duration promises and no outcome claims.
 *   - The "when the joint needs more" card links arthroscopic-knee-surgery,
 *     hip-arthroscopy-treatment, and rotator-cuff-repair-surgery — none of
 *     which are pilot slugs. shoulder-arthroscopy (treatment arm) and
 *     biceps-tenodesis (control arm) are deliberately NOT linked; this page
 *     is noindex,FOLLOW and must not alter the pilot's link graph.
 *   - Physical therapy is never presented as an MSO service.
 */

const linkClass = 'underline text-[#252932] hover:text-[#2358AC]';

const config: InjectionsLpConfig = {
  badge: 'Knee, Shoulder & Hip Injections',
  h1: 'Knee, Shoulder & Hip Injection Treatment',
  heroIntro:
    'Get evaluated for image-guided joint injections for arthritis, bursitis, and inflammatory joint pain. Our orthopedic physicians examine the joint and your imaging first, so the injection treats the structure that is actually responsible.',
  formBodyPartTitle: 'Joint',
  sourceLabel: 'Joint Injections Paid Landing Page',
  domains: ['pain-management', 'knee-hip', 'shoulder-elbow-hand'],
  trustPoints: [
    {
      label: 'Board-certified orthopedic physicians',
      detail:
        'The physician who injects the joint is part of the same practice that can repair it if injections stop being enough.',
    },
    {
      label: 'The joint is examined first',
      detail:
        'Motion, stability, and imaging are assessed before any needle — pain around a joint is not always pain from the joint.',
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
    'Joint injections help most when the pain is coming from inflammation inside the joint or the bursa around it. If several of these describe your situation, an evaluation is a reasonable next step.',
  symptoms: [
    {
      title: 'Knee pain on stairs or after sitting',
      body: 'Aching or grinding going down stairs, standing up from a chair, or after sitting still — the everyday pattern of knee arthritis.',
    },
    {
      title: 'Shoulder pain reaching overhead or at night',
      body: 'Pain lifting the arm, reaching behind you, or lying on that side at night — patterns that separate joint arthritis from rotator cuff and bursa problems.',
    },
    {
      title: 'Groin or hip pain when walking',
      body: 'Deep groin ache with walking or getting in and out of a car. True hip joint pain is usually felt in the groin, not the outer hip.',
    },
    {
      title: 'Swelling or stiffness after activity',
      body: 'A joint that puffs up, feels warm, or stiffens for more than half an hour after use — signs of active inflammation, which is what an injection addresses.',
    },
    {
      title: 'Rest and medication have plateaued',
      body: 'Weeks of anti-inflammatories, activity changes, or home care that helped at first and then stopped making a difference.',
    },
    {
      title: 'An X-ray that says arthritis, and nothing else',
      body: 'A report mentioning joint-space narrowing or osteoarthritis, with no plan for what to actually do about the pain.',
    },
  ],
  aboutHeading: 'What joint injections do',
  aboutParagraphs: [
    <>
      A joint injection places anti-inflammatory medication — usually a corticosteroid
      with a local anesthetic — directly inside the joint capsule or into the inflamed
      bursa beside it. Conditions treated this way include{' '}
      <Link href="/conditions/knee-arthritis" className={linkClass}>
        knee arthritis
      </Link>
      ,{' '}
      <Link href="/conditions/shoulder-arthritis" className={linkClass}>
        shoulder arthritis
      </Link>
      ,{' '}
      <Link href="/conditions/hip-arthritis" className={linkClass}>
        hip arthritis
      </Link>
      , and{' '}
      <Link href="/conditions/bursitis" className={linkClass}>
        bursitis
      </Link>
      .
    </>,
    <>
      Placement matters more in some joints than others: the hip in particular cannot
      be injected reliably by feel, which is why image guidance is used. And because
      the anesthetic works within minutes, the injection doubles as a test — if
      numbing the joint abolishes the pain, the joint is confirmed as the source; if
      the pain continues, the physician looks elsewhere before anything more invasive
      is considered. Read more about{' '}
      <Link
        href="/treatments/anti-inflammatory-injections-for-joint-and-spine-pain"
        className={linkClass}
      >
        anti-inflammatory injections
      </Link>
      .
    </>,
  ],
  evaluationHeading: 'How the evaluation works',
  evaluationSteps: [
    {
      step: 'Joint examination',
      body: 'Range of motion, stability, strength, and the specific movements that reproduce your pain — arthritis, tendon problems, and bursitis each leave a different signature.',
    },
    {
      step: 'Weight-bearing X-rays',
      body: 'For knees and hips, standing X-rays show the joint under load — cartilage loss that looks mild on a lying-down image can be significant when standing.',
    },
    {
      step: 'MRI where indicated',
      body: 'Ordered when the examination points to soft tissue — a rotator cuff tear, a meniscus tear, or a labral problem — that X-rays cannot show.',
    },
    {
      step: 'A plan you can act on',
      body: 'A clear explanation of what is generating the pain, whether an injection addresses it, and what the options are if it does not.',
    },
  ],
  pathwaysHeading: 'Treatment pathways',
  pathwaysIntro:
    'Depending on the joint, the imaging, and the examination findings, treatment may include any of the following. Not every option applies to every patient.',
  pathways: [
    {
      heading: 'Injection-based care',
      intro:
        'Where the joint surfaces are largely intact and inflammation is driving the pain.',
      items: [
        <>
          Corticosteroid injections into the knee, shoulder, or hip joint —{' '}
          <Link
            href="/treatments/anti-inflammatory-injections-for-joint-and-spine-pain"
            className={linkClass}
          >
            how they work
          </Link>
        </>,
        <>Bursa injections for trochanteric, shoulder, or knee bursitis</>,
        <>Activity modification and a home strengthening plan</>,
        <>Repeat examination to track how the joint responds</>,
      ],
    },
    {
      heading: 'When the joint needs more',
      intro:
        'Considered when there is a structural problem an injection cannot reach — a tear, a loose fragment, or advanced cartilage loss.',
      items: [
        <>
          <Link href="/treatments/arthroscopic-knee-surgery" className={linkClass}>
            Knee arthroscopy
          </Link>{' '}
          for meniscus tears and loose cartilage
        </>,
        <>
          <Link href="/treatments/rotator-cuff-repair-surgery" className={linkClass}>
            Rotator cuff repair
          </Link>{' '}
          where a confirmed tear is driving the shoulder pain
        </>,
        <>
          <Link href="/treatments/hip-arthroscopy-treatment" className={linkClass}>
            Hip arthroscopy
          </Link>{' '}
          for labral tears and impingement
        </>,
        <>
          A{' '}
          <Link href="/find-care/second-opinion" className={linkClass}>
            second opinion
          </Link>{' '}
          if joint replacement has been recommended elsewhere
        </>,
      ],
    },
  ],
  physiciansIntro:
    'Joint injections at Mountain Spine & Orthopedics are performed within a surgical orthopedic practice — the physicians evaluating you can also tell you when an injection is not the right tool for your joint.',
  faqs: [
    {
      question: 'Do joint injections hurt?',
      answer:
        'The skin is numbed first and the injection itself takes a few minutes. Deep joints like the hip are done under image guidance, which also keeps the procedure quick. Some patients notice a temporary flare of soreness for a day or two before the steroid takes effect — that is common and expected.',
    },
    {
      question: 'How long does a joint injection last?',
      answer:
        'It varies with the joint, the degree of arthritis, and the person — and it cannot be promised in advance. As a rule, the more the pain is driven by inflammation rather than by lost cartilage, the more an injection has to offer. Your response also tells the physician how much of your pain the joint itself explains.',
    },
    {
      question: 'How many cortisone injections can one joint have?',
      answer:
        'Repeated corticosteroid injections into the same joint are limited and spaced deliberately, because frequent dosing can affect the tissue it is meant to help. If a joint keeps needing injections to stay comfortable, that pattern is itself a finding — and the conversation shifts to what is structurally wrong.',
    },
    {
      question: 'Is an injection just masking the problem?',
      answer:
        'A corticosteroid injection reduces inflammation; it does not regrow cartilage or repair a tear. For a joint that is structurally sound, calming the inflammation may be all that is needed. For a joint that is not, the injection buys comfort and information while the right definitive treatment is worked out — it is a step in a plan, not a substitute for one.',
    },
    {
      question: 'Do you accept my insurance?',
      answer:
        'Most major PPO plans are accepted. Coverage, copay, and authorization requirements vary by plan, so our team verifies your specific benefits before your visit.',
    },
  ],
  finalHeading: 'Find out what is actually causing your joint pain',
  finalBody:
    'Request a joint injection evaluation and our team will follow up to arrange your appointment and verify your insurance.',
  trackLocation: 'Paid Joint Injections LP - Final CTA',
};

export default function JointInjectionsPaidLandingPage() {
  return <InjectionsLandingPage config={config} />;
}
