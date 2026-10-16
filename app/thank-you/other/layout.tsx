import type { Metadata } from "next";
import { buildCanonical, safeTitle, safeDescription } from "@/lib/seo";

/**
 * Non-qualified confirmation page (D10, 2026-09-24).
 *
 * Reached when a patient selects an insurance option outside the practice's
 * accepted set. It is a genuine confirmation — the lead was received, persisted
 * and emailed to the clinic — but it deliberately sits outside the qualified
 * conversion path.
 *
 * `noindex, nofollow` matches /thank-you: confirmation pages must never appear
 * in search results.
 */

const TITLE = "Request Received | Mountain Spine & Orthopedics";
const DESCRIPTION =
  "We received your request. A member of our team will contact you to discuss your options and what care we can provide.";

export const metadata: Metadata = {
  title: safeTitle(undefined, TITLE),
  description: safeDescription(undefined, DESCRIPTION),
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: buildCanonical("/thank-you/other"),
  },
  openGraph: {
    title: safeTitle(undefined, TITLE),
    description: safeDescription(undefined, DESCRIPTION),
    url: buildCanonical("/thank-you/other"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: safeTitle(undefined, TITLE),
    description: safeDescription(undefined, DESCRIPTION),
  },
};

export default function ThankYouOtherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
