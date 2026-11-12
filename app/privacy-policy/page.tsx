import Link from 'next/link';
import CookiePreferencesLink from '@/components/CookiePreferencesLink';

// LAST SUBSTANTIVE REVISION. Hard-coded on purpose.
//
// This page previously rendered `new Date().toLocaleDateString()`, so it claimed
// to have been updated today, every day, forever — a freshness claim that was
// never true. Update this constant by hand when the text below actually changes.
const LAST_UPDATED = 'November 12, 2026';

const H2 = 'text-2xl font-semibold text-[#0A50EC] mb-4 border-b-2 border-[#0A50EC] pb-2';
const BODY = 'text-gray-700 leading-relaxed';

/** Every third-party technology actually running on this site, as of LAST_UPDATED. */
const TRACKERS = [
  {
    vendor: 'Google Tag Manager',
    purpose: 'Loads and manages the measurement tags listed below.',
    storage: 'No storage of its own',
    category: 'Analytics / Advertising',
  },
  {
    vendor: 'Google Analytics 4',
    purpose: 'Tells us which pages visitors use and how they move through the site.',
    storage: '_ga, _ga_* cookies',
    category: 'Analytics',
  },
  {
    vendor: 'Google Ads',
    purpose:
      'Measures which ads lead to appointment requests and phone calls, and supports remarketing where configured.',
    storage: '_gcl_* cookies',
    category: 'Advertising',
  },
  {
    vendor: 'Meta (Facebook and Instagram) Pixel',
    purpose: 'Measures which Meta ads lead to appointment requests.',
    storage: '_fbp, _fbc cookies',
    category: 'Advertising',
  },
  {
    vendor: 'CallRail',
    purpose:
      'Shows a different phone number depending on how you reached the site, so we can tell which ads generate calls.',
    storage: 'calltrk_* cookies and local storage',
    category: 'Advertising',
  },
  {
    vendor: 'Google Maps',
    purpose: 'Displays clinic locations and directions.',
    storage: 'Google cookies',
    category: 'Functional',
  },
] as const;

