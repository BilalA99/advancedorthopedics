"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon, ChevronDown, Clock, User, Mail, Phone, Upload, Shield, FileImage } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import BookAnAppoitmentButton from "./BookAnAppoitmentButton"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog"
import { useState, useEffect } from "react"
import BookAnAppointmentClient from "./BookAnAppointmentClient"
import Link from "next/link"
import { EMPTY_ATTRIBUTION, getAttributionData } from "@/lib/gclid"
import { usePathname, useRouter } from "next/navigation"
import { appendPreparedUploads } from "@/lib/client-upload"
import { pushAcceptedLead } from "@/utils/enhancedConversions"
import { resolveFormSource } from "@/lib/lead-contract"
const formSchema = z.object({
    name: z.string().min(2, "name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    bestTime: z.string().min(1, "Please select a time"),
    date: z.date({
        required_error: "Please select a date",
    }),
    reason: z.string().min(0),
    selectService: z.string(),
    gender: z.string(),
    appointmentTime: z.string(),
    insuranceCardFront: z.instanceof(File).optional().or(z.null()),
    insuranceCardBack: z.instanceof(File).optional().or(z.null())
})

export default function BookAnAppointmentPopup() {
    const [openContactForm, setOpenContactForm] = useState(false)
    const [openAppointmentConfirm, setAppointmentConfirm] = useState(false)
    const [loading, setLoading] = useState(false)
    const [attribution, setAttribution] = useState(EMPTY_ATTRIBUTION)
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        setAttribution(getAttributionData())
    }, [])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            reason: "",
            bestTime: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setLoading(true)
            const firstName = values.name.split(' ')[0] || values.name
            const lastName = values.name.split(' ').slice(1).join(' ') || ''
            const formSource = resolveFormSource({ pathname, formId: 'BookAnAppointmentPopup' })

            const payload = new FormData()
            payload.append('firstName', firstName)
            payload.append('lastName', lastName)
            payload.append('email', values.email)
            payload.append('phone', values.phone)
            payload.append('reason', values.reason)
            payload.append('bestTime', values.bestTime)
            payload.append('form_source', formSource)
            payload.append('gclid', attribution.gclid)
            payload.append('gbraid', attribution.gbraid)
            payload.append('wbraid', attribution.wbraid)
            payload.append('utm_source', attribution.utm_source)
            payload.append('utm_medium', attribution.utm_medium)
            payload.append('utm_campaign', attribution.utm_campaign)
            payload.append('utm_term', attribution.utm_term)
            payload.append('utm_content', attribution.utm_content)

            const uploadError = await appendPreparedUploads(payload, [
                { fieldName: 'insuranceCardFront', file: values.insuranceCardFront },
                { fieldName: 'insuranceCardBack', file: values.insuranceCardBack },
            ])
            if (uploadError) {
                uploadError.fieldNames.forEach((fieldName) => {
                    form.setValue(fieldName as 'insuranceCardFront' | 'insuranceCardBack', null)
                })
                form.setError(uploadError.fieldNames[0] as 'insuranceCardFront' | 'insuranceCardBack', { message: uploadError.message })
                return
            }

            const res = await fetch('/api/forms/book-appointment', {
                method: 'POST',
                body: payload,
            })

            if (res.redirected) {
                router.push(res.url)
                return
            }

            if (!res.ok) {
                return
            }

            const accepted = await pushAcceptedLead({
                acceptance: res,
                form_name: 'BookAnAppointmentPopup',
                form_source: formSource,
                state: '',
                email: values.email,
                phone: values.phone,
                firstName,
                lastName,
            })
            if (!accepted) return

            router.push('/thank-you')
        } catch (error) {
            console.error('Error submitting form:', error)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="w-full self-center flex items-center justify-center flex-col" onClick={() => setOpenContactForm(true)}>
            <p
                style={{
                    fontFamily: 'var(--font-public-sans)',
                    fontWeight: 500,
                }}
                className='text-[#111315] text-xl'
            >
                Book Your Appointment
            </p>
            <div className="w-full backdrop-blur-[15px] bg-white bg-opacity-50"
            >
                {/* Might need to add location selector here and replace appointment date and time with Best */}
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">

                        {/* Name Fields */}
                        <div className="grid grid-cols-1  gap-6">
                            <FormField
                                control={form.control}
                                name="name"

                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm text-[#111315] font-semibold ">Full Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Name" startIcon={User} className="h-12 text-lg border-[#DCDEE1]  bg-[#FAFAFA]" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>

                        {/* Contact Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            <span
                                                style={{
                                                    fontFamily: 'var(--font-public-sans)',
                                                    fontWeight: 500,
                                                }}
                                                className='text-[#111315] text-md'
                                            >
                                                Email Address
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your email" startIcon={Mail} className="h-12 text-lg border-[#DCDEE1]  bg-[#FAFAFA]" {...field} />
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
                                        <FormLabel>
                                            <span
                                                style={{
                                                    fontFamily: 'var(--font-public-sans)',
                                                    fontWeight: 500,
                                                }}
                                                className='text-[#111315] text-md'
                                            >
                                                Phone Number
                                            </span>

                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="+1 0123456789" startIcon={Phone} className="h-12 text-lg  border-[#DCDEE1] bg-[#FAFAFA]" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="bestTime"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        <span
                                            style={{
                                                fontFamily: 'var(--font-public-sans)',
                                                fontWeight: 500,
                                            }}
                                            className='text-[#111315] text-md'
                                        >
                                            Best Time To Contact
                                        </span>
                                    </FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value} >
                                            <SelectTrigger aria-label="Select Best Time To Contact"
                                                className="w-full h-12 px-6 bg-[#f0f5ff]  border rounded-sm"
                                            >
                                                <SelectValue placeholder="Select Best Time To Contact" className=" font-[var(--font-inter)] h-12 text-lg data-[placeholder]:text-red-500" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {["As Soon As Possible", "Morning", "Afternoon", "Evening"].map((service) => (
                                                        <SelectItem key={service} value={service}>
                                                            {service}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        {/* Reason Field */}
                        <FormField
                            control={form.control}
                            name="reason"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm text-[#111315] font-semibold">Consultation Reason</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Consultation Reason" className="min-h-[200px] text-lg resize-none  border-[#DCDEE1]  bg-[#FAFAFA]" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Insurance Card Upload Section */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Shield className="h-5 w-5 text-green-600" />
                                <span className="text-sm font-medium text-green-700">HIPAA Compliant & Secure</span>
                            </div>

                            {/* Front of Insurance Card */}
                            <FormField
                                control={form.control}
                                name="insuranceCardFront"
                                render={({ field: { onChange, value, ...field } }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm text-[#111315] font-semibold">
                                            Front of Insurance Card
                                            <span className="text-xs text-gray-500 font-normal ml-1">(Optional)</span>
                                        </FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <input
                                                    type="file"
                                                    accept="image/*,.pdf"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0] || null;
                                                        onChange(file);
                                                    }}
                                                    className="hidden"
                                                    id="insurance-front"
                                                    {...field}
                                                />
                                                <label
                                                    htmlFor="insurance-front"
                                                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#DCDEE1] rounded-lg cursor-pointer bg-[#FAFAFA] hover:bg-[#F5F5F5] transition-colors"
                                                >
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <FileImage className="w-8 h-8 mb-2 text-[#838890]" />
                                                        <p className="mb-2 text-sm text-[#111315]">
                                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                                        </p>
                                                        <p className="text-xs text-[#838890]">PNG, JPG, PDF up to 15MB</p>
                                                        {value && (
                                                            <p className="text-xs text-green-600 mt-1 font-medium">
                                                                ✓ {value.name}
                                                            </p>
                                                        )}
                                                    </div>
                                                </label>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Back of Insurance Card */}
                            <FormField
                                control={form.control}
                                name="insuranceCardBack"
                                render={({ field: { onChange, value, ...field } }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm text-[#111315] font-semibold">
                                            Back of Insurance Card
                                            <span className="text-xs text-gray-500 font-normal ml-1">(Optional)</span>
                                        </FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <input
                                                    type="file"
                                                    accept="image/*,.pdf"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0] || null;
                                                        onChange(file);
                                                    }}
                                                    className="hidden"
                                                    id="insurance-back"
                                                    {...field}
                                                />
                                                <label
                                                    htmlFor="insurance-back"
                                                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#DCDEE1] rounded-lg cursor-pointer bg-[#FAFAFA] hover:bg-[#F5F5F5] transition-colors"
                                                >
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <FileImage className="w-8 h-8 mb-2 text-[#838890]" />
                                                        <p className="mb-2 text-sm text-[#111315]">
                                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                                        </p>
                                                        <p className="text-xs text-[#838890]">PNG, JPG, PDF up to 15MB</p>
                                                        {value && (
                                                            <p className="text-xs text-green-600 mt-1 font-medium">
                                                                ✓ {value.name}
                                                            </p>
                                                        )}
                                                    </div>
                                                </label>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* HIPAA Compliance Notice */}
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                <div className="flex items-start gap-3">
                                    <Shield className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                                    <div className="text-sm">
                                        <p className="font-medium text-green-800 mb-1">Your information is secure and protected</p>
                                        <p className="text-green-700">
                                            All uploaded documents are encrypted and stored securely in compliance with HIPAA regulations.
                                            Your personal health information is protected and will only be used for your medical care.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full self-center flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Loading...</span>
                                </div>
                            ) : (
                                <BookAnAppointmentClient />
                            )}
                        </button>

                        <div>
                            <p
                                style={{
                                    fontFamily: 'var(--font-public-sans)',
                                    fontWeight: 500,
                                }}
                                className='text-[#838890] text-md'
                            >By submitting, you agree to our <Link href="/privacy-policy" className="text-[#2358AC] underline">privacy policy and disclaimer.</Link> Someone from our team may contact you via phone, email and/or text.</p>
                        </div>
                    </form>
                </Form>
                <Dialog open={openAppointmentConfirm} onOpenChange={() => setAppointmentConfirm(false)}>
                    <DialogContent className=" rounded-[20px] p-[32px]" >
                        <div className="bg-white flex flex-col space-y-[20px] items-center justify-center">
                            <div className=" relative h-[100px] self-center flex w-full">
                                <div className="z-1 relative justify-center items-center flex w-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="108" height="108" viewBox="0 0 108 108" fill="none">
                                        <circle opacity="0.1" cx="54" cy="54" r="54" fill="#4CC2FF" />
                                    </svg>
                                    <div className=" absolute top-1.5 z-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="86" height="86" viewBox="0 0 86 86" fill="none">
                                            <circle opacity="0.2" cx="43" cy="43" r="43" fill="#4CC2FF" />
                                        </svg>
                                    </div>
                                    <div className=" absolute top-4.5 z-3 ">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
                                            <circle cx="32" cy="32" r="32" fill="#4CC2FF" />
                                        </svg>
                                    </div>

                                    <div className="absolute top-9.5 z-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M12.1194 0.95737C11.4704 0.416553 10.5277 0.416554 9.87875 0.957371L7.72754 2.75005L4.49907 2.75005C3.53258 2.75005 2.74908 3.53355 2.74907 4.50005L2.74907 7.72851L0.956394 9.87973C0.415578 10.5287 0.415577 11.4714 0.956394 12.1204L2.74907 14.2716L2.74908 17.5001C2.74908 18.4666 3.53258 19.2501 4.49908 19.2501L7.72754 19.25L9.87875 21.0427C10.5277 21.5835 11.4704 21.5835 12.1194 21.0427L14.2706 19.25H17.4991C18.4656 19.25 19.2491 18.4665 19.2491 17.5L19.2491 14.2716L21.0417 12.1204C21.5826 11.4714 21.5826 10.5287 21.0418 9.87973L19.2491 7.72851L19.2491 4.50005C19.2491 3.53355 18.4656 2.75005 17.4991 2.75005L14.2706 2.75005L12.1194 0.95737ZM14.4611 9.38694C14.9509 9.13182 15.1412 8.52792 14.8861 8.03809C14.6309 7.54826 14.027 7.35799 13.5372 7.61311C12.1092 8.35684 10.9442 9.7806 10.1744 10.9032C10.1078 11.0004 10.0434 11.0964 9.98137 11.1907C9.84153 11.4033 9.71366 11.6073 9.59878 11.7971C9.51302 11.7245 9.42957 11.6575 9.35034 11.5963C9.32499 11.5767 9.30008 11.5577 9.27566 11.5393C9.06035 11.3772 8.86673 11.2494 8.72532 11.1612C8.65433 11.1169 8.59572 11.0821 8.55316 11.0575C8.53187 11.0451 8.51453 11.0353 8.50161 11.0281L8.48557 11.0191L8.48012 11.0161L8.47806 11.015L8.47644 11.0141C7.99113 10.7505 7.38401 10.9303 7.1204 11.4156C6.85685 11.9008 7.03677 12.5079 7.52183 12.7716L7.52391 12.7728L7.55058 12.788C7.576 12.8028 7.61582 12.8263 7.6667 12.8581C7.76905 12.9219 7.91292 13.0168 8.07261 13.1371C8.40619 13.3882 8.74611 13.7036 8.9523 14.0319C9.14601 14.3403 9.4921 14.519 9.85574 14.4984C10.2193 14.4778 10.543 14.2609 10.7007 13.9328L10.7032 13.9276L10.7159 13.9018C10.7276 13.878 10.746 13.8413 10.7707 13.7932C10.8202 13.6969 10.8947 13.5553 10.992 13.3804C11.187 13.0294 11.4706 12.5494 11.8239 12.0343C12.5541 10.9694 13.489 9.89321 14.4611 9.38694Z" fill="#FAFAFA" />
                                        </svg>
                                    </div>
                                </div>

                            </div>

                            <div className="flex flex-col space-y-[10px] items-center justify-center">
                                <h3
                                    style={{
                                        fontFamily: 'var(--font-public-sans)',
                                        fontWeight: 500,
                                    }}
                                    className="text-[black] text-2xl"
                                >
                                    Thank you for your request
                                </h3>
                                <p
                                    style={{
                                        fontFamily: 'var(--font-public-sans)',
                                        fontWeight: 500,
                                    }}
                                    className="text-[#838890] text-md text-center"
                                >
                                    We’ve received your information and our office will reach out to you as soon as possible.<br />
                                    Please be on the lookout for a call from our team.
                                </p>
                            </div>
                            <div
                                onClick={() => {
                                    setAppointmentConfirm(false)
                                }}
                                className=" max-h-[56px] h-full px-[32px] py-[16px] rounded-[62px] relative flex bg-[#0A50EC] text-white text-[14px] font-semibold w-full justify-center items-center hover:cursor-pointer"
                            >
                                <span
                                    style={{
                                        fontFamily: "var(--font-public-sans)",
                                        fontWeight: 500, fontSize: "16px",
                                        lineHeight: "24px",
                                        letterSpacing: "0.02em"
                                    }}
                                >Done</span>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}
