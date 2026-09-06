import type { Metadata } from "next";

/**
 * Paid-search landing page for the cortisone / general injection ad groups —
 * the broadest-intent page of the three: searchers who know they want "a
 * cortisone shot" but not which structure needs it.
 *
 * Same indexation contract as the other /lp pages: `noindex, follow`,
 * self-referencing canonical, absent from the opt-in sitemap list.
 */
export const metadata: Metadata = {
  alternates: {
    canonical: "https://mountainspineorthopedics.com/lp/cortisone-injections",
  },
  title: "Cortisone Injections | Mountain Spine & Orthopedics",
  description:
    "Get evaluated for cortisone injections for back, neck, and joint pain. Board-certified orthopedic physicians place injections where your evaluation shows they will help. PPO accepted.",
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: { index: false, follow: true },
  },
};

export default function PaidCortisoneInjectionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
