import type { Metadata } from "next";
import { buildCanonical } from "@/lib/seo";
import { getOgImageForPath } from "@/lib/og";

export const metadata: Metadata = {
  title: 'Get a Second Opinion From Spine Experts | Mountain Spine & Orthopedics',
  description: 'Get a second opinion on recommended spine surgery from Mountain Spine & Orthopedics. Free for patients with PPO private insurance. No referral needed.',
  robots: { index: true, follow: true },
  alternates: {
    canonical: buildCanonical('/find-care/second-opinion')
  },
  openGraph: {
    title: 'Get a Second Opinion From Spine Experts | Mountain Spine & Orthopedics',
    description: 'Get a second opinion on recommended spine surgery from Mountain Spine & Orthopedics. Free for patients with PPO private insurance. No referral needed.',
    url: buildCanonical('/find-care/second-opinion'),
    siteName: 'Mountain Spine & Orthopedics',
    type: 'website',
    images: [
      {
        url: getOgImageForPath('/find-care/second-opinion'),
        width: 1200,
        height: 630,
        alt: 'Get a Second Opinion from Mountain Spine & Orthopedics',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Get a Second Opinion From Spine Experts | Mountain Spine & Orthopedics',
    description: 'Get a second opinion on recommended spine surgery from Mountain Spine & Orthopedics. Free for patients with PPO private insurance. No referral needed.',
    images: [getOgImageForPath('/find-care/second-opinion')],
  },
};

export default function SecondOpinionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
} 
