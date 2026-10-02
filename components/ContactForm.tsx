"use client"
import { useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import BookAnAppoitmentButton from "./BookAnAppoitmentButton"
import BookAnAppointmentClient from "./BookAnAppointmentClient"
import { EMPTY_ATTRIBUTION, getAttributionData } from "@/lib/gclid"
import { User, Mail, Phone } from "lucide-react"
import { DialogContent, DialogTitle } from "./ui/dialog"
import { Dialog } from "./ui/dialog"
import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter, usePathname } from "next/navigation"
import { pushAcceptedLead } from "@/utils/enhancedConversions"
import { STATE_OPTIONS, slugFromPathname, normalizeState } from "@/lib/stateUtils"
import { resolveFormSource } from "@/lib/lead-contract"
import {
  classifyInsurance,
  destinationFor,
  getInsuranceOptions,
  parseLeadRouting,
  pathForDestination,
} from "@/lib/insurance-routing"
import { POSTAL_CODE_ERROR, isValidPostalCode, normalizePostalCode } from "@/lib/postal-code"

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  reason: z.string().min(2, "Please provide more detail about your consultation needs"),
  // D11 (2026-09-24): insurance is required and PPO appears explicitly, so a
  // patient who knows they hold a PPO is never pushed into "Other".
  insuranceType: z.string().min(1, "Please select your insurance"),
  // ZIP is RETAINED. The 2026-09-24 meeting removed only "Best Time To Contact";
  // ZIP stays in the form, validated, stored and reported. The rule lives in
  // lib/postal-code.ts so this validator and the server's cannot drift apart.
  postalCode: z.string().refine(isValidPostalCode, POSTAL_CODE_ERROR),
  country: z.string(),
  state: z.string().min(1, "Please select your state"),
})

