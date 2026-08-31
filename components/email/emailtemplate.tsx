import * as React from 'react';

interface EmailTemplateProps {
  name: string,
  email: string,
  phone: string,
  reason: string,
  bestTime: string,
  has_attorney?: string,
  injury_type?: string,
  pain_level?: string,
  location?: string,
  state?: string,
  gclid?: string,
  utm_source?: string,
  utm_medium?: string,
  utm_campaign?: string,
  utm_term?: string,
  utm_content?: string,
}



const STATE_PHONE_MAP: Record<string, { display: string; tel: string }> = {
  FL: { display: '(561) 223-9959', tel: '5612239959' },
  NJ: { display: '(973) 259-6756', tel: '9732596756' },
  NY: { display: '(646) 389-5606', tel: '6463895606' },
  PA: { display: '(215) 436-9496', tel: '2154369496' },
  GA: { display: '(404) 913-6886', tel: '4049136886' },
};

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  email,
  phone,
  reason,
  bestTime,
  has_attorney,
  injury_type,
  pain_level,
  location,
  state,
  gclid,
  utm_source,
  utm_medium,
  utm_campaign,
  utm_term,
  utm_content,
}) => {
  const statePhone = (state && STATE_PHONE_MAP[state]) || STATE_PHONE_MAP.FL;
  return (
  <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6', color: '#333', margin: '0 auto', border: '1px solid #ddd', borderRadius: '8px', height: '100%' }}>
    {/* Header Section - Updated to primary color #252932 */}
    <div style={{ backgroundColor: '#0A50EC', color: 'white', padding: '20px', textAlign: 'center' }} className='flex flex-row items-center justify-center'>
      {/* Logo added as per user's updated code */}
      <img src="https://mountainspineortho.b-cdn.net/newlogo4.png" alt="Mountain Spine & Orthopedic Center" style={{ width: '100px' }} />
      <h1 style={{ fontSize: '24px', color: 'white' }}>Mountain Spine & Orthopedics</h1>
    </div>

    {/* Body Section */}
    <div style={{ padding: '20px 30px' }}>
      {/* Updated heading color to primary color #252932 */}
      <h2 style={{ color: '#252932', fontSize: '20px' }}>Thank You for Your Appointment Request!</h2>
      <p style={{ color: 'black' }}>Dear {name},</p>
      <p style={{ color: 'black' }}>
        Thank you for reaching out to Mountain Spine & Orthopedics! We're recognized as a leading spine and orthopedic center, and we're here to help you on your journey.
        It's time to start the process of getting your life back from that pain.
      </p>
      <p style={{ color: 'black' }}>
        We have received your appointment request. Our team will be in contact with you soon to confirm the date and time of your visit.
        Please look out for an email, call, or text message from us.
      </p>
      {/* Submitted Information Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', margin: '20px 0' }}>
        <tbody>
          <tr style={{ borderBottom: '1px solid #eee', justifyContent: 'space-evenly', width: '100%' }}>
            <td style={{ padding: '10px 0', fontWeight: 'bold', color: '#555', width: '30%', verticalAlign: 'top' }}>Your Preferred Contact Time:</td>
            <td style={{ padding: '10px 0' }}>{bestTime}</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee', justifyContent: 'space-evenly', width: '100%' }}>
            <td style={{ padding: '10px 0', fontWeight: 'bold', color: '#555', verticalAlign: 'top' }}>Best Contact Email:</td>
            <td style={{ padding: '10px 0' }}>{email}</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #eee', justifyContent: 'space-evenly', width: '100%' }}>
            <td style={{ padding: '10px 0', fontWeight: 'bold', color: '#555', verticalAlign: 'top' }}>Best Contact Phone:</td>
            <td style={{ padding: '10px 0' }}>{phone}</td>
          </tr>
          {has_attorney && (
          <tr style={{ borderBottom: '1px solid #eee', justifyContent: 'space-evenly', width: '100%' }}>
            <td style={{ padding: '10px 0', fontWeight: 'bold', color: '#555', verticalAlign: 'top' }}>Has Attorney:</td>
            <td style={{ padding: '10px 0' }}>{has_attorney}</td>
          </tr>
          )}
          {injury_type && (
          <tr style={{ borderBottom: '1px solid #eee', justifyContent: 'space-evenly', width: '100%' }}>
            <td style={{ padding: '10px 0', fontWeight: 'bold', color: '#555', verticalAlign: 'top' }}>Injury Type:</td>
            <td style={{ padding: '10px 0' }}>{injury_type}</td>
          </tr>
          )}
          {pain_level && (
          <tr style={{ borderBottom: '1px solid #eee', justifyContent: 'space-evenly', width: '100%' }}>
            <td style={{ padding: '10px 0', fontWeight: 'bold', color: '#555', verticalAlign: 'top' }}>Pain Level:</td>
            <td style={{ padding: '10px 0' }}>{pain_level}</td>
          </tr>
          )}
          {location && (
          <tr style={{ borderBottom: '1px solid #eee', justifyContent: 'space-evenly', width: '100%' }}>
            <td style={{ padding: '10px 0', fontWeight: 'bold', color: '#555', verticalAlign: 'top' }}>Preferred Location:</td>
            <td style={{ padding: '10px 0' }}>{location}</td>
          </tr>
          )}
          {state && (
          <tr style={{ borderBottom: '1px solid #eee', justifyContent: 'space-evenly', width: '100%' }}>
            <td style={{ padding: '10px 0', fontWeight: 'bold', color: '#555', verticalAlign: 'top' }}>State:</td>
            <td style={{ padding: '10px 0' }}>{state}</td>
          </tr>
          )}
          {gclid && (
          <tr style={{ borderBottom: '1px solid #eee', justifyContent: 'space-evenly', width: '100%' }}>
            <td style={{ padding: '10px 0', fontWeight: 'bold', color: '#555', verticalAlign: 'top' }}>GCLID:</td>
            <td style={{ padding: '10px 0', fontFamily: 'monospace', fontSize: '12px' }}>{gclid}</td>
          </tr>
          )}
          {utm_source && (
          <tr style={{ borderBottom: '1px solid #eee', justifyContent: 'space-evenly', width: '100%' }}>
            <td style={{ padding: '10px 0', fontWeight: 'bold', color: '#555', verticalAlign: 'top' }}>UTM Source:</td>
            <td style={{ padding: '10px 0' }}>{utm_source}{utm_medium ? ` / ${utm_medium}` : ''}{utm_campaign ? ` / ${utm_campaign}` : ''}</td>
          </tr>
          )}
        </tbody>
      </table>

      {/* Consultation Reason Section - Moved outside the table */}
      {reason && (
        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
          <h3 style={{ color: '#252932', fontSize: '18px', margin: '0 0 10px 0', fontWeight: 'bold' }}>Consultation Reason:</h3>
          <div style={{ maxHeight: '150px', maxWidth: '100%', overflowY: 'scroll', padding: '10px', border: '1px solid #eee', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
            {reason}
          </div>
        </div>
      )}

      <p style={{ color: 'black' }}>
        We will do our best to reach you during your preferred contact time of <strong>{bestTime}</strong>, using the contact details you provided.
      </p>
      <p style={{ color: 'black' }}>
        If you have any immediate questions, please don't hesitate to contact us at <a href={`tel:+1${statePhone.tel}`} style={{ color: '#0A50EC' }}>{statePhone.display}</a> or reply to this email.
      </p>
      <p style={{ marginTop: '30px', color: 'black' }}>
        Sincerely,
        <br />
        The Team at Mountain Spine & Orthopedics
      </p>
    </div>

    {/* Footer Section */}
    <div style={{ backgroundColor: '#f4f4f4', color: '#777', padding: '15px', textAlign: 'center', fontSize: '12px' }}>
      {/* <p style={{ margin: '0' }}>Mountain Spine & Orthopedic Center</p>
      <p style={{ margin: '0' }}>123 Healthway Drive, Mountain City, MC 54321</p>
      <p style={{ margin: '0' }}>

        <a href="https://mountainspineorthopedics.com" style={{ color: '#0A50EC' }}>www.mountainspineorthopedics.com</a>
      </p> */}
    </div>
  </div>
  );
};
