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
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calendar, Clock, User, Mail, Phone, Building, FileText, Scale } from "lucide-react"
import { BorderBeam } from "@/components/magicui/border-beam"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useRouter, usePathname } from "next/navigation"
import { pushAcceptedLead } from "@/utils/enhancedConversions"
import { STATE_OPTIONS, slugFromPathname } from "@/lib/stateUtils"

const lawyerSchema = z.object({
    firmName: z.string().min(2, "Firm name is required"),
    attorneyName: z.string().min(2, "Attorney name is required"),
    email: z.string().email("Valid email is required"),
    phone: z.string().min(10, "Valid phone number is required"),
    barNumber: z.string().optional(),
    practiceAreas: z.string().min(1, "Please select practice areas"),
    caseType: z.string().min(1, "Please select case type"),
    clientName: z.string().min(2, "Client name is required"),
    clientEmail: z.string().email("Valid client email is required"),
    clientPhone: z.string().min(10, "Valid client phone is required"),
    accidentDate: z.string().min(1, "Please select accident date"),
    injuryDescription: z.string().min(10, "Please provide injury description"),
    urgency: z.string().min(1, "Please select urgency level"),
    additionalInfo: z.string().optional(),
    clientState: z.string().min(1, "Please select the client's state"),
})

type LawyerFormData = z.infer<typeof lawyerSchema>

const practiceAreas = [
    "Personal Injury",
    "Car Accident Law",
    "Workers' Compensation",
    "Medical Malpractice",
    "Product Liability",
    "Premises Liability",
    "Other"
]

const caseTypes = [
    "Car Accident",
    "Slip and Fall",
    "Workplace Injury",
    "Medical Malpractice",
    "Product Defect",
    "Other"
]

const accidentDates = [
    "Today",
    "Yesterday",
    "This week",
    "Last week",
    "2-4 weeks ago",
    "1-3 months ago",
    "More than 3 months ago"
]

const locations = ["Altamonte Springs", "Hollywood", "Fort Pierce", "Davenport", "Orlando"]

