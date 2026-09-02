"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BookAnAppoitmentButton from "@/components/BookAnAppoitmentButton"
import InjuryDoctorsSection from "@/components/InjuryDoctorsSection.client"
import InjuryUrgencyBanner from "@/components/InjuryUrgencyBanner"
import InjuryClinicFinder from "@/components/InjuryClinicFinder"
import InjuryInsuranceCoverage from "@/components/InjuryInsuranceCoverage"
import InjuryHotspots from "@/components/InjuryHotspots"
import InjuryAttorneyPanel from "@/components/InjuryAttorneyPanel"
import { Star, Shield, Clock, MapPin, Phone, AlertTriangle, CheckCircle, Award, Stethoscope } from "lucide-react"
import { PersonalInjuryLeadCaptureForm } from "./lead-capture-form"
import InjuriesCarousel from "@/components/InjuriesCarousel"
import RatingsAndReviews from "@/components/RatingsAndReviews"
// CondensedLocations replaced by InjuryClinicFinder
import { clinicsForMap as clinics } from "@/components/data/clinicsForMap.generated"
import { motion } from "framer-motion"
import Image from "next/image"

const siteData = {
  starRating: AVERAGE_RATING,
  reviewCount: TOTAL_REVIEW_COUNT,
  citiesPill: "FL • NJ • NY • PA",
  injuries: [
    {
      title: "Neck pain / whiplash",
      slug: "neck-whiplash",
      blurb: "Neck stiffness, headaches, or radiating pain after a crash.",
      link: "/conditions/whiplash-neck-strain",
    },
    {
      title: "Back pain after accident",
      slug: "back-accident",
      blurb: "New mid or low-back pain after a collision or fall.",
      link: "/conditions/lumbar-strain",
    },
    {
      title: "Shoulder injury",
      slug: "shoulder-injury",
      blurb: "Pain, catching, or weakness after bracing or impact.",
      link: "/conditions/shoulder-dislocation-rotator-cuff",
    },
    {
      title: "Knee injury",
      slug: "knee-injury",
      blurb: "Twisting injury, swelling, or locking after a fall or crash.",
      link: "/conditions/knee-meniscus-tear",
    },
    {
      title: "Wrist/hand fracture or sprain",
      slug: "wrist-hand",
      blurb: "Pain or swelling after catching yourself during a fall.",
      link: "/conditions/wrist-fracture",
    },
    {
      title: "Hip injury",
      slug: "hip-injury",
      blurb: "Groin or hip pain after impact or side collision.",
      link: "/conditions/hip-fracture",
    },
    {
      title: "Ankle/foot sprain or fracture",
      slug: "ankle-foot",
      blurb: "Twisting, rolling, or direct impact injuries.",
      link: "/conditions/ankle-sprain",
    },
    {
      title: "Spinal disc or nerve injury",
      slug: "spine-injury",
      blurb: "Radiating arm or leg pain, numbness, or weakness.",
      link: "/conditions/herniated-disc-sciatica",
    },
  ],
}

import type { DoctorProp } from "@/components/data/doctors"
import { AVERAGE_RATING, TOTAL_REVIEW_COUNT } from "@/components/data/reviewAggregate.generated"
import type { SocialProofReview } from "@/components/data/socialProofReviews"

interface PersonalInjuryClientProps {
  faqs: Array<{ q: string; a: string }>
  doctors: DoctorProp[]
  reviews: SocialProofReview[]
}

