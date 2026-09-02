import type { Metadata } from "next";
import { buildCanonical, safeTitle, safeDescription } from "@/lib/seo";
import { getOgImageForPath } from "@/lib/og";

export const metadata: Metadata = {
  title: safeTitle("About Mountain Spine & Orthopedics | Expert Spine & Joint Care"),
  description: safeDescription("Learn about our board-certified orthopedic specialists, advanced facilities, and commitment to comprehensive spine and joint care across Florida, New Jersey, New York, Pennsylvania, and Georgia."),
  keywords: [
    'about Mountain Spine & Orthopedics',
    'spine experts',
    'orthopedic care team',
    'comprehensive spine surgery',
    'orthopedic doctors',
    'spine specialists',
    'orthopedic credentials',
    'orthopedic team'
  ],
  robots: { index: true, follow: true },
  alternates: {
    canonical: buildCanonical("/about"),
  },
  openGraph: {
    title: safeTitle("About Mountain Spine & Orthopedics | Expert Spine & Joint Care"),
    description: safeDescription("Learn about our board-certified orthopedic specialists, advanced facilities, and commitment to comprehensive spine and joint care across Florida, New Jersey, New York, Pennsylvania, and Georgia."),
    url: buildCanonical("/about"),
    siteName: "Mountain Spine & Orthopedics",
    type: "website",
    images: [
      {
        url: getOgImageForPath("/"),
        width: 1200,
        height: 630,
        alt: "Mountain Spine & Orthopedics team",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: safeTitle("About Mountain Spine & Orthopedics | Expert Spine & Joint Care"),
    description: safeDescription("Learn about our board-certified orthopedic specialists, advanced facilities, and commitment to comprehensive spine and joint care across Florida, New Jersey, New York, Pennsylvania, and Georgia."),
    images: [getOgImageForPath("/")],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
