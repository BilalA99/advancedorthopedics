import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Reem_Kufi, Inter, Public_Sans } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import SkipLinks from "@/components/SkipLinks";
import MotionPreferences from "@/components/MotionPreferences";
import Footer from "@/components/Footer";
import { MapProvider } from "@/providers/map-provider";
import { GeolocationProvider } from "@/providers/geolocationcontext";
import { DelayedLocationPopup } from "@/components/delayedlocationpopup";
import Script from "next/script";
import TanstackProvider from "@/providers/tanstack";
import GclidCapture from "@/components/GclidCapture";
import CookieConsentManager from "@/components/CookieConsentManager";
import { buildCanonical, SITE_URL, canonicalForOg } from "@/lib/seo";
import { getOgImageForPath } from "@/lib/og";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
  colorScheme: "light dark",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const ReemKufi = Reem_Kufi({
  variable: "--font-reem-kufi",
  weight: ["500"],
  subsets: ["latin"],
  display: "swap",
});

const publicSans = Public_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-public-sans",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const url = buildCanonical('/');
  const ogImage = getOgImageForPath('/');

  return {
    metadataBase: new URL(SITE_URL),
    title: "Mountain Spine & Orthopedics",
    description: "Multistate experts in spine and joint care across FL, NJ, NY, and PA. Book today.",
    openGraph: {
      title: "Mountain Spine & Orthopedics",
      description: "Multistate experts in spine and joint care across FL, NJ, NY, and PA. Book today.",
      url: canonicalForOg('/'),
      siteName: "Mountain Spine & Orthopedics",
      type: "website",
      locale: "en_US",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Mountain Spine & Orthopedics",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Mountain Spine & Orthopedics",
      description: "Multistate experts in spine and joint care across FL, NJ, NY, and PA. Book today.",
      images: [ogImage],
    },
    alternates: {
      canonical: url,
      languages: {
        'en-US': url,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://mountainspineorthopedics.com#website",
    "url": "https://mountainspineorthopedics.com/",
    "name": "Mountain Spine & Orthopedics",
    "description": "Multistate experts in spine and joint care across FL, NJ, NY, and PA. Board-certified orthopedic surgeons specializing in minimally invasive spine surgery, joint replacement, and sports medicine.",
    "publisher": {
      "@id": "https://mountainspineorthopedics.com#medicalorganization"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://mountainspineorthopedics.com/blogs?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  const medicalOrgSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    "@id": "https://mountainspineorthopedics.com#medicalorganization",
    "name": "Mountain Spine & Orthopedics",
    "url": "https://mountainspineorthopedics.com",
    "logo": {
      "@type": "ImageObject",
      "@id": "https://mountainspineorthopedics.com#logo",
      "url": "https://mountainspineorthopedics.com/newlogo4.png",
      "width": 300,
      "height": 60,
      "caption": "Mountain Spine & Orthopedics Logo"
    },
    "image": "https://mountainspineorthopedics.com/newlogo4.png",
    "description": "Mountain Spine & Orthopedics provides expert orthopedic care across FL, NJ, NY, and PA, specializing in spine surgery, joint replacement, and minimally invasive procedures.",
    "medicalSpecialty": [
      "Orthopedic Surgery",
      "Spine Surgery",
      "Minimally Invasive Surgery",
      "Joint Replacement",
      "Sports Medicine",
      "Pain Management"
    ],
    "address": [
      {
        "@type": "PostalAddress",
        "addressRegion": "FL",
        "addressCountry": "US"
      },
      {
        "@type": "PostalAddress",
        "addressRegion": "NJ",
        "addressCountry": "US"
      },
      {
        "@type": "PostalAddress",
        "addressRegion": "NY",
        "addressCountry": "US"
      },
      {
        "@type": "PostalAddress",
        "addressRegion": "PA",
        "addressCountry": "US"
      }
    ],
    "telephone": "+1-561-223-9959",
    "email": "info@mountainspineorthopedics.com",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-561-223-9959",
      "contactType": "customer service",
      "availableLanguage": ["English", "Spanish"],
      "areaServed": "US"
    },
    "areaServed": [
      {
        "@type": "State",
        "name": "Florida",
        "sameAs": "https://en.wikipedia.org/wiki/Florida"
      },
      {
        "@type": "State",
        "name": "New Jersey",
        "sameAs": "https://en.wikipedia.org/wiki/New_Jersey"
      },
      {
        "@type": "State",
        "name": "New York",
        "sameAs": "https://en.wikipedia.org/wiki/New_York_(state)"
      },
      {
        "@type": "State",
        "name": "Pennsylvania",
        "sameAs": "https://en.wikipedia.org/wiki/Pennsylvania"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/mountainspineorthopedics",
      "https://www.linkedin.com/company/mountain-spine-orthopedics"
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to CDN for performance */}
        <link rel="preconnect" href="https://mountainspineortho.b-cdn.net" crossOrigin="" />
        {/* Favicons and icons for SEO and device support */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <Script id="google-consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){ window.dataLayer.push(arguments); }
            window.gtag = window.gtag || gtag;
            gtag('consent', 'default', {
              ad_storage: 'denied',
              analytics_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              functionality_storage: 'denied',
              personalization_storage: 'denied',
              security_storage: 'granted'
            });
          `}
        </Script>
        {/* Google Tag Manager */}
        <Script id="gtm-head" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-T57SB8NQ');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${ReemKufi.variable} ${inter.variable} ${publicSans.variable} antialiased  overscroll-none `}
        suppressHydrationWarning
      >
        <SkipLinks />
        {/* WebSite Schema for Search Functionality */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {/* MedicalOrganization Schema for Homepage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalOrgSchema) }}
        />
        <GclidCapture />
        <CookieConsentManager />
        <MotionPreferences>
          <TanstackProvider>
            <NavBar />
            <MapProvider>
              <GeolocationProvider>
                <div id="main-content" tabIndex={-1}>
                  {children}
                </div>
                <Footer />
                <DelayedLocationPopup delayInSeconds={8} />
              </GeolocationProvider>
            </MapProvider>
          </TanstackProvider>
        </MotionPreferences>
      </body>
    </html>
  );
}


// Base Colors
// Main: #0A50EC
// Secondary: #FFFF
// Third: #252932
