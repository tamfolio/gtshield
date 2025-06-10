import React from 'react';

const PrivacyPolicyContent = () => {
  return (
    <div className="min-h-screen w-full bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-blue-600 text-sm font-medium mb-4">Current as of 20 Jan 2025</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your privacy is important to us at Gateway Shield. We respect your privacy 
            regarding any information we may collect from you across our website.
          </p>
        </div>

        {/* Content */}
        <div className="bg-white p-8 space-y-10">
          {/* Introduction */}
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              At Gateway Shield, your safety and privacy come first.
            </p>
            <p className="text-gray-700 leading-relaxed">
              This Privacy Policy explains what information we collect, how we use it, and the 
              choices you have.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Whether you're reporting anonymously or through an account, we're committed to 
              protecting your data and ensuring your experience is secure.
            </p>
          </div>

          {/* Who We Are */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Who We Are</h2>
            <p className="text-gray-700 leading-relaxed">
              Gateway Shield is a citizen safety platform built to help individuals report incidents 
              to local authorities quickly, safely, and anonymously if preferred.
            </p>
          </section>

          {/* What We Collect */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What We Collect</h2>
            <p className="text-gray-700 mb-4">We collect:</p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Personal details (name, email, phone, address) — only if you create an account
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Geo-location (if you enable location when reporting)
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Report details (type of crime, location, description)
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Device and browser info (for analytics and platform improvement)
              </li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                To route your report to the right police station
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                To send you real-time updates on your report
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                To improve the platform's safety and responsiveness
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                To generate anonymized insights for public safety planning
              </li>
            </ul>
          </section>

          {/* Your Privacy Choices */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Privacy Choices</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                You can report anonymously (no name or contact required)
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                You can request deletion of your personal data at any time
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                You can choose to disable location sharing
              </li>
            </ul>
          </section>

          {/* Who Sees Your Data */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Who Sees Your Data</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Police officers assigned to your case (except when hidden)
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Admins managing report routing and system performance
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                No one else — we do not sell or share your data with third parties
              </li>
            </ul>
          </section>

          {/* How We Protect Your Data */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Protect Your Data</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              We use technical and organizational measures to protect your information from 
              unauthorized access, loss, or misuse. These include:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span><strong>Data Encryption:</strong> All information is encrypted both in transit and at rest.</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span><strong>Role-Based Access:</strong> Only authorized police personnel and admins can access reports.</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span><strong>Audit Logs:</strong> Every action on a ticket is logged for accountability.</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span><strong>Anonymity by Design:</strong> If you choose to hide your identity, it is never shared with officers.</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span><strong>Secure Hosting:</strong> Our servers are hosted in secure environments with firewall and monitoring systems.</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span><strong>Regular Security Reviews:</strong> We assess and update our security protocols regularly to stay ahead of threats.</span>
              </li>
            </ul>
            <p className="text-gray-700 mt-4 leading-relaxed">
              Despite our efforts, no platform can be 100% secure. If you suspect any issue, 
              please reach out immediately to{' '}
              <a href="mailto:security@gatewayshield.ng" className="text-blue-600 hover:text-blue-800 underline">
                security@gatewayshield.ng
              </a>.
            </p>
          </section>

          {/* How Long We Keep Your Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How Long We Keep Your Information</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              We retain your information only as long as it is needed for the purposes described in 
              this policy:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Incident reports are kept for audit, public safety analytics, and law enforcement review.
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                If you create an account, your profile and report history are retained until you request deletion.
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Anonymous reports are stored without identifiers but may be used for insight and performance metrics.
              </li>
            </ul>
            <p className="text-gray-700 mt-4 leading-relaxed">
              You can request account or data deletion at any time by contacting{' '}
              <a href="mailto:privacy@gatewayshield.ng" className="text-blue-600 hover:text-blue-800 underline">
                privacy@gatewayshield.ng
              </a>.
            </p>
          </section>

          {/* Contact Us */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-2">Have questions or concerns?</p>
            <p className="text-gray-700">
              Email:{' '}
              <a href="mailto:privacy@gatewayshield.ng" className="text-blue-600 hover:text-blue-800 underline">
                privacy@gatewayshield.ng
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyContent;