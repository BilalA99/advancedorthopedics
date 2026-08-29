"use client"

import { useState, useEffect } from "react"
import { EMPTY_ATTRIBUTION, getAttributionData } from "@/lib/gclid"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calendar, Clock, User, Mail, Phone, Car, MapPin, FileText } from "lucide-react"
import { BorderBeam } from "@/components/magicui/border-beam"
import { sendContactEmail, sendUserEmail } from "@/components/email/sendcontactemail"
import { redirect } from "next/navigation"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { clinicsForMap as clinics } from "@/components/data/clinicsForMap.generated"
import { pushAcceptedLead } from "@/utils/enhancedConversions"
import { STATE_OPTIONS } from "@/lib/stateUtils"

const leadSchema = z.object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    phone: z.string().min(10, "Valid phone number is required"),
    email: z.string().email("Valid email is required"),
    accidentDate: z.string().min(1, "Please select accident date"),
    injuryType: z.string().min(1, "Please select your injury type"),
    painLevel: z.string().min(1, "Please select your pain level"),
    location: z.string().min(1, "Please select preferred location"),
    hasAttorney: z.string().min(1, "Please let us know about attorney representation"),
    state: z.string().min(1, "Please select your state"),
})

type LeadFormData = z.infer<typeof leadSchema>

const injuryTypes = [
    "Neck pain/whiplash",
    "Back pain (upper or lower)",
    "Shoulder injury",
    "Knee injury",
    "Wrist/hand injury",
    "Hip injury",
    "Multiple areas",
    "Other injury",
]

const painLevels = [
    "Mild (1-3)",
    "Moderate (4-6)",
    "Severe (7-8)",
    "Very severe (9-10)",
]


const accidentDates = [
    "Today",
    "Yesterday",
    "This week",
    "Last week",
    "2-4 weeks ago",
    "1-3 months ago",
    "More than 3 months ago",
]

export function CarAccidentLeadCaptureForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [attribution, setAttribution] = useState(EMPTY_ATTRIBUTION)

    useEffect(() => {
        setAttribution(getAttributionData())
    }, [])
    const form = useForm<LeadFormData>({
        resolver: zodResolver(leadSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            accidentDate: "",
            injuryType: "",
            painLevel: "",
            location: "",
            hasAttorney: "",
            state: "",
        },
    })
    async function onSubmit(values: z.infer<typeof leadSchema>) {
        setIsSubmitting(true)
        const data = await sendContactEmail({ name: values.firstName, email: values.email, phone: values.phone, reason: values.injuryType, bestTime: values.painLevel, has_attorney: values.hasAttorney, injury_type: values.injuryType, pain_level: values.painLevel, location: values.location, state: values.state, gclid: attribution.gclid, utm_source: attribution.utm_source, utm_medium: attribution.utm_medium, utm_campaign: attribution.utm_campaign, utm_term: attribution.utm_term, utm_content: attribution.utm_content })
        const acceptance = await sendUserEmail({
            name: values.firstName,
            email: values.email,
            phone: values.phone,
            state: values.state,
            reason: values.injuryType,
            form_source: 'car-accident',
            gclid: attribution.gclid,
            gbraid: attribution.gbraid,
            wbraid: attribution.wbraid,
            utm_source: attribution.utm_source,
            utm_medium: attribution.utm_medium,
            utm_campaign: attribution.utm_campaign,
            utm_term: attribution.utm_term,
            utm_content: attribution.utm_content,
        })
        
        // Enhanced Conversions
        await pushAcceptedLead({ acceptance, form_name: 'CarAccidentLeadForm', form_source: 'car-accident', state: values.state, email: values.email, phone: values.phone, firstName: values.firstName, lastName: values.lastName });
        
        setIsSubmitting(false)
        if (data) {
            setIsOpen(false)
            //setAppointmentConfirm(true) 
            redirect('/thank-you')
            form.reset()
        }
    }

    if (isSubmitted) {
        return (
            <div className="relative w-full p-4 rounded-3xl overflow-hidden">
                {/* SVG Filter Definition */}
                <svg style={{ display: 'none' }}>
                    <filter id="displacementFilter">
                        <feTurbulence
                            type="turbulence"
                            baseFrequency="0.01"
                            numOctaves="2"
                            result="turbulence"
                        />
                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="turbulence"
                            scale="200"
                            xChannelSelector="R"
                            yChannelSelector="G"
                        />
                    </filter>
                </svg>

                {/* Liquid Glass Background */}
                <div
                    className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden"
                    style={{
                        filter: 'drop-shadow(-8px -10px 46px #0000005f)',
                        backdropFilter: 'brightness(1.1) blur(2px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                    }}
                >
                    <div
                        className="absolute inset-0 rounded-3xl"
                        style={{
                            boxShadow: 'inset 6px 6px 0px -6px rgba(255, 255, 255, 0.7), inset 0 0 8px 1px rgba(255, 255, 255, 0.7)',
                        }}
                    />
                </div>

                {/* Content */}
                <div className="relative z-10 p-6 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Calendar className="w-6 h-6 text-green-600" />
                    </div>
                    <h3
                        style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500 }}
                        className="text-[#111315] text-lg mb-2"
                    >
                        Request Received!
                    </h3>
                    <p
                        style={{ fontFamily: "var(--font-inter)", fontWeight: 400 }}
                        className="text-[#424959] mb-4"
                    >
                        We'll contact you within 2 hours to schedule your appointment.
                    </p>
                    <p
                        style={{ fontFamily: "var(--font-inter)", fontWeight: 400 }}
                        className="text-[#838890] text-sm"
                    >
                        Need immediate care? Call (561) 223-9959
                    </p>
                </div>
                <BorderBeam duration={8} size={200} borderWidth={2} colorFrom="#0A50EC" colorTo="#ffffff" />
            </div>
        )
    }

    return (
        <div className="relative w-full p-4 rounded-3xl overflow-hidden" data-section="car-accident-lead-form">
            {/* SVG Filter Definition */}
            <svg style={{ display: 'none' }}>
                <filter id="displacementFilter">
                    <feTurbulence
                        type="turbulence"
                        baseFrequency="0.01"
                        numOctaves="2"
                        result="turbulence"
                    />
                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="turbulence"
                        scale="200"
                        xChannelSelector="R"
                        yChannelSelector="G"
                    />
                </filter>
            </svg>

            {/* Liquid Glass Background */}
            <div
                className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden"
                style={{
                    filter: 'drop-shadow(-8px -10px 46px #0000005f)',
                    backdropFilter: 'brightness(1.1) blur(2px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
            >
                <div
                    className="absolute inset-0 rounded-3xl"
                    style={{
                        boxShadow: 'inset 6px 6px 0px -6px rgba(255, 255, 255, 0.7), inset 0 0 8px 1px rgba(255, 255, 255, 0.7)',
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10">
                <div className="mb-6">
                    <h3
                        style={{
                            fontFamily: 'var(--font-public-sans)',
                            fontWeight: 500,
                        }}
                        className='text-[#111315] text-2xl mb-2 flex items-center space-x-2'
                    >
                        <Car className="w-5 h-5 text-[#0A50EC]" />
                        <span>Schedule Your Car Accident Evaluation</span>
                    </h3>
                    <p
                        style={{
                            fontFamily: 'var(--font-inter)',
                            fontWeight: 400,
                        }}
                        className="text-[#424959] text-sm"
                    >
                        Get expert orthopedic care for your car accident injuries
                    </p>
                </div>

                <Form {...form}>
                    <form className="space-y-6">

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm text-[#838890] font-semibold ">
                                            <span
                                                style={{
                                                    fontFamily: 'var(--font-public-sans)',
                                                    fontWeight: 500,
                                                }}
                                                className='text-[#111315] text-md'
                                            >   First Name</span>
                                        </FormLabel>
                                        <FormControl>
                                            <div className=" flex  ">
                                                <Input placeholder="First Name" startIcon={User} className="h-12 text-lg border-[#DCDEE1] " {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm text-[#838890] font-semibold ">
                                            <span
                                                style={{
                                                    fontFamily: 'var(--font-public-sans)',
                                                    fontWeight: 500,
                                                }}
                                                className='text-[#111315] text-md'
                                            >   Last Name</span>
                                        </FormLabel>
                                        <FormControl>
                                            <div className=" flex  ">
                                                <Input placeholder="Last Name" startIcon={User} className="h-12 text-lg border-[#DCDEE1] " {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm text-[#838890] font-semibold ">
                                        <span
                                            style={{
                                                fontFamily: 'var(--font-public-sans)',
                                                fontWeight: 500,
                                            }}
                                            className='text-[#111315] text-md'
                                        >   Phone Number</span>
                                    </FormLabel>
                                    <FormControl>
                                        <div className=" flex  ">
                                            <Input placeholder="Phone Number" startIcon={Phone} className="h-12 text-lg border-[#DCDEE1] " {...field} />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm text-[#838890] font-semibold ">
                                        <span
                                            style={{
                                                fontFamily: 'var(--font-public-sans)',
                                                fontWeight: 500,
                                            }}
                                            className='text-[#111315] text-md'
                                        >   Email</span>
                                    </FormLabel>
                                    <FormControl>
                                        <div className=" flex  ">
                                            <Input placeholder="Email" startIcon={Mail} className="h-12 text-lg border-[#DCDEE1] " {...field} />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <Button
                            className="w-full max-h-[56px] h-full px-[32px] py-[16px] rounded-[62px] relative flex bg-[#0A50EC] text-white text-[14px] font-semibold justify-center items-center hover:cursor-pointer"
                            disabled={isSubmitting}
                            data-cta="car-accident-schedule-evaluation"
                            onClick={(e) => {
                                e.preventDefault()
                                setIsOpen(true)
                            }}
                        >
                            {isSubmitting ? (
                                <div className="flex items-center space-x-2">
                                    <span className="text-white">Scheduling...</span>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                </div>
                            ) : (
                                <span
                                    style={{
                                        fontFamily: "var(--font-public-sans)",
                                        fontWeight: 500,
                                    }}
                                    className="text-white"
                                >
                                    Schedule My Car Accident Evaluation
                                </span>
                            )}
                        </Button>
                    </form>

                    <Dialog onOpenChange={setIsOpen} open={isOpen}>
                        <DialogContent className="w-full max-w-3xl">
                            <DialogTitle className="flex items-center gap-2 text-[#111315] text-2xl" style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}>
                                <Calendar className="w-5 h-5 text-[#0A50EC] shrink-0" />
                                Schedule Your Car Accident Evaluation
                            </DialogTitle>
                            <form className="space-y-6 flex flex-col">

                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="firstName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-sm text-[#838890] font-semibold ">
                                                    <span
                                                        style={{
                                                            fontFamily: 'var(--font-public-sans)',
                                                            fontWeight: 500,
                                                        }}
                                                        className='text-[#111315] text-md'
                                                    >   First Name</span>
                                                </FormLabel>
                                                <FormControl>
                                                    <div className=" flex  ">
                                                        <Input placeholder="First Name" startIcon={User} className="h-12 text-lg border-[#DCDEE1] " {...field} />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="lastName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-sm text-[#838890] font-semibold ">
                                                    <span
                                                        style={{
                                                            fontFamily: 'var(--font-public-sans)',
                                                            fontWeight: 500,
                                                        }}
                                                        className='text-[#111315] text-md'
                                                    >   Last Name</span>
                                                </FormLabel>
                                                <FormControl>
                                                    <div className=" flex  ">
                                                        <Input placeholder="Last Name" startIcon={User} className="h-12 text-lg border-[#DCDEE1] " {...field} />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm text-[#838890] font-semibold ">
                                                <span
                                                    style={{
                                                        fontFamily: 'var(--font-public-sans)',
                                                        fontWeight: 500,
                                                    }}
                                                    className='text-[#111315] text-md'
                                                >   Phone Number</span>
                                            </FormLabel>
                                            <FormControl>
                                                <div className=" flex  ">
                                                    <Input placeholder="Phone Number" startIcon={Phone} className="h-12 text-lg border-[#DCDEE1] " {...field} />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm text-[#838890] font-semibold ">
                                                <span
                                                    style={{
                                                        fontFamily: 'var(--font-public-sans)',
                                                        fontWeight: 500,
                                                    }}
                                                    className='text-[#111315] text-md'
                                                >   Email</span>
                                            </FormLabel>
                                            <FormControl>
                                                <div className=" flex  ">
                                                    <Input placeholder="Email" startIcon={Mail} className="h-12 text-lg border-[#DCDEE1] " {...field} />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="injuryType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm text-[#838890] font-semibold ">
                                                <span
                                                    style={{
                                                        fontFamily: 'var(--font-public-sans)',
                                                        fontWeight: 500,
                                                    }}
                                                    className='text-[#111315] text-md'
                                                >   What type of injury are you experiencing?</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Select onValueChange={(value) => field.onChange(value)}>
                                                    <SelectTrigger className={`w-full h-12 px-6 bg-[#f0f5ff] border rounded-sm`}>
                                                        <SelectValue placeholder="Select your injury type" className="font-[var(--font-inter)] h-12 text-lg" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {injuryTypes.map((injury) => (
                                                            <SelectItem key={injury} value={injury}>
                                                                {injury}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="painLevel"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm text-[#838890] font-semibold ">
                                                <span
                                                    style={{
                                                        fontFamily: 'var(--font-public-sans)',
                                                        fontWeight: 500,
                                                    }}
                                                    className='text-[#111315] text-md'
                                                >   What is your current pain level?</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Select onValueChange={(value) => field.onChange(value)}>
                                                    <SelectTrigger className={`w-full h-12 px-6 bg-[#f0f5ff] border rounded-sm`}>
                                                        <SelectValue placeholder="Select pain level" className="font-[var(--font-inter)] h-12 text-lg" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {painLevels.map((level) => (
                                                            <SelectItem key={level} value={level}>
                                                                {level}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />



                                <FormField
                                    control={form.control}
                                    name="location"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm text-[#838890] font-semibold ">
                                                <span
                                                    style={{
                                                        fontFamily: 'var(--font-public-sans)',
                                                        fontWeight: 500,
                                                    }}
                                                    className='text-[#111315] text-md'
                                                >
                                                    Preferred Location
                                                </span>
                                            </FormLabel>
                                            <FormControl>
                                                <Select onValueChange={(value) => field.onChange(value)}>
                                                    <SelectTrigger className={`w-full h-12 px-6 bg-[#f0f5ff] border rounded-sm`}>
                                                        <SelectValue placeholder="Select pain level" className="font-[var(--font-inter)] h-12 text-lg" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {clinics.map((level) => (
                                                            <SelectItem key={level.name} value={level.region}>
                                                                {level.region}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                               

                                <FormField
                                    control={form.control}
                                    name="hasAttorney"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm text-[#838890] font-semibold ">
                                                <span
                                                    style={{
                                                        fontFamily: 'var(--font-public-sans)',
                                                        fontWeight: 500,
                                                    }}
                                                    className='text-[#111315] text-md'
                                                >
                                                    Do you have an attorney representing you?
                                                </span>
                                            </FormLabel>
                                            <FormControl>
                                                <Select onValueChange={(value) => field.onChange(value)}>
                                                    <SelectTrigger className={`w-full h-12 px-6 bg-[#f0f5ff] border rounded-sm`}>
                                                        <SelectValue placeholder="Select option" className="font-[var(--font-inter)] h-12 text-lg" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="yes">Yes, I have an attorney</SelectItem>
                                                        <SelectItem value="considering">I'm considering hiring one</SelectItem>
                                                        <SelectItem value="no">No, I don't have an attorney</SelectItem>
                                                        <SelectItem value="not-sure">Not sure yet</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="state"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm text-[#838890] font-semibold">
                                                <span style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }} className="text-[#111315] text-md">
                                                    State <span className="text-red-500">*</span>
                                                </span>
                                            </FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger className="w-full h-12 px-6 bg-[#f0f5ff] border border-[#DCDEE1] rounded-sm">
                                                        <SelectValue placeholder="Select your state" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {STATE_OPTIONS.map(({ value, label }) => (
                                                            <SelectItem key={value} value={value}>{label}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    className="w-full max-h-[56px] h-full px-[32px] py-[16px] rounded-[62px] relative flex bg-[#0A50EC] text-white text-[14px] font-semibold justify-center items-center hover:cursor-pointer"
                                    disabled={isSubmitting}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        form.handleSubmit(onSubmit)()
                                    }}
                                    data-cta="car-accident-schedule-evaluation"
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center space-x-2">
                                            <span className="text-white">Scheduling...</span>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        </div>
                                    ) : (
                                        <span
                                            style={{
                                                fontFamily: "var(--font-public-sans)",
                                                fontWeight: 500,
                                            }}
                                            className="text-white"
                                        >
                                            Schedule My Car Accident Evaluation
                                        </span>
                                    )}
                                </Button>
                            </form>

                        </DialogContent>
                    </Dialog>
                </Form>
            </div>
            <BorderBeam duration={8} size={200} borderWidth={2} colorFrom="#0A50EC" colorTo="#ffffff" />
        </div>
    )
}
