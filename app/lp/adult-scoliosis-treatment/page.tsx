import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import BodyPartHeroForm from '@/components/BodyPartHeroForm';
import DoctorCard from '@/components/DoctorCard';
import { PhoneTextLink } from '@/components/PhoneTextLink';
import { selectRelevantProviders } from '@/lib/providers/providerRelevance';
import { clinics } from '@/components/data/clinics';
import { STATE_METADATA, VALID_STATE_SLUGS } from '@/lib/locationRedirects';
import { MAIN_PHONE_DISPLAY, MAIN_PHONE_HREF } from '@/lib/locationConstants';

/**
 * Paid-search landing page for the adult / degenerative scoliosis ad groups.
 *
 * Server component by design: everything a visitor needs to decide is in the
 * first HTML response, so the page is useful before hydration and Ads quality
 * checks see the real content. The only client boundaries are the lead form,
 * the tracked phone link, and the doctor cards — all existing components.
 *
 * Content rules followed here, and worth keeping if this page is edited:
 *   - No outcome, success-rate, or complication claims.
 *   - No "best"/"top"/"leading" superlatives.
 *   - Physicians come from the verified deformity-capable pool, never a
 *     hand-picked or padded list.
 *   - No hours, wait times, or same-day promises.
 */

const SCOLIOSIS_CONDITION_PATH = '/conditions/adult-degenerative-scoliosis';

const SYMPTOMS: { title: string; body: string }[] = [
  {
    title: 'Lower back pain that builds through the day',
    body: 'Aching and fatigue across the low back that is worse after standing or walking and eases when you sit down.',
  },
  {
    title: 'Leg pain, numbness, or tingling',
    body: 'Symptoms that travel into the buttock, thigh, calf, or foot — often the first thing that brings adults in, rather than the curve itself.',
  },
  {
    title: 'Leaning to one side, or forward',
    body: 'Uneven shoulders or hips, a trunk shift, or difficulty standing upright without tiring.',
  },
  {
    title: 'A shrinking walking distance',
    body: 'Being able to walk less than you used to, and needing to sit or lean forward for relief.',
  },
  {
    title: 'Imaging you do not understand',
    body: 'An MRI or X-ray report mentioning scoliosis, curvature, listhesis, or stenosis, without a clear explanation of what it means for you.',
  },
  {
    title: 'Surgery recommended elsewhere',
    body: 'A fusion or other spine procedure proposed by another practice, and no second perspective on whether it is the right step.',
  },
];

const TRUST_POINTS: { label: string; detail: string }[] = [
  {
    label: 'Board-certified spine surgeons',
    detail: 'Orthopedic surgeons with fellowship and reconstructive spine training.',
  },
  {
    label: 'Complimentary MRI review',
    detail: 'Already have imaging? Have it reviewed before booking a full consultation.',
  },
  {
    label: 'Most major PPO plans accepted',
    detail: 'Coverage is verified before your visit.',
  },
  {
    label: 'Non-surgical care first',
    detail: 'Most adults with degenerative scoliosis are managed without surgery.',
  },
];

const FAQS: { question: string; answer: string }[] = [
  {
    question: 'Does seeing a spine surgeon mean I need surgery?',
    answer:
      'No. A spine consultation is a diagnostic visit. The surgeon works out what is actually generating your symptoms — the curve, the nerve compression, the arthritic joints, or something else entirely — and which treatments apply. Most adults with degenerative scoliosis are managed without surgery.',
  },
  {
    question: 'What imaging do I need for an adult scoliosis evaluation?',
    answer:
      'Standing full-length (long-cassette) spine X-rays are the key study, because alignment has to be measured under load. A lying-down MRI shows the discs and nerves but understates both the curve and any forward lean. If you already have imaging, bring it — an MRI review can be requested first.',
  },
  {
    question: 'Can adult scoliosis be corrected without surgery?',
    answer:
      'An established adult degenerative curve is not straightened by exercise, stretching, or bracing. Those measures manage symptoms, strength, and function. Structural correction requires reconstructive surgery, which carries its own risks and is reserved for specific situations — typically progressive deformity, significant imbalance, or nerve compression that has not responded to other care.',
  },
  {
    question: 'What does treatment usually involve?',
    answer:
      'It depends on the examination and imaging. Non-surgical care may include image-guided epidural or facet injections, activity modification, and monitoring with repeat standing X-rays. Where surgery is indicated, options range from targeted decompression to fusion-based reconstruction.',
  },
  {
    question: 'Do you accept my insurance?',
    answer:
      'Most major PPO plans are accepted. Coverage, copay, and authorization requirements vary by plan, so our team verifies your specific benefits before your visit.',
  },
];

