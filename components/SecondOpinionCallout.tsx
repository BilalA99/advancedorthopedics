import Link from "next/link";

/**
 * Free Second Opinion callout.
 *
 * Server-rendered on purpose: this is the message-match element for paid search
 * ads whose headlines lead with the second-opinion offer, so it must exist in
 * the initial HTML for both crawlers and users on slow connections, and must
 * not depend on animation or hydration to become readable.
 *
 * Scope is copied from the canonical offer on /find-care/second-opinion —
 * a board-certified orthopedic surgeon reviews uploaded imaging within 24
 * hours at no cost. Deliberately makes no claim about candidacy, outcome, or
 * treatment: a second opinion is a review, not a promise of surgery or relief.
 */
export default function SecondOpinionCallout({
  cityName,
  className = "",
}: {
  cityName?: string;
  className?: string;
}) {
  return (
    <aside
      aria-labelledby="second-opinion-heading"
      className={`rounded-2xl border border-[#0A50EC]/20 bg-[#0A50EC]/[0.04] px-5 py-4 sm:px-6 sm:py-5 ${className}`}
    >
      <p
        id="second-opinion-heading"
        style={{ fontFamily: "var(--font-public-sans)", fontWeight: 600 }}
        className="text-[#252932] text-base sm:text-lg"
      >
        Free second opinion{cityName ? ` for ${cityName} patients` : ""}
      </p>
      <p className="mt-1.5 text-sm sm:text-base leading-relaxed text-[#424959]">
        Already have an MRI or X-ray? Upload it and a board-certified orthopedic
        surgeon will review your imaging and send you a second opinion within 24
        hours — 100% free, with no obligation to book treatment.
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
        <Link
          href="/find-care/second-opinion"
          className="inline-flex min-h-[44px] items-center rounded-full bg-[#0A50EC] px-5 text-sm sm:text-base font-medium text-white transition-colors hover:bg-[#0942c4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A50EC]"
        >
          Get a free second opinion
        </Link>
        <Link
          href="/find-care/free-mri-review"
          className="inline-flex min-h-[44px] items-center text-sm sm:text-base font-medium text-[#0A50EC] underline underline-offset-4 hover:text-[#0942c4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A50EC]"
        >
          Or start with a free MRI review
        </Link>
      </div>
    </aside>
  );
}
