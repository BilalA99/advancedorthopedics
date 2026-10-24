import * as React from 'react';

// Define the properties for the email template
interface EmailTemplateProps {
  // Existing fields
  name?: string; // Optional now, as we have first_name and last_name
  email: string;
  phone: string;
  // New fields for MRI Review
  first_name: string;
  last_name: string;
  comments?: string; // Optional
  email_optout?: string | boolean; // Can be string "true"/"false" or boolean
  insurance_type?: string;
  /** Formatted for staff by the action (MM/DD/YYYY or "Not provided"). Body only. */
  date_of_birth?: string;
  last_test_date?: string;
  other?: string; // Optional, for "other" insurance/diagnosis
  recent_diagnosis?: string;
  state?: string;
  // Fields that were in the previous general appointment but might be less relevant or covered by new fields
  bestTime?: string; // Retaining for now, could be "Preferred Contact Time"
  reason?: string; // Could be mapped from comments or a specific MRI review reason field
}

// EmailTemplate component
export const MRIEmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  email,
  phone,
  first_name,
  last_name,
  comments,
  insurance_type,
  date_of_birth,
  last_test_date,
  other,
  recent_diagnosis,
  state,
  bestTime, // Kept from previous, can be used as "Preferred Contact Time"
  // reason prop is available if needed, but comments might cover this for MRI review
}) => {
  const fullName = `${first_name} ${last_name}`;

  return (
    // Using the HTML structure provided by the user in the latest query
    <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6', color: '#333', margin: '0 auto', border: '1px solid #ddd', borderRadius: '8px', height: '100%', overflow: 'hidden' }}>
      {/* Header Section */}
      <div style={{ backgroundColor: '#0A50EC', color: 'white', padding: '20px', textAlign: 'center' }} className='flex flex-row items-center justify-center'>
        <img src="https://mountainspineortho.b-cdn.net/newlogo4.png" alt="Mountain Spine & Orthopedic Center" style={{ width: '100px', marginRight: '15px' }} /> {/* Added marginRight for spacing */}
        <h1 style={{ fontSize: '24px', color: 'white', margin: '0' }}>Mountain Spine & Orthopedics</h1> {/* Added margin: 0 to h1 */}
      </div>

      {/* Body Section */}
      <div style={{ padding: '20px 30px' }}>
        <h2 style={{ color: '#252932', fontSize: '20px' }}>Your Free MRI Review Request is Confirmed!</h2>
        <p style={{ color: 'black' }}>Dear {fullName},</p>
        <p style={{ color: 'black' }}>
          Thank you for submitting your information for a Free MRI Review with Mountain Spine & Orthopedics! We're a leading spine and orthopedic center, and our specialists are looking forward to reviewing your case.
        </p>
        <p style={{ color: 'black' }}>
          We have received your details. Our team will carefully review the information you provided and will be in contact with you soon regarding the next steps.
          Please look out for an email, call, or text message from us.
        </p>

        {/* Submitted Information Table for MRI Review */}
        <h3 style={{ color: '#252932', fontSize: '18px', margin: '20px 0 10px 0', fontWeight: 'bold' }}>Summary of Your Information:</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', margin: '0 0 20px 0' }}>
          <tbody>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#555', width: '40%', verticalAlign: 'top' }}>Name:</td>
              <td style={{ padding: '8px 0', color: '#333' }}>{fullName}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#555', verticalAlign: 'top' }}>Email:</td>
              <td style={{ padding: '8px 0', color: '#333' }}>{email}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#555', verticalAlign: 'top' }}>Phone:</td>
              <td style={{ padding: '8px 0', color: '#333' }}>{phone}</td>
            </tr>
            {state && (
              <tr style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#555', verticalAlign: 'top' }}>State:</td>
                <td style={{ padding: '8px 0', color: '#333' }}>{state}</td>
              </tr>
            )}
            {date_of_birth && (
              <tr style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#555', verticalAlign: 'top' }}>Date of Birth:</td>
                <td style={{ padding: '8px 0', color: '#333' }}>{date_of_birth}</td>
              </tr>
            )}
            {insurance_type && (
              <tr style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#555', verticalAlign: 'top' }}>Insurance Type:</td>
                <td style={{ padding: '8px 0', color: '#333' }}>{insurance_type}</td>
              </tr>
            )}
            {last_test_date && (
              <tr style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#555', verticalAlign: 'top' }}>Date of Last Test/Imaging:</td>
                <td style={{ padding: '8px 0', color: '#333' }}>{last_test_date}</td>
              </tr>
            )}
            {recent_diagnosis && (
              <tr style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#555', verticalAlign: 'top' }}>Recent Diagnosis Method:</td>
                <td style={{ padding: '8px 0', color: '#333' }}>{recent_diagnosis}</td>
              </tr>
            )}
            {bestTime && ( // If 'bestTime' is still relevant for MRI review follow-up
              <tr style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#555', verticalAlign: 'top' }}>Preferred Contact Time:</td>
                <td style={{ padding: '8px 0', color: '#333' }}>{bestTime}</td>
              </tr>
            )}
            {other && ( // Display if 'other' information is provided
              <tr style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#555', verticalAlign: 'top' }}>Other Information:</td>
                <td style={{ padding: '8px 0', color: '#333' }}>{other}</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Comments Section (formerly Consultation Reason) */}
        {comments && (
          <div style={{ marginTop: '20px', marginBottom: '20px' }}>
            <h3 style={{ color: '#252932', fontSize: '18px', margin: '0 0 10px 0', fontWeight: 'bold' }}>Additional Comments/Details:</h3>
            <div style={{ maxHeight: '150px', maxWidth: '100%', overflowY: 'scroll', padding: '10px', border: '1px solid #eee', borderRadius: '4px', backgroundColor: '#f9f9f9', color: '#333' }}>
              {comments}
            </div>
          </div>
        )}

        <p style={{ color: 'black' }}>
          We will do our best to reach you during your preferred contact time of <strong>{bestTime}</strong>, using the contact details you provided.
        </p>
        <p style={{ color: 'black' }}>
          If you have any immediate questions, please don't hesitate to contact us at <a href="tel:+15612239959" style={{ color: '#0A50EC' }}>(561) 223-9959</a> or reply to this email.
        </p>
        <p style={{ marginTop: '30px', color: 'black' }}>
          Sincerely,
          <br />
          The Team at Mountain Spine & Orthopedics
        </p>
      </div>

      {/* Footer Section */}
      <div style={{ backgroundColor: '#f4f4f4', color: '#777', padding: '15px', textAlign: 'center', fontSize: '12px' }}>
        <p style={{ margin: '0' }}>Mountain Spine & Orthopedics</p>
        <p style={{ margin: '0' }}>123 Healthway Drive, Mountain City, MC 54321</p>
        <p style={{ margin: '0' }}>
          <a href="https://mountainspineorthopedics.com" style={{ color: '#0A50EC' }}>www.mountainspineorthopedics.com</a>
        </p>
      </div>
    </div>
  );
};

// Default export for potential use in email sending services
export default MRIEmailTemplate;
