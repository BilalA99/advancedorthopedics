'use client'

import type { DoctorProp } from "@/components/data/doctors"
import type { SocialProofReview } from "@/components/data/socialProofReviews"
import { AVERAGE_RATING, TOTAL_REVIEW_COUNT } from "@/components/data/reviewAggregate.generated"

interface SlipAndFallClientProps {
    faqs: Array<{ q: string; a: string }>;
    doctors: DoctorProp[];
    reviews: SocialProofReview[];
}
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"
import BookAnAppoitmentButton from "@/components/BookAnAppoitmentButton"
import RatingsAndReviews from "@/components/RatingsAndReviews"
import InjuryDoctorsSection from "@/components/InjuryDoctorsSection.client"
import InjuryUrgencyBanner from "@/components/InjuryUrgencyBanner"
import InjuryClinicFinder from "@/components/InjuryClinicFinder"
import InjuryInsuranceCoverage from "@/components/InjuryInsuranceCoverage"
import InjuryHotspots from "@/components/InjuryHotspots"
import InjuryAttorneyPanel from "@/components/InjuryAttorneyPanel"
import { Star, Shield, Clock, MapPin, Phone, Calendar, AlertTriangle, CheckCircle, Award, FileText, Stethoscope } from "lucide-react"
import { LeadCaptureForm } from "./lead-capture-form"
import InjuriesCarousel from "@/components/InjuriesCarousel"
import insurance1 from '@/public/insurance(1).png'
import insurance2 from '@/public/insurance(2).png'
import insurance3 from '@/public/insurance(3).png'
import insurance4 from '@/public/insurance(4).png'
import insurance5 from '@/public/insurance(5).png'
import insurance6 from '@/public/insurance(6).png'
import insurance7 from '@/public/insurance(7).png'
import insurance8 from '@/public/insurance(8).png'
import { Marquee } from "@/components/magicui/marquee"
import { clinicsForMap as clinics } from "@/components/data/clinicsForMap.generated"
import { motion, AnimatePresence, LazyMotion, domAnimation, useReducedMotion, useInView } from "framer-motion"

// CondensedLocations replaced by InjuryClinicFinder
// export const metadata: Metadata = {
//     title: "Slip and Fall Orthopedic Care in Florida | Mountain Spine & Orthopedics",
//     description:
//         "Expert orthopedic care for slip and fall injuries in Florida. Immediate evaluation, advanced treatment, and comprehensive recovery plans. Same-week appointments available.",
//     keywords: "slip and fall, orthopedic care, Florida, fracture treatment, injury evaluation, emergency orthopedics",
// }

