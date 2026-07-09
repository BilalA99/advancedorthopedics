"use client";

import { useEffect, useState } from 'react';
import { CheckCircle, Mail, Users, Share2, Instagram, Star } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { restoreECFromSession } from "@/utils/enhancedConversions";
import { getReviewLink, getReviewLocations } from "@/lib/reviewLinks";

export default function ThankYouPage() {
  // LOCATION-AWARE REVIEW CTA
  // Priority 1: sessionStorage — set automatically when a patient visits a location page
  //   via ReviewLocationCapture component (key: 'review_location_slug')
  // Priority 2: Dropdown — patient selects their clinic manually if no sessionStorage data
  // The locationSlug values are defined in /components/data/clinics.tsx
  const [resolvedSlug, setResolvedSlug] = useState<string | null>(null);
  const [selectedSlug, setSelectedSlug] = useState<string>('');

  useEffect(() => {
    // Restore enhanced conversion data from sessionStorage immediately
    // This ensures the data is available when Google Ads conversion tags fire
    restoreECFromSession(); // pushes {event:'ec_restore', enhanced_conversion_data:{...}}
  }, []);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('review_location_slug');
      if (stored) setResolvedSlug(stored);
    } catch {
      // fail silently
    }
  }, []);

  const activeSlug = resolvedSlug || selectedSlug || null;
  const reviewLink = activeSlug ? getReviewLink(activeSlug) : null;

  return (
    <div className="lg:py-[80px] py-[40px] w-full bg-gradient-to-br from-blue-50 to-slate-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle className="h-12 w-12 text-[#0A50EC]" />
                <div>
                  <h1 className="text-3xl md:text-5xl font-bold text-[#252932]">Thank You!</h1>
                  <p className="text-lg text-gray-600">Appointment Request Received</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-[#252932] mb-4">
                    Thank you for choosing Mountain Spine and Orthopedics
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    We appreciate your trust in our care and expertise. Your appointment request has been successfully
                    submitted.
                  </p>

                </div>


                <Card className="border-l-[#0A50EC] bg-[#0A50EC]/10">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <Mail className="h-12 w-12 text-[#0A50EC] mt-1" />
                      <div>
                        <h3 className="font-semibold text-[#252932] mb-2">What's Next?</h3>
                        <p className="text-gray-700">
                          Please look out for a confirmation email in your inbox with your appointment details. Our team
                          will contact you ASAP to confirm your appointment time.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* ── Google Review CTA ── */}
                <Card className="border-l-[#0A50EC] bg-[#0A50EC]/10">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <Star className="h-10 w-10 text-[#0A50EC] mt-1 flex-shrink-0" />
                      <div className="flex-1 space-y-3">
                        <div>
                          <h3 className="font-semibold text-[#252932] mb-1">
                            Leave Us a Google Review
                          </h3>
                          <p className="text-gray-700 text-sm">
                            A quick review helps other patients find trusted spine and orthopedic
                            care — and only takes a minute.
                          </p>
                        </div>

                        {/* Auto-resolved from sessionStorage — show confirmation chip */}
                        {resolvedSlug && (
                          <p className="text-xs text-[#0A50EC] font-medium">
                            ✓ Showing review link for your location
                          </p>
                        )}

                        {/* Dropdown — only show if sessionStorage didn't resolve a location */}
                        {!resolvedSlug && (
                          <div>
                            <label
                              htmlFor="review-location-select"
                              className="block text-sm text-gray-600 mb-1"
                            >
                              Select your clinic location:
                            </label>
                            <select
                              id="review-location-select"
                              value={selectedSlug}
                              onChange={(e) => setSelectedSlug(e.target.value)}
                              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#0A50EC] focus:border-transparent"
                            >
                              <option value="">— Choose your location —</option>
                              {getReviewLocations().map(({ locationSlug, region }) => (
                                <option key={locationSlug} value={locationSlug}>
                                  {region}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}

                        {/* Review button — only renders when a valid review link is available */}
                        {reviewLink && (
                          <>
                            <p className="text-xs text-gray-500 italic">
                              Feel free to mention your doctor, the condition you came in for,
                              and how your treatment went.
                            </p>
                            <Button
                              asChild
                              className="bg-[#0A50EC] hover:bg-[#252932] text-white w-full"
                            >
                              <a
                                href={reviewLink}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Leave a Google Review
                              </a>
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-[#252932] bg-[#252932]/10">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <Users className="h-12 w-12 text-[#252932] mt-1" />
                      <div>
                        <h3 className="font-semibold text-[#252932] mb-2">Spread the Word</h3>
                        <p className="text-gray-700 mb-4">
                          If you're satisfied with our service, please refer us to your friends and family. Your
                          referrals help us continue providing excellent orthopedic care to our patients.
                        </p>
                        {/* <Button
                          variant="outline"
                          className="text-[#252932] border-[#252932]/30 hover:bg-[#252932]/10 bg-transparent"
                        >
                          <Share2 className="h-4 w-4 mr-2" />
                          Share with Friends
                        </Button> */}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-[#252932]">Stay Connected</h3>
                  <p className="text-gray-700">
                    Follow us on social media for health tips, updates, and community events.
                  </p>
                  <div className="flex gap-4">
                    <Link
                      href="#"
                      className="flex items-center justify-center w-12 h-12 bg-[#0A50EC] text-white rounded-full hover:bg-[#252932] transition-colors"
                      aria-label="Facebook"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </Link>
                    {/* <Link
                      href="#"
                      className="flex items-center justify-center w-12 h-12 bg-[#0A50EC] text-white rounded-full hover:bg-[#252932] transition-colors"
                      aria-label="Twitter"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </Link> */}
                    <Link
                      href="#"
                      className="flex items-center justify-center w-12 h-12 bg-[#0A50EC] text-white rounded-full hover:bg-[#252932] transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram className="h-6 w-6" />
                    </Link>
                    {/* <Link
                      href="#"
                      className="flex items-center justify-center w-12 h-12 bg-[#0A50EC] text-white rounded-full hover:bg-[#252932] transition-colors"
                      aria-label="LinkedIn"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </Link> */}
                  </div>
                </div>
                <div className="pt-6 border-t border-[#252932]/20">
                  <Button asChild className="bg-[#0A50EC] hover:bg-[#252932]">
                    <Link href="/">Return to Homepage</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Side - Lottie Animation Placeholder */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full hidden sm:block">
                <DotLottieReact src="/DoctorConfirm.lottie" autoplay loop className="w-full h-full" width={600} height={600} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