export default function PersonalInjuryClient({ faqs, doctors, reviews }: PersonalInjuryClientProps) {
  return (
    <main className="w-full flex flex-col items-center justify-center bg-white h-full">
      {/* Hero Section */}
      <section className="w-full h-full sm:py-26 py-10 flex flex-col relative overflow-hidden [mask-composite:intersect] [mask-image:linear-gradient(to_top,transparent,black_6rem)]">
        <div
          style={{
            filter: 'blur(30px)'
          }}
          className="w-full h-[120px] absolute top-0 z-[1]"
        />
        <Image
          src={'/herosectionimg.jpg'}
          priority={true}
          fetchPriority="high"
          layout='fill'
          className="h-full absolute top-0 object-cover object-center md:object-center w-full"
          alt="Personal injury orthopedic care specialist evaluating patient"
        />
        <div
          className="lg:w-[100%] z-[1] h-full absolute left-0 top-0 md:w-[100%] w-full"
          style={{
            background: 'linear-gradient(180deg, rgba(10, 80, 236, 0.20) 0%, rgba(255, 255, 255, 0.20) 100%)',
          }}
        />
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-[60px] z-10 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4 mt-10">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Personal Injury & Accident
                </Badge>

                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 text-balance">
                  Personal Injury Orthopedic Care in FL, NJ, NY, PA & GA
                </h1>

                <p className="text-xl text-gray-600 text-pretty">
                  Same-week evaluation and treatment for spine, joint, and extremity injuries from car accidents, slip-and-fall
                  events, and other personal injuries. We coordinate with your care team so you can focus on recovery.
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.div whileHover={{ scale: 1.02 }}>
                  <BookAnAppoitmentButton bordered className="h-10" />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.4 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>We work with personal injury patients and their teams</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{siteData.starRating}</span>
                    <span>({siteData.reviewCount}+)</span>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-500">
                  <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>{siteData.citiesPill}</span>
                </div>
              </motion.div>
            </div>
            <div className="lg:pl-8">
              <PersonalInjuryLeadCaptureForm />
            </div>
          </div>
        </div>
      </section>

      <InjuryUrgencyBanner injuryType="personal-injury" />

      {/* Trust Indicators */}
      <section
        className="w-full max-w-[1440px] flex flex-col sm:py-[50px] py-10 h-full px-2 md:px-[40px]"
        data-section="trust-indicators"
      >
        <div className="w-full">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-gray-900">Board Certified</h3>
              <p className="text-gray-600">Orthopedic and spine specialists for accident-related injuries</p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-gray-900">Same-Week Care</h3>
              <p className="text-gray-600">Urgent appointments available for new personal injuries</p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Stethoscope className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-gray-900">Documentation Ready</h3>
              <p className="text-gray-600">Clear visit notes and imaging reports for your records</p>
            </div>
          </div>
        </div>
      </section>

      {/* Common Personal Injuries */}
      <section
        className="w-full max-w-[1440px] flex flex-col sm:py-[50px] py-10 h-full px-2 md:px-[40px]"
        data-section="common-injuries"
      >
        <div className="w-full">
          <div className="text-center mb-12">
            <h2
              style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500 }}
              className="text-[#111315] text-3xl md:text-5xl mb-4 text-balance"
            >
              Common Personal Injuries We Treat
            </h2>
            <p
              style={{ fontFamily: "var(--font-inter)", fontWeight: 400 }}
              className="text-[#424959] text-lg max-w-2xl mx-auto text-pretty"
            >
              From car crashes to slip-and-fall events, our team treats the spine, joints, and extremities most commonly
              affected in personal injury cases.
            </p>
          </div>
          <InjuriesCarousel injuries={siteData.injuries} />
        </div>
      </section>

      {/* Treatment Approach */}
      <section
        className="w-full max-w-[1440px] flex flex-col sm:py-[50px] py-10 h-full px-2 md:px-[40px]"
        data-section="treatment-approach"
      >
        <div className="w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-balance sm:text-start text-center">
                Our Personal Injury Treatment Approach
              </h2>

              <Tabs defaultValue="evaluation" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="evaluation">Evaluation</TabsTrigger>
                  <TabsTrigger value="treatment">Treatment</TabsTrigger>
                  <TabsTrigger value="recovery">Recovery</TabsTrigger>
                </TabsList>

                <TabsContent value="evaluation" className="space-y-4">
                  <div className="space-y-4 mt-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Immediate Assessment</h4>
                        <p className="text-gray-600">Focused history, exam, and neurologic check after your injury</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Imaging When Needed</h4>
                        <p className="text-gray-600">X-ray, MRI, or CT when findings suggest it will change your plan</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Clear Diagnosis</h4>
                        <p className="text-gray-600">Plain-language explanation of what is injured and what comes next</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="treatment" className="space-y-4">
                  <div className="space-y-4 mt-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Conservative First</h4>
                        <p className="text-gray-600">Non-surgical options when safe and appropriate for your injury</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Pain Management</h4>
                        <p className="text-gray-600">Targeted medications, injections, and bracing as needed</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Surgery When Indicated</h4>
                        <p className="text-gray-600">Minimally invasive options only when clearly necessary</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="recovery" className="space-y-4">
                  <div className="space-y-4 mt-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Return-to-Activity Guidance</h4>
                        <p className="text-gray-600">Stepwise plan for driving, work, and daily activities</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Ongoing Coordination</h4>
                        <p className="text-gray-600">We share records with your authorized legal or medical team</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Prevention Tips</h4>
                        <p className="text-gray-600">Education to protect your spine and joints going forward</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              <Card className="medical-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Award className="w-6 h-6 text-[#0A50EC]" />
                    <h3 className="font-semibold text-gray-900">Quality Commitment</h3>
                  </div>
                  <p className="text-gray-600">
                    Our evidence-based protocols focus on accurate diagnosis, clear communication, and safe recovery for
                    personal injury patients across FL, NJ, NY, PA & GA.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <InjuryInsuranceCoverage injuryType="personal-injury" />

      {/* Clinic Finder */}
      <InjuryClinicFinder />

      <InjuryHotspots injuryType="personal-injury" />

      {/* Meet Our Experts */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:py-16 py-8">
        <InjuryDoctorsSection doctors={doctors} />
      </div>

      {/* FAQ Section */}
      <section
        className="w-full max-w-[1440px] flex flex-col sm:py-[50px] py-10 h-full px-2 md:px-[40px]"
        data-section="faq"
      >
        <div className="w-full max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-balance">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 text-pretty">
              Get answers to common questions about personal injury orthopedic care.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg medical-shadow">
                <AccordionTrigger className="px-6 py-4 text-left font-medium">{faq.q}</AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <InjuryAttorneyPanel showAttorneyPanel={true} />

      {/* Final CTA */}
      <section
        className="w-full flex flex-col sm:py-[50px] py-10 h-full px-2 md:px-[40px] bg-primary text-white"
        data-section="final-cta"
      >
        <div className="w-full max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-balance">Don&apos;t Wait — Get Expert Care Today</h2>
          <p className="text-xl mb-8 text-blue-100 text-pretty">
            Accident and personal injuries can worsen without proper treatment. Schedule your evaluation with Mountain Spine
            & Orthopedics across FL, NJ, NY, PA & GA.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary bg-transparent"
              asChild
              data-cta="final-call"
            >
              <a href="tel:+15612239959">
                <Phone className="w-5 h-5 mr-2" />
                Call (561) 223-9959
              </a>
            </Button>
          </div>
        </div>
      </section>

      <RatingsAndReviews reviews={reviews} />
    </main>
  )
}