export function ConsultationForm({ defaultState = "" }: { defaultState?: string }) {
  const [openAppointmentConfirm, setAppointmentConfirm] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [attribution, setAttribution] = useState(EMPTY_ATTRIBUTION)
  const router = useRouter()
  const submittingRef = useRef(false)

  useEffect(() => {
    setAttribution(getAttributionData())
  }, [])
  const pathname = usePathname()
  const resolvedState = normalizeState(defaultState) || slugFromPathname(pathname)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      reason: "",
      insuranceType: "",
      postalCode: "",
      country: "US",
      state: resolvedState,
    },
  })


  async function onSubmit(values: z.infer<typeof formSchema>) {
    // setDisabled is async, so on a fast double-click both handlers can pass the
    // `disabled` check before React re-renders. A ref flips synchronously and is
    // what actually makes a double submit impossible.
    if (submittingRef.current) return
    submittingRef.current = true
    setDisabled(true)
    setSubmitError(null)
    try {
      const formSource = resolveFormSource({ pathname, formId: 'ConsultationForm' })
      // Normalize once, here, so the value the endpoint stores, the value the staff
      // email shows and the value Enhanced Conversions hashes are the same string.
      // A mobile numeric keypad has no hyphen, so a patient entering a ZIP+4 there
      // types nine bare digits — normalizePostalCode turns that into 12345-6789
      // rather than failing them for using the keyboard we asked for.
      const postalCode = normalizePostalCode(values.postalCode)
      const res = await fetch("/api/forms/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone,
          reason: values.reason,
          // Persisted to Supabase forms.insurance_type only. Never sent to GA4,
          // Google Ads or Meta — see lib/insurance-routing.ts.
          insurance_type: values.insuranceType,
          postalCode,
          country: values.country,
          state: values.state,
          form_source: formSource,
          gclid: attribution.gclid,
          gbraid: attribution.gbraid,
          wbraid: attribution.wbraid,
          utm_source: attribution.utm_source,
          utm_medium: attribution.utm_medium,
          utm_campaign: attribution.utm_campaign,
          utm_term: attribution.utm_term,
          utm_content: attribution.utm_content,
        }),
      })

      if (res.redirected) {
        router.push(res.url)
        return
      }

      // Read the body ONCE. pushAcceptedLead accepts either a Response or an
      // already-parsed body, and a Response body can only be consumed once — so
      // parsing here and passing the object is required, not a style choice.
      const body = await res.json().catch(() => null)

      if (!res.ok) {
        const fieldError = typeof (body as { error?: unknown })?.error === 'string'
          ? (body as { error: string }).error
          : null
        setSubmitError(fieldError || "We couldn't submit your request. Please try again in a moment, or call our office.")
        setDisabled(false)
        return
      }

      // D10: qualification decides BOTH whether the qualified conversion fires
      // and which confirmation page the patient sees.
      //
      // The SERVER decides it (see the route handler) and we obey. parseLeadRouting
      // returns null only when the response carries no decision at all — a browser
      // on the new build talking to a server still on the old one during a deploy —
      // and only then do we classify locally, with the same shared function, so the
      // answer is identical rather than merely similar. An unrecognised value is
      // treated as unqualified by parseLeadRouting, which fails closed.
      const serverRouting = parseLeadRouting(body)
      const qualification = serverRouting?.qualification ?? classifyInsurance(values.insuranceType)
      const destination = serverRouting?.destination ?? destinationFor(qualification)

      const accepted = await pushAcceptedLead({ acceptance: body, form_name: 'ConsultationForm', form_source: formSource, state: values.state, email: values.email, phone: values.phone, firstName: values.firstName, lastName: values.lastName, postalCode, lead_qualification: qualification });
      if (!accepted) {
        setSubmitError("We couldn't confirm your request. Please try again in a moment, or call our office.")
        setDisabled(false)
        return
      }

      form.reset()
      // Deliberately stays disabled through navigation. Re-enabling here — which a
      // `finally` block used to do — reopened the button for the frames between the
      // response landing and the route actually changing, and a second submit in
      // that window is a SECOND lead: the server mints a fresh submission id per
      // request, so neither the in-page emitted-id set nor Resend's idempotency key
      // would collapse it into one conversion.
      router.push(pathForDestination(destination))
    } catch (error) {
      console.error("[ConsultationForm] Submit failed", error)
      setSubmitError("We couldn't submit your request. Please try again in a moment, or call our office.")
      setDisabled(false)
    }
  }

  return (
    <div className="w-full overflow-hidden backdrop-blur-[15px] bg-white bg-opacity-50"
    >
      <Form {...form}

      >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 px-1">
          <input type="hidden" name="country" value="US" />
          <input type="hidden" name="gclid" value={attribution.gclid} />
          <input type="hidden" name="utm_source" value={attribution.utm_source} />
          <input type="hidden" name="utm_medium" value={attribution.utm_medium} />
          <input type="hidden" name="utm_campaign" value={attribution.utm_campaign} />
          <input type="hidden" name="utm_term" value={attribution.utm_term} />
          <input type="hidden" name="utm_content" value={attribution.utm_content} />

          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => {
                const { name: _, ...fieldProps } = field;
                return (
                  <FormItem>
                    <FormLabel className="text-sm text-[#838890] font-semibold ">First Name<span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input 
                        id="first_name"
                        aria-label="First name"
                        name="firstName"
                        placeholder="First Name" 
                        autoComplete="given-name"
                        startIcon={User} 
                        className="h-12 text-lg border-[#DCDEE1]  bg-[#FAFAFA]" 
                        {...fieldProps} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => {
                const { name: _, ...fieldProps } = field;
                return (
                  <FormItem>
                    <FormLabel className="text-sm text-[#838890] font-semibold ">Last Name<span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input 
                        id="last_name"
                        aria-label="Last name"
                        name="lastName"
                        placeholder="Last Name" 
                        autoComplete="family-name"
                        startIcon={User} 
                        className="h-12 text-lg border-[#DCDEE1]  bg-[#FAFAFA]" 
                        {...fieldProps} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>

          {/* Contact Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-[#838890] font-semibold">Email Address<span className="text-red-500">*</span></FormLabel>
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
                  <FormLabel className="text-sm text-[#838890] font-semibold">Phone Number<span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="+1 0123456789" startIcon={Phone} className="h-12 text-lg  border-[#DCDEE1] bg-[#FAFAFA]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => {
                const { name: _, ...fieldProps } = field;
                return (
                  <FormItem>
                    {/*
                      The id is component-scoped. It used to be a bare "postal_code",
                      which four other form components also used — so on a page
                      rendering more than one of them (the homepage mounts
                      DoctorContactForm lazily alongside this form) the document held
                      duplicate ids, and both label[for] and getElementById resolved
                      to whichever copy came first, often a hidden one. Scoping the id
                      makes the htmlFor association below correct again.
                    */}
                    <FormLabel htmlFor="consultation_postal_code" className="text-sm text-[#838890] font-semibold">ZIP / Postal Code<span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input
                        id="consultation_postal_code"
                        aria-label="ZIP or postal code"
                        name="postalCode"
                        type="text"
                        inputMode="numeric"
                        autoComplete="postal-code"
                        maxLength={10}
                        placeholder="e.g., 33463"
                        className="h-12 text-lg border-[#DCDEE1] bg-[#FAFAFA]"
                        {...fieldProps}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-[#838890] font-semibold">State<span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger aria-label="Select your state" className="w-full h-12 px-6 bg-[#f0f5ff] border rounded-sm">
                        <SelectValue placeholder="Select your state" className="font-[var(--font-inter)] h-12 text-lg" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {STATE_OPTIONS.map(({ value, label }) => (
                            <SelectItem key={value} value={value}>{label}</SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/*
            Insurance (D10 + D11, 2026-09-24).

            Replaces "Best Time To Contact", which was removed as a meeting
            decision. Options and qualification come from
            lib/insurance-routing.ts — a single source of truth shared with the
            routing logic in onSubmit, so the dropdown and the conversion
            decision can never disagree.

            The selected value goes to Supabase only. It is not added to the
            canonical lead event, not put in a URL, and not sent to any ad
            platform.
          */}
          <FormField
            control={form.control}
            name="insuranceType"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="insurance_type" className="text-sm text-[#838890] font-semibold">
                  Insurance
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      id="insurance_type"
                      aria-label="Select your insurance"
                      className="w-full h-12 px-6 bg-[#f0f5ff] border rounded-sm"
                    >
                      <SelectValue
                        placeholder="Select your insurance"
                        className="font-[var(--font-inter)] h-12 text-lg"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {getInsuranceOptions().map(({ value, label }) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                {/*
                  This line carries weight the option labels no longer do. The
                  carriers are listed by name alone ("Aetna", not "Aetna PPO"), so
                  nothing in the list itself tells an HMO patient that their plan is
                  a different answer. Saying it here keeps the distinction visible
                  without repeating "PPO" on seven options.
                */}
                <p className="text-xs text-[#838890]">
                  Mountain Spine &amp; Orthopedics is a PPO practice — the carriers
                  above are their PPO plans. If you have an HMO, choose &quot;HMO plans
                  (any carrier)&quot;. Either way your request reaches us, and our team
                  will go over your options with you.
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Reason Field */}
          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-[#838890] font-semibold">Consultation Reason<span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Textarea placeholder="Consultation Reason" className="min-h-[200px] text-lg resize-none  border-[#DCDEE1]  bg-[#FAFAFA]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {submitError && (
            <p role="alert" className="text-sm text-red-600 text-center mt-4">{submitError}</p>
          )}
          <button type="submit" className="w-full self-center flex items-center justify-center mt-[40px]" disabled={disabled} >
            {disabled ? (
              <div className="max-h-[56px] group h-full px-[32px] py-[16px] hover:bg-[#252932] rounded-[62px] relative flex bg-[#0A50EC] text-white text-[14px] font-semibold w-full justify-center items-center hover:cursor-not-allowed">
                <span className="text-white">Sending...</span>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              </div>
            ) : (
              <BookAnAppointmentClient />
            )}
          </button>
        </form>
      </Form>
      <Dialog open={openAppointmentConfirm} onOpenChange={() => setAppointmentConfirm(!openAppointmentConfirm)} >
        <DialogContent className=" rounded-[20px] p-[32px]" >
          <DialogTitle>

          </DialogTitle>
          <div className="bg-white flex flex-col space-y-[20px] items-center justify-center">
            <div className=" relative h-[100px] self-center flex w-full">

              <motion.div className="z-1 relative justify-center items-center flex w-full"
                animate={{
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="108" height="108" viewBox="0 0 108 108" fill="none">
                  <circle opacity="0.1" cx="54" cy="54" r="54" fill="#4CC2FF" />
                </svg>
                <motion.div className=" absolute top-1.5 z-2"
                  animate={{
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="86" height="86" viewBox="0 0 86 86" fill="none">
                    <circle opacity="0.2" cx="43" cy="43" r="43" fill="#4CC2FF" />
                  </svg>
                </motion.div>
                <motion.div className=" absolute top-4.5 z-3 "
                  animate={{
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="32" r="32" fill="#4CC2FF" />
                  </svg>
                </motion.div>
                <motion.div className="absolute top-9.5 z-4"
                  animate={{
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12.1194 0.95737C11.4704 0.416553 10.5277 0.416554 9.87875 0.957371L7.72754 2.75005L4.49907 2.75005C3.53258 2.75005 2.74908 3.53355 2.74907 4.50005L2.74907 7.72851L0.956394 9.87973C0.415578 10.5287 0.415577 11.4714 0.956394 12.1204L2.74907 14.2716L2.74908 17.5001C2.74908 18.4666 3.53258 19.2501 4.49908 19.2501L7.72754 19.25L9.87875 21.0427C10.5277 21.5835 11.4704 21.5835 12.1194 21.0427L14.2706 19.25H17.4991C18.4656 19.25 19.2491 18.4665 19.2491 17.5L19.2491 14.2716L21.0417 12.1204C21.5826 11.4714 21.5826 10.5287 21.0418 9.87973L19.2491 7.72851L19.2491 4.50005C19.2491 3.53355 18.4656 2.75005 17.4991 2.75005L14.2706 2.75005L12.1194 0.95737ZM14.4611 9.38694C14.9509 9.13182 15.1412 8.52792 14.8861 8.03809C14.6309 7.54826 14.027 7.35799 13.5372 7.61311C12.1092 8.35684 10.9442 9.7806 10.1744 10.9032C10.1078 11.0004 10.0434 11.0964 9.98137 11.1907C9.84153 11.4033 9.71366 11.6073 9.59878 11.7971C9.51302 11.7245 9.42957 11.6575 9.35034 11.5963C9.32499 11.5767 9.30008 11.5577 9.27566 11.5393C9.06035 11.3772 8.86673 11.2494 8.72532 11.1612C8.65433 11.1169 8.59572 11.0821 8.55316 11.0575C8.53187 11.0451 8.51453 11.0353 8.50161 11.0281L8.48557 11.0191L8.48012 11.0161L8.47806 11.015L8.47644 11.0141C7.99113 10.7505 7.38401 10.9303 7.1204 11.4156C6.85685 11.9008 7.03677 12.5079 7.52183 12.7716L7.52391 12.7728L7.55058 12.788C7.576 12.8028 7.61582 12.8263 7.6667 12.8581C7.76905 12.9219 7.91292 13.0168 8.07261 13.1371C8.40619 13.3882 8.74611 13.7036 8.9523 14.0319C9.14601 14.3403 9.4921 14.519 9.85574 14.4984C10.2193 14.4778 10.543 14.2609 10.7007 13.9328L10.7032 13.9276L10.7159 13.9018C10.7276 13.878 10.746 13.8413 10.7707 13.7932C10.8202 13.6969 10.8947 13.5553 10.992 13.3804C11.187 13.0294 11.4706 12.5494 11.8239 12.0343C12.5541 10.9694 13.489 9.89321 14.4611 9.38694Z" fill="#FAFAFA" />
                  </svg>
                </motion.div>
              </motion.div>

            </div>

            <div className=" flex flex-col space-y-[10px] items-center justify-center">
              <h3
                style={{
                  fontFamily: 'var(--font-public-sans)',
                  fontWeight: 500,
                }}
                className='text-[black] text-2xl'
              >
                Your Appointment Request Is Confirmed
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-public-sans)',
                  fontWeight: 500,
                }}
                className='text-[#838890] text-md text-center'
              >
                You're one step closer to a pain-free life!<br />
                Please check your email for details. Our team will contact you shortly.<br />
                Thank you for choosing Mountain Spine & Orthopedic Center!
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
  )
}
