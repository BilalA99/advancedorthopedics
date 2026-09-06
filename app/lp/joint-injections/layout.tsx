import type { Metadata } from "next";

/**
 * Paid-search landing page for the knee / shoulder / hip injection ad groups.
 *
 * Same indexation contract as the other /lp pages: `noindex, follow`
 * (organic authority stays on the treatment and condition pages),
 * self-referencing canonical (never the homepage default, never an indexable
 * page), absent from the opt-in sitemap list.
 */
export const metadata: Metadata = {
  alternates: {
    canonical: "https://mountainspineorthopedics.com/lp/joint-injections",
  },
  title: "Knee, Shoulder & Hip Injections | Mountain Spine & Orthopedics",
  description:
    "Get evaluated for image-guided knee, shoulder, and hip injections for arthritis, bursitis, and joint pain. Board-certified orthopedic physicians. PPO accepted.",
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: { index: false, follow: true },
  },
};

export default function PaidJointInjectionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
