import { CheckCircle2, Phone, ShieldCheck, Clock, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";

import { MAIN_PHONE_DISPLAY, MAIN_PHONE_HREF } from "@/lib/locationConstants";

/**
 * Non-qualified confirmation page (D10).
 *
 * ## Why this page exists at all
 *
 * A patient whose plan the practice does not participate in is still a patient
 * who asked for help, and the clinic still receives, stores and emails the lead.
 * What must NOT happen is that lead being reported to Google Ads as an accepted-
 * insurance conversion, because Smart Bidding would then spend to find more
 * people the practice cannot serve for the advertised procedure.
 *
 * Separating the destination is how that is kept honest. The qualified page is
 * the conversion page; this one is a real confirmation that fires nothing.
 *
 * ## Deliberately a server component with no client JavaScript
 *
 * There is no `"use client"`, no hook, no effect and no analytics import here.
 * The qualified conversion is fired from the canonical dataLayer event in
 * `utils/enhancedConversions.ts` before navigation, and unqualified leads never
 * reach that push (the STEP 0 gate). Keeping this page inert is the second line
 * of defence: there is no code here that could fire a conversion even by mistake.
 *
 * A consequence worth stating: nothing on this page may become interactive
 * without re-checking that rule. A client component added for a carousel or an
 * accordion would pull this page into the bundle that can reach `dataLayer`.
 *
 * ## Tone
 *
 * This person is being told, moments after asking for help, that their plan may
 * not be accepted. The page therefore leads with the confirmation — the request
 * IS received, a human IS going to call — and only then explains the insurance
 * position. It states what happens next, gives a phone number, and promises
 * nothing about coverage in either direction.
 *
 * It deliberately does not read as a rejection or a dead end. "Not in our network"
 * is not the same as "we cannot help you": self-pay pricing and out-of-network
 * benefits are both real paths, and the page says so without overselling either.
 */

const NEXT_STEPS = [
  {
    icon: Phone,
    title: "A member of our team calls you",
    body: "Usually the same business day. They will confirm what you are dealing with and answer questions about getting seen.",
  },
  {
    icon: ShieldCheck,
    title: "We check your plan properly",
    body: "Plan names are genuinely confusing, and patients often hold a PPO without realising it. We verify before anything is booked.",
  },
  {
    icon: FileText,
    title: "You get your options in plain terms",
    body: "Including self-pay pricing up front and, where it applies, any out-of-network benefit your plan may still provide.",
  },
] as const;

export default function ThankYouOtherPage() {
  return (
    <div className="w-full bg-gradient-to-br from-blue-50 via-white to-slate-50">
      <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl">

          {/* Confirmation. Leads the page: the request was received, full stop. */}
          <div className="text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#0A50EC]/10 sm:h-20 sm:w-20">
              <CheckCircle2
                className="h-9 w-9 text-[#0A50EC] sm:h-11 sm:w-11"
                aria-hidden="true"
              />
            </div>
            <h1
              className="text-3xl font-bold tracking-tight text-[#252932] sm:text-4xl lg:text-5xl"
              style={{ fontFamily: "var(--font-public-sans)" }}
            >
              Thank you — we have your request
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#424959] sm:text-lg">
              Your details are with our team at Mountain Spine &amp; Orthopedics,
              and someone will be in touch shortly to talk through how we can help.
            </p>
          </div>

          {/* What happens next. Three concrete steps, because "we'll be in touch"
              on its own reads as a brush-off to someone who has just been told
              their insurance may not be accepted. */}
          <div className="mt-10 sm:mt-14">
            <h2 className="text-center text-sm font-semibold uppercase tracking-wider text-[#0A50EC]">
              What happens next
            </h2>
            <ol className="mt-6 space-y-4">
              {NEXT_STEPS.map(({ icon: Icon, title, body }, index) => (
                <li
                  key={title}
                  className="flex gap-4 rounded-2xl border border-[#E3E8F0] bg-white p-5 shadow-[0_1px_3px_rgba(16,24,40,0.04)] sm:p-6"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F3F6FF]">
                    <Icon className="h-5 w-5 text-[#0A50EC]" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-[#252932]">
                      <span className="mr-2 text-[#9AA4B8] tabular-nums">
                        {index + 1}.
                      </span>
                      {title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#424959] sm:text-[15px]">
                      {body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* The insurance position. Stated plainly, after the confirmation
              rather than before it, and without implying a decision has been
              made about this specific patient's benefits. */}
          <div className="mt-8 rounded-2xl border border-[#DCE4F2] bg-[#F8FAFF] p-6 sm:p-7">
            <div className="flex items-start gap-3">
              <ShieldCheck
                className="mt-0.5 h-5 w-5 shrink-0 text-[#0A50EC]"
                aria-hidden="true"
              />
              <div className="min-w-0">
                <h2 className="font-semibold text-[#252932]">
                  About the plan you selected
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#424959] sm:text-[15px]">
                  Mountain Spine &amp; Orthopedics is a PPO practice. The plan you
                  chose sits outside the plans we participate in directly, so our
                  team will go over your options with you before anything is
                  scheduled — rather than booking you in and surprising you at the
                  front desk.
                </p>
                <Link
                  href="/insurance-policy"
                  className="group mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#0A50EC] underline-offset-4 hover:underline"
                >
                  See exactly which plans we accept
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* Call CTA. Full-width and thumb-reachable on mobile; the phone number
              is the fastest resolution for exactly this patient. */}
          <div className="mt-8 rounded-2xl bg-[#0A50EC] px-6 py-7 text-center sm:px-8 sm:py-8">
            <h2 className="text-lg font-semibold text-white sm:text-xl">
              Would rather not wait for the call?
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-white/80">
              Our team can check your plan and talk through pricing on the phone
              right now.
            </p>
            <a
              href={MAIN_PHONE_HREF}
              className="mt-5 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-white px-7 text-base font-semibold text-[#0A50EC] shadow-sm transition-[transform,box-shadow] duration-200 hover:shadow-md active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call {MAIN_PHONE_DISPLAY}
            </a>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-white/70">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              Monday to Friday, 8am – 5pm
            </p>
          </div>

          <p className="mt-8 text-center text-xs leading-relaxed text-[#6B7280]">
            Nothing on this page confirms or denies coverage under your specific
            plan. Benefits, deductibles and authorisation requirements vary, and
            our team will confirm the details with you directly.
          </p>

        </div>
      </div>
    </div>
  );
}
