import * as React from 'react';

// Define the properties for the Condition Check email template
interface ConditionCheckEmailProps {
  // Step 1 Questions from formSchema
  pain_area: string[]; // Array of strings
  pain_strongest: string;
  pain_length: string;
  pain_desc: string;
  pain_always?: string; // Optional

  // Step 2 Questions from formSchema
  pain_symptoms: string[]; // Array of strings
  pain_worst: string;
  pain_feel_better: string;
  pain_source: string;
  pain_test?: string; // Optional

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
  email_optout?: string | boolean; // Optional, typically not displayed
}

// ConditionCheckEmailTemplate component
export const ConditionCheckEmailTemplate: React.FC<Readonly<ConditionCheckEmailProps>> = ({
  pain_area,
  pain_strongest,
  pain_length,
  pain_desc,
  pain_always,
  pain_symptoms,
  pain_worst,
  pain_feel_better,
  pain_source,
  pain_test,
  first_name,
  last_name,
  email,
  phone,
  state,
  insurance_type,
  date_of_birth,
  comments,
  // email_optout is available if needed
}) => {
  const fullName = `${first_name} ${last_name}`;

  // Helper function to display array data
  const displayArrayData = (dataArray: string[] | undefined) => {
    if (dataArray && dataArray.length > 0) {
      return dataArray.join(', ');
    }
    return 'Not specified';
  };

  return (
    // Reusing the HTML structure and styling
    <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6', color: '#333', margin: '0 auto', border: '1px solid #ddd', borderRadius: '8px', height: '100%', overflow: 'hidden' }}>
      {/* Header Section */}
      <div style={{ backgroundColor: '#0A50EC', color: 'white', padding: '20px', textAlign: 'center' }} className='flex flex-row items-center justify-center'>
        <img src="https://mountainspineortho.b-cdn.net/newlogo4.png" alt="Mountain Spine & Orthopedic Center" style={{ width: '100px', marginRight: '15px' }} />
        <h1 style={{ fontSize: '24px', color: 'white', margin: '0' }}>Mountain Spine & Orthopedics</h1>
      </div>

      {/* Body Section */}
      <div style={{ padding: '20px 30px' }}>
        <h2 style={{ color: '#252932', fontSize: '20px' }}>Condition Check Information Received</h2>
        <p style={{ color: 'black' }}>Dear {fullName},</p>
        <p style={{ color: 'black' }}>
          Thank you for submitting your detailed condition information to Mountain Spine & Orthopedics. We appreciate you taking the time to provide these insights.
        </p>
        <p style={{ color: 'black' }}>
          Our team will carefully review the information you've shared. Based on your submission, we will get back to you soon with insights into what you could potentially be suffering from and discuss possible next steps.
        </p>

        {/* Submitted Information Table for Condition Check */}
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

            {/* Pain Details (Step 1 from schema) */}
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td colSpan={2} style={{ padding: '10px 0', fontWeight: 'bold', color: '#252932', backgroundColor: '#f0f8ff' }}>Pain Characteristics</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#555', verticalAlign: 'top' }}>Area(s) of Pain:</td>
              <td style={{ padding: '8px 0', color: '#333' }}>{displayArrayData(pain_area)}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#555', verticalAlign: 'top' }}>Strongest Pain Area:</td>
              <td style={{ padding: '8px 0', color: '#333' }}>{pain_strongest}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#555', verticalAlign: 'top' }}>Duration of Pain:</td>
              <td style={{ padding: '8px 0', color: '#333' }}>{pain_length}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#555', verticalAlign: 'top' }}>Description of Pain:</td>
              <td style={{ padding: '8px 0', color: '#333' }}>{pain_desc}</td>
            </tr>
            {pain_always && (
              <tr style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#555', verticalAlign: 'top' }}>Is Pain Always Present?:</td>
                <td style={{ padding: '8px 0', color: '#333' }}>{pain_always}</td>
              </tr>
            )}

            {/* Symptoms & Modifiers (Step 2 from schema) */}
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td colSpan={2} style={{ padding: '10px 0', fontWeight: 'bold', color: '#252932', backgroundColor: '#f0f8ff' }}>Symptoms & Influencing Factors</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#555', verticalAlign: 'top' }}>Associated Symptoms:</td>
              <td style={{ padding: '8px 0', color: '#333' }}>{displayArrayData(pain_symptoms)}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#555', verticalAlign: 'top' }}>What Makes Pain Worst?:</td>
              <td style={{ padding: '8px 0', color: '#333' }}>{pain_worst}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#555', verticalAlign: 'top' }}>What Makes Pain Feel Better?:</td>
              <td style={{ padding: '8px 0', color: '#333' }}>{pain_feel_better}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#555', verticalAlign: 'top' }}>Suspected Source of Pain:</td>
              <td style={{ padding: '8px 0', color: '#333' }}>{pain_source}</td>
            </tr>
            {pain_test && (
              <tr style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#555', verticalAlign: 'top' }}>Previous Tests/Imaging:</td>
                <td style={{ padding: '8px 0', color: '#333' }}>{pain_test}</td>
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
            <h3 style={{ color: '#252932', fontSize: '18px', margin: '0 0 10px 0', fontWeight: 'bold' }}>Additional Comments:</h3>
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
        <a href="https://mountainspineorthopedics.com" style={{ color: '#0A50EC' }}>www.mountainspineorthopedics.com</a>
      </div>
    </div>
  );
};

// Default export for potential use in email sending services
export default ConditionCheckEmailTemplate;
