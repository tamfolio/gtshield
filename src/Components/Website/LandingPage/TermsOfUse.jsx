import React from 'react';

const TermsOfUseContent = () => {
  return (
    <div className="min-h-screen w-full bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-blue-600 text-sm font-medium mb-4">Current as of 5 August 2025</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Terms of Use</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Welcome to Gateway Shield. These Terms of Use constitute a legally binding agreement between you and Gateway Shield. By accessing, using, or downloading the Gateway Shield mobile application, you agree to be bound by these Terms of Use and our Privacy Policy.
          </p>
        </div>

        {/* Content */}
        <div className="bg-white p-8 space-y-10">
          {/* Section 1: Acceptance of Terms */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Welcome to Gateway Shield. These Terms of Use constitute a legally binding agreement between you ("User," "you") and Gateway Shield ("we," "us," "our"). By accessing, using, or downloading the Gateway Shield mobile application (the "App"), you agree to be bound by these Terms of Use and our Privacy Policy.
            </p>
            <p className="text-gray-700 leading-relaxed">
              If you do not agree to these terms, you may not use the App.
            </p>
          </section>

          {/* Section 2: Purpose of the App */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Purpose of the App</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Gateway Shield is a platform designed to facilitate citizen-led reporting of incidents to law enforcement authorities. The App is intended for reporting non-emergency and emergency incidents.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Gateway Shield is not a substitute for official emergency services. In the event of an immediate threat to life or property, you must contact your local emergency services number directly.
            </p>
          </section>

          {/* Section 3: Eligibility */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Eligibility</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You must be at least 13 years of age to use the App. By using the App, you represent and warrant that:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                You are at least 13 years of age.
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                You are legally capable of entering into a binding contract. If you are between the ages of 13 and 18, you confirm that you have obtained parental or guardian consent to use the App.
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                All information you provide is truthful and accurate.
              </li>
            </ul>
          </section>

          {/* Section 4: Responsible Use and User Conduct */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Responsible Use and User Conduct</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You agree to use the App solely for its intended purpose and in a manner that is lawful and in accordance with these Terms. You agree not to:
            </p>
            <ul className="space-y-2 text-gray-700 mb-4">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Submit false, fraudulent, misleading, or malicious reports.
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Use the App to harass, threaten, defame, or abuse others.
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Impersonate any person or entity, or falsely state or otherwise misrepresent your affiliation with a person or entity.
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Use the anonymous reporting feature to spread misinformation or cause public mischief.
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Interfere with or disrupt the operation of the App or its servers, or attempt to gain unauthorized access to any part of the App.
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Engage in any form of scraping, data mining, or use of bots, spiders, or other automated means to access the App.
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Submit content that is obscene, defamatory, or violates any third-party intellectual property rights.
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Gateway Shield reserves the right to suspend or terminate your access to the App at its sole discretion if you violate these Terms.
            </p>
          </section>

          {/* Section 5: User Content and License Grant */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. User Content and License Grant</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You retain ownership of any content you submit through the App, including reports, photos, and descriptions ("User Content"). By submitting User Content, you grant Gateway Shield a non-exclusive, worldwide, royalty-free, perpetual, irrevocable, and transferable license to:
            </p>
            <ul className="space-y-2 text-gray-700 mb-4">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Use, reproduce, and process your User Content for the purpose of facilitating the reporting and resolution of your incident.
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Store, distribute, and display your User Content in accordance with our Privacy Policy.
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Use anonymized and aggregated data derived from your User Content to improve the App, enhance public safety, and for other internal business purposes.
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              You represent and warrant that you have all necessary rights to grant this license.
            </p>
          </section>

          {/* Section 6: Intellectual Property Rights */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Intellectual Property Rights</h2>
            <p className="text-gray-700 leading-relaxed">
              All intellectual property rights in the App, including all content, software, graphics, and features, but excluding User Content, are owned by Gateway Shield or its licensors. You are granted a limited, non-exclusive, non-transferable, revocable license to use the App for personal, non-commercial use, subject to these Terms.
            </p>
          </section>

          {/* Section 7: Third-Party Services and Links */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Third-Party Services and Links</h2>
            <p className="text-gray-700 leading-relaxed">
              The App may contain links to third-party websites or services. We are not responsible for the content, privacy policies, or practices of any third-party websites or services. Your use of such services is at your own risk.
            </p>
          </section>

          {/* Section 8: Disclaimers */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Disclaimers</h2>
            <p className="text-gray-700 leading-relaxed">
              THE APP IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. GATEWAY SHIELD EXPRESSLY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE MAKE NO WARRANTY THAT THE APP WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE, OR THAT THE RESULTS OF USING THE APP WILL BE ACCURATE OR RELIABLE.
            </p>
          </section>

          {/* Section 9: Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, GATEWAY SHIELD, ITS AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR IN CONNECTION WITH YOUR ACCESS TO OR USE OF, OR INABILITY TO ACCESS OR USE, THE APP.
            </p>
            <p className="text-gray-700 leading-relaxed">
              GATEWAY SHIELD IS NOT LIABLE FOR THE ACTIONS OR INACTIONS OF LAW ENFORCEMENT AGENCIES, INCLUDING ANY DELAYS OR FAILURES IN THEIR RESPONSE TO REPORTS SUBMITTED THROUGH THE APP.
            </p>
          </section>

          {/* Section 10: Indemnification */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Indemnification</h2>
            <p className="text-gray-700 leading-relaxed">
              You agree to indemnify, defend, and hold harmless Gateway Shield, its affiliates, officers, directors, employees, and agents from and against any and all claims, liabilities, damages, losses, and expenses (including reasonable attorneys' fees) arising out of or in any way connected with: (a) your access to or use of the App; (b) your violation of these Terms; or (c) your violation of any third-party right, including without limitation any intellectual property, privacy, or publicity right.
            </p>
          </section>

          {/* Section 11: Modifications to the Terms */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Modifications to the Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify these Terms at any time. We will notify you of any material changes by posting the new Terms on our website or through the App. Your continued use of the App after such changes constitutes your acceptance of the new Terms.
            </p>
          </section>

          {/* Section 12: Governing Law and Dispute Resolution */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Governing Law and Dispute Resolution</h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms of Use are governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any dispute arising out of or relating to these Terms or the App will be subject to the exclusive jurisdiction of the courts located in Nigeria.
            </p>
          </section>

          {/* Section 13: Termination */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Termination</h2>
            <p className="text-gray-700 leading-relaxed">
              We may terminate or suspend your account and access to the App at our sole discretion, without prior notice or liability, for any reason whatsoever, including, without limitation, if you breach these Terms.
            </p>
          </section>

          {/* Section 14: Contact Us */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions or concerns regarding these Terms, please contact us at:
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Email:</span>{' '}
              <a href="mailto:info@thegatewayshield.com" className="text-blue-600 hover:text-blue-800 underline">
                info@thegatewayshield.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUseContent;