"use client"

import type React from "react"
import type { DoctorProp } from "@/components/data/doctors"
import { AVERAGE_RATING, TOTAL_REVIEW_COUNT } from "@/components/data/reviewAggregate.generated"

interface CarAccidentClientProps {
    faqs: Array<{ q: string; a: string }>;
    doctors: DoctorProp[];
}

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, LazyMotion, domAnimation, useReducedMotion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
    Phone,
    MessageSquare,
    Calendar,
    Star,
    MapPin,
    Clock,
    AlertTriangle,
    CheckCircle,
    ArrowRight,
    Play,
    Search,
    ChevronRight,
    Heart,
    Brain,
    Zap,
    Shield,
    Target,
    Activity,
    FileText,
    Navigation,
} from "lucide-react"
import Image from "next/image"
import { CarAccidentLeadCaptureForm } from "./lead-capture-form"
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
import InjuryDoctorsSection from "@/components/InjuryDoctorsSection.client"
import BookAnAppoitmentButton from "@/components/BookAnAppoitmentButton"
import CondensedLocations from "@/components/CondensedLocations"
import { LawyerContactForm } from "@/components/LawyerContactForm"
import InjuryUrgencyBanner from "@/components/InjuryUrgencyBanner"
import InjuryClinicFinder from "@/components/InjuryClinicFinder"
import InjuryInsuranceCoverage from "@/components/InjuryInsuranceCoverage"
import InjuryHotspots from "@/components/InjuryHotspots"
import InjuryAttorneyPanel from "@/components/InjuryAttorneyPanel"
import Reveal from "@/components/RevealAnimation"
import TreatmentPathCarousel from "@/components/TreatmentPathCarousel"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
    type CarouselApi,
} from "@/components/ui/carousel"
// Seed data
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

// Custom hook for triage logic
function useTriage() {
    const [step, setStep] = useState(1)
    const [redFlags, setRedFlags] = useState(false)
    const [painLocation, setPainLocation] = useState("")
    const [canWalkDrive, setCanWalkDrive] = useState<boolean | null>(null)

    const resetTriage = () => {
        setStep(1)
        setRedFlags(false)
        setPainLocation("")
        setCanWalkDrive(null)
    }

    const getOutcome = () => {
        if (redFlags) return "er"
        if (step === 3 && canWalkDrive !== null) return "schedule"
        return null
    }

    return {
        step,
        setStep,
        redFlags,
        setRedFlags,
        painLocation,
        setPainLocation,
        canWalkDrive,
        setCanWalkDrive,
        resetTriage,
        outcome: getOutcome(),
    }
}

// Reusable motion section wrapper
function MotionSection({
    children,
    className = "",
    stagger = true,
    ...props
}: {
    children: React.ReactNode
    className?: string
    stagger?: boolean
    [key: string]: any
}) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })
    const shouldReduceMotion = useReducedMotion()

    const variants = {
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
        visible: {
            opacity: 1,
            y: 0,

        },
    }

    return (
        <motion.section
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants}
            className={className}
            {...props}
        >
            {children}
        </motion.section>
    )
}



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
        name: 'Aetna'
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
        name: 'Bright Health Group'
    },
    {
        image: insurance7,
        name: 'PPO'
    },
]


export default function CarAccidentClient({ faqs, doctors }: CarAccidentClientProps) {
    const shouldReduceMotion = useReducedMotion()
    const triage = useTriage()
    const [faqSearch, setFaqSearch] = useState("")
    const [timelineWeek, setTimelineWeek] = useState([2])
    const [attorneyTab, setAttorneyTab] = useState("patients")
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [hasMounted, setHasMounted] = useState(false)

    useEffect(() => {
        setHasMounted(true)
    }, [])

    useEffect(() => {
        if (!api) {
            return
        }

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap())
        })
    }, [api])

    // Filter FAQs based on search
    const filteredFaqs = faqs.filter(
        (faq) =>
            faq.q.toLowerCase().includes(faqSearch.toLowerCase()) || faq.a.toLowerCase().includes(faqSearch.toLowerCase()),
    )

    // Animation variants
    const wordVariants = {
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.02,
                duration: 0.3,
                ease: "easeOut",
            },
        }),
    }

    const buttonVariants = {
        hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 220,
                damping: 30,
                mass: 0.6,
            },
        },
        hover: {
            y: shouldReduceMotion ? 0 : -2,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        },
    }

    return (
        <section className="w-full max-w-8xl mx-auto">
            <div className="min-h-screen bg-white w-full overflow-x-hidden">
                {/* Hero Section */}
                <section className="lg:px-[60px] px-4 sm:pb-20 sm:pt-40 pt-32 relative [mask-composite:intersect] [mask-image:linear-gradient(to_top,transparent,black_6rem)]" data-section="hero">
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
                        alt="Orthopedic specialist treating whiplash and back pain after car accident"
                    />
                    <div
                        className="lg:w-[100%] z-[1] h-full absolute left-0 top-0 md:w-[100%] w-full"
                        style={{
                            background: 'linear-gradient(180deg, rgba(10, 80, 236, 0.20) 0%, rgba(255, 255, 255, 0.20) 100%)',
                        }}
                    />

                    <div className="grid lg:grid-cols-2 gap-12 items-center relative z-[2]">
                        <div className="space-y-6">
                            <motion.h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                                {"Car Accident Orthopedic Specialists".split(" ").map((word, i) => (
                                    <motion.span
                                        key={i}
                                        custom={i}
                                        variants={wordVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="inline-block mr-2"
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.4 }}
                                className="text-xl text-gray-600 leading-relaxed"
                            >
                                Same-week appointments for neck, back, shoulder, knee, and wrist injuries. Most insurances accepted.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.4 }}
                                className="flex flex-col sm:flex-row gap-4"
                            >
                                <motion.div variants={buttonVariants} whileHover="hover">
                                    <BookAnAppoitmentButton bordered className="h-10" />
                                </motion.div>
                                {/* <motion.div variants={buttonVariants} whileHover="hover">
                                        <Button variant="outline" size="lg" data-cta="hero-mri">
                                            Free MRI review
                                        </Button>
                                    </motion.div>
                                    <motion.div variants={buttonVariants} whileHover="hover">
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

                        <div className="relative">
                            <motion.div
                                className="relative overflow-hidden rounded-2xl"
                            >
                                <CarAccidentLeadCaptureForm />
                                <motion.div
                                    animate={{
                                        background: shouldReduceMotion
                                            ? "linear-gradient(45deg, rgba(10,132,255,0.1) 0%, rgba(10,132,255,0.05) 100%)"
                                            : [
                                                "linear-gradient(45deg, rgba(10,132,255,0.1) 0%, rgba(10,132,255,0.05) 100%)",
                                                "linear-gradient(45deg, rgba(10,132,255,0.05) 0%, rgba(10,132,255,0.1) 100%)",
                                                "linear-gradient(45deg, rgba(10,132,255,0.1) 0%, rgba(10,132,255,0.05) 100%)",
                                            ],
                                    }}
                                    transition={{
                                        duration: shouldReduceMotion ? 0 : 8,
                                        repeat: shouldReduceMotion ? 0 : Number.POSITIVE_INFINITY,
                                    }}
                                    className="absolute inset-0"
                                />
                            </motion.div>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.4 }}
                        className="mt-8 text-xs text-gray-500 text-center"
                    >
                        If you have emergency symptoms, call 911 or go to the nearest ER.
                    </motion.div>
                </section>

                <InjuryUrgencyBanner injuryType="car-accident" />

                {/* Quick Triage Stepper */}
                {/* <MotionSection className="bg-white sm:py-16 py-8" data-section="triage">
                        <div className="container mx-auto px-4">
                            <div className="max-w-2xl mx-auto">
                                <motion.h2
                                    variants={{
                                        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
                                        visible: { opacity: 1, y: 0 },
                                    }}
                                    className="text-3xl font-bold text-center mb-8"
                                >
                                    Quick Safety Check
                                </motion.h2>

                                <Card className="p-6">
                                    <AnimatePresence mode="wait">
                                        {triage.step === 1 && (
                                            <motion.div
                                                key="step1"
                                                initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: shouldReduceMotion ? 0 : -20 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <h3 className="text-xl font-semibold mb-4">Do you have any of these right now?</h3>
                                                <div className="space-y-3 mb-6">
                                                    {[
                                                        "Severe head injury or confusion",
                                                        "New weakness or numbness",
                                                        "Chest pain",
                                                        "Trouble breathing",
                                                        "Loss of bladder or bowel control",
                                                    ].map((symptom, i) => (
                                                        <div key={i} className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                                                            <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0" />
                                                            <span>{symptom}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="flex gap-4">
                                                    <Button
                                                        variant="destructive"
                                                        onClick={() => {
                                                            triage.setRedFlags(true)
                                                            triage.setStep(4)
                                                        }}
                                                        className="flex-1"
                                                    >
                                                        Yes, I have these
                                                    </Button>
                                                    <Button
                                                        onClick={() => triage.setStep(2)}
                                                        className="flex-1 bg-[#0A84FF] hover:bg-[#0A84FF]/90"
                                                    >
                                                        No, I don't
                                                    </Button>
                                                </div>
                                            </motion.div>
                                        )}

                                        {triage.step === 2 && (
                                            <motion.div
                                                key="step2"
                                                initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: shouldReduceMotion ? 0 : -20 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <h3 className="text-xl font-semibold mb-4">Where is your main pain?</h3>
                                                <div className="grid grid-cols-2 gap-3 mb-6">
                                                    {["Neck", "Back", "Shoulder", "Knee", "Wrist/Hand", "Other"].map((location) => (
                                                        <Button
                                                            key={location}
                                                            variant={triage.painLocation === location ? "default" : "outline"}
                                                            onClick={() => triage.setPainLocation(location)}
                                                            className={triage.painLocation === location ? "bg-[#0A84FF] hover:bg-[#0A84FF]/90" : ""}
                                                        >
                                                            {location}
                                                        </Button>
                                                    ))}
                                                </div>
                                                <div className="flex gap-4">
                                                    <Button variant="outline" onClick={() => triage.setStep(1)}>
                                                        Back
                                                    </Button>
                                                    <Button
                                                        onClick={() => triage.setStep(3)}
                                                        disabled={!triage.painLocation}
                                                        className="flex-1 bg-[#0A84FF] hover:bg-[#0A84FF]/90"
                                                    >
                                                        Continue
                                                    </Button>
                                                </div>
                                            </motion.div>
                                        )}

                                        {triage.step === 3 && (
                                            <motion.div
                                                key="step3"
                                                initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: shouldReduceMotion ? 0 : -20 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <h3 className="text-xl font-semibold mb-4">Can you walk or drive?</h3>
                                                <div className="flex gap-4 mb-6">
                                                    <Button
                                                        variant={triage.canWalkDrive === true ? "default" : "outline"}
                                                        onClick={() => triage.setCanWalkDrive(true)}
                                                        className={`flex-1 ${triage.canWalkDrive === true ? "bg-[#0A84FF] hover:bg-[#0A84FF]/90" : ""}`}
                                                    >
                                                        Yes
                                                    </Button>
                                                    <Button
                                                        variant={triage.canWalkDrive === false ? "default" : "outline"}
                                                        onClick={() => triage.setCanWalkDrive(false)}
                                                        className={`flex-1 ${triage.canWalkDrive === false ? "bg-[#0A84FF] hover:bg-[#0A84FF]/90" : ""}`}
                                                    >
                                                        No
                                                    </Button>
                                                </div>
                                                <div className="flex gap-4">
                                                    <Button variant="outline" onClick={() => triage.setStep(2)}>
                                                        Back
                                                    </Button>
                                                    {triage.canWalkDrive !== null && (
                                                        <Button
                                                            onClick={() => triage.setStep(4)}
                                                            className="flex-1 bg-[#0A84FF] hover:bg-[#0A84FF]/90"
                                                        >
                                                            Get Results
                                                        </Button>
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}

                                        {triage.step === 4 && (
                                            <motion.div
                                                key="step4"
                                                initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                {triage.outcome === "er" ? (
                                                    <Alert className="border-red-200 bg-red-50">
                                                        <AlertTriangle className="h-4 w-4 text-red-600" />
                                                        <AlertTitle className="text-red-800">Go to the nearest ER now</AlertTitle>
                                                        <AlertDescription className="text-red-700 mb-4">
                                                            Your symptoms require immediate emergency care. Don't wait.
                                                        </AlertDescription>
                                                        <div className="flex gap-3">
                                                            <Button variant="destructive" size="sm">
                                                                Find nearest ER
                                                            </Button>
                                                            <Button variant="outline" size="sm">
                                                                Call 911
                                                            </Button>
                                                        </div>
                                                    </Alert>
                                                ) : (
                                                    <div className="text-center space-y-4">
                                                        <motion.div
                                                            animate={{ scale: shouldReduceMotion ? 1 : [1, 1.05, 1] }}
                                                            transition={{ duration: 0.6 }}
                                                        >
                                                            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                                                        </motion.div>
                                                        <h3 className="text-xl font-semibold text-green-800">
                                                            You are safe to schedule a same-week orthopedic visit
                                                        </h3>
                                                        <p className="text-gray-600">
                                                            Based on your answers, we can help you with your {triage.painLocation?.toLowerCase()}{" "}
                                                            injury.
                                                        </p>
                                                        <div className="flex gap-3 justify-center">
                                                            <Button className="bg-[#0A84FF] hover:bg-[#0A84FF]/90">Book now</Button>
                                                            <Button variant="outline">Text us</Button>
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="mt-6 pt-4 border-t">
                                                    <Button variant="ghost" onClick={triage.resetTriage} className="w-full">
                                                        Start over
                                                    </Button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <div className="flex justify-center gap-2 mt-6">
                                        {[1, 2, 3, 4].map((stepNum) => (
                                            <motion.div
                                                key={stepNum}
                                                animate={{
                                                    backgroundColor: triage.step >= stepNum ? "#0A84FF" : "#E5E7EB",
                                                    scale: triage.step === stepNum ? (shouldReduceMotion ? 1 : 1.2) : 1,
                                                }}
                                                className="w-3 h-3 rounded-full"
                                            />
                                        ))}
                                    </div>
                                </Card>

                                <p className="text-sm text-gray-500 text-center mt-4">
                                    Your answers help us route you safely. This is not a diagnosis.
                                </p>
                            </div>
                        </div>
                    </MotionSection> */}

                {/* What to Do Right Now */}
                <Reveal width="100%" className="sm:sm:py-16 py-8" data-section="what-now">
                    <div className="container mx-auto px-4">
                        <motion.h2
                            variants={{
                                hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            className="text-3xl font-bold text-center mb-12"
                        >
                            What to Do Right Now
                        </motion.h2>

                        <div className="max-w-4xl mx-auto">
                            <Tabs defaultValue="first24" className="w-full">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="first24">First twenty-four hours</TabsTrigger>
                                    <TabsTrigger value="beforevisit">Before your visit</TabsTrigger>
                                </TabsList>

                                <AnimatePresence mode="wait">
                                    <TabsContent key="first24" value="first24" className="mt-6">
                                        <motion.div
                                            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -10 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Card className="p-6">
                                                <div className="space-y-4">
                                                    {[
                                                        "Move gently within comfort - don't stay completely still",
                                                        "Ice for 15-20 minutes every 2-3 hours for the first 48 hours",
                                                        "Take over-the-counter pain relievers as directed on package",
                                                        "Avoid heat for the first 2 days",
                                                        "Sleep with extra pillow support if needed",
                                                        "Document your symptoms and pain levels",
                                                    ].map((item, i) => (
                                                        <motion.div
                                                            key={i}
                                                            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: i * 0.1, duration: 0.3 }}
                                                            className="flex items-start gap-3"
                                                        >
                                                            <motion.div whileHover={{ scale: shouldReduceMotion ? 1 : 1.1 }} className="mt-1">
                                                                <CheckCircle className="h-5 w-5 text-green-500" />
                                                            </motion.div>
                                                            <span>{item}</span>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </Card>
                                        </motion.div>
                                    </TabsContent>

                                    <TabsContent key="beforevisit" value="beforevisit" className="mt-6">
                                        <motion.div
                                            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -10 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Card className="p-6">
                                                <div className="space-y-4">
                                                    {[
                                                        "Bring crash details (police report, photos if safe to take)",
                                                        "List all current medications and supplements",
                                                        "Gather any prior imaging (X-rays, MRIs) from other providers",
                                                        "Bring insurance cards and photo ID",
                                                        "Write down attorney contact information if you have one",
                                                        "Note specific activities that worsen or improve your pain",
                                                    ].map((item, i) => (
                                                        <motion.div
                                                            key={i}
                                                            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: i * 0.1, duration: 0.3 }}
                                                            className="flex items-start gap-3"
                                                        >
                                                            <motion.div whileHover={{ scale: shouldReduceMotion ? 1 : 1.1 }} className="mt-1">
                                                                <FileText className="h-5 w-5 text-blue-500" />
                                                            </motion.div>
                                                            <span>{item}</span>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </Card>
                                        </motion.div>
                                    </TabsContent>
                                </AnimatePresence>
                            </Tabs>
                        </div>
                    </div>
                </Reveal>

                {/* Common Injuries Grid */}
                <Reveal width="100%" className="bg-gray-50 sm:py-16 py-8" data-section="injuries">
                    <div className="container mx-auto px-4">
                        <motion.h2
                            variants={{
                                hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            className="text-3xl font-bold text-center mb-12"
                        >
                            Common Car Accident Injuries We Treat
                        </motion.h2>

                        {/* Mobile Carousel - Only visible on mobile */}
                        <div className="block md:hidden mb-8">
                            {hasMounted && (
                                <div className="w-full">
                                    <Carousel
                                        setApi={setApi}
                                        className="w-full"
                                        opts={{
                                            align: "center",
                                            containScroll: "trimSnaps",
                                        }}
                                    >
                                        <CarouselContent>
                                            {data.injuries.map((injury, index) => (
                                                <CarouselItem key={injury.slug} className="basis-full py-6">
                                                    <motion.div
                                                        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: index * 0.1 }}
                                                        className="group"
                                                    >
                                                        <Card className="h-full p-6 hover:shadow-lg transition-shadow cursor-pointer">
                                                            <div className="flex items-start gap-4">
                                                                <motion.div
                                                                    whileHover={{ rotate: shouldReduceMotion ? 0 : 4 }}
                                                                    className="p-3 bg-blue-50 rounded-lg"
                                                                >
                                                                    <Activity className="h-6 w-6 text-[#0A84FF]" />
                                                                </motion.div>
                                                                <div className="flex-1">
                                                                    <h3 className="font-semibold mb-2 group-hover:text-[#0A84FF] transition-colors">
                                                                        {injury.title}
                                                                    </h3>
                                                                    <p className="text-sm text-gray-600 mb-3">{injury.blurb}</p>
                                                                </div>
                                                            </div>
                                                        </Card>
                                                    </motion.div>
                                                </CarouselItem>
                                            ))}
                                        </CarouselContent>
                                        <CarouselPrevious className="bg-white/90 backdrop-blur-sm border border-[#0A84FF]/20 hover:bg-white hover:shadow-xl transition-all duration-300 absolute -left-4 top-1/2 -translate-y-1/2" />
                                        <CarouselNext className="bg-white/90 backdrop-blur-sm border border-[#0A84FF]/20 hover:bg-white hover:shadow-xl transition-all duration-300 absolute -right-4 top-1/2 -translate-y-1/2" />
                                    </Carousel>

                                    {/* Dynamic Progress Indicators */}
                                    <div className="flex justify-center mt-6 space-x-2">
                                        {data.injuries.map((_, index) => (
                                            <motion.button
                                                key={index}
                                                onClick={() => api?.scrollTo(index)}
                                                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === current
                                                    ? 'bg-[#0A84FF] w-6'
                                                    : 'bg-[#0A84FF]/30 hover:bg-[#0A84FF]/50'
                                                    }`}
                                                whileHover={{ scale: 1.2 }}
                                                whileTap={{ scale: 0.9 }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Desktop Grid - Only visible on desktop */}
                        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                            {data.injuries.map((injury, i) => (
                                <motion.div
                                    key={injury.slug}
                                    variants={{
                                        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
                                        visible: {
                                            opacity: 1,
                                            y: 0,
                                            transition: { delay: i * 0.02 },
                                        },
                                    }}
                                    whileHover={{
                                        y: shouldReduceMotion ? 0 : -4,
                                        rotateX: shouldReduceMotion ? 0 : 1,
                                        rotateY: shouldReduceMotion ? 0 : 1,
                                    }}
                                    className="group"
                                >
                                    <Card className="h-full p-6 hover:shadow-lg transition-shadow cursor-pointer">
                                        <div className="flex items-start gap-4">
                                            <motion.div
                                                whileHover={{ rotate: shouldReduceMotion ? 0 : 4 }}
                                                className="p-3 bg-blue-50 rounded-lg"
                                            >
                                                <Activity className="h-6 w-6 text-[#0A84FF]" />
                                            </motion.div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold mb-2 group-hover:text-[#0A84FF] transition-colors">
                                                    {injury.title}
                                                </h3>
                                                <p className="text-sm text-gray-600 mb-3">{injury.blurb}</p>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </Reveal>

                {/* When to Go to ER */}
                {/* <MotionSection className="sm:py-16 py-8" data-section="er-redflags">
                        <div className="container mx-auto px-4">
                            <div className="max-w-4xl mx-auto">
                                <motion.div
                                    variants={{
                                        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
                                        visible: {
                                            opacity: 1,
                                            y: 0,
                                            transition: { type: "spring", stiffness: 220, damping: 30 },
                                        },
                                    }}
                                >
                                    <Alert className="border-red-200 bg-red-50 p-6">
                                        <AlertTriangle className="h-6 w-6 text-red-600" />
                                        <AlertTitle className="text-xl text-red-800 mb-4">Go to the ER immediately if you have:</AlertTitle>
                                        <AlertDescription>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                {[
                                                    { icon: Brain, text: "Severe head injury or confusion" },
                                                    { icon: Zap, text: "New weakness or numbness" },
                                                    { icon: Heart, text: "Chest pain or trouble breathing" },
                                                    { icon: AlertTriangle, text: "Loss of bladder/bowel control" },
                                                    { icon: Activity, text: "Rapidly worsening severe pain" },
                                                    { icon: Shield, text: "Signs of internal bleeding" },
                                                ].map((item, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.9 }}
                                                        animate={{
                                                            opacity: 1,
                                                            scale: 1,
                                                            transition: { delay: i * 0.1 },
                                                        }}
                                                        whileHover={{ scale: shouldReduceMotion ? 1 : 1.02 }}
                                                        className="flex items-center gap-3 p-3 bg-white rounded-lg"
                                                    >
                                                        <motion.div
                                                            animate={{
                                                                scale: shouldReduceMotion ? 1 : [1, 1.1, 1],
                                                                transition: {
                                                                    delay: i * 0.2,
                                                                    duration: 0.6,
                                                                    repeat: shouldReduceMotion ? 0 : Number.POSITIVE_INFINITY,
                                                                    repeatDelay: 3,
                                                                },
                                                            }}
                                                        >
                                                            <item.icon className="h-5 w-5 text-red-600" />
                                                        </motion.div>
                                                        <span className="text-red-800">{item.text}</span>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </AlertDescription>
                                    </Alert>
                                </motion.div>
                            </div>
                        </div>
                    </MotionSection> */}

                {/* Treatment Path */}
                <Reveal width="100%" className="bg-gray-50 sm:py-16 py-8" data-section="treatment">
                    <div className="container mx-auto px-4">
                        <motion.h2
                            variants={{
                                hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            className="text-3xl font-bold text-center mb-12"
                        >
                            Advanced Treatment Options
                        </motion.h2>

                        <div className="max-w-6xl mx-auto">
                            <TreatmentPathCarousel shouldReduceMotion={shouldReduceMotion ?? false} />
                        </div>
                    </div>
                </Reveal>

                {/* Recovery Timeline */}
                <Reveal width="100%" className="sm:py-16 py-8" data-section="timeline">
                    <div className="container mx-auto px-4">
                        <motion.h2
                            variants={{
                                hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            className="text-3xl font-bold text-center mb-12"
                        >
                            Recovery Timeline
                        </motion.h2>

                        <div className="max-w-4xl mx-auto">
                            <Card className="sm:p-8 p-6">
                                <div className="space-y-6">
                                    <div className="text-center">
                                        <Label className="text-lg font-medium">Phase {timelineWeek[0]}</Label>
                                    </div>

                                    <motion.div
                                        animate={{
                                            background: `linear-gradient(90deg, #0A84FF ${(timelineWeek[0] / 3) * 100}%, #E5E7EB ${(timelineWeek[0] / 3) * 100}%)`,
                                        }}
                                        className="relative"
                                    >
                                        <Slider
                                            value={timelineWeek}
                                            onValueChange={setTimelineWeek}
                                            max={3}
                                            min={1}
                                            step={1}
                                            className="w-full"
                                        />
                                    </motion.div>

                                    <div className="flex justify-between sm:text-sm text-xs text-gray-500">
                                        <span>Acute Phase</span>
                                        <span>Recovery Phase</span>
                                        <span>Maintenance Phase</span>
                                    </div>

                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={timelineWeek[0]}
                                            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="bg-blue-50 p-6 rounded-lg"
                                        >
                                            {timelineWeek[0] === 1 && (
                                                <div>
                                                    <h4 className="font-semibold mb-2">Phase 1 - Acute Phase (Weeks 1-2)</h4>
                                                    <p className="text-gray-600 mb-3">
                                                        Focus on pain management and gentle movement. Most patients see significant improvement.
                                                    </p>
                                                    <div className="space-y-1 text-sm">
                                                        <div>• Driving: Wait until you can turn your head without pain</div>
                                                        <div>• Work: Desk work often possible with breaks and ergonomic setup</div>
                                                        <div>• Exercise: Gentle walking and prescribed movements only</div>
                                                    </div>
                                                </div>
                                            )}

                                            {timelineWeek[0] === 2 && (
                                                <div>
                                                    <h4 className="font-semibold mb-2">Phase 2 - Recovery Phase (Weeks 3-6)</h4>
                                                    <p className="text-gray-600 mb-3">
                                                        Progressive strengthening and return to normal activities. Most patients return to full
                                                        function.
                                                    </p>
                                                    <div className="space-y-1 text-sm">
                                                        <div>• Driving: Usually cleared for normal driving</div>
                                                        <div>• Work: Full return to work activities expected</div>
                                                        <div>• Exercise: Gradual return to gym and recreational activities</div>
                                                    </div>
                                                </div>
                                            )}

                                            {timelineWeek[0] === 3 && (
                                                <div>
                                                    <h4 className="font-semibold mb-2">Phase 3 - Maintenance Phase (Weeks 6+)</h4>
                                                    <p className="text-gray-600 mb-3">
                                                        Focus on preventing re-injury and optimizing long-term function. Return to sports and
                                                        high-level activities.
                                                    </p>
                                                    <div className="space-y-1 text-sm">
                                                        <div>• Driving: Full clearance for all driving activities</div>
                                                        <div>• Work: No restrictions for most occupations</div>
                                                        <div>• Exercise: Return to sports and high-impact activities</div>
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </Card>
                        </div>
                    </div>
                </Reveal>

                <InjuryInsuranceCoverage injuryType="car-accident" />

                {/* Clinic Finder */}
                <InjuryClinicFinder />

                <InjuryHotspots injuryType="car-accident" />

                <div className="w-full max-w-[1440px] mx-auto px-4 sm:py-16 py-8"><InjuryDoctorsSection doctors={doctors} /></div>

                {/* FAQs */}
                <Reveal width="100%" className="bg-gray-50 sm:py-16 py-8" data-section="faqs">
                    <div className="container mx-auto px-4">
                        <motion.h2
                            variants={{
                                hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            className="text-3xl font-bold text-center mb-12"
                        >
                            Car Accident FAQs
                        </motion.h2>

                        <div className="max-w-3xl mx-auto">
                            {/* <div className="mb-6">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input
                                            placeholder="Search frequently asked questions..."
                                            value={faqSearch}
                                            onChange={(e) => setFaqSearch(e.target.value)}
                                            className="pl-10"
                                        />
                                    </div>
                                </div> */}

                            <Accordion type="single" collapsible className="space-y-4">
                                {filteredFaqs.map((faq, i) => (
                                    <motion.div
                                        key={i}
                                        variants={{
                                            hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 10 },
                                            visible: {
                                                opacity: 1,
                                                y: 0,
                                                transition: { delay: i * 0.05 },
                                            },
                                        }}
                                    >
                                        <AccordionItem value={`item-${i}`} className="bg-white rounded-lg px-6">
                                            <AccordionTrigger className="text-left hover:no-underline">
                                                <span
                                                    dangerouslySetInnerHTML={{
                                                        __html: faqSearch
                                                            ? faq.q.replace(new RegExp(faqSearch, "gi"), `<mark class="bg-yellow-100">$&</mark>`)
                                                            : faq.q,
                                                    }}
                                                />
                                            </AccordionTrigger>
                                            <AccordionContent className="text-gray-600">
                                                <span
                                                    dangerouslySetInnerHTML={{
                                                        __html: faqSearch
                                                            ? faq.a.replace(new RegExp(faqSearch, "gi"), `<mark class="bg-yellow-100">$&</mark>`)
                                                            : faq.a,
                                                    }}
                                                />
                                            </AccordionContent>
                                        </AccordionItem>
                                    </motion.div>
                                ))}
                            </Accordion>

                            {filteredFaqs.length === 0 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center py-8 text-gray-500"
                                >
                                    No FAQs found matching "{faqSearch}"
                                </motion.div>
                            )}
                        </div>
                    </div>
                </Reveal>

                {/* Attorney & Patient Panel */}
                <InjuryAttorneyPanel showAttorneyPanel={true} />
                {/* Attorney Collaboration (legacy — replaced by InjuryAttorneyPanel above) */}
                {false && <Reveal width="100%" className="sm:py-16 py-8" data-section="attorney">
                    <div className="container mx-auto px-4">
                        <motion.h2
                            variants={{
                                hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            className="text-3xl font-bold text-center mb-12"
                        >
                            Attorney Collaboration & Documentation
                        </motion.h2>

                        <div className="max-w-4xl mx-auto">
                            <Tabs value={attorneyTab} onValueChange={setAttorneyTab}>
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="patients">For Patients</TabsTrigger>
                                    <TabsTrigger value="attorneys">For Attorneys</TabsTrigger>
                                </TabsList>

                                <AnimatePresence mode="wait">
                                    <TabsContent key="patients" value="patients" className="mt-6">
                                        <motion.div
                                            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -10 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Card className="p-6">
                                                <h3 className="text-xl font-semibold mb-4">Working with Your Attorney</h3>
                                                <div className="space-y-4 text-gray-600">
                                                    <p>
                                                        We understand that car accidents often involve legal proceedings. We work closely with
                                                        attorneys to ensure you receive the care you need while maintaining proper documentation.
                                                    </p>
                                                    <div className="bg-blue-50 p-4 rounded-lg">
                                                        <h4 className="font-medium text-blue-900 mb-2">What we provide:</h4>
                                                        <ul className="space-y-1 text-blue-800 text-sm">
                                                            <li>• Detailed medical records and reports</li>
                                                            <li>• Prompt scheduling coordination</li>
                                                            <li>• Independent medical examinations when requested</li>
                                                            <li>• Clear documentation of treatment necessity</li>
                                                        </ul>
                                                    </div>
                                                    <p className="text-sm text-gray-500">
                                                        <strong>Important:</strong> Our medical judgment remains independent. We treat based on
                                                        clinical need, not legal strategy.
                                                    </p>
                                                </div>
                                            </Card>
                                        </motion.div>
                                    </TabsContent>

                                    <TabsContent key="attorneys" value="attorneys" className="mt-6">
                                        <motion.div
                                            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -10 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {/* <Card className="p-6">
                                                    <h3 className="text-xl font-semibold mb-4">Attorney Coordination Form</h3>
                                                    <form className="space-y-4">
                                                        <div className="grid md:grid-cols-2 gap-4">
                                                            <div className="flex flex-col gap-2">
                                                                <Label htmlFor="firm-name">Law Firm Name</Label>
                                                                <Input id="firm-name" placeholder="Enter firm name" />
                                                            </div>
                                                            <div className="flex flex-col gap-2">
                                                                <Label htmlFor="direct-line">Direct Line</Label>
                                                                <Input id="direct-line" type="tel" placeholder="(555) 123-4567" />
                                                            </div>
                                                        </div>

                                                        <div className="flex flex-col gap-2">
                                                            <Label htmlFor="secure-email">Secure Email</Label>
                                                            <Input id="secure-email" type="email" placeholder="attorney@lawfirm.com" />
                                                        </div>

                                                        <div className="grid md:grid-cols-2 gap-4">
                                                            <div className="flex flex-col gap-2">
                                                                <Label htmlFor="patient-name">Patient Name</Label>
                                                                <Input id="patient-name" placeholder="Full legal name" />
                                                            </div>
                                                            <div className="flex flex-col gap-2">
                                                                <Label htmlFor="patient-dob">Patient DOB</Label>
                                                                <Input id="patient-dob" type="date" />
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center space-x-2 flex-col gap-2">
                                                            <input type="checkbox" id="consent" className="rounded" />
                                                            <Label htmlFor="consent" className="text-sm">
                                                                Patient has provided written consent for medical record sharing
                                                            </Label>
                                                        </div>

                                                        <Button
                                                            type="submit"
                                                            className="w-full bg-[#0A84FF] hover:bg-[#0A84FF]/90"
                                                            data-cta="attorney-form-submit"
                                                        >
                                                            Submit Coordination Request
                                                        </Button>
                                                    </form>
                                                </Card> */}
                                            <LawyerContactForm
                                            />
                                        </motion.div>
                                    </TabsContent>
                                </AnimatePresence>
                            </Tabs>
                        </div>
                    </div>
                </Reveal>}

                {/* Final CTA */}
                <Reveal width="100%" className="bg-[#0A84FF] text-white sm:py-16 py-8" data-section="final-cta">
                    <div className="container mx-auto px-4 text-center">
                        <motion.h2

                            className="text-4xl font-bold mb-6 bg-clip-text"
                        >
                            Book an Appointment
                        </motion.h2>

                        <motion.p
                            variants={{
                                hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            className="text-xl mb-8 text-blue-100"
                        >
                            Most insurances accepted. Same-week access. HIPAA-safe texting.
                        </motion.p>

                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            className="flex flex-col sm:flex-row gap-4 justify-center w-full mx-auto max-w-5xl self-center items-center"
                        >
                            <motion.div
                                whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
                                animate={{
                                    scale: shouldReduceMotion ? 1 : [1, 1.02, 1],
                                    transition: {
                                        delay: 5,
                                        duration: 0.6,
                                        repeat: shouldReduceMotion ? 0 : Number.POSITIVE_INFINITY,
                                        repeatDelay: 10,
                                    },
                                }}
                            >
                                <BookAnAppoitmentButton className="w-full" />
                            </motion.div>
                            <Link
                                href="/find-care/free-mri-review"
                                className="w-fit border-white h-14 border rounded-full hover:cursor-pointer items-center justify-center px-[32px] py-[16px] text-white hover:bg-white hover:text-[#0A84FF] bg-transparent"

                            >
                                Free MRI Review
                            </Link>
                            <a
                                href="sms:5612239959"
                                className="w-fit h-14 group flex-row hover:cursor-pointer border rounded-full items-center justify-center px-[32px] py-[16px] border-white text-white hover:bg-white hover:text-[#0A84FF] bg-transparent"
                            >
                                Text Us
                            </a>
                        </motion.div>
                    </div>
                </Reveal>


                {/* Sticky Mobile Footer */}
                {/* <StickyMobileFooter /> */}

            </div>
        </section>
    )
}