export default function PrivacyPolicy() {
  return (
    <div className="mt-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#0A50EC] mb-4">Privacy Policy</h1>
          <div className="w-24 h-1 bg-[#0A50EC] mx-auto"></div>
          <p className="mt-4 text-sm text-gray-600">Last updated: {LAST_UPDATED}</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-gray-50 border-l-4 border-[#0A50EC] p-6 mb-8">
            <p className={BODY}>
              This notice explains what Mountain Spine &amp; Orthopedics collects through this website, who we share it
              with, and the choices you control. It covers this website only. Information you give us as a patient
              during care is handled under our clinical privacy practices, which are separate from this notice.
            </p>
          </div>

          <section className="mb-8">
            <h2 className={H2}>Information We Collect</h2>
            <div className={`space-y-4 ${BODY}`}>
              <p>
                <strong>Information you give us.</strong> When you request an appointment, ask for a second opinion,
                request a free MRI review, use a condition or candidacy check, or contact us, we collect the details you
                enter. Depending on the form, that can include your name, email address, phone number, date of birth,
                ZIP code, the state you are in, your insurance type, your preferred callback time, and what you tell us
                about your symptoms, injury, or reason for the visit. If you are working with an attorney on an injury
                claim, we may also collect that firm&apos;s name.
              </p>
              <p>
                <strong>Information collected automatically.</strong> Our servers and the measurement tools listed below
                receive your IP address, browser and device type, the pages you view on this site, the page that
                referred you, and — if you arrived from an ad — the advertising click identifier in that link.
              </p>
              <p>
                <strong>Location.</strong> If you allow it, your browser may share your approximate location so we can
                show nearby clinics. This is processed in your browser to sort the clinic list. We do not store it on
                our servers. Declining does not limit any other part of the site.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className={H2}>How We Use This Information</h2>
            <div className={`space-y-4 ${BODY}`}>
              <p>
                We use the details you submit to respond to your request, schedule care, verify insurance, and keep an
                internal record of the inquiry. That internal record is kept whatever cookie choices you make — refusing
                optional cookies never prevents you from requesting care, and never deletes a request you sent us.
              </p>
              <p>
                We use information collected automatically to keep the site working and secure, to understand which
                pages help patients, and to measure which advertising produces appointment requests.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className={H2}>Cookies and Similar Technologies</h2>
            <div className={`space-y-4 ${BODY}`}>
              <p>
                <strong>This website uses cookies.</strong> Necessary cookies and browser storage — which record your
                cookie choice, keep forms working, and support security — are always active, because the site cannot
                function without them.
              </p>
              <p>
                Everything else is off until you turn it on. Analytics, advertising, and functional technologies load
                only after you accept them in the cookie banner. If you ignore the banner, or reject it, none of them
                run.
              </p>

              <div className="overflow-x-auto my-6 not-prose">
                <table className="w-full text-sm border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-3 font-semibold text-gray-900 border-b border-gray-200">Provider</th>
                      <th className="text-left p-3 font-semibold text-gray-900 border-b border-gray-200">
                        What it does
                      </th>
                      <th className="text-left p-3 font-semibold text-gray-900 border-b border-gray-200">Stores</th>
                      <th className="text-left p-3 font-semibold text-gray-900 border-b border-gray-200">Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TRACKERS.map((t) => (
                      <tr key={t.vendor} className="align-top">
                        <td className="p-3 border-b border-gray-100 font-medium text-gray-900">{t.vendor}</td>
                        <td className="p-3 border-b border-gray-100 text-gray-700">{t.purpose}</td>
                        <td className="p-3 border-b border-gray-100 text-gray-700">{t.storage}</td>
                        <td className="p-3 border-b border-gray-100 text-gray-700">{t.category}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p>
                <strong>Changing your mind.</strong> You can change or withdraw your choice at any time using{' '}
                <CookiePreferencesLink />, which is also linked in the footer of every page. Withdrawing advertising
                consent stops these tools, clears the cookies they set on this site, and reloads the page so nothing
                already running continues.
              </p>
              <p>
                <strong>Browser privacy signals.</strong> If your browser sends a Global Privacy Control signal, we
                treat it as a refusal of advertising cookies and keep them off, even if something was accepted
                previously.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className={H2}>Who We Share Information With</h2>
            <div className={`space-y-4 ${BODY}`}>
              <p>
                <strong>Advertising and analytics providers.</strong> If you accept the relevant cookies, Google, Meta,
                and CallRail receive information about your visit, as described in the table above. Where an appointment
                request results from an advertisement, we may share a one-way encrypted (hashed) version of contact
                details with Google so the request can be matched to the ad that produced it. This happens only where
                you have accepted advertising cookies.
              </p>
              <p>
                <strong>Service providers.</strong> We use Supabase to store inquiries and Resend to deliver the
                notification email to our staff. These providers process information on our behalf, not for their own
                advertising.
              </p>
              <p>
                <strong>Pages about medical topics.</strong> We do not allow advertising pixels to run on pages whose
                address names a specific condition, treatment, or injury, or on our symptom-checker, candidacy, and MRI
                review pages — regardless of your cookie choices.
              </p>
              <p>
                <strong>We do not sell your personal information,</strong> and we do not share the medical details you
                submit through a form with advertising platforms.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className={H2}>Your Choices</h2>
            <div className={`space-y-4 ${BODY}`}>
              <p>
                You can accept, reject, or customize optional cookies at any time using <CookiePreferencesLink />, and
                you can refuse location access in your browser. To opt out of marketing email or mail, or to ask what we
                hold about you, email{' '}
                <a href="mailto:info@mountainspineorthopedics.com" className="text-[#0A50EC] underline">
                  info@mountainspineorthopedics.com
                </a>
                . Depending on where you live, you may have additional rights over your personal information; contact us
                at the same address and we will tell you what applies and how to exercise them.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className={H2}>Security and Retention</h2>
            <div className={`space-y-4 ${BODY}`}>
              <p>
                We use physical, electronic, and procedural safeguards to protect the information you submit. No method
                of transmission over the internet is completely secure, so we cannot guarantee absolute security.
              </p>
              <p>
                We keep inquiry records for as long as needed to respond to you, provide care, and meet our legal and
                recordkeeping obligations. Cookies set by this site expire on their own; the advertising cookies
                described above last up to 90 days.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className={H2}>Other Websites</h2>
            <p className={BODY}>
              This site links to websites we do not operate. We have no control over what those sites collect, and this
              notice does not apply to them.
            </p>
          </section>

          <section className="mb-8">
            <h2 className={H2}>Children</h2>
            <p className={BODY}>
              This website is not directed to children under 13, and we do not knowingly collect their information
              through it. Appointment requests for a minor should be submitted by a parent or guardian.
            </p>
          </section>

          <section className="mb-8">
            <h2 className={H2}>Changes and Contact</h2>
            <div className={`space-y-4 ${BODY}`}>
              <p>
                If we change this notice, we will update the date at the top of this page. Questions about it can go to{' '}
                <a href="mailto:info@mountainspineorthopedics.com" className="text-[#0A50EC] underline">
                  info@mountainspineorthopedics.com
                </a>{' '}
                or by phone at{' '}
                <a href="tel:+15612239959" className="text-[#0A50EC] underline">
                  (561) 223-9959
                </a>
                .
              </p>
              <p>
                See also our{' '}
                <Link href="/insurance-policy" className="text-[#0A50EC] underline">
                  accepted insurance
                </Link>{' '}
                information.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
