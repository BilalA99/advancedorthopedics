import type { Metadata } from "next";
import { buildCanonical, safeTitle, safeDescription } from "@/lib/seo";

export const metadata: Metadata = {
  title: safeTitle(undefined, "Free MRI Review | Mountain Spine & Orthopedics"),
  description: safeDescription(undefined, "Get a free MRI review from our orthopedic specialists at Mountain Spine & Orthopedics. Expert analysis of your imaging studies and treatment recommendations."),
  robots: { index: true, follow: true },
  alternates: {
    canonical: buildCanonical("/find-care/free-mri-review"),
  },
  openGraph: {
    title: safeTitle(undefined, "Free MRI Review | Mountain Spine & Orthopedics"),
    description: safeDescription(undefined, "Get a free MRI review from our orthopedic specialists at Mountain Spine & Orthopedics. Expert analysis of your imaging studies and treatment recommendations."),
    url: buildCanonical("/find-care/free-mri-review"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: safeTitle(undefined, "Free MRI Review | Mountain Spine & Orthopedics"),
    description: safeDescription(undefined, "Get a free MRI review from our orthopedic specialists at Mountain Spine & Orthopedics. Expert analysis of your imaging studies and treatment recommendations."),
  },
};

export default function FreeMRIReviewLayout({
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
