import * as React from 'react';

/**
 * STAFF-FACING notification for a Meta Instant Form lead.
 *
 * Deliberately not the patient-facing EmailTemplate: this one is read by the
 * scheduling team, so it opens with the action to take, puts the contact
 * details first with tappable tel:/mailto: links, and keeps ad attribution in a
 * separate block so it never competes with the patient information.
 *
 * The lead arrives from an ad, so there is no website session behind it — no
 * date of birth, no insurance, nothing clinical. That is by design: the Instant
 * Form collects contact details only.
 */

interface MetaLeadEmailTemplateProps {
  name?: string;
  email?: string;
  phone?: string;
  /** Clinic the patient picked in the form. */
  location?: string;
  /** "Facebook" or "Instagram". */
  platform?: string;
  /** Meta's lead id — the reference if staff need to find it in Instant Forms. */
  leadId?: string;
  formId?: string;
  campaignId?: string;
  adsetId?: string;
  adId?: string;
  /** Already formatted for display by the caller. */
  submittedAt?: string;
}

const LABEL: React.CSSProperties = {
  padding: '10px 0',
  fontWeight: 'bold',
  color: '#555',
  width: '38%',
  verticalAlign: 'top',
};
const VALUE: React.CSSProperties = { padding: '10px 0', color: '#111' };
const ROW: React.CSSProperties = { borderBottom: '1px solid #eee' };
const MONO: React.CSSProperties = {
  padding: '6px 0',
  fontFamily: 'monospace',
  fontSize: '12px',
  color: '#444',
};

const fallback = (v?: string) => (v && v.trim() ? v.trim() : 'Not provided');

export const MetaLeadEmailTemplate: React.FC<Readonly<MetaLeadEmailTemplateProps>> = ({
  name,
  email,
  phone,
  location,
  platform,
  leadId,
  formId,
  campaignId,
  adsetId,
  adId,
  submittedAt,
}) => {
  const telHref = phone ? `tel:${phone.replace(/[^\d+]/g, '')}` : undefined;
  const sourceLabel = platform === 'instagram' ? 'Instagram' : 'Facebook';

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: 1.6, color: '#333', margin: '0 auto', border: '1px solid #ddd', borderRadius: '8px', maxWidth: '640px' }}>
      {/* Distinct header so this never gets mistaken for a website enquiry */}
      <div style={{ backgroundColor: '#0A50EC', color: 'white', padding: '18px 20px', textAlign: 'center' }}>
        <img src="https://mountainspineortho.b-cdn.net/newlogo4.png" alt="Mountain Spine &amp; Orthopedics" style={{ width: '90px' }} />
        <h1 style={{ fontSize: '20px', color: 'white', margin: '8px 0 0' }}>New Meta Ad Lead</h1>
        <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#dbe7ff' }}>
          Submitted on {sourceLabel} &middot; {fallback(submittedAt)}
        </p>
      </div>

      <div style={{ padding: '20px 24px' }}>
        {/* The action, before anything else */}
        <div style={{ backgroundColor: '#FFF4E5', border: '1px solid #FFD8A8', borderRadius: '6px', padding: '12px 14px', marginBottom: '20px' }}>
          <p style={{ margin: 0, color: '#8a4b00', fontWeight: 'bold' }}>
            Call this patient as soon as possible.
          </p>
          <p style={{ margin: '6px 0 0', color: '#8a4b00', fontSize: '14px' }}>
            They requested an appointment through a Meta ad. This is a request &mdash; no
            appointment has been scheduled yet.
          </p>
        </div>

        <h2 style={{ color: '#252932', fontSize: '17px', margin: '0 0 6px' }}>Patient details</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', margin: '0 0 24px' }}>
          <tbody>
            <tr style={ROW}>
              <td style={LABEL}>Name:</td>
              <td style={VALUE}>{fallback(name)}</td>
            </tr>
            <tr style={ROW}>
              <td style={LABEL}>Phone:</td>
              <td style={VALUE}>
                {telHref
                  ? <a href={telHref} style={{ color: '#0A50EC', fontWeight: 'bold' }}>{phone}</a>
                  : 'Not provided'}
              </td>
            </tr>
            <tr style={ROW}>
              <td style={LABEL}>Email:</td>
              <td style={VALUE}>
                {email
                  ? <a href={`mailto:${email}`} style={{ color: '#0A50EC' }}>{email}</a>
                  : 'Not provided'}
              </td>
            </tr>
            <tr style={ROW}>
              <td style={LABEL}>Preferred location:</td>
              <td style={VALUE}><strong>{fallback(location)}</strong></td>
            </tr>
          </tbody>
        </table>

        {/* Explains an absence staff would otherwise query */}
        <p style={{ fontSize: '13px', color: '#666', margin: '0 0 24px' }}>
          Meta Instant Forms collect contact details only, so there is no date of birth,
          insurance or reason-for-visit on this lead. Gather those on the call using the
          normal intake process.
        </p>

        <h3 style={{ color: '#252932', fontSize: '15px', margin: '0 0 6px' }}>Ad source</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', margin: '0 0 20px' }}>
          <tbody>
            <tr>
              <td style={LABEL}>Platform:</td>
              <td style={MONO}>{sourceLabel}</td>
            </tr>
            {formId && (
              <tr>
                <td style={LABEL}>Form ID:</td>
                <td style={MONO}>{formId}</td>
              </tr>
            )}
            {campaignId && (
              <tr>
                <td style={LABEL}>Campaign ID:</td>
                <td style={MONO}>{campaignId}</td>
              </tr>
            )}
            {adsetId && (
              <tr>
                <td style={LABEL}>Ad set ID:</td>
                <td style={MONO}>{adsetId}</td>
              </tr>
            )}
            {adId && (
              <tr>
                <td style={LABEL}>Ad ID:</td>
                <td style={MONO}>{adId}</td>
              </tr>
            )}
            {leadId && (
              <tr>
                <td style={LABEL}>Meta lead ID:</td>
                <td style={MONO}>{leadId}</td>
              </tr>
            )}
          </tbody>
        </table>

        <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>
          The original submission stays available in Ads Manager &rarr; Instant Forms for
          90 days. Quote the Meta lead ID above if you need to look it up.
        </p>
      </div>

      <div style={{ backgroundColor: '#f4f4f4', color: '#777', padding: '14px', textAlign: 'center', fontSize: '12px' }}>
        <p style={{ margin: 0 }}>
          Automated notification &middot; Mountain Spine &amp; Orthopedics
        </p>
      </div>
    </div>
  );
};
