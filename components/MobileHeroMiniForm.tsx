'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Phone, User, ArrowRight, CheckCircle, Loader2, Mail, ChevronDown, Shield, FileImage } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { pushEvent, pushFormSubmit } from '@/utils/enhancedConversions';
import { getAttributionData } from '@/lib/gclid';
import { formatPhoneInput } from '@/lib/phone-formatter';
import { STATE_OPTIONS } from '@/lib/stateUtils';
import { appendPreparedUploads } from '@/lib/client-upload';

interface MobileHeroMiniFormProps {
  pageType: 'homepage' | 'location' | 'state';
  cityName?: string;
  defaultState?: string;
  stateName?: string;
}

export default function MobileHeroMiniForm({ pageType, cityName, defaultState = '', stateName }: MobileHeroMiniFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    phone: '',
    lastName: '',
    email: '',
    postalCode: '',
    state: defaultState,
    bestTime: '',
    reason: '',
    insuranceCardFront: null as File | null,
    insuranceCardBack: null as File | null,
    website: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [attribution, setAttribution] = useState({
    gclid: '', utm_source: '', utm_medium: '', utm_campaign: '', utm_term: '', utm_content: '',
  });
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  useEffect(() => {
    setAttribution(getAttributionData());
  }, []);

  useEffect(() => {
    if (!showDialog) return;
    setTimeout(() => {
      const form = formRef.current;
      if (!form) return;
      const handleScroll = (event: Event) => {
        const target = event.target as HTMLElement;
        const { scrollTop, scrollHeight, clientHeight } = target;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5;
        setShowScrollIndicator(scrollHeight > clientHeight && !isAtBottom);
      };
      const scrollContainer = form.closest('.overflow-y-auto');
      if (scrollContainer) {
        scrollContainer.addEventListener('scroll', handleScroll);
        const { scrollHeight, clientHeight } = scrollContainer as HTMLElement;
        setShowScrollIndicator(scrollHeight > clientHeight);
        return () => scrollContainer.removeEventListener('scroll', handleScroll);
      }
    }, 200);
  }, [showDialog]);

  const headingText = pageType === 'location' && cityName
    ? `Orthopedic Care in ${cityName}?`
    : pageType === 'state' && stateName
    ? `Need Care in ${stateName}?`
    : 'Experiencing Pain?';

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!formData.firstName.trim() || !formData.phone.trim()) {
      setError('Please fill in your name and phone number');
      return;
    }
    if (formData.phone.replace(/\D/g, '').length < 10) {
      setError('Please enter a valid phone number');
      return;
    }
    if (pageType === 'state') {
      pushEvent('lead_form_start', {
        state_name: stateName,
        page_path: typeof window !== 'undefined' ? window.location.pathname : '',
        cta_position: 'mobile_hero_top_fold',
      });
    }
    setShowDialog(true);
  };

  const handleFullSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.website && formData.website.length > 0) return;
    if (!formData.state) {
      setError('Please select your state.');
      return;
    }
    setIsSubmitting(true);
    setError('');
    try {
      const payload = new FormData();
      payload.append('firstName', formData.firstName);
      payload.append('lastName', formData.lastName);
      payload.append('email', formData.email);
      payload.append('phone', formData.phone);
      payload.append('reason', formData.reason || 'Orthopedic consultation request');
      payload.append('bestTime', formData.bestTime);
      payload.append('postalCode', formData.postalCode);
      payload.append('state', formData.state);
      payload.append('country', 'US');
      payload.append('source',
        pageType === 'location' ? `Location Hero - ${cityName || ''}` :
        pageType === 'state' ? `State Hero - ${stateName || ''}` :
        'Homepage Hero'
      );
      payload.append('gclid', attribution.gclid);
      payload.append('utm_source', attribution.utm_source);
      payload.append('utm_medium', attribution.utm_medium);
      payload.append('utm_campaign', attribution.utm_campaign);
      payload.append('utm_term', attribution.utm_term);
      payload.append('utm_content', attribution.utm_content);

      const uploadError = await appendPreparedUploads(payload, [
        { fieldName: 'insuranceCardFront', file: formData.insuranceCardFront },
        { fieldName: 'insuranceCardBack', file: formData.insuranceCardBack },
      ]);
      if (uploadError) {
        setFormData((prev) => uploadError.fieldNames.reduce((acc, f) => ({ ...acc, [f]: null }), prev));
        setError(uploadError.message);
        return;
      }

      const res = await fetch('/api/forms/doctor', { method: 'POST', body: payload });
      if (res.redirected) { router.push(res.url); return; }
      if (!res.ok) throw new Error('Submission failed');

      pushFormSubmit({
        form_name: 'MobileHeroMiniForm',
        state: formData.state,
        email: formData.email,
        phone: formData.phone,
        firstName: formData.firstName,
        lastName: formData.lastName,
        postalCode: formData.postalCode,
      });

      setShowDialog(false);
      setIsSubmitted(true);
      router.push('/thank-you');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="w-full bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-white/50">
        <div className="flex flex-col items-center text-center gap-3">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 600 }} className="text-[#111315] text-lg">
              Thank You!
            </p>
            <p style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }} className="text-[#6B7280] text-sm mt-1">
              We&apos;ll call you shortly to schedule your consultation.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Compact mini form */}
      <div className="w-full bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-white/50">
        <div className="mb-4">
          <p style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 600 }} className="text-[#111315] text-base sm:text-lg leading-tight">
            {headingText}
          </p>
          <p style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }} className="text-[#6B7280] text-xs sm:text-sm mt-1">
            Get expert relief — we&apos;ll call you to schedule
          </p>
        </div>

        <form onSubmit={handleInitialSubmit} className="space-y-3">
          {/* Honeypot */}
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
            tabIndex={-1}
            autoComplete="off"
          />

          {/* Name */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-4 w-4 text-[#9CA3AF]" />
            </div>
            <input
              type="text"
              placeholder="Your Name"
              value={formData.firstName}
              autoComplete="given-name"
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="w-full pl-10 pr-4 py-3 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2358AC]/20 focus:border-[#2358AC] transition-all placeholder:text-[#9CA3AF]"
              style={{ fontFamily: 'var(--font-inter)' }}
            />
          </div>

          {/* Phone */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-4 w-4 text-[#9CA3AF]" />
            </div>
            <input
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              autoComplete="tel"
              onChange={(e) => setFormData({ ...formData, phone: formatPhoneInput(e.target.value) })}
              className="w-full pl-10 pr-4 py-3 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2358AC]/20 focus:border-[#2358AC] transition-all placeholder:text-[#9CA3AF]"
              style={{ fontFamily: 'var(--font-inter)' }}
            />
          </div>

          {error && !showDialog && (
            <p className="text-red-500 text-xs" style={{ fontFamily: 'var(--font-inter)' }}>{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-[#2358AC] hover:bg-[#1a4a8a] text-white py-3 px-4 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-sm min-h-[48px]"
            style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
          >
            Get Relief Now
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-center text-[#9CA3AF] text-[10px] sm:text-xs" style={{ fontFamily: 'var(--font-inter)' }}>
            Free consultation • Same-day callbacks • No obligation
          </p>
        </form>
      </div>

      {/* Full details dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="rounded-[20px] max-h-[90vh] sm:min-w-3xl overflow-hidden flex flex-col">
          <DialogTitle style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 600 }} className="text-xl">
            Complete Your Appointment Request
          </DialogTitle>

          <form ref={formRef} className="space-y-4 p-1 overflow-y-auto flex-1 pr-2 relative" onSubmit={handleFullSubmit}>
            <input type="hidden" name="country" value="US" />

            {/* Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#111315] mb-1.5" style={{ fontFamily: 'var(--font-public-sans)' }}>
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF]" />
                  <input
                    type="text"
                    placeholder="First Name"
                    autoComplete="given-name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#FAFAFA] border border-[#DCDEE1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2358AC]/20 focus:border-[#2358AC]"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#111315] mb-1.5" style={{ fontFamily: 'var(--font-public-sans)' }}>
                  Last Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF]" />
                  <input
                    type="text"
                    placeholder="Last Name"
                    autoComplete="family-name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#FAFAFA] border border-[#DCDEE1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2358AC]/20 focus:border-[#2358AC]"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  />
                </div>
              </div>
            </div>

            {/* Email + Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#111315] mb-1.5" style={{ fontFamily: 'var(--font-public-sans)' }}>
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF]" />
                  <input
                    type="email"
                    placeholder="example@email.com"
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#FAFAFA] border border-[#DCDEE1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2358AC]/20 focus:border-[#2358AC]"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#111315] mb-1.5" style={{ fontFamily: 'var(--font-public-sans)' }}>
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF]" />
                  <input
                    type="tel"
                    placeholder="(123) 456-7890"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: formatPhoneInput(e.target.value) })}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#FAFAFA] border border-[#DCDEE1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2358AC]/20 focus:border-[#2358AC]"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  />
                </div>
              </div>
            </div>

            {/* ZIP + State */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#111315] mb-1.5" style={{ fontFamily: 'var(--font-public-sans)' }}>
                  ZIP / Postal Code
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="e.g., 33463"
                  autoComplete="postal-code"
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm bg-[#FAFAFA] border border-[#DCDEE1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2358AC]/20 focus:border-[#2358AC]"
                  style={{ fontFamily: 'var(--font-inter)' }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#111315] mb-1.5" style={{ fontFamily: 'var(--font-public-sans)' }}>
                  State <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm bg-[#f0f5ff] border border-[#DCDEE1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2358AC]/20 focus:border-[#2358AC] appearance-none"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  <option value="">Select your state</option>
                  {STATE_OPTIONS.map(({ value, label }) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Best Time */}
            <div>
              <label className="block text-sm font-medium text-[#111315] mb-1.5" style={{ fontFamily: 'var(--font-public-sans)' }}>
                Best Time To Contact
              </label>
              <select
                value={formData.bestTime}
                onChange={(e) => setFormData({ ...formData, bestTime: e.target.value })}
                className="w-full px-4 py-2.5 text-sm bg-[#f0f5ff] border border-[#DCDEE1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2358AC]/20 focus:border-[#2358AC] appearance-none"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                <option value="">Select Best Time To Contact</option>
                <option value="As Soon As Possible">As Soon As Possible</option>
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
                <option value="Evening">Evening</option>
              </select>
            </div>

            {/* Reason */}
            <div>
              <label className="block text-sm font-medium text-[#111315] mb-1.5" style={{ fontFamily: 'var(--font-public-sans)' }}>
                Reason for Consultation
              </label>
              <textarea
                placeholder="Describe your symptoms, how long you've been experiencing them, and any treatments you've tried..."
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                rows={4}
                className="w-full px-4 py-2.5 text-sm bg-[#FAFAFA] border border-[#DCDEE1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2358AC]/20 focus:border-[#2358AC] resize-none"
                style={{ fontFamily: 'var(--font-inter)' }}
              />
            </div>

            {/* Insurance Cards */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-green-700">HIPAA Compliant &amp; Secure</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#111315] mb-1.5">
                    Front of Insurance Card <span className="text-xs text-gray-500 font-normal">(Optional)</span>
                  </label>
                  <label htmlFor="mh-insurance-front" className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-[#DCDEE1] rounded-lg cursor-pointer bg-[#FAFAFA] hover:bg-[#F5F5F5] transition-colors">
                    <input type="file" accept="image/*,.pdf" onChange={(e) => setFormData({ ...formData, insuranceCardFront: e.target.files?.[0] || null })} className="hidden" id="mh-insurance-front" />
                    <FileImage className="w-6 h-6 mb-1 text-[#838890]" />
                    <p className="text-xs text-[#111315]"><span className="font-medium">Click to upload</span></p>
                    <p className="text-[10px] text-[#838890]">PNG, JPG, PDF</p>
                    {formData.insuranceCardFront && <p className="text-[10px] text-green-600 mt-1 font-medium">✓ {formData.insuranceCardFront.name}</p>}
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#111315] mb-1.5">
                    Back of Insurance Card <span className="text-xs text-gray-500 font-normal">(Optional)</span>
                  </label>
                  <label htmlFor="mh-insurance-back" className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-[#DCDEE1] rounded-lg cursor-pointer bg-[#FAFAFA] hover:bg-[#F5F5F5] transition-colors">
                    <input type="file" accept="image/*,.pdf" onChange={(e) => setFormData({ ...formData, insuranceCardBack: e.target.files?.[0] || null })} className="hidden" id="mh-insurance-back" />
                    <FileImage className="w-6 h-6 mb-1 text-[#838890]" />
                    <p className="text-xs text-[#111315]"><span className="font-medium">Click to upload</span></p>
                    <p className="text-[10px] text-[#838890]">PNG, JPG, PDF</p>
                    {formData.insuranceCardBack && <p className="text-[10px] text-green-600 mt-1 font-medium">✓ {formData.insuranceCardBack.name}</p>}
                  </label>
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <Shield className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-green-700">Your information is encrypted and stored securely in compliance with HIPAA regulations.</p>
                </div>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm" style={{ fontFamily: 'var(--font-inter)' }}>{error}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#0A50EC] hover:bg-[#252932] text-white py-3.5 px-6 rounded-full font-medium flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
            >
              {isSubmitting ? (
                <><Loader2 className="w-5 h-5 animate-spin" />Submitting...</>
              ) : (
                <>Book Your Consultation<ArrowRight className="w-5 h-5" /></>
              )}
            </button>

            <p className="text-[#838890] text-xs text-center" style={{ fontFamily: 'var(--font-public-sans)' }}>
              By submitting, you agree to our{' '}
              <Link href="/privacy-policy" className="text-[#2358AC] underline">privacy policy and disclaimer</Link>.
              {' '}Someone from our team may contact you via phone, email and/or text.
            </p>

            {showScrollIndicator && (
              <div className="fixed bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-50">
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 text-gray-600 text-sm font-medium">
                  <span>Scroll for more</span>
                  <ChevronDown className="w-4 h-4 animate-bounce" />
                </div>
              </div>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
