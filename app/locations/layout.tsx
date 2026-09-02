import type { Metadata } from "next";
import { buildCanonical, safeTitle, safeDescription } from "@/lib/seo";
import { getOgImageForPath } from "@/lib/og";

export const metadata: Metadata = {
  title: safeTitle(undefined, "Orthopedic Clinic Locations in FL, NJ, NY, PA & GA | Mountain Spine & Orthopedics"),
  description: safeDescription(undefined, "Find Mountain Spine & Orthopedics clinic locations across Florida, New Jersey, New York, Pennsylvania, and Georgia. Convenient orthopedic and spine care near you with expert specialists."),
  robots: { index: true, follow: true },
  alternates: {
    canonical: buildCanonical("/locations"),
  },
  openGraph: {
    title: safeTitle(undefined, "Orthopedic Clinic Locations in FL, NJ, NY, PA & GA | Mountain Spine & Orthopedics"),
    description: safeDescription(undefined, "Find Mountain Spine & Orthopedics clinic locations across Florida, New Jersey, New York, Pennsylvania, and Georgia. Convenient orthopedic and spine care near you with expert specialists."),
    url: buildCanonical("/locations"),
    type: "website",
    images: [
      {
        url: getOgImageForPath("/locations"),
        width: 1200,
        height: 630,
        alt: "Mountain Spine & Orthopedics clinic locations across FL, NJ, NY, PA and GA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: safeTitle(undefined, "Orthopedic Clinic Locations in FL, NJ, NY, PA & GA | Mountain Spine & Orthopedics"),
    description: safeDescription(undefined, "Find Mountain Spine & Orthopedics clinic locations across Florida, New Jersey, New York, Pennsylvania, and Georgia. Convenient orthopedic and spine care near you with expert specialists."),
    images: [getOgImageForPath("/locations")],
  },
};

export default function LocationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
