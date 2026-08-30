import Link from "next/link";
import { CONTACT_INFO } from "@/lib/contact-routing";

type Variant = "spine" | "joint" | "injection" | "second-opinion" | "general";

const VARIANTS: Record<Variant, { heading: string; body: string; primary: { href: string; label: string }; secondary: { href: string; label: string } }> = {
  spine: {
    heading: "Still dealing with back or neck pain?",
    body: "A board-certified spine specialist can review your symptoms and imaging and talk through the options — including the non-surgical ones.",
    primary: { href: "/find-care/book-an-appointment", label: "Request an appointment" },
    secondary: { href: "/conditions/spine", label: "Browse spine conditions" },
  },
  joint: {
    heading: "Joint pain that isn't improving?",
    body: "An orthopedic specialist can assess the joint, explain what is causing the pain, and outline treatment options from activity changes through to surgery.",
    primary: { href: "/find-care/book-an-appointment", label: "Request an appointment" },
    secondary: { href: "/conditions", label: "Browse related conditions" },
  },
  injection: {
    heading: "Considering an injection for pain relief?",
    body: "Whether an injection is appropriate depends on your diagnosis and history. A specialist can tell you if you are a candidate and what to expect.",
    primary: { href: "/find-care/book-an-appointment", label: "Request an appointment" },
    secondary: { href: "/treatments/orthopedic-injections", label: "Read about orthopedic injections" },
  },
  "second-opinion": {
    heading: "Been told you need surgery?",
    body: "Carry a PPO plan? Upload your MRI or X-ray and a board-certified orthopedic surgeon will send you a second opinion within 24 hours — 100% free, with no obligation to book treatment.",
    primary: { href: "/find-care/second-opinion", label: "Get a free second opinion" },
    secondary: { href: "/find-care/free-mri-review", label: "Start with a free MRI review" },
  },
  general: {
    heading: "Want this looked at by a specialist?",
    body: "Our board-certified orthopedic and spine specialists can evaluate your symptoms and walk you through the options that fit your situation.",
    primary: { href: "/find-care/book-an-appointment", label: "Request an appointment" },
    secondary: { href: "/find-care/find-a-doctor", label: "Find a doctor near you" },
  },
};

/**
 * Reusable, context-aware conversion module for blog articles.
 *
 * Server-rendered and placed after the article body rather than above it: the
 * medical content is the reason the reader is here, and an offer over the first
 * screen would compete with it. No overlay, no sticky element, nothing that
 * moves — it reads as the article's natural next step.
 *
 * Variant is inferred from the post's own tags so the offer matches what the
 * reader was just reading about. Copy makes no claim about candidacy, outcome
 * or recovery; the second-opinion wording is taken from the canonical offer on
 * /find-care/second-opinion.
 *
 * The data-cta-* attributes exist so GTM can attribute clicks by variant and
 * placement without any PII and without shipping a client component.
 */
export function resolveBlogVariant(tags: string[] = []): Variant {
  const t = tags.join(" ").toLowerCase();
  if (/inject|cortisone|epidural|steroid/.test(t)) return "injection";
  if (/second opinion|surgery|surgical|fusion|discectomy/.test(t)) return "second-opinion";
  if (/back|neck|spine|disc|sciatica|stenosis|scoliosis/.test(t)) return "spine";
  if (/knee|hip|shoulder|joint|ankle|elbow|wrist|hand|foot/.test(t)) return "joint";
  return "general";
}

export default function BlogConversionModule({
  tags = [],
  placement = "article-end",
}: {
  tags?: string[];
  placement?: string;
}) {
  const variant = resolveBlogVariant(tags);
  const v = VARIANTS[variant];
  const fl = CONTACT_INFO.fl;

  return (
    <aside
      aria-labelledby="blog-cta-heading"
      data-cta-module="blog-conversion"
      data-cta-variant={variant}
      data-cta-placement={placement}
      className="not-prose rounded-2xl border border-[#0A50EC]/20 bg-[#0A50EC]/[0.04] px-5 py-5 sm:px-7 sm:py-6"
    >
      <h2
        id="blog-cta-heading"
        style={{ fontFamily: "var(--font-public-sans)", fontWeight: 600 }}
        className="text-[#252932] text-lg sm:text-xl"
      >
        {v.heading}
      </h2>
      <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#424959]">{v.body}</p>

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
        <Link
          href={v.primary.href}
          data-cta-action="primary"
          className="inline-flex min-h-[44px] items-center rounded-full bg-[#0A50EC] px-5 text-sm sm:text-base font-medium text-white transition-colors hover:bg-[#0942c4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A50EC]"
        >
          {v.primary.label}
        </Link>
        <Link
          href={v.secondary.href}
          data-cta-action="secondary"
          className="inline-flex min-h-[44px] items-center text-sm sm:text-base font-medium text-[#0A50EC] underline underline-offset-4 hover:text-[#0942c4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A50EC]"
        >
          {v.secondary.label}
        </Link>
        <a
          href={fl.phoneHref}
          data-cta-action="call"
          className="inline-flex min-h-[44px] items-center text-sm sm:text-base text-[#424959] hover:text-[#252932] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A50EC]"
        >
          or call {fl.phoneDisplay}
        </a>
      </div>
    </aside>
  );
}