export default function AdultScoliosisPaidLandingPage() {
  // Same verified deformity-capable pool the organic condition page uses.
  const surgeons = selectRelevantProviders({
    slug: 'adult-degenerative-scoliosis',
    count: 3,
  });

  const statesWithClinics = VALID_STATE_SLUGS.filter((state) =>
    clinics.some((clinic) => clinic.stateSlug === state)
  );

  return (
    <main className="w-full flex flex-col items-center bg-white">
      {/* ---------------------------------------------------------------- Hero */}
      <section className="w-full flex flex-col relative overflow-hidden [mask-composite:intersect] [mask-image:linear-gradient(to_top,transparent,black_6rem)]">
        <Image
          src="/herosectionimg.jpg"
          alt=""
          aria-hidden="true"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="absolute top-0 left-0 h-full w-full object-cover object-center"
        />
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              'linear-gradient(180deg, rgba(10, 80, 236, 0.20) 0%, rgba(255, 255, 255, 0.20) 100%)',
          }}
        />

        <div className="relative z-[2] max-w-[1440px] mx-auto w-full px-6 xl:px-[80px] pt-[112px] lg:pt-[220px] pb-12">
          <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-12">
            {/* Left: proposition */}
            <div className="flex-1 flex flex-col">
              <span
                className="rounded-[62px] w-fit px-[20px] py-[10px] mb-5 text-[#252932]"
                style={{
                  background: 'rgba(255, 255, 255, 0.50)',
                  fontFamily: 'var(--font-public-sans)',
                  fontWeight: 400,
                }}
              >
                Adult &amp; Degenerative Scoliosis
              </span>

              <h1
                style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 400 }}
                className="text-[#111315] text-4xl sm:text-5xl lg:text-6xl max-w-[640px]"
              >
                Adult Scoliosis &amp; Degenerative Scoliosis Treatment
              </h1>

              <p
                style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                className="text-[#424959] text-base sm:text-lg mt-6 max-w-[600px]"
              >
                Get evaluated for adult scoliosis, degenerative spinal curvature, and the
                back or leg symptoms that come with them. Our board-certified spine
                surgeons find what is actually causing your pain before recommending
                any treatment.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
                <Link
                  href="#request-evaluation"
                  className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-[62px] bg-[#2358AC] text-white text-base font-semibold hover:bg-[#1a4a8a] transition-all duration-200 shadow-sm hover:shadow-md"
                  style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
                >
                  Request an Evaluation
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M6 12L10 8L6 4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>

                <a
                  href={MAIN_PHONE_HREF}
                  className="inline-flex items-center justify-center h-12 px-6 rounded-[62px] bg-white border border-[#252932] text-[#252932] text-base hover:bg-[#FAFAFA] transition-colors"
                  style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
                >
                  Call {MAIN_PHONE_DISPLAY}
                </a>
              </div>
              <ul className="mt-7 flex flex-col gap-3 max-w-[560px]">
                {TRUST_POINTS.map((point) => (
                  <li key={point.label} className="flex items-start gap-3">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      aria-hidden="true"
                      className="mt-[3px] flex-shrink-0"
                    >
                      <circle cx="10" cy="10" r="10" fill="#0A50EC" />
                      <path
                        d="M5.8 10.3l2.7 2.7 5.7-5.7"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span
                      style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                      className="text-[#252932] text-base"
                    >
                      <strong className="font-semibold text-[#111315]">{point.label}.</strong>{' '}
                      {point.detail}
                    </span>
                  </li>
                ))}
              </ul>

            </div>

            {/* Right: the form. On mobile it follows the proposition immediately. */}
            <div
              id="request-evaluation"
              className="w-full max-w-[340px] sm:max-w-[380px] flex-shrink-0 mx-auto lg:mx-0 scroll-mt-28"
            >
              <BodyPartHeroForm
                bodyPartTitle="Adult Scoliosis"
                formSource="paid-landing"
                sourceLabel="Adult Scoliosis Paid Landing Page"
              />

              {/* Sits under the form for two reasons: it answers the "what am I
                  actually signing up for?" hesitation that costs paid-traffic
                  conversions, and it fills the right column, which otherwise ran
                  empty for ~400px below the form and left the hero visibly
                  left-heavy on desktop. */}
              <ol className="mt-6 flex flex-col gap-3">
                {[
                  'You send your details — takes about a minute.',
                  'We call to schedule and verify your insurance benefits.',
                  'You are evaluated by a spine specialist, imaging reviewed.',
                ].map((step, index) => (
                  <li key={step} className="flex items-start gap-3">
                    <span
                      className="flex-shrink-0 w-6 h-6 rounded-full bg-white text-[#0A50EC] ring-1 ring-[#0A50EC]/25 flex items-center justify-center text-xs"
                      style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 600 }}
                      aria-hidden="true"
                    >
                      {index + 1}
                    </span>
                    <span
                      style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                      className="text-[#252932] text-sm"
                    >
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ Symptom recognition */}
      <section className="max-w-[1440px] w-full px-6 xl:px-[80px] py-[60px]">
        <h2
          style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
          className="text-[#111315] text-3xl sm:text-4xl max-w-[760px]"
        >
          Is this what you are dealing with?
        </h2>
        <p
          style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
          className="text-[#424959] text-base sm:text-lg mt-4 max-w-[760px]"
        >
          Adult degenerative scoliosis usually announces itself through symptoms rather
          than through the curve. If several of these describe your situation, an
          evaluation is a reasonable next step.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {SYMPTOMS.map((symptom) => (
            <div
              key={symptom.title}
              className="h-full flex flex-col bg-[#FAFAFA] rounded-[24px] p-6 sm:p-7"
            >
              <h3
                style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 600 }}
                className="text-[#111315] text-lg"
              >
                {symptom.title}
              </h3>
              <p
                style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                className="text-[#424959] text-base mt-3"
              >
                {symptom.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------ What it is */}
      <section className="w-full bg-[#FAFAFA]">
        <div className="max-w-[1440px] w-full mx-auto px-6 xl:px-[80px] py-[60px] grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div>
            <h2
              style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
              className="text-[#111315] text-3xl sm:text-4xl"
            >
              What adult degenerative scoliosis is
            </h2>
            <p
              style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
              className="text-[#424959] text-base sm:text-lg mt-4"
            >
              Adult degenerative scoliosis is a sideways curve of the spine that develops
              after skeletal maturity, usually because the discs and facet joints on one
              side wear down faster than the other. It is a different condition from the
              adolescent scoliosis most people have heard of: adults are evaluated because
              of pain, posture change, or nerve symptoms, not because of the curve itself.
            </p>
            <p
              style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
              className="text-[#424959] text-base sm:text-lg mt-4"
            >
              As vertebrae tilt and rotate, they can narrow the spinal canal or the
              openings where nerves exit — which is why back pain and leg symptoms so
              often appear together.{' '}
              <Link
                href={SCOLIOSIS_CONDITION_PATH}
                className="underline text-[#252932] hover:text-[#2358AC]"
              >
                Read the full adult degenerative scoliosis guide
              </Link>
              .
            </p>
          </div>

          <div>
            <h2
              style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
              className="text-[#111315] text-3xl sm:text-4xl"
            >
              How the evaluation works
            </h2>
            <ol className="mt-5 flex flex-col gap-5">
              {[
                {
                  step: 'Examination',
                  body: 'Shoulder and pelvic height, trunk shift, walking tolerance, and a neurological check of strength, sensation, and reflexes.',
                },
                {
                  step: 'Standing full-length X-rays',
                  body: 'Alignment measured under load. This is what defines the curve (the Cobb angle), the rotation, and whether balance is being lost.',
                },
                {
                  step: 'MRI where indicated',
                  body: 'Ordered when there are leg symptoms, numbness, or weakness, to show the discs, canal, and nerve roots that X-rays cannot.',
                },
                {
                  step: 'A plan you can act on',
                  body: 'A clear explanation of what is generating your symptoms and which treatments — surgical and non-surgical — actually apply.',
                },
              ].map((item, index) => (
                <li key={item.step} className="flex items-start gap-4">
                  <span
                    className="flex-shrink-0 w-8 h-8 rounded-full bg-[#2358AC] text-white flex items-center justify-center text-sm"
                    style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 600 }}
                    aria-hidden="true"
                  >
                    {index + 1}
                  </span>
                  <span>
                    <span
                      style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 600 }}
                      className="text-[#111315] text-base block"
                    >
                      {item.step}
                    </span>
                    <span
                      style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                      className="text-[#424959] text-base"
                    >
                      {item.body}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- Treatment paths */}
      <section className="max-w-[1440px] w-full px-6 xl:px-[80px] py-[60px]">
        <h2
          style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
          className="text-[#111315] text-3xl sm:text-4xl max-w-[760px]"
        >
          Treatment pathways
        </h2>
        <p
          style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
          className="text-[#424959] text-base sm:text-lg mt-4 max-w-[760px]"
        >
          Depending on your symptoms, imaging, and examination findings, treatment may
          include any of the following. Not every option applies to every patient.
        </p>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-full flex flex-col bg-white border border-gray-200 rounded-[24px] p-7 sm:p-8">
            <h3
              style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 600 }}
              className="text-[#111315] text-xl"
            >
              Non-surgical care
            </h3>
            <p
              style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
              className="text-[#424959] text-base mt-3"
            >
              Where the curve is stable and symptoms are manageable, treatment focuses on
              controlling pain and preserving function.
            </p>
            <ul className="mt-4 list-disc pl-5 space-y-2 text-[#424959] text-base">
              <li>
                <Link
                  href="/treatments/epidural-steroid-injection"
                  className="underline text-[#252932] hover:text-[#2358AC]"
                >
                  Epidural steroid injections
                </Link>{' '}
                and other image-guided injections
              </li>
              <li>Activity modification and postural guidance</li>
              <li>Anti-inflammatory medication where appropriate</li>
              <li>Serial standing X-rays to track whether the curve is changing</li>
            </ul>
          </div>

          <div className="h-full flex flex-col bg-white border border-gray-200 rounded-[24px] p-7 sm:p-8">
            <h3
              style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 600 }}
              className="text-[#111315] text-xl"
            >
              Surgical evaluation
            </h3>
            <p
              style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
              className="text-[#424959] text-base mt-3"
            >
              Considered when a curve is progressing, imbalance is limiting daily
              function, or nerve compression has not responded to other care.
            </p>
            <ul className="mt-4 list-disc pl-5 space-y-2 text-[#424959] text-base">
              <li>
                <Link
                  href="/treatments/lumbar-decompression"
                  className="underline text-[#252932] hover:text-[#2358AC]"
                >
                  Targeted decompression
                </Link>{' '}
                for nerve-related leg symptoms
              </li>
              <li>
                <Link
                  href="/treatments/spinal-fusion"
                  className="underline text-[#252932] hover:text-[#2358AC]"
                >
                  Spinal fusion
                </Link>{' '}
                for correction and stabilisation
              </li>
              <li>
                Minimally invasive approaches such as{' '}
                <Link
                  href="/treatments/understanding-tlif-surgery"
                  className="underline text-[#252932] hover:text-[#2358AC]"
                >
                  TLIF
                </Link>{' '}
                and{' '}
                <Link
                  href="/treatments/anterior-lumbar-interbody-fusion"
                  className="underline text-[#252932] hover:text-[#2358AC]"
                >
                  ALIF
                </Link>
              </li>
              <li>
                <Link
                  href="/treatments/revision-spinal-surgery"
                  className="underline text-[#252932] hover:text-[#2358AC]"
                >
                  Revision surgery
                </Link>{' '}
                where a previous fusion has not resolved symptoms
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- Physicians */}
      {surgeons.length > 0 && (
        <section className="w-full bg-[#FAFAFA]">
          <div className="max-w-[1440px] w-full mx-auto px-6 xl:px-[80px] py-[60px]">
            <h2
              style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
              className="text-[#111315] text-3xl sm:text-4xl"
            >
              Who will evaluate you
            </h2>
            <p
              style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
              className="text-[#424959] text-base sm:text-lg mt-4 max-w-[760px]"
            >
              Adult spinal deformity is evaluated by our orthopedic spine surgeons whose
              training covers reconstructive and deformity procedures.
            </p>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {surgeons.map((doctor) => (
                <DoctorCard doctor={doctor} key={doctor.slug} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* -------------------------------------- MRI review / second opinion */}
      <section className="max-w-[1440px] w-full px-6 xl:px-[80px] py-[60px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-full flex flex-col justify-between bg-[#F0F7FF] border-l-4 border-[#0A50EC] rounded-[24px] p-7 sm:p-8">
            <div>
              <h2
                style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 600 }}
                className="text-[#111315] text-xl sm:text-2xl"
              >
                Already have an MRI or X-ray?
              </h2>
              <p
                style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                className="text-[#424959] text-base mt-3"
              >
                Have your existing imaging reviewed before committing to a full
                consultation.
              </p>
            </div>
            <Link
              href="/find-care/free-mri-review"
              className="mt-6 inline-flex items-center justify-center w-fit h-12 px-6 rounded-[62px] bg-white border border-[#252932] text-[#252932] text-base hover:bg-white/70 transition-colors"
              style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
            >
              Request an MRI Review
            </Link>
          </div>

          <div className="h-full flex flex-col justify-between bg-[#F0F7FF] border-l-4 border-[#0A50EC] rounded-[24px] p-7 sm:p-8">
            <div>
              <h2
                style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 600 }}
                className="text-[#111315] text-xl sm:text-2xl"
              >
                Been told you need fusion?
              </h2>
              <p
                style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                className="text-[#424959] text-base mt-3"
              >
                A second opinion on a recommended spine procedure is a reasonable step,
                particularly for multi-level surgery.
              </p>
            </div>
            <Link
              href="/find-care/second-opinion"
              className="mt-6 inline-flex items-center justify-center w-fit h-12 px-6 rounded-[62px] bg-white border border-[#252932] text-[#252932] text-base hover:bg-white/70 transition-colors"
              style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
            >
              Request a Second Opinion
            </Link>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- Locations */}
      <section className="w-full bg-[#FAFAFA]">
        <div className="max-w-[1440px] w-full mx-auto px-6 xl:px-[80px] py-[60px]">
          <h2
            style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
            className="text-[#111315] text-3xl sm:text-4xl"
          >
            Where we see patients
          </h2>
          <p
            style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
            className="text-[#424959] text-base sm:text-lg mt-4 max-w-[760px]"
          >
            Mountain Spine &amp; Orthopedics has {clinics.length} offices across{' '}
            {statesWithClinics.length} states.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {statesWithClinics.map((state) => (
              <Link
                key={state}
                href={`/locations/${state}`}
                className="bg-white border border-[#252932] text-[#252932] px-5 min-h-[44px] inline-flex items-center rounded-full text-sm hover:bg-[#F0F0F0] transition-colors"
                style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 400 }}
              >
                {STATE_METADATA[state]?.name ?? state} (
                {clinics.filter((clinic) => clinic.stateSlug === state).length})
              </Link>
            ))}
            <Link
              href="/locations"
              className="bg-white border border-[#252932] text-[#252932] px-5 min-h-[44px] inline-flex items-center rounded-full text-sm hover:bg-[#F0F0F0] transition-colors"
              style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 400 }}
            >
              View all locations
            </Link>
          </div>
          <p
            style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
            className="text-[#424959] text-base mt-6"
          >
            Most major PPO insurance accepted —{' '}
            <Link
              href="/insurance-policy"
              className="underline text-[#252932] hover:text-[#2358AC]"
            >
              see our insurance information
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------- FAQs */}
      <section className="max-w-[1440px] w-full px-6 xl:px-[80px] py-[60px]">
        <h2
          style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
          className="text-[#111315] text-3xl sm:text-4xl"
        >
          Common questions
        </h2>
        <div className="mt-8 flex flex-col gap-4 max-w-[900px]">
          {FAQS.map((faq) => (
            <details
              key={faq.question}
              className="group bg-[#FAFAFA] rounded-[24px] px-6 py-5 sm:px-7"
            >
              <summary
                style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 600 }}
                className="text-[#111315] text-base sm:text-lg cursor-pointer list-none flex items-start justify-between gap-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0A50EC] rounded"
              >
                {faq.question}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  className="flex-shrink-0 mt-1 transition-transform group-open:rotate-90"
                >
                  <path
                    d="M6 12L10 8L6 4"
                    stroke="#0A50EC"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </summary>
              <p
                style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                className="text-[#424959] text-base mt-4"
              >
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* --------------------------------------------------------- Final CTA */}
      <section className="w-full bg-[#FAFAFA]">
        <div className="max-w-[1440px] w-full mx-auto px-6 xl:px-[80px] py-[60px] flex flex-col items-center text-center">
          <h2
            style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
            className="text-[#111315] text-3xl sm:text-4xl max-w-[720px]"
          >
            Find out what is actually causing your symptoms
          </h2>
          <p
            style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
            className="text-[#424959] text-base sm:text-lg mt-4 max-w-[640px]"
          >
            Request an adult scoliosis evaluation and our team will follow up to arrange
            your appointment and verify your insurance.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="#request-evaluation"
              className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-[62px] bg-[#2358AC] text-white text-base font-semibold hover:bg-[#1a4a8a] transition-all duration-200 shadow-sm hover:shadow-md"
              style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
            >
              Request an Evaluation
            </Link>
            <PhoneTextLink trackLocation="Paid Scoliosis LP - Final CTA" />
          </div>
        </div>
      </section>

      {/* Sticky mobile action bar. pb offset on the page body keeps it from
          covering the final CTA on short viewports. */}
      <div className="h-[76px] lg:hidden" aria-hidden="true" />
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-gray-200 px-4 py-3 flex gap-3">
        <a
          href={MAIN_PHONE_HREF}
          className="flex-1 inline-flex items-center justify-center h-12 rounded-[62px] border border-[#252932] text-[#252932] text-base"
          style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
        >
          Call
        </a>
        <Link
          href="#request-evaluation"
          className="flex-1 inline-flex items-center justify-center h-12 rounded-[62px] bg-[#2358AC] text-white text-base font-semibold"
          style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
        >
          Request Evaluation
        </Link>
      </div>
    </main>
  );
}