// Data constants
const siteData = {
    starRating: AVERAGE_RATING,
    reviewCount: TOTAL_REVIEW_COUNT,
    insurers: [
        { name: "Aetna", logo: "/logos/aetna.svg" },
        { name: "Cigna", logo: "/logos/cigna.svg" },
        { name: "UnitedHealthcare", logo: "/logos/uhc.svg" },
        { name: "Blue Cross Blue Shield", logo: "/logos/bcbs.svg" },
    ],
    citiesPill: "Altamonte Springs • Hollywood • Davenport • Orlando • West Palm Beach • Hackensack • Newark • Jersey City • New York City • Philadelphia ",
    injuries: [
        {
            title: "Wrist fracture",
            slug: "wrist-fracture",
            blurb: "Pain, swelling, and tenderness after bracing a fall.",
            link: "/conditions/wrist-fracture",
        },
        {
            title: "Ankle sprain",
            slug: "ankle-sprain",
            blurb: "Twist injury with swelling; pain on weight-bearing.",
            link: "/conditions/ankle-sprain",
        },
        {
            title: "Hip fracture concern",
            slug: "hip-fracture",
            blurb: "Groin/hip pain with difficulty standing or walking.",
            link: "/conditions/hip-fracture",
        },
        {
            title: "Shoulder dislocation or cuff tear",
            slug: "shoulder-dislocation-rc",
            blurb: "Sudden shoulder pain, weakness, or catching.",
            link: "/conditions/shoulder-dislocation-rotator-cuff",
        },
        {
            title: "Knee meniscus tear",
            slug: "knee-meniscus-tear",
            blurb: "Knee pain, locking, or swelling after twist.",
            link: "/conditions/knee-meniscus-tear",
        },
        {
            title: "Spinal compression fracture/strain",
            slug: "spine-compression-strain",
            blurb: "Back pain after impact; worse with standing.",
            link: "/conditions/spine-compression-strain",
        },
    ],
    faqs: [
        {
            q: "Do I need imaging now?",
            a: "X-ray first if fracture is suspected; MRI for soft tissue; your exam guides timing.",
        },
        {
            q: "How long does swelling last?",
            a: "Often days to weeks depending on severity; we guide safe progression.",
        },
        {
            q: "When should I start PT?",
            a: "Early guided motion when safe; timing depends on injury and stability. Your surgeon may coordinate with trusted PT specialists if appropriate.",
        },
        {
            q: "When can I drive?",
            a: "When you can brake/steer safely, are off sedating meds, and pain is controlled.",
        },
        {
            q: "Do I need work restrictions?",
            a: "We provide job-specific notes after your exam.",
        },
        {
            q: "How do I prevent another fall?",
            a: "We assess balance/gait and give a home and clinic plan.",
        },
        {
            q: "How do you work with my attorney?",
            a: "With your written consent we share records and scheduling updates promptly.",
        },
    ],
    clinicians: [
        {
            name: "Dr. Elena Reyes, MD",
            sub: "Spine & Trauma",
            bio: "Conservative-first care with clear return-to-activity plans.",
            headshot: "/professional-female-doctor-headshot.png",
        },
        {
            name: "Dr. Michael Chen, MD",
            sub: "Sports Medicine",
            bio: "Advanced arthroscopy and injury prevention specialist.",
            headshot: "/professional-male-doctor.png",
        },
    ],
}
const data = {
    insurers: [
        { name: "Aetna", logo: "/logos/aetna.svg" },
        { name: "Cigna", logo: "/logos/cigna.svg" },
        { name: "UnitedHealthcare", logo: "/logos/uhc.svg" },
        { name: "Blue Cross Blue Shield", logo: "/logos/bcbs.svg" },
    ],
    injuries: [
        {
            title: "Neck strain & whiplash",
            slug: "whiplash-neck-strain",
            blurb: "Neck stiffness and headaches after a rapid back-and-forth motion.",
            link: "/conditions/whiplash-neck-strain",
        },
        {
            title: "Herniated disc & sciatica",
            slug: "herniated-disc-sciatica",
            blurb: "Radiating leg pain, tingling, or numbness from a disc injury.",
            link: "/conditions/herniated-disc-sciatica",
        },
        {
            title: "Lumbar strain",
            slug: "lumbar-strain",
            blurb: "Lower-back muscle or ligament strain after impact.",
            link: "/conditions/lumbar-strain",
        },
        {
            title: "Shoulder labrum or rotator cuff",
            slug: "shoulder-labrum-rc",
            blurb: "Shoulder pain, catching, or weakness post-crash.",
            link: "/conditions/shoulder-labrum-rotator-cuff",
        },
        {
            title: "Knee meniscus or ligament",
            slug: "knee-meniscus-ligament",
            blurb: "Knee pain, swelling, or instability.",
            link: "/conditions/knee-meniscus-ligament",
        },
        {
            title: "Wrist or hand fracture",
            slug: "wrist-hand-fracture",
            blurb: "Pain and tenderness after bracing on impact.",
            link: "/conditions/wrist-hand-fracture",
        },
    ],
    faqs: [
        { q: "Do I need a referral?", a: "Most patients do not. Book directly; we confirm benefits during intake." },
        { q: "When should I get an MRI?", a: "Only when your exam suggests it will change the plan." },
        {
            q: "Is a televisit okay after a crash?",
            a: "Yes for history review, triage, and test planning. Hands-on exam happens in person.",
        },
        {
            q: "Can I drive?",
            a: "Wait until you can turn your head without pain, aren't taking sedating meds, and can brake firmly.",
        },
        { q: "How fast are results?", a: "Same day for X-ray; MRI reads often 24–48 hours." },
        {
            q: "How do you work with my attorney?",
            a: "With your written consent, we share records and scheduling updates promptly.",
        },
    ],
    clinicians: [
        {
            name: "Dr. Elena Reyes, MD",
            sub: "Spine & Sports Medicine",
            bio: "Conservative-first care for post-crash neck and low-back injuries.",
            headshot: "/providers/reyes.jpg",
            videoUrl: "https://example.com/reyes.mp4",
        },
        {
            name: "Dr. Marcus Patel, DO",
            sub: "Shoulder & Knee",
            bio: "Minimally invasive options when clearly indicated; active rehab plans.",
            headshot: "/providers/patel.jpg",
            videoUrl: "https://example.com/patel.mp4",
        },
        {
            name: "PA Jordan Smith, PA-C",
            sub: "Acute Injury Triage",
            bio: "Same-week access and clear step-by-step recovery guidance.",
            headshot: "/providers/smith.jpg",
            videoUrl: "https://example.com/smith.mp4",
        },
    ],
    locations: [
        {
            name: "Altamonte Springs, FL",
            slug: "altamonte-springs",
            parking: "Free lot; enter from W Town Pkwy.",
            nextOpen: "Today 3:40 PM",
            map: "https://maps.example.com/altamonte",
        },
        {
            name: "Hollywood, FL",
            slug: "hollywood",
            parking: "Garage behind clinic; 1 hr validation.",
            nextOpen: "Tomorrow 10:15 AM",
            map: "https://maps.example.com/hollywood",
        },
        {
            name: "Davenport, FL",
            slug: "davenport",
            parking: "Shared plaza parking.",
            nextOpen: "Today 9:50 AM",
            map: "https://maps.example.com/davenport",
        },
        {
            name: "Hackensack, NJ",
            slug: "hackensack",
            parking: "Street parking available.",
            nextOpen: "Today 2:00 PM",
            map: "https://maps.example.com/hackensack",
        },
        {
            name: "New York City, NY",
            slug: "new-york-city",
            parking: "Nearby public parking garages.",
            nextOpen: "Tomorrow 9:00 AM",
            map: "https://maps.example.com/nyc",
        },
        {
            name: "Philadelphia, PA",
            slug: "philadelphia",
            parking: "Street and garage parking available.",
            nextOpen: "Today 4:00 PM",
            map: "https://maps.example.com/philadelphia",
        },
    ],
    stories: [
        {
            title: "Rear-end collision → neck pain",
            problem: "Couldn't sit for work; headaches.",
            plan: "Exam + X-ray; PT referral (if appropriate); short-term brace.",
            result: "Back to full desk days by week 2; driving okay.",
        },
    ],
    starRating: AVERAGE_RATING,
    reviewCount: TOTAL_REVIEW_COUNT,
}

