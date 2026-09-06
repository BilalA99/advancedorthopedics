import type { Metadata } from "next";

/**
 * Paid-search landing page for the spine & back injection ad groups.
 *
 * Same indexation contract as /lp/adult-scoliosis-treatment, for the same
 * reasons: `noindex, follow` because the organic authority for this intent is
 * /treatments/epidural-steroid-injection and its siblings, and an indexable
 * paid variant would split it; self-referencing canonical because pointing a
 * noindex URL's canonical at an indexable page sends contradictory signals,
 * and inheriting the root default (the homepage) is worse than either; absent
 * from app/sitemap.xml/route.ts because that list is opt-in.
 */
export const metadata: Metadata = {
  alternates: {
    canonical: "https://mountainspineorthopedics.com/lp/spine-injections",
  },
  title: "Spine & Back Pain Injections | Mountain Spine & Orthopedics",
  description:
    "Get evaluated for epidural steroid injections, facet joint injections, SI joint injections, and nerve blocks for back and leg pain. Board-certified physicians. PPO accepted.",
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: { index: false, follow: true },
  },
};

export default function PaidSpineInjectionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
