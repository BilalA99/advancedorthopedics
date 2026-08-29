import type { Metadata } from "next";
import { buildCanonical, safeTitle, safeDescription } from "@/lib/seo";

export const metadata: Metadata = {
  title: safeTitle(undefined, "Find a Doctor | Mountain Spine & Orthopedics"),
  description: safeDescription(undefined, "Find board-certified orthopedic surgeons and spine specialists at Mountain Spine & Orthopedics. Expert care across our locations in Florida, New Jersey, New York, and Pennsylvania."),
  robots: { index: true, follow: true },
  alternates: {
    canonical: buildCanonical("/find-care/find-a-doctor"),
  },
  openGraph: {
    title: safeTitle(undefined, "Find a Doctor | Mountain Spine & Orthopedics"),
    description: safeDescription(undefined, "Find board-certified orthopedic surgeons and spine specialists at Mountain Spine & Orthopedics. Expert care across our locations in Florida, New Jersey, New York, and Pennsylvania."),
    url: buildCanonical("/find-care/find-a-doctor"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: safeTitle(undefined, "Find a Doctor | Mountain Spine & Orthopedics"),
    description: safeDescription(undefined, "Find board-certified orthopedic surgeons and spine specialists at Mountain Spine & Orthopedics. Expert care across our locations in Florida, New Jersey, New York, and Pennsylvania."),
  },
};

export default function FindADoctorLayout({
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
