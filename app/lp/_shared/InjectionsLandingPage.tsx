import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import BodyPartHeroForm from '@/components/BodyPartHeroForm';
import DoctorCard from '@/components/DoctorCard';
import { PhoneTextLink } from '@/components/PhoneTextLink';
import {
  selectRelevantProviders,
  type CareDomain,
} from '@/lib/providers/providerRelevance';
import { clinics } from '@/components/data/clinics';
import { STATE_METADATA, VALID_STATE_SLUGS } from '@/lib/locationRedirects';
import { MAIN_PHONE_DISPLAY, MAIN_PHONE_HREF } from '@/lib/locationConstants';

/**
 * Shared template for the injections paid-search landing pages.
 *
 * Structurally a clone of /lp/adult-scoliosis-treatment — same hero-with-form
 * layout, same section order, same mobile action bar — factored into one
 * component so the three injections pages don't carry three drifting copies of
 * 700 lines of JSX. All copy comes in through the config, so each page stays
 * fully differentiated (the noun-swap test applies to landing pages too).
 *
 * Server component by design: everything a visitor needs to decide is in the
 * first HTML response. The only client boundaries are the lead form, the
 * tracked phone link, and the doctor cards.
 *
 * Content rules enforced on every config that renders through here:
 *   - No outcome, success-rate, or relief-duration promises.
 *   - No "best"/"top"/"leading" superlatives.
 *   - Physicians come from the verified care-domain pools, never a
 *     hand-picked or padded list.
 *   - No hours, wait times, or cost figures.
 *   - Links must not point at any of the ten locked pilot slugs
 *     (docs/seo/post-launch-measurement.md §16) — these pages are
 *     noindex,FOLLOW, so their links still shape the pilot's link graph.
 */

export interface InjectionsLpConfig {
  /** Small pill above the H1, e.g. "Spine & Back Pain Injections". */
  badge: string;
  h1: string;
  heroIntro: string;
  /** Feeds BodyPartHeroForm copy ("Experiencing {x} Pain?"). */
  formBodyPartTitle: string;
  /** Human-readable lead source recorded with the submission. */
  sourceLabel: string;
  /** Care domains for physician selection — pass explicitly, no slug guessing. */
  domains: readonly CareDomain[];
  trustPoints: { label: string; detail: string }[];
  symptomsHeading: string;
  symptomsIntro: string;
  symptoms: { title: string; body: string }[];
  aboutHeading: string;
  /** Paragraph nodes so pages can embed verified internal links. */
  aboutParagraphs: React.ReactNode[];
  evaluationHeading: string;
  evaluationSteps: { step: string; body: string }[];
  pathwaysHeading: string;
  pathwaysIntro: string;
  pathways: {
    heading: string;
    intro: string;
    items: React.ReactNode[];
  }[];
  physiciansIntro: string;
  faqs: { question: string; answer: string }[];
  finalHeading: string;
  finalBody: string;
  /** Label for phone-click analytics, e.g. "Paid Spine Injections LP - Final CTA". */
  trackLocation: string;
}

export default function InjectionsLandingPage({
  config,
}: {
  config: InjectionsLpConfig;
}) {
  const surgeons = selectRelevantProviders({
    domains: config.domains,
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
                {config.badge}
              </span>

              <h1
                style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 400 }}
                className="text-[#111315] text-4xl sm:text-5xl lg:text-6xl max-w-[640px]"
              >
                {config.h1}
              </h1>

              <p
                style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                className="text-[#424959] text-base sm:text-lg mt-6 max-w-[600px]"
              >
                {config.heroIntro}
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
                {config.trustPoints.map((point) => (
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
                bodyPartTitle={config.formBodyPartTitle}
                formSource="paid-landing"
                sourceLabel={config.sourceLabel}
              />

              {/* Answers the "what am I actually signing up for?" hesitation and
                  fills the right column below the form on desktop. */}
              <ol className="mt-6 flex flex-col gap-3">
                {[
                  'You send your details — takes about a minute.',
                  'We call to schedule and verify your insurance benefits.',
                  'You are evaluated by a physician, imaging reviewed.',
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
          {config.symptomsHeading}
        </h2>
        <p
          style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
          className="text-[#424959] text-base sm:text-lg mt-4 max-w-[760px]"
        >
          {config.symptomsIntro}
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {config.symptoms.map((symptom) => (
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
              {config.aboutHeading}
            </h2>
            {config.aboutParagraphs.map((paragraph, index) => (
              <p
                key={index}
                style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                className="text-[#424959] text-base sm:text-lg mt-4"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div>
            <h2
              style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
              className="text-[#111315] text-3xl sm:text-4xl"
            >
              {config.evaluationHeading}
            </h2>
            <ol className="mt-5 flex flex-col gap-5">
              {config.evaluationSteps.map((item, index) => (
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
          {config.pathwaysHeading}
        </h2>
        <p
          style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
          className="text-[#424959] text-base sm:text-lg mt-4 max-w-[760px]"
        >
          {config.pathwaysIntro}
        </p>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {config.pathways.map((pathway) => (
            <div
              key={pathway.heading}
              className="h-full flex flex-col bg-white border border-gray-200 rounded-[24px] p-7 sm:p-8"
            >
              <h3
                style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 600 }}
                className="text-[#111315] text-xl"
              >
                {pathway.heading}
              </h3>
              <p
                style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                className="text-[#424959] text-base mt-3"
              >
                {pathway.intro}
              </p>
              <ul className="mt-4 list-disc pl-5 space-y-2 text-[#424959] text-base">
                {pathway.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
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
              {config.physiciansIntro}
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
                Been recommended surgery elsewhere?
              </h2>
              <p
                style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                className="text-[#424959] text-base mt-3"
              >
                A second opinion on a recommended procedure is a reasonable step —
                including on whether an injection should be tried first.
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
          {config.faqs.map((faq) => (
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
            {config.finalHeading}
          </h2>
          <p
            style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
            className="text-[#424959] text-base sm:text-lg mt-4 max-w-[640px]"
          >
            {config.finalBody}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="#request-evaluation"
              className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-[62px] bg-[#2358AC] text-white text-base font-semibold hover:bg-[#1a4a8a] transition-all duration-200 shadow-sm hover:shadow-md"
              style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
            >
              Request an Evaluation
            </Link>
            <PhoneTextLink trackLocation={config.trackLocation} />
          </div>
        </div>
      </section>

      {/* Sticky mobile action bar. pb offset keeps it from covering the final CTA. */}
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
