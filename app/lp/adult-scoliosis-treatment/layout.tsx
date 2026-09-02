import type { Metadata } from "next";

/**
 * Paid-search landing page for adult / degenerative scoliosis.
 *
 * `noindex, follow` is deliberate and load-bearing. The organic authority for
 * this intent is /conditions/adult-degenerative-scoliosis; an indexable paid
 * variant covering the same ground would split it. `follow` is kept so the
 * links out of this page still pass through to the condition, treatment, and
 * location pages that are meant to rank.
 *
 * The page is also absent from app/sitemap.xml/route.ts, whose static list is
 * explicit — adding routes there is opt-in, so nothing under /lp is advertised.
 * The canonical is self-referencing, and must stay that way. It is NOT pointed
 * at the organic condition page (canonicalising a noindex URL onto an indexable
 * one sends contradictory signals), and it must not be left to inherit the root
 * layout's default, which resolves to the homepage — a far worse signal than
 * either. Ads traffic lands here; crawlers are simply told not to index it.
 */
export const metadata: Metadata = {
  alternates: {
    canonical: "https://mountainspineorthopedics.com/lp/adult-scoliosis-treatment",
  },
  title: "Adult Scoliosis & Degenerative Scoliosis Treatment | Mountain Spine & Orthopedics",
  description:
    "Get evaluated for adult scoliosis, degenerative spinal curvature, and related back or nerve symptoms by Mountain Spine & Orthopedics' board-certified spine surgeons. PPO accepted.",
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: { index: false, follow: true },
  },
};

export default function PaidScoliosisLandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
