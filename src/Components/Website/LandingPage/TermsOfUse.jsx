import React from 'react';

const TermsOfUseContent = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-blue-600 text-sm mb-2">Current as of 20 Jan 2025</p>
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Term of Use</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          By using Gateway Shield, you agree to the terms outlined here. If you do not 
          agree, please do not use the platform.
        </p>
      </div>

      {/* Content Sections */}
      <div className="space-y-12">
        {/* Section 1: Purpose of the Platform */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Purpose of the Platform</h2>
          <p className="text-gray-700 mb-4">
            Gateway Shield is a public safety platform that enables citizens to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Report non-emergency and emergency incidents to local authorities</li>
            <li>Track the progress of their reports</li>
            <li>Receive real-time safety alerts</li>
            <li>Provide feedback to improve law enforcement accountability</li>
          </ul>
          <p className="text-gray-700 mt-4">
            We are not a replacement for emergency services. In life-threatening situations, 
            please contact your local emergency number first.
          </p>
        </section>

        {/* Section 2: Eligibility */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Eligibility</h2>
          <p className="text-gray-700 mb-4">
            You must be at least 13 years old to use this platform. By using Gateway Shield, you 
            confirm that:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>You are legally eligible to report an incident</li>
            <li>You are submitting reports in good faith</li>
          </ul>
        </section>

        {/* Section 3: Responsible Use */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Responsible Use</h2>
          <p className="text-gray-700 mb-4">You agree not to:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Submit false, misleading, or malicious reports</li>
            <li>Use the platform to harass, threaten, or defame others</li>
            <li>Attempt to impersonate another individual</li>
            <li>Misuse anonymous reporting to spread false information</li>
            <li>Interfere with system functionality via bots or hacking</li>
          </ul>
          <p className="text-gray-700 mt-4">
            Gateway Shield reserves the right to suspend or delete any account that violates 
            these terms.
          </p>
        </section>

        {/* Section 4: Your Content and Data */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Your Content and Data</h2>
          <p className="text-gray-700 mb-4">
            You retain ownership of the data you submit (e.g., reports, photos, comments), but 
            grant Gateway Shield a license to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Use your content for the purpose of processing your report</li>
            <li>Store your data in accordance with our Privacy Policy</li>
            <li>Use anonymized data to improve safety and system performance</li>
          </ul>
        </section>

        {/* Section 5: Reporting Flow */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Reporting Flow</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Reports may be reviewed by human moderators or assigned police admins.</li>
            <li>All actions on your report are logged and monitored.</li>
            <li>Ticket closure is reviewed by system admins after officer input.</li>
          </ul>
        </section>

        {/* Section 6: Platform Updates */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Platform Updates</h2>
          <p className="text-gray-700 mb-4">
            We may update the platform's features, terms, or privacy practices. When we do, we 
            will notify you through the app or email.
          </p>
          <p className="text-gray-700">
            Continuing to use the platform after updates means you accept the changes.
          </p>
        </section>

        {/* Section 7: Termination */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Termination</h2>
          <p className="text-gray-700 mb-4">We reserve the right to:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Suspend your access if you violate our terms or misuse the platform</li>
            <li>Remove content that violates community safety, legal standards, or national security</li>
          </ul>
        </section>

        {/* Section 8: Limitation of Liability */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Limitation of Liability</h2>
          <p className="text-gray-700 mb-4">
            Gateway Shield provides tools for public reporting and information. We are not liable 
            for:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>The outcome of any report submitted</li>
            <li>Delays or failures in response by law enforcement</li>
            <li>Any damages arising from misuse of the platform</li>
          </ul>
        </section>

        {/* Section 9: Governing Law */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Governing Law</h2>
          <p className="text-gray-700">
            These Terms of Use are governed by the laws of the Federal Republic of Nigeria.
          </p>
        </section>

        {/* Section 10: Contact Us */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact Us</h2>
          <div className="text-gray-700">
            <p className="mb-2">Questions or concerns?</p>
            <p>Email: <a href="mailto:support@gatewayshield.ng" className="text-blue-600 hover:text-blue-800 underline">support@gatewayshield.ng</a></p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TermsOfUseContent;