export function LawyerContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [attribution, setAttribution] = useState(EMPTY_ATTRIBUTION)
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        setAttribution(getAttributionData())
    }, [])

    const form = useForm<LawyerFormData>({
        resolver: zodResolver(lawyerSchema),
        defaultValues: {
            firmName: "",
            attorneyName: "",
            email: "",
            phone: "",
            barNumber: "",
            practiceAreas: "",
            caseType: "",
            clientName: "",
            clientEmail: "",
            clientPhone: "",
            accidentDate: "",
            injuryDescription: "",
            urgency: "",
            additionalInfo: "",
            clientState: "",
        },
    })

    const onSubmit = async (values: LawyerFormData) => {
        setIsSubmitting(true)
        try {
            const res = await fetch("/api/forms/lawyer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...values, ...attribution }),
            })

            if (res.redirected) {
                router.push(res.url)
                return
            }

            if (!res.ok) {
                return
            }

            const accepted = await pushAcceptedLead({ acceptance: res, form_name: 'LawyerContactForm', form_source: 'attorney-coordination', state: values.clientState, email: values.email, phone: values.phone })
            if (!accepted) return
            setOpenDialog(false)
            setIsSubmitted(true)
            router.push('/thank-you')
        } catch (error) {
            console.error('Error submitting form:', error)
        } finally {
            setIsSubmitting(false)
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
                        <Scale className="w-6 h-6 text-green-600" />
                    </div>
                    <h3
                        style={{ fontFamily: "var(--font-public-sans)", fontWeight: 500 }}
                        className="text-[#111315] text-lg mb-2"
                    >
                        Attorney Coordination Request Received!
                    </h3>
                    <p
                        style={{ fontFamily: "var(--font-inter)", fontWeight: 400 }}
                        className="text-[#424959] mb-4"
                    >
                        We'll contact you within 2 hours to coordinate your client's care and documentation needs.
                    </p>
                    <p
                        style={{ fontFamily: "var(--font-inter)", fontWeight: 400 }}
                        className="text-[#838890] text-sm"
                    >
                        Need immediate coordination? Call (561) 223-9959
                    </p>
                </div>
                <BorderBeam duration={8} size={200} borderWidth={2} colorFrom="#0A50EC" colorTo="#ffffff" />
            </div>
        )
    }

    return (
        <div className="relative w-full p-4 rounded-3xl overflow-hidden" data-section="lawyer-contact-form">
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
                    <h4
                        style={{
                            fontFamily: 'var(--font-public-sans)',
                            fontWeight: 500,
                        }}
                        className='text-[#111315] text-2xl mb-2 flex items-center space-x-2'
                    >
                        <Scale className="w-5 h-5 text-[#0A50EC]" />
                        <span>Attorney Coordination Request</span>
                    </h4>
                    <p
                        style={{
                            fontFamily: 'var(--font-inter)',
                            fontWeight: 400,
                        }}
                        className="text-[#424959] text-sm"
                    >
                        Coordinate your client's orthopedic care and documentation needs
                    </p>
                </div>

                {/* Step 1: Basic attorney info */}
                <Form {...form}>
                    <form className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="firmName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm text-[#838890] font-semibold">Law Firm Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Law Firm Name" startIcon={Building} className="sm:h-12 h-10 text-lg border-[#DCDEE1]" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="attorneyName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm text-[#838890] font-semibold">Attorney Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Attorney Name" startIcon={User} className="sm:h-12 h-10 text-lg border-[#DCDEE1]" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm text-[#838890] font-semibold">Attorney Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="attorney@lawfirm.com" startIcon={Mail} className="sm:h-12 h-10 text-lg border-[#DCDEE1]" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm text-[#838890] font-semibold">Attorney Phone</FormLabel>
                                    <FormControl>
                                        <Input placeholder="+1 0123456789" startIcon={Phone} className="sm:h-12 h-10 text-lg border-[#DCDEE1]" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="button"
                            className="w-full max-h-[56px] h-full px-[32px] py-[16px] rounded-[62px] relative flex bg-[#0A50EC] text-white text-[14px] font-semibold justify-center items-center hover:cursor-pointer"
                            onClick={() => setOpenDialog(true)}
                            data-cta="lawyer-open-dialog"
                        >
                            <span className="text-white">Continue to Client Details</span>
                        </Button>
                    </form>
                </Form>

                {/* Step 2: Dialog with client details and case info */}
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <DialogContent className="rounded-[20px] p-4 sm:p-[32px] sm:min-w-3xl w-full max-h-[90vh] overflow-y-auto">
                        <DialogTitle className='text-[#111315] text-2xl' style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}>
                            Complete Attorney Coordination Request
                        </DialogTitle>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                                {/* Attorney Info (prefilled) */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FormField control={form.control} name="firmName" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Law Firm Name</FormLabel>
                                            <FormControl><Input startIcon={Building} {...field} className="sm:h-12 h-10 text-lg border-[#DCDEE1]" /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField control={form.control} name="attorneyName" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Attorney Name</FormLabel>
                                            <FormControl><Input startIcon={User} {...field} className="sm:h-12 h-10 text-lg border-[#DCDEE1]" /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField control={form.control} name="email" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Attorney Email</FormLabel>
                                            <FormControl><Input startIcon={Mail} type="email" {...field} className="sm:h-12 h-10 text-lg border-[#DCDEE1]" /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField control={form.control} name="phone" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Attorney Phone</FormLabel>
                                            <FormControl><Input startIcon={Phone} {...field} className="sm:h-12 h-10 text-lg border-[#DCDEE1]" /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                </div>

                                {/* Bar Number */}
                                <FormField control={form.control} name="barNumber" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Bar Number (Optional)</FormLabel>
                                        <FormControl><Input placeholder="Bar Number" {...field} className="sm:h-12 h-10 text-lg border-[#DCDEE1]" /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                {/* Practice Areas */}
                                <FormField control={form.control} name="practiceAreas" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Practice Areas</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-full sm:h-12 h-10 px-6 bg-[#f0f5ff] border rounded-sm"><SelectValue placeholder="Select practice areas" className="sm:h-12 h-10 text-lg" /></SelectTrigger>
                                            <SelectContent>
                                                {practiceAreas.map((area) => (<SelectItem key={area} value={area}>{area}</SelectItem>))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                {/* Client Info */}
                                <div className="border-t pt-4">
                                    <h5 className="text-lg font-semibold mb-4 text-[#111315]">Client Information</h5>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <FormField control={form.control} name="clientName" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Client Name</FormLabel>
                                                <FormControl><Input startIcon={User} {...field} className="sm:h-12 h-10 text-lg border-[#DCDEE1]" /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={form.control} name="clientEmail" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Client Email</FormLabel>
                                                <FormControl><Input startIcon={Mail} type="email" {...field} className="sm:h-12 h-10 text-lg border-[#DCDEE1]" /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={form.control} name="clientPhone" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Client Phone</FormLabel>
                                                <FormControl><Input startIcon={Phone} {...field} className="sm:h-12 h-10 text-lg border-[#DCDEE1]" /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={form.control} name="accidentDate" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Accident Date</FormLabel>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger className="w-full sm:h-12 h-10 px-6 bg-[#f0f5ff] border rounded-sm"><SelectValue placeholder="When did accident occur?" className="sm:h-12 h-10 text-lg" /></SelectTrigger>
                                                    <SelectContent>
                                                        {accidentDates.map((date) => (<SelectItem key={date} value={date}>{date}</SelectItem>))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    </div>
                                </div>

                                {/* Case Details */}
                                <div className="border-t pt-4 flex flex-col gap-y-3">
                                    <h5 className="text-lg font-semibold mb-4 text-[#111315]">Case Details</h5>
                                    <FormField control={form.control} name="caseType" render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Case Type</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger className="w-full sm:h-12 h-10 px-6 bg-[#f0f5ff] border rounded-sm"><SelectValue placeholder="Select case type" className="sm:h-12 h-10 text-lg" /></SelectTrigger>
                                                <SelectContent>
                                                    {caseTypes.map((type) => (<SelectItem key={type} value={type}>{type}</SelectItem>))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )} />

                                    <FormField control={form.control} name="injuryDescription" render={({ field }) => (
                                        <FormItem className="flex flex-col my-1">
                                            <FormLabel>Injury Description</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Describe the client's injuries in detail..." className="min-h-[100px] text-lg border-[#DCDEE1]" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <FormField control={form.control} name="urgency" render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>Urgency Level</FormLabel>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger className="w-full sm:h-12 h-10 px-6 bg-[#f0f5ff] border rounded-sm"><SelectValue placeholder="Select urgency" className="sm:h-12 h-10 text-lg" /></SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="urgent">Urgent (Same day)</SelectItem>
                                                        <SelectItem value="high">High (This week)</SelectItem>
                                                        <SelectItem value="medium">Medium (Next week)</SelectItem>
                                                        <SelectItem value="low">Low (Flexible)</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={form.control} name="clientState" render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>Client State<span className="text-red-500">*</span></FormLabel>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger className="w-full sm:h-12 h-10 px-6 bg-[#f0f5ff] border rounded-sm"><SelectValue placeholder="Select state" /></SelectTrigger>
                                                    <SelectContent>
                                                        {STATE_OPTIONS.map(({ value, label }) => (
                                                            <SelectItem key={value} value={value}>{label}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        {/* <FormField control={form.control} name="preferredLocation" render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>Preferred Location</FormLabel>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger className="w-full sm:h-12 h-10 px-6 bg-[#f0f5ff] border rounded-sm"><SelectValue placeholder="Select location" className="sm:h-12 h-10 text-lg" /></SelectTrigger>
                                                    <SelectContent>
                                                        {locations.map((loc) => (<SelectItem key={loc} value={loc}>{loc}</SelectItem>))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )} /> */}
                                    </div>

                                    <FormField control={form.control} name="additionalInfo" render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Additional Information (Optional)</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Any additional information about the case..." className="min-h-[80px] text-lg border-[#DCDEE1]" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                </div>

                                <Button type="submit" className="w-full max-h-[56px] h-full px-[32px] py-[16px] rounded-[62px] relative flex bg-[#0A50EC] text-white text-[14px] font-semibold justify-center items-center hover:cursor-pointer" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <div className="flex items-center space-x-2"><span className="text-white">Submitting...</span><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div></div>
                                    ) : (
                                        <span className="text-white">Submit Attorney Coordination Request</span>
                                    )}
                                </Button>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>
            <BorderBeam duration={8} size={200} borderWidth={2} colorFrom="#0A50EC" colorTo="#ffffff" />
        </div>
    )
}
