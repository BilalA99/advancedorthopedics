'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Phone, User, ArrowRight, CheckCircle, Loader2, Mail, ChevronDown, Shield, FileImage } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { pushAcceptedLead } from '@/utils/enhancedConversions';
import { EMPTY_ATTRIBUTION, getAttributionData } from '@/lib/gclid';
import { formatPhoneInput } from '@/lib/phone-formatter';
import { STATE_OPTIONS } from '@/lib/stateUtils';
import { appendPreparedUploads } from '@/lib/client-upload';

interface BodyPartHeroFormProps {
  bodyPartTitle: string;
}

export default function BodyPartHeroForm({ bodyPartTitle }: BodyPartHeroFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    postalCode: '',
    state: '',
    bestTime: '',
    reason: '',
    insuranceCardFront: null as File | null,
    insuranceCardBack: null as File | null,
    website: '', // honeypot
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [attribution, setAttribution] = useState(EMPTY_ATTRIBUTION);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  useEffect(() => {
    setAttribution(getAttributionData());
  }, []);

  // Handle scroll indicator visibility
  useEffect(() => {
    if (!showDialog) return;

    setTimeout(() => {
      const form = formRef.current;
      if (!form) return;

      const handleScroll = (event: Event) => {
        const target = event.target as HTMLElement;
        const { scrollTop, scrollHeight, clientHeight } = target;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5;
        const hasScrollableContent = scrollHeight > clientHeight;
        setShowScrollIndicator(hasScrollableContent && !isAtBottom);
      };

      const scrollContainer = form.closest('.overflow-y-auto');
      if (scrollContainer) {
        scrollContainer.addEventListener('scroll', handleScroll);
        // Check initial state
        const { scrollHeight, clientHeight } = scrollContainer as HTMLElement;
        setShowScrollIndicator(scrollHeight > clientHeight);
      }

      return () => {
        if (scrollContainer) {
          scrollContainer.removeEventListener('scroll', handleScroll);
        }
      };
    }, 200);
  }, [showDialog]);

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation for initial fields
    if (!formData.firstName.trim() || !formData.phone.trim()) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.phone.replace(/\D/g, '').length < 10) {
      setError('Please enter a valid phone number');
      return;
    }

    // Open the expanded dialog
    setShowDialog(true);
  };

  const handleFullSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check honeypot
    if (formData.website && formData.website.length > 0) {
      return; // Silently reject bot submission
    }

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
      payload.append('reason', formData.reason || `${bodyPartTitle} pain consultation`);
      payload.append('bestTime', formData.bestTime);
      payload.append('postalCode', formData.postalCode);
      payload.append('state', formData.state);
      payload.append('country', 'US');
      payload.append('painArea', bodyPartTitle);
      payload.append('source', `${bodyPartTitle} Body Part Page`);
      payload.append('gclid', attribution.gclid);
      payload.append('gbraid', attribution.gbraid);
      payload.append('wbraid', attribution.wbraid);
      payload.append('form_source', 'body-part-consultation');
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
        const clearedFields = uploadError.fieldNames.reduce(
          (nextFormData, fieldName) => ({
            ...nextFormData,
            [fieldName]: null,
          }),
          formData,
        );

        setFormData(clearedFields);
        setError(uploadError.message);
        return;
      }

      const res = await fetch('/api/forms/doctor', {
        method: 'POST',
        body: payload,
      });

      if (res.redirected) {
        router.push(res.url);
        return;
      }

      if (!res.ok) {
        throw new Error('Submission failed');
      }

      const accepted = await pushAcceptedLead({ acceptance: res, form_name: 'BodyPartHeroForm', form_source: 'body-part-consultation', state: formData.state, email: formData.email, phone: formData.phone, firstName: formData.firstName, lastName: formData.lastName, postalCode: formData.postalCode });
      if (!accepted) throw new Error('Submission was not persisted');

      setShowDialog(false);
      setIsSubmitted(true);

      // Redirect to thank you page
      router.push('/thank-you');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="w-full bg-white/95 backdrop-blur-md rounded-2xl p-5 sm:p-6 shadow-lg border border-white/50">
        <div className="flex flex-col items-center text-center gap-3">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p
              style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 600 }}
              className="text-[#111315] text-lg"
            >
              Thank You!
            </p>
            <p
              style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
              className="text-[#6B7280] text-sm mt-1"
            >
              We'll call you shortly to schedule your consultation.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Compact Hero Form */}
      <div className="w-full bg-white/95 backdrop-blur-md rounded-2xl p-5 sm:p-6 shadow-lg border border-white/50">
        {/* Header - Using p tag instead of h4 to avoid breaking heading hierarchy */}
        <div className="mb-4">
          <p
            style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 600 }}
            className="text-[#111315] text-base sm:text-lg leading-tight"
          >
            Experiencing {bodyPartTitle} Pain?
          </p>
          <p
            style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
            className="text-[#6B7280] text-xs sm:text-sm mt-1"
          >
            Get expert relief — we'll call you to schedule
          </p>
        </div>

        {/* Initial Form */}
        <form onSubmit={handleInitialSubmit} className="space-y-3">
          {/* Name Field */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-4 w-4 text-[#9CA3AF]" />
            </div>
            <input
              type="text"
              name="firstName"
              autoComplete="given-name"
              aria-label="Your name"
              placeholder="Your Name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2358AC]/20 focus:border-[#2358AC] transition-all placeholder:text-[#9CA3AF]"
              style={{ fontFamily: 'var(--font-inter)' }}
            />
          </div>

          {/* Phone Field */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-4 w-4 text-[#9CA3AF]" />
            </div>
            <input
              type="tel"
              name="phone"
              autoComplete="tel"
              inputMode="tel"
              aria-label="Phone number"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: formatPhoneInput(e.target.value) })}
              className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2358AC]/20 focus:border-[#2358AC] transition-all placeholder:text-[#9CA3AF]"
              style={{ fontFamily: 'var(--font-inter)' }}
            />
          </div>

          {/* Honeypot - hidden from users */}
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
            tabIndex={-1}
            autoComplete="off"
          />

          {/* Error Message */}
          {error && !showDialog && (
            <p className="text-red-500 text-xs" style={{ fontFamily: 'var(--font-inter)' }}>
              {error}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#2358AC] hover:bg-[#1a4a8a] text-white py-2.5 sm:py-3 px-4 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-sm hover:shadow-md"
            style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
          >
            Get Relief Now
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Trust indicators */}
          <p
            className="text-center text-[#9CA3AF] text-[10px] sm:text-xs"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Free consultation • Same-day callbacks • No obligation
          </p>
        </form>
      </div>

      {/* Expanded Dialog Form */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="rounded-[20px] max-h-[90vh] sm:min-w-3xl overflow-hidden flex flex-col">
          <DialogTitle
            style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 600 }}
            className="text-xl"
          >
            Complete Your {bodyPartTitle} Pain Consultation Request
          </DialogTitle>

          <form
            ref={formRef}
            className="space-y-4 p-1 overflow-y-auto flex-1 pr-2 relative"
            onSubmit={handleFullSubmit}
          >
            <input type="hidden" name="country" value="US" />

            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-sm font-medium text-[#111315] mb-1.5"
                  style={{ fontFamily: 'var(--font-public-sans)' }}
                >
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF]" />
                  <input
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#FAFAFA] border border-[#DCDEE1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2358AC]/20 focus:border-[#2358AC]"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  />
                </div>
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-[#111315] mb-1.5"
                  style={{ fontFamily: 'var(--font-public-sans)' }}
                >
                  Last Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF]" />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#FAFAFA] border border-[#DCDEE1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2358AC]/20 focus:border-[#2358AC]"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  />
                </div>
              </div>
            </div>

            {/* Contact Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-sm font-medium text-[#111315] mb-1.5"
                  style={{ fontFamily: 'var(--font-public-sans)' }}
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF]" />
                  <input
                    type="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#FAFAFA] border border-[#DCDEE1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2358AC]/20 focus:border-[#2358AC]"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  />
                </div>
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-[#111315] mb-1.5"
                  style={{ fontFamily: 'var(--font-public-sans)' }}
                >
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF]" />
                  <input
                    type="tel"
                    placeholder="(123) 456-7890"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: formatPhoneInput(e.target.value) })}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#FAFAFA] border border-[#DCDEE1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2358AC]/20 focus:border-[#2358AC]"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  />
                </div>
              </div>
            </div>

            {/* ZIP Code + State */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-sm font-medium text-[#111315] mb-1.5"
                  style={{ fontFamily: 'var(--font-public-sans)' }}
                >
                  ZIP / Postal Code
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="e.g., 33463"
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm bg-[#FAFAFA] border border-[#DCDEE1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2358AC]/20 focus:border-[#2358AC]"
                  style={{ fontFamily: 'var(--font-inter)' }}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-[#111315] mb-1.5"
                  style={{ fontFamily: 'var(--font-public-sans)' }}
                >
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

            {/* Best Time to Contact */}
            <div>
              <label
                className="block text-sm font-medium text-[#111315] mb-1.5"
                style={{ fontFamily: 'var(--font-public-sans)' }}
              >
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

            {/* Consultation Reason */}
            <div>
              <label
                className="block text-sm font-medium text-[#111315] mb-1.5"
                style={{ fontFamily: 'var(--font-public-sans)' }}
              >
                Tell Us About Your {bodyPartTitle} Pain
              </label>
              <textarea
                placeholder={`Describe your ${bodyPartTitle.toLowerCase()} symptoms, how long you've been experiencing them, and any treatments you've tried...`}
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                rows={4}
                className="w-full px-4 py-2.5 text-sm bg-[#FAFAFA] border border-[#DCDEE1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2358AC]/20 focus:border-[#2358AC] resize-none"
                style={{ fontFamily: 'var(--font-inter)' }}
              />
            </div>

            {/* Insurance Card Upload Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-green-700">HIPAA Compliant & Secure</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Front of Insurance Card */}
                <div>
                  <label className="block text-sm font-medium text-[#111315] mb-1.5">
                    Front of Insurance Card{' '}
                    <span className="text-xs text-gray-500 font-normal">(Optional)</span>
                  </label>
                  <label
                    htmlFor="insurance-front-bodypart"
                    className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-[#DCDEE1] rounded-lg cursor-pointer bg-[#FAFAFA] hover:bg-[#F5F5F5] transition-colors"
                  >
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => setFormData({ ...formData, insuranceCardFront: e.target.files?.[0] || null })}
                      className="hidden"
                      id="insurance-front-bodypart"
                    />
                    <FileImage className="w-6 h-6 mb-1 text-[#838890]" />
                    <p className="text-xs text-[#111315]">
                      <span className="font-medium">Click to upload</span>
                    </p>
                    <p className="text-[10px] text-[#838890]">PNG, JPG, PDF</p>
                    {formData.insuranceCardFront && (
                      <p className="text-[10px] text-green-600 mt-1 font-medium">
                        ✓ {formData.insuranceCardFront.name}
                      </p>
                    )}
                  </label>
                </div>

                {/* Back of Insurance Card */}
                <div>
                  <label className="block text-sm font-medium text-[#111315] mb-1.5">
                    Back of Insurance Card{' '}
                    <span className="text-xs text-gray-500 font-normal">(Optional)</span>
                  </label>
                  <label
                    htmlFor="insurance-back-bodypart"
                    className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-[#DCDEE1] rounded-lg cursor-pointer bg-[#FAFAFA] hover:bg-[#F5F5F5] transition-colors"
                  >
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => setFormData({ ...formData, insuranceCardBack: e.target.files?.[0] || null })}
                      className="hidden"
                      id="insurance-back-bodypart"
                    />
                    <FileImage className="w-6 h-6 mb-1 text-[#838890]" />
                    <p className="text-xs text-[#111315]">
                      <span className="font-medium">Click to upload</span>
                    </p>
                    <p className="text-[10px] text-[#838890]">PNG, JPG, PDF</p>
                    {formData.insuranceCardBack && (
                      <p className="text-[10px] text-green-600 mt-1 font-medium">
                        ✓ {formData.insuranceCardBack.name}
                      </p>
                    )}
                  </label>
                </div>
              </div>

              {/* HIPAA Notice */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <Shield className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-green-700">
                    Your information is encrypted and stored securely in compliance with HIPAA regulations.
                  </p>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-sm" style={{ fontFamily: 'var(--font-inter)' }}>
                {error}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#0A50EC] hover:bg-[#252932] text-white py-3.5 px-6 rounded-full font-medium flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              style={{ fontFamily: 'var(--font-public-sans)', fontWeight: 500 }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Book Your Consultation
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            {/* Privacy Notice */}
            <p
              className="text-[#838890] text-xs text-center"
              style={{ fontFamily: 'var(--font-public-sans)' }}
            >
              By submitting, you agree to our{' '}
              <Link href="/privacy-policy" className="text-[#2358AC] underline">
                privacy policy and disclaimer
              </Link>
              . Someone from our team may contact you via phone, email and/or text.
            </p>

            {/* Scroll indicator */}
            {showScrollIndicator && (
              <div className="fixed bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-50">
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                  <div className="flex items-center gap-1 text-gray-600 text-sm font-medium">
                    <span>Scroll for more</span>
                    <ChevronDown className="w-4 h-4 animate-bounce" />
                  </div>
                </div>
              </div>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
