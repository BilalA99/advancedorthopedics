import React from 'react';
import Link from 'next/link';
import InjectionsLandingPage, {
  type InjectionsLpConfig,
} from '../_shared/InjectionsLandingPage';

/**
 * Paid-search landing page: spine & back pain injections.
 *
 * Content rules followed here, and worth keeping if this page is edited:
 *   - No relief-duration promises. How long an injection helps varies by
 *     person and condition; the FAQ says exactly that and no more.
 *   - No outcome, success-rate, or complication claims.
 *   - Injection links go to the specific procedure pages; the "if injections
 *     are not enough" card deliberately links lumbar-microdiscectomy-surgery
 *     and acdf-surgery, NOT lumbar-decompression or spinal-fusion — those two
 *     are locked pilot slugs (control and treatment arm respectively) and this
 *     followed page must not alter their link graph.
 */

const linkClass = 'underline text-[#252932] hover:text-[#2358AC]';

const config: InjectionsLpConfig = {
  badge: 'Spine & Back Pain Injections',
  h1: 'Spine & Back Pain Injections',
  heroIntro:
    'Get evaluated for image-guided spine injections — epidural steroid injections, facet joint injections, SI joint injections, and nerve blocks. Our physicians identify which structure is generating your pain before recommending any procedure.',
  formBodyPartTitle: 'Back',
  sourceLabel: 'Spine Injections Paid Landing Page',
  domains: ['pain-management', 'spine'],
  trustPoints: [
    {
      label: 'Board-certified physicians',
      detail:
        'Injections are part of a plan built by orthopedic spine surgeons and a fellowship-trained pain management physician.',
    },
    {
      label: 'Image-guided placement',
      detail:
        'Spine injections are placed under imaging guidance, at the specific level and structure identified on your scans.',
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
    'Spine injections treat specific pain generators, so the pattern of your symptoms matters as much as their intensity. If several of these describe your situation, an evaluation is a reasonable next step.',
  symptoms: [
    {
      title: 'Pain shooting down one leg',
      body: 'Sharp or electric pain from the low back into the buttock, thigh, or foot — the pattern of an irritated nerve root, and the classic reason an epidural injection is considered.',
    },
    {
      title: 'Back pain that eases when you sit',
      body: 'Aching that builds with standing or walking and settles when you sit or lean forward, which points toward narrowing around the nerves.',
    },
    {
      title: 'Pain that is worse leaning back',
      body: 'Low back or neck pain aggravated by arching backward or twisting — the pattern of arthritic facet joints, which respond to a different injection than nerve pain does.',
    },
    {
      title: 'One-sided pain low in the back or buttock',
      body: 'Pain over one side of the very low back, sometimes into the groin, that is worse with stairs or rising from a chair — a sacroiliac joint pattern.',
    },
    {
      title: 'Medication and rest have stopped helping',
      body: 'Weeks of anti-inflammatories, activity changes, or home care without lasting improvement.',
    },
    {
      title: 'An MRI report without a plan',
      body: 'Imaging that mentions a herniated disc, stenosis, or arthritis, but no clear explanation of which finding is actually causing your pain — or what to do about it.',
    },
  ],
  aboutHeading: 'What spine injections do',
  aboutParagraphs: [
    <>
      A spine injection delivers anti-inflammatory medication — and usually a local
      anesthetic — to one specific structure: the epidural space around an irritated
      nerve, an arthritic facet joint, the sacroiliac joint, or a single nerve root.
      Because the medication is placed at the pain generator rather than circulating
      through the whole body, a much smaller dose can act directly where the
      inflammation is.
    </>,
    <>
      Injections also answer diagnostic questions. When numbing one specific joint or
      nerve stops the pain, that structure is implicated — information that shapes
      everything that follows, from{' '}
      <Link href="/treatments/facet-ablation-rhizotomy-treatment" className={linkClass}>
        radiofrequency ablation
      </Link>{' '}
      to whether surgery would even address the right problem. Common conditions
      treated this way include{' '}
      <Link href="/conditions/sciatica" className={linkClass}>
        sciatica
      </Link>
      ,{' '}
      <Link href="/conditions/herniated-disc" className={linkClass}>
        herniated discs
      </Link>
      , and{' '}
      <Link href="/conditions/spinal-stenosis" className={linkClass}>
        spinal stenosis
      </Link>
      .
    </>,
  ],
  evaluationHeading: 'How the evaluation works',
  evaluationSteps: [
    {
      step: 'Examination and history',
      body: 'Where the pain travels, what provokes and relieves it, and a neurological check of strength, sensation, and reflexes — the pattern narrows down the structure responsible.',
    },
    {
      step: 'Imaging review',
      body: 'Your MRI or X-rays are read against the examination. Imaging findings are common even in people without pain, so the physician matches what the scan shows to what your symptoms actually do.',
    },
    {
      step: 'A targeted injection where indicated',
      body: 'The injection chosen for your specific pain generator — epidural, facet, SI joint, or nerve block — placed under imaging guidance.',
    },
    {
      step: 'Reassessment',
      body: 'Your response, including how completely the anesthetic phase relieved the pain, tells the physician whether the right structure was treated and what the next step should be.',
    },
  ],
  pathwaysHeading: 'Injection options',
  pathwaysIntro:
    'Which injection applies depends on which structure the evaluation implicates. Not every option applies to every patient.',
  pathways: [
    {
      heading: 'Image-guided spine injections',
      intro:
        'Each targets a different pain generator, and choosing between them is the point of the evaluation.',
      items: [
        <>
          <Link href="/treatments/epidural-steroid-injection" className={linkClass}>
            Epidural steroid injections
          </Link>{' '}
          for nerve-root pain radiating into the leg or arm
        </>,
        <>
          Facet joint injections, and{' '}
          <Link href="/treatments/facet-ablation-rhizotomy-treatment" className={linkClass}>
            radiofrequency ablation
          </Link>{' '}
          where a diagnostic block confirms the facet joints as the source
        </>,
        <>
          <Link href="/treatments/sacroiliac-joint-injection" className={linkClass}>
            Sacroiliac joint injections
          </Link>{' '}
          for one-sided low back and buttock pain
        </>,
        <>
          <Link href="/treatments/nerve-block-injection" className={linkClass}>
            Selective nerve blocks
          </Link>
          , often used diagnostically to isolate a single nerve root
        </>,
      ],
    },
    {
      heading: 'If injections are not enough',
      intro:
        'Injections reduce inflammation; they do not change the structure causing it. When symptoms return despite a well-placed injection, that result itself guides the surgical conversation.',
      items: [
        <>
          <Link href="/treatments/lumbar-microdiscectomy-surgery" className={linkClass}>
            Microdiscectomy
          </Link>{' '}
          where a disc fragment is compressing a nerve
        </>,
        <>
          <Link href="/treatments/acdf-surgery" className={linkClass}>
            ACDF
          </Link>{' '}
          for cervical nerve compression that has not settled
        </>,
        <>
          A{' '}
          <Link href="/find-care/second-opinion" className={linkClass}>
            second opinion
          </Link>{' '}
          if surgery has already been recommended elsewhere
        </>,
      ],
    },
  ],
  physiciansIntro:
    'Spine injections at Mountain Spine & Orthopedics sit inside a surgical practice: the physicians evaluating you can also tell you when an injection is not the right tool.',
  faqs: [
    {
      question: 'Do spine injections hurt?',
      answer:
        'The skin and deeper tissue are numbed with local anesthetic first, and the injection itself typically takes a few minutes. Most patients describe pressure rather than sharp pain. Soreness at the injection site for a day or two afterward is common.',
    },
    {
      question: 'How long does the relief last?',
      answer:
        'It varies — by condition, by person, and by how much inflammation contributes to the pain versus structural compression. No honest practice can promise a duration in advance. What an injection always provides is diagnostic information: how you respond tells the physician whether the right structure was treated.',
    },
    {
      question: 'How many injections can I have?',
      answer:
        'Corticosteroid dosing is limited over time, so injections are spaced and counted rather than repeated indefinitely. If relief keeps wearing off, the plan changes — to a different injection, to radiofrequency ablation where appropriate, or to a surgical evaluation — instead of repeating the same procedure.',
    },
    {
      question: 'Will an injection fix the underlying problem?',
      answer:
        'No. Injections reduce inflammation around a structure; they do not repair a disc, remove a bone spur, or widen a narrowed canal. For many patients that is enough to restore function while the body settles. When it is not, the injection has still localised the problem precisely.',
    },
    {
      question: 'Do you accept my insurance?',
      answer:
        'Most major PPO plans are accepted. Coverage, copay, and authorization requirements vary by plan, so our team verifies your specific benefits before your visit.',
    },
  ],
  finalHeading: 'Find out which structure is generating your pain',
  finalBody:
    'Request a spine injection evaluation and our team will follow up to arrange your appointment and verify your insurance.',
  trackLocation: 'Paid Spine Injections LP - Final CTA',
};

export default function SpineInjectionsPaidLandingPage() {
  return <InjectionsLandingPage config={config} />;
}