export default function SlipAndFallClient({ faqs, doctors, reviews }: SlipAndFallClientProps) {
    const insuranceCarriers = [
        {
            image: insurance8,
            name: 'Blue Cross Blue Shield'
        },
        {
            image: insurance1,
            name: 'United Healthcare'
        },
        {
            image: insurance2,
            name: 'Cigna Healthcare'
        },
        {
            image: insurance3,
            name: 'Aetna',
            height: 60,
        },
        {
            image: insurance5,
            name: 'Meritan Healthcare'
        },
        {
            image: insurance4,
            name: 'Multiplan'
        },
        {
            image: insurance6,
            name: 'Bright Health Group',
            height: 80,
        },
        {
            image: insurance7,
            name: 'PPO',
            height: 120,

        },
    ]

    return (
        <main className="w-full flex flex-col items-center justify-center bg-white h-full">
            {/* Hero Section */}
            <section className="w-full h-full  sm:py-26 py-10 flex flex-col relative overflow-hidden [mask-composite:intersect] [mask-image:linear-gradient(to_top,transparent,black_6rem)]">
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
                    alt="Doctor evaluating patient with slip and fall fracture injury"
                />
                <div
                    className="lg:w-[100%] z-[1] h-full absolute left-0 top-0 md:w-[100%] w-full"
                    style={{
                        background: 'linear-gradient(180deg, rgba(10, 80, 236, 0.20) 0%, rgba(255, 255, 255, 0.20) 100%)',
                    }}
                />
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-[60px] z-10 relative ">
                    {/* <Breadcrumbs items={[{ label: "Injuries", href: "/injuries" }, { label: "Slip and Fall" }]} /> */}
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <div className="space-y-4 mt-10">
                                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                                    <AlertTriangle className="w-3 h-3 mr-1" />
                                    Urgent Care Available
                                </Badge>

                                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 text-balance">
                                    Slip and Fall Injury Treatment
                                </h1>

                                <p className="text-xl text-gray-600 text-pretty">
                                    Immediate evaluation and treatment for fractures, sprains, and soft tissue injuries. Same-week
                                    appointments available in FL, NJ, NY &amp; PA.
                                </p>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.4 }}
                                className="flex flex-col sm:flex-row gap-4"
                            >
                                <motion.div whileHover="hover">
                                    <BookAnAppoitmentButton bordered className="h-10" />
                                </motion.div>
                                {/* <motion.div whileHover="hover">
                                    <Button variant="outline" size="lg" data-cta="hero-mri">
                                        Free MRI review
                                    </Button>
                                </motion.div>
                                <motion.div whileHover="hover">
                                    <Button variant="outline" size="lg" data-cta="hero-text">
                                        Text us
                                    </Button>
                                </motion.div> */}
                            </motion.div>
                            {/* 
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.7, duration: 0.4 }}
                                        className="text-sm text-gray-500"
                                    >
                                        Choose your nearest location and time in under sixty seconds
                                    </motion.p> */}

                            {/* Trust indicators */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.9, duration: 0.4 }}
                                className="space-y-4"
                            >
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                    <span>We work closely with attorneys for records and scheduling</span>
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <span className="font-medium">{data.starRating}</span>
                                        <span>({data.reviewCount}+)</span>
                                    </div>
                                </div>

                                {/* Insurer logos marquee */}
                                {/* <div className="overflow-hidden [mask-composite:intersect] [mask-image:linear-gradient(to_right,transparent,black_6rem),linear-gradient(to_left,transparent,black_6rem)]">
                                    <Marquee
                                        className="flex items-center gap-6 grayscale opacity-60"
                                    >
                                        {insuranceCarriers.map((insurer, i) => (
                                            <div key={i} className="flex-shrink-0">
                                                <Image
                                                    src={insurer.image}
                                                    alt={`${insurer.name} insurance accepted`}
                                                    className="h-14 w-fit "
                                                />
                                            </div>
                                        ))}

                                    </Marquee>
                                    
                                </div>

                                <div className="flex items-start gap-2 text-sm text-gray-500">
                                    <MapPin className="h-4 w-4" />
                                    <span>
                                        {
                                            clinics.map(clinic => clinic.region.split(',')[0].trim()).join(' • ')
                                        }
                                    </span>
                                </div>
                                <Alert className="border-[#DCDEE1] bg-[#FAFAFA]">
                                    <Clock className="w-4 h-4 text-[#0A50EC]" />
                                    <AlertDescription
                                        style={{
                                            fontFamily: 'var(--font-inter)',
                                            fontWeight: 400,
                                        }}
                                        className="text-[#424959]"
                                    >
                                        We typically respond within 2 hours during business hours. Same-week appointments available.
                                    </AlertDescription>
                                </Alert>

                                <Alert className="border-blue-200 bg-blue-50">
                                    <FileText className="w-4 h-4 text-blue-600" />
                                    <AlertDescription
                                        style={{
                                            fontFamily: 'var(--font-inter)',
                                            fontWeight: 400,
                                        }}
                                        className="text-blue-800"
                                    >
                                        <strong>Attorney-friendly:</strong> We work closely with attorneys and provide detailed medical documentation for your case.
                                    </AlertDescription>
                                </Alert> */}
                            </motion.div>
                        </div>
                        <div className="lg:pl-8">
                            <LeadCaptureForm />
                        </div>
                    </div>


                </div>
            </section>

            <InjuryUrgencyBanner injuryType="slip-and-fall" />

            {/* Trust Indicators */}
            <section className="w-full max-w-[1440px] flex flex-col sm:py-[50px] py-10 h-full px-2 md:px-[40px]" data-section="trust-indicators">
                <div className="w-full">
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div className="space-y-2">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                                <Shield className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="font-semibold text-gray-900">Board Certified</h3>
                            <p className="text-gray-600">Orthopedic specialists with advanced trauma training</p>
                        </div>

                        <div className="space-y-2">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                                <Clock className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="font-semibold text-gray-900">Same-Week Care</h3>
                            <p className="text-gray-600">Urgent appointments available for acute injuries</p>
                        </div>

                        <div className="space-y-2">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                                <MapPin className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="font-semibold text-gray-900">10 Locations</h3>
                            <p className="text-gray-600">{siteData.citiesPill}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Common Injuries */}
            <section className="w-full max-w-[1440px] flex flex-col sm:py-[50px] py-10 h-full px-2 md:px-[40px]" data-section="common-injuries">
                <div className="w-full">
                    <div className="text-center mb-12">
                        <h2
                            style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500 }}
                            className="text-[#111315] text-3xl md:text-5xl mb-4 text-balance"
                        >
                            Common Slip and Fall Injuries We Treat
                        </h2>
                        <p
                            style={{ fontFamily: "var(--font-inter)", fontWeight: 400 }}
                            className="text-[#424959] text-lg max-w-2xl mx-auto text-pretty"
                        >
                            From minor sprains to complex fractures, our specialists provide comprehensive care for all slip and
                            fall injuries.
                        </p>
                    </div>

                    <InjuriesCarousel injuries={siteData.injuries} />
                </div>
            </section>

            {/* Treatment Approach */}
            <section className="w-full max-w-[1440px] flex flex-col sm:py-[50px] py-10 h-full px-2 md:px-[40px]" data-section="treatment-approach">
                <div className="w-full">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-balance sm:text-start text-center">
                                Our Comprehensive Treatment Approach
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
                                                <p className="text-gray-600">Comprehensive physical exam and pain evaluation</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <h4 className="font-semibold text-gray-900">Advanced Imaging</h4>
                                                <p className="text-gray-600">X-ray, MRI, or CT when medically necessary</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <h4 className="font-semibold text-gray-900">Injury Classification</h4>
                                                <p className="text-gray-600">Precise diagnosis and severity grading</p>
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
                                                <p className="text-gray-600">Non-surgical options prioritized when appropriate</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <h4 className="font-semibold text-gray-900">Pain Management</h4>
                                                <p className="text-gray-600">Multimodal approach for optimal comfort</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <h4 className="font-semibold text-gray-900">Surgical Excellence</h4>
                                                <p className="text-gray-600">Minimally invasive techniques when surgery is needed</p>
                                            </div>
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="recovery" className="space-y-4">
                                    <div className="space-y-4 mt-4">
                                        <div className="flex items-start space-x-3">
                                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <h4 className="font-semibold text-gray-900">Rehabilitation Referral</h4>
                                                <p className="text-gray-600">Expert referral to trusted rehabilitation specialists when appropriate</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <h4 className="font-semibold text-gray-900">Return to Activity</h4>
                                                <p className="text-gray-600">Safe progression back to work and sports</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <h4 className="font-semibold text-gray-900">Prevention Education</h4>
                                                <p className="text-gray-600">Strategies to prevent future injuries</p>
                                            </div>
                                        </div>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>

                        <div className="space-y-6">
                            {/* <img
                                src="/modern-medical-examination-room-with-orthopedic-eq.jpg"
                                alt="Modern orthopedic examination room"
                                className="rounded-xl medical-shadow-lg w-full"
                            /> */}

                            <Card className="medical-shadow">
                                <CardContent className="p-6">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <Award className="w-6 h-6 text-[#0A50EC]" />
                                        <h3 className="font-semibold text-gray-900">Quality Commitment</h3>
                                    </div>
                                    <p className="text-gray-600">
                                        Our evidence-based protocols ensure you receive the most effective treatment with the fastest
                                        recovery time possible.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            <InjuryInsuranceCoverage injuryType="slip-and-fall" />

            {/* Clinic Finder */}
            <InjuryClinicFinder />

            <InjuryHotspots injuryType="slip-and-fall" />

            {/* Meet Our Experts */}
            <div className="w-full max-w-[1440px] mx-auto px-4 sm:py-16 py-8"><InjuryDoctorsSection doctors={doctors} /></div>

            {/* FAQ Section */}
            <section className="w-full max-w-[1440px] flex flex-col sm:py-[50px] py-10 h-full px-2 md:px-[40px]" data-section="faq">
                <div className="w-full max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4 text-balance">Frequently Asked Questions</h2>
                        <p className="text-lg text-gray-600 text-pretty">
                            Get answers to common questions about slip and fall injury treatment.
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

            {/* Insurance & Locations */}
            <section className="w-full max-w-[1440px] flex flex-col sm:py-[50px] py-10 h-full px-2 md:px-[40px]" data-section="insurance-locations">
                <div className="w-full">
                    <div className="w-full gap-12">
                        <div className="flex flex-col items-center justify-center gap-y-2">
                            {/* Insurer logos marquee */}
                            <div className="overflow-clip w-full [mask-composite:intersect] [mask-image:linear-gradient(to_right,transparent,black_6rem),linear-gradient(to_left,transparent,black_6rem)]">
                                <Marquee
                                    className="flex items-center sm:gap-6 gap-2 grayscale opacity-60"
                                >
                                    {insuranceCarriers.map((insurer, i) => (
                                        <div key={i} className="flex-shrink-0">
                                            <Image
                                                src={insurer.image}
                                                alt={`${insurer.name} insurance accepted`}
                                                height={insurer.height || 100}
                                                className="object-cover"
                                            />
                                        </div>
                                    ))}

                                </Marquee>

                            </div>
                            <p className="text-gray-600">Don't see your insurance? Call us at <a href="tel:+15612239959" className="text-[#0A50EC] hover:underline">(561) 223-9959</a> to verify coverage.</p>
                        </div>
                    </div>
                </div>
            </section>

            <InjuryAttorneyPanel showAttorneyPanel={true} />

            {/* Final CTA */}
            <section className="w-full flex flex-col sm:py-[50px] py-10 h-full px-2 md:px-[40px] bg-primary text-white" data-section="final-cta">
                <div className="w-full max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4 text-balance">Don't Wait - Get Expert Care Today</h2>
                    <p className="text-xl mb-8 text-blue-100 text-pretty">
                        Slip and fall injuries can worsen without proper treatment. Schedule your evaluation with our
                        board-certified orthopedic specialists across FL, NJ, NY &amp; PA.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {/* <Button size="lg" variant="secondary" asChild data-cta="final-book">
                            <Link href="/book?reason=slip-and-fall">
                                <Calendar className="w-5 h-5 mr-2" />
                                Schedule Evaluation
                            </Link>
                        </Button> */}
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-white text-white hover:bg-white hover:text-primary bg-transparent"
                            asChild
                            data-cta="final-call"
                        >
                            <a href="tel:+15612239959"
                            >
                                <Phone className="w-5 h-5 mr-2" />
                                Call (561) 223-9959
                            </a>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Ratings and Reviews Section */}
            <RatingsAndReviews reviews={reviews} />
        </main >
    );
}