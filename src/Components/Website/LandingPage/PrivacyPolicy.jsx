import React from 'react';

const PrivacyPolicyContent = () => {
  return (
    <div className="min-h-screen w-full bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-blue-600 text-sm font-medium mb-4">Current as of 5 August 2025</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            At Gateway Shield, your safety and privacy are our highest priorities. This Privacy Policy outlines how our application, Gateway Shield (the "App"), collects, uses, processes, and protects your personal information. We are committed to transparency and ensuring your data is handled with the utmost care, whether you choose to report anonymously or through an account.
          </p>
        </div>

        {/* Content */}
        <div className="bg-white p-8 space-y-10">
          {/* Who We Are */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Who We Are</h2>
            <p className="text-gray-700 leading-relaxed">
              Gateway Shield is a citizen safety platform designed to empower individuals to report incidents to local law enforcement authorities ("Police") quickly and securely.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              To provide our services, we collect various types of information, which may include:
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Personal Information:</h3>
                <p className="text-gray-700 leading-relaxed">
                  If you choose to create an account, we collect your name, email address, phone number, and physical address. This information is used to link a report to your identity and to provide you with status updates.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Location Information:</h3>
                <p className="text-gray-700 leading-relaxed">
                  With your explicit permission, we collect your precise geographic location to accurately route your report to the nearest and most relevant police station. You can disable location sharing at any time through your device settings, though this may impact the accuracy and routing of your report.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Report Details:</h3>
                <p className="text-gray-700 leading-relaxed">
                  We collect the information you provide in a report, including the type of crime, a description of the incident, and any attached images or files. This data is essential for law enforcement to understand and respond to the report.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Device and Technical Information:</h3>
                <p className="text-gray-700 leading-relaxed">
                  We automatically collect data about your device, such as your IP address, device type, operating system, and unique device identifiers. This information is used for platform analytics, security, and to improve the app's performance.
                </p>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              We use the information we collect for the following purposes:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <div>
                  <span className="font-semibold">To Facilitate Incident Reporting:</span> We use your location and report details to correctly identify the appropriate police station and route your report for action.
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <div>
                  <span className="font-semibold">To Communicate with You:</span> If you have an account, we use your contact information to send you real-time updates and notifications regarding the status of your reported incident.
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <div>
                  <span className="font-semibold">For Platform Improvement:</span> We analyze aggregated and anonymized data to identify trends, improve the app's functionality, and enhance overall public safety planning.
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <div>
                  <span className="font-semibold">For Security and Fraud Prevention:</span> We use technical data to monitor for potential security threats and protect against fraudulent activity.
                </div>
              </li>
            </ul>
          </section>

          {/* Data Sharing and Disclosure */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Sharing and Disclosure</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              We are committed to protecting your privacy. We do not sell or rent your personal information to third parties. Your data is shared only in the following circumstances:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <div>
                  <span className="font-semibold">With Law Enforcement:</span> The personal information and report details you provide are shared directly with the specific police officers or departments assigned to your case, except in the case of an anonymous report.
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <div>
                  <span className="font-semibold">With Service Providers:</span> We may use third-party service providers (e.g., for data hosting, security, and analytics) to assist us in operating the App. These providers are contractually obligated to handle your data securely and only process it for the purposes described in this policy.
                </div>
              </li>
            </ul>
          </section>

          {/* Your Choices and Privacy Rights */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Your Choices and Privacy Rights</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              You have control over your information. We provide you with the following rights and choices:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <div>
                  <span className="font-semibold">Anonymous Reporting:</span> You can choose to submit an anonymous report. In this case, your name, contact information, and account details are never shared with police or associated with the report.
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <div>
                  <span className="font-semibold">Data Access and Rectification:</span> You can request to access or correct the personal information we hold about you by contacting us at{' '}
                  <a href="mailto:info@thegatewayshield.com" className="text-blue-600 hover:text-blue-800 underline">
                    info@thegatewayshield.com
                  </a>.
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <div>
                  <span className="font-semibold">Data Deletion:</span> You can request the deletion of your account and personal data at any time by contacting{' '}
                  <a href="mailto:info@thegatewayshield.com" className="text-blue-600 hover:text-blue-800 underline">
                    info@thegatewayshield.com
                  </a>. We will take reasonable steps to delete your data, though some information (e.g., anonymized report data) may be retained for public safety and operational purposes as legally required.
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <div>
                  <span className="font-semibold">Location Sharing:</span> You can disable location services for the Gateway Shield App through your device settings at any time.
                </div>
              </li>
            </ul>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Security</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              We employ a range of technical and organizational security measures to protect your information from unauthorized access, loss, or misuse. Our security protocols include:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <div>
                  <span className="font-semibold">Encryption:</span> All data, both in transit and at rest, is protected using industry-standard encryption protocols.
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <div>
                  <span className="font-semibold">Access Control:</span> Access to sensitive report data is strictly limited to authorized police personnel and designated Gateway Shield administrators on a need-to-know basis.
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <div>
                  <span className="font-semibold">Anonymity by Design:</span> Our system is engineered to ensure that when you submit an anonymous report, no identifying information is shared with law enforcement.
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <div>
                  <span className="font-semibold">Security Audits:</span> We regularly review and update our security practices to stay current with new threats and vulnerabilities.
                </div>
              </li>
            </ul>
            <p className="text-gray-700 mt-4 leading-relaxed">
              While we take extensive measures to protect your data, please be aware that no security system is 100% impenetrable. If you believe your data has been compromised, please contact us immediately at{' '}
              <a href="mailto:info@thegatewayshield.com" className="text-blue-600 hover:text-blue-800 underline">
                info@thegatewayshield.com
              </a>.
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Retention</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy.
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <div>
                  <span className="font-semibold">Account Data:</span> Your profile and report history are retained until you request account deletion.
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <div>
                  <span className="font-semibold">Incident Reports:</span> Reports are stored for a period necessary for audit, public safety analysis, and law enforcement review. Anonymized reports may be retained indefinitely for trend analysis.
                </div>
              </li>
            </ul>
          </section>

          {/* Policy Updates */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Policy Updates</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time. When we make material changes, we will notify you through the App or by other means, such as by posting the updated policy on our website. Your continued use of the App after an update constitutes your acceptance of the revised policy.
            </p>
          </section>

          {/* Contact Us */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact Us</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-semibold">Email:</span>{' '}
                <a href="mailto:info@thegatewayshield.com" className="text-blue-600 hover:text-blue-800 underline">
                  info@thegatewayshield.com
                </a>
              </p>
              <p>
                <span className="font-semibold">Website:</span>{' '}
                <a href="https://www.thegatewayshield.com" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">
                  www.thegatewayshield.com
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyContent;