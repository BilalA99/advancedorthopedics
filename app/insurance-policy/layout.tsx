import type { Metadata } from "next";
import { buildCanonical, safeTitle, safeDescription } from "@/lib/seo";

export const metadata: Metadata = {
  title: safeTitle(undefined, "PPO Insurance Accepted | Mountain Spine & Orthopedics"),
  description: safeDescription(undefined, "Mountain Spine & Orthopedics is a PPO practice. We accept PPO plans from Aetna, Blue Cross Blue Shield, Cigna, UnitedHealthcare and more — no referral needed. HMO plans are not accepted."),
  robots: { index: true, follow: true },
  alternates: {
    canonical: buildCanonical("/insurance-policy"),
  },
  openGraph: {
    title: safeTitle(undefined, "PPO Insurance Accepted | Mountain Spine & Orthopedics"),
    description: safeDescription(undefined, "Mountain Spine & Orthopedics is a PPO practice. We accept PPO plans from Aetna, Blue Cross Blue Shield, Cigna, UnitedHealthcare and more — no referral needed. HMO plans are not accepted."),
    url: buildCanonical("/insurance-policy"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: safeTitle(undefined, "PPO Insurance Accepted | Mountain Spine & Orthopedics"),
    description: safeDescription(undefined, "Mountain Spine & Orthopedics is a PPO practice. We accept PPO plans from Aetna, Blue Cross Blue Shield, Cigna, UnitedHealthcare and more — no referral needed. HMO plans are not accepted."),
  },
};

export default function InsurancePolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
