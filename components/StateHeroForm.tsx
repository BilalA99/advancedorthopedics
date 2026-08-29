'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { User, Mail, Phone, Lock } from 'lucide-react'
import { formatPhoneInput } from '@/lib/phone-formatter'
import { pushAcceptedLead } from '@/utils/enhancedConversions'
import { EMPTY_ATTRIBUTION, getAttributionData } from '@/lib/gclid'
import { useRouter } from 'next/navigation'
import { STATE_OPTIONS, normalizeState } from '@/lib/stateUtils'

const formSchema = z.object({
  firstName: z.string().min(2, 'First name required'),
  lastName: z.string().min(1, 'Last name required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(1, 'Phone required'),
  postalCode: z
    .string()
    .regex(/^\d{5}(?:-\d{4})?$/, 'Enter a valid ZIP code'),
  bestTime: z.string().min(1, 'Please select a time'),
  reason: z.string().min(2, 'Please describe your needs'),
  country: z.string(),
  state: z.string().min(1, 'Please select your state'),
})

interface Props {
  defaultState: string
  stateName: string
}

export default function StateHeroForm({ defaultState, stateName }: Props) {
  const [expanded, setExpanded] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [attribution, setAttribution] = useState(EMPTY_ATTRIBUTION)
  const router = useRouter()

  useEffect(() => {
    setAttribution(getAttributionData())
  }, [])

  const resolvedState = normalizeState(defaultState)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      postalCode: '',
      bestTime: '',
      reason: '',
      country: 'US',
      state: resolvedState,
    },
  })

  const handleFirstPhase = async () => {
    const valid = await form.trigger(['firstName', 'lastName', 'email', 'phone'])
    if (valid) setExpanded(true)
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setDisabled(true)
    try {
      const res = await fetch('/api/forms/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone,
          reason: values.reason,
          bestTime: values.bestTime,
          postalCode: values.postalCode,
          country: values.country,
          state: values.state,
          form_source: 'state-consultation',
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

      if (!res.ok) {
        setDisabled(false)
        return
      }

      const accepted = await pushAcceptedLead({ acceptance: res, form_name: 'StateHeroForm', form_source: 'state-consultation', state: values.state, email: values.email, phone: values.phone, firstName: values.firstName, lastName: values.lastName, postalCode: values.postalCode })
      if (!accepted) return

      router.push('/thank-you')
    } catch (error) {
      console.error('[StateHeroForm] Submit failed', error)
      setDisabled(false)
    }
  }

  return (
    <div className="relative w-full rounded-3xl overflow-hidden">
      {/* Glass card background */}
      <div
        className="absolute inset-0 rounded-3xl"
        style={{
          backdropFilter: 'brightness(1.08) blur(14px)',
          background: 'rgba(255,255,255,0.82)',
          border: '1px solid rgba(255,255,255,0.45)',
          boxShadow:
            'inset 6px 6px 0px -6px rgba(255,255,255,0.8), inset 0 0 8px 1px rgba(255,255,255,0.6), 0 8px 40px rgba(0,0,0,0.18)',
        }}
      />

      <div className="relative z-10 p-5 sm:p-6">
        {/* Form header */}
        <div className="mb-4">
          <p
            className="text-[#252932] font-semibold text-lg leading-snug"
            style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 600 }}
          >
            Book a Free Consultation
          </p>
          <p
            className="text-[#424959] text-sm mt-0.5"
            style={{ fontFamily: 'var(--font-public-sans)' }}
          >
            Same-day &amp; next-day appointments available
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3"
            noValidate
          >
            <input type="hidden" name="country" value="US" />

            {/* Phase 1: Name, Phone, Email — always visible */}
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => {
                  const { name: _, ...fieldProps } = field
                  return (
                    <FormItem>
                      <FormControl>
                        <Input
                          id="hero_first_name"
                          aria-label="First name"
                          name="firstName"
                          placeholder="First Name"
                          autoComplete="given-name"
                          startIcon={User}
                          className="h-11 text-sm bg-white/70 border-[#DCDEE1] focus:bg-white transition-colors"
                          {...fieldProps}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )
                }}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => {
                  const { name: _, ...fieldProps } = field
                  return (
                    <FormItem>
                      <FormControl>
                        <Input
                          id="hero_last_name"
                          aria-label="Last name"
                          name="lastName"
                          placeholder="Last Name"
                          autoComplete="family-name"
                          className="h-11 text-sm bg-white/70 border-[#DCDEE1] focus:bg-white transition-colors"
                          {...fieldProps}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )
                }}
              />
            </div>

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => {
                const { name: _, ...fieldProps } = field
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="hero_phone"
                        aria-label="Phone number"
                        name="phone"
                        type="tel"
                        placeholder="(123) 456-7890"
                        autoComplete="tel"
                        startIcon={Phone}
                        className="h-11 text-sm bg-white/70 border-[#DCDEE1] focus:bg-white transition-colors"
                        {...fieldProps}
                        onChange={(e) =>
                          field.onChange(formatPhoneInput(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )
              }}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                const { name: _, ...fieldProps } = field
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="hero_email"
                        aria-label="Email address"
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        autoComplete="email"
                        startIcon={Mail}
                        className="h-11 text-sm bg-white/70 border-[#DCDEE1] focus:bg-white transition-colors"
                        {...fieldProps}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )
              }}
            />

            {/* Phase 2: ZIP, Best Time, Reason — animated expand */}
            <AnimatePresence>
              {expanded && (
                <motion.div
                  key="phase2"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="overflow-hidden"
                >
                  <div className="space-y-3 pt-1">
                    <div className="grid grid-cols-2 gap-3">
                      <FormField
                        control={form.control}
                        name="postalCode"
                        render={({ field }) => {
                          const { name: _, ...fieldProps } = field
                          return (
                            <FormItem>
                              <FormControl>
                                <Input
                                  id="hero_postal"
                                  aria-label="ZIP or postal code"
                                  name="postalCode"
                                  inputMode="numeric"
                                  autoComplete="postal-code"
                                  placeholder="ZIP Code"
                                  className="h-11 text-sm bg-white/70 border-[#DCDEE1] focus:bg-white transition-colors"
                                  {...fieldProps}
                                />
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )
                        }}
                      />
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormControl>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger aria-label="State" className="w-full h-11 text-sm bg-white/70 border border-[#DCDEE1] rounded-md px-3 focus:bg-white transition-colors">
                                  <SelectValue placeholder="State" />
                                </SelectTrigger>
                                <SelectContent>
                                  {STATE_OPTIONS.map(({ value, label }) => (
                                    <SelectItem key={value} value={value}>{label}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="bestTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger aria-label="Best time to contact" className="h-11 text-sm bg-white/70 border-[#DCDEE1] rounded-sm">
                                <SelectValue placeholder="Best time to contact" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {[
                                    'As Soon As Possible',
                                    'Morning',
                                    'Afternoon',
                                    'Evening',
                                  ].map((t) => (
                                    <SelectItem key={t} value={t}>
                                      {t}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="reason"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              placeholder="Briefly describe your condition or question..."
                              className="min-h-[80px] text-sm resize-none bg-white/70 border-[#DCDEE1] focus:bg-white transition-colors"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* CTA button */}
            {!expanded ? (
              <button
                type="button"
                onClick={handleFirstPhase}
                className="w-full h-12 mt-1 rounded-[62px] bg-[#0A50EC] text-white font-semibold text-sm hover:bg-[#252932] transition-colors duration-200 flex items-center justify-center gap-2"
                style={{ fontFamily: 'var(--font-public-sans)' }}
              >
                Get Free Consultation
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            ) : (
              <button
                type="submit"
                disabled={disabled}
                className="w-full h-12 mt-1 rounded-[62px] bg-[#0A50EC] text-white font-semibold text-sm hover:bg-[#252932] transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                style={{ fontFamily: 'var(--font-public-sans)' }}
              >
                {disabled ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                    Sending...
                  </>
                ) : (
                  <>
                    Book My Appointment
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 8h10M9 4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </>
                )}
              </button>
            )}

            {/* Trust signal */}
            <div className="flex items-center justify-center gap-1.5 pt-1">
              <Lock className="w-3 h-3 text-[#838890]" />
              <p
                className="text-center text-xs text-[#838890]"
                style={{ fontFamily: 'var(--font-public-sans)' }}
              >
                Your information is secure &amp; private
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
