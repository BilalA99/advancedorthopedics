import type { Metadata } from "next";
import { buildCanonical, safeTitle, safeDescription } from "@/lib/seo";

export const metadata: Metadata = {
  title: safeTitle(undefined, "Insurance Policy | Mountain Spine & Orthopedics"),
  description: safeDescription(undefined, "Learn about insurance coverage and payment options at Mountain Spine & Orthopedics. We accept most major insurance plans and offer flexible payment solutions."),
  robots: { index: true, follow: true },
  alternates: {
    canonical: buildCanonical("/insurance-policy"),
  },
  openGraph: {
    title: safeTitle(undefined, "Insurance Policy | Mountain Spine & Orthopedics"),
    description: safeDescription(undefined, "Learn about insurance coverage and payment options at Mountain Spine & Orthopedics. We accept most major insurance plans and offer flexible payment solutions."),
    url: buildCanonical("/insurance-policy"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: safeTitle(undefined, "Insurance Policy | Mountain Spine & Orthopedics"),
    description: safeDescription(undefined, "Learn about insurance coverage and payment options at Mountain Spine & Orthopedics. We accept most major insurance plans and offer flexible payment solutions."),
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
