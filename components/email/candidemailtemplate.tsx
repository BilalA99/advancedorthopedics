import * as React from 'react';

// Define the properties for the Treatment Candidacy email template
interface TreatmentCandidacyEmailProps {
  // Step 1 Questions from formSchema
  condition: string;
  age: string;
  health: string;
  smoking: string;

  // Step 2 Questions from formSchema
  recent_diagnosis: string;
  last_test_date: string;
  other?: string; // Optional, maps to other in formSchema

  // Step 3 Questions from formSchema
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  state?: string; // Optional
  insurance_type?: string; // Optional
  /** Formatted for staff by the action (MM/DD/YYYY or "Not provided"). Body only. */
  date_of_birth?: string;
  comments?: string; // Optional
  email_optout?: string | boolean; // Included from schema, though typically not displayed in confirmation
}

// TreatmentCandidacyEmailTemplate component
export const TreatmentCandidacyEmailTemplate: React.FC<Readonly<TreatmentCandidacyEmailProps>> = ({
  condition,
  age,
  health,
  smoking,
  recent_diagnosis,
  last_test_date,
  other,
  first_name,
  last_name,
  email,
  phone,
  state,
  insurance_type,
  date_of_birth,
  comments,
  // email_optout is available if needed for any logic, but not displayed by default
}) => {
  const fullName = `${first_name} ${last_name}`;

  return (
    // Reusing the HTML structure and styling from the selected code
    <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6', color: '#333', margin: '0 auto', border: '1px solid #ddd', borderRadius: '8px', height: '100%', overflow: 'hidden' }}>
      {/* Header Section */}
      <div style={{ backgroundColor: '#0A50EC', color: 'white', padding: '20px', textAlign: 'center' }} className='flex flex-row items-center justify-center'>
        <img src="https://mountainspineortho.b-cdn.net/newlogo4.png" alt="Mountain Spine & Orthopedic Center" style={{ width: '100px', marginRight: '15px' }} />
        <h1 style={{ fontSize: '24px', color: 'white', margin: '0' }}>Mountain Spine & Orthopedics</h1>
      </div>

      {/* Body Section */}
      <div style={{ padding: '20px 30px' }}>
        <h2 style={{ color: '#252932', fontSize: '20px' }}>Treatment Candidacy Information Received</h2>
        <p style={{ color: 'black' }}>Dear {fullName},</p>
        <p style={{ color: 'black' }}>
          Thank you for submitting your information to Mountain Spine & Orthopedics. Our team is dedicated to helping you find the best path forward.
        </p>
        <p style={{ color: 'black' }}>
          We have received your details for a treatment candidacy review. Our specialists will carefully assess the information you provided to determine which treatment options may be most suitable for your condition. We will be in contact with you soon to discuss potential next steps.
        </p>

        {/* Submitted Information Table for Treatment Candidacy */}
        <h3 style={{ color: '#252932', fontSize: '18px', margin: '20px 0 10px 0', fontWeight: 'bold' }}>Summary of Your Submitted Information:</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', margin: '0 0 20px 0' }}>
          <tbody>
            {/* Personal Details */}
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

            {/* Health & Condition Details (Step 1 from schema) */}
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td colSpan={2} style={{ padding: '10px 0', fontWeight: 'bold', color: '#252932', backgroundColor: '#f0f8ff' }}>Health & Condition</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#555', verticalAlign: 'top' }}>Primary Condition/Concern:</td>
              <td style={{ padding: '8px 0', color: '#333' }}>{condition}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#555', verticalAlign: 'top' }}>Age Range:</td>
              <td style={{ padding: '8px 0', color: '#333' }}>{age}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#555', verticalAlign: 'top' }}>General Health:</td>
              <td style={{ padding: '8px 0', color: '#333' }}>{health}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#555', verticalAlign: 'top' }}>Smoking Status:</td>
              <td style={{ padding: '8px 0', color: '#333' }}>{smoking}</td>
            </tr>

            {/* Diagnosis & Test Details (Step 2 from schema) */}
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td colSpan={2} style={{ padding: '10px 0', fontWeight: 'bold', color: '#252932', backgroundColor: '#f0f8ff' }}>Diagnosis & Testing</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#555', verticalAlign: 'top' }}>Recent Diagnosis Method:</td>
              <td style={{ padding: '8px 0', color: '#333' }}>{recent_diagnosis}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#555', verticalAlign: 'top' }}>Date of Last Test/Imaging:</td>
              <td style={{ padding: '8px 0', color: '#333' }}>{last_test_date}</td>
            </tr>
            {other && (
              <tr style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#555', verticalAlign: 'top' }}>Other Relevant Information:</td>
                <td style={{ padding: '8px 0', color: '#333' }}>{other}</td>
              </tr>
            )}

            {/* Insurance Details (from Step 3) */}
            {date_of_birth && (
              <tr style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#555', verticalAlign: 'top' }}>Date of Birth:</td>
                <td style={{ padding: '8px 0', color: '#333' }}>{date_of_birth}</td>
              </tr>
            )}
            {insurance_type && (
              <>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td colSpan={2} style={{ padding: '10px 0', fontWeight: 'bold', color: '#252932', backgroundColor: '#f0f8ff' }}>Insurance Information</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#555', verticalAlign: 'top' }}>Insurance Type:</td>
                  <td style={{ padding: '8px 0', color: '#333' }}>{insurance_type}</td>
                </tr>
              </>
            )}
          </tbody>
        </table>

        {/* Comments Section */}
        {comments && (
          <div style={{ marginTop: '20px', marginBottom: '20px' }}>
            <h3 style={{ color: '#252932', fontSize: '18px', margin: '0 0 10px 0', fontWeight: 'bold' }}>Additional Comments/Details:</h3>
            <div style={{ maxHeight: '150px', maxWidth: '100%', overflowY: 'scroll', padding: '10px', border: '1px solid #eee', borderRadius: '4px', backgroundColor: '#f9f9f9', color: '#333' }}>
              {comments}
            </div>
          </div>
        )}

        <p style={{ color: 'black' }}>
          Our team will reach out to you as soon as possible using the contact details you provided.
        </p>
        <p style={{ color: 'black' }}>
          If you have any immediate questions or need to provide further information, please don't hesitate to contact us at <a href="tel:+15612239959" style={{ color: '#0A50EC' }}>(561) 223-9959</a> or reply to this email.
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
export default TreatmentCandidacyEmailTemplate;
