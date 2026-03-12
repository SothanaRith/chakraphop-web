import PageHeader from '@/components/layout/PageHeader'
import PageSection from '@/components/layout/PageSection'

export const metadata = {
  title: "Privacy Policy | SPORT",
  description: "How SPORT collects, uses, and protects your personal information."
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen">
      <PageHeader
        title="Privacy Policy"
        description="We take your privacy seriously. This policy explains how we collect, use, and protect your information."
        breadcrumbs={['Home', 'Legal', 'Privacy Policy']}
      />

      <PageSection className="bg-white">
        <div className="max-w-3xl prose prose-sm">
          <p className="text-body text-neutral-600 mb-8">
            <strong>Last Updated: February 2024</strong>
          </p>

          <div className="space-y-12">
            {/* 1. Introduction */}
            <section>
              <h2 className="text-heading-xl font-bold mb-4">1. Introduction</h2>
              <p className="text-body text-neutral-600 mb-4 leading-relaxed">
                SPORT ("we," "us," or "our") operates the sport.com website and mobile application (the "Service"). This Privacy Policy explains how we collect, use, share, and protect your personal information when you use our Service, as well as your privacy rights and choices.
              </p>
              <p className="text-body text-neutral-600 leading-relaxed">
                If you do not agree with our policies and practices, please do not use our Service. If you have questions about this Privacy Policy, please contact us at privacy@sport.com.
              </p>
            </section>

            {/* 2. Information We Collect */}
            <section>
              <h2 className="text-heading-xl font-bold mb-4">2. Information We Collect</h2>
              
              <h3 className="text-heading-lg font-semibold mb-3">2.1 Information You Provide to Us</h3>
              <ul className="space-y-2 text-body text-neutral-600 mb-6 pl-4">
                <li><strong>Account Information:</strong> When you create an account, we collect your name, email address, password, phone number, and other information you provide.</li>
                <li><strong>Order Information:</strong> When you make a purchase, we collect billing address, shipping address, payment method, order history, and product preferences.</li>
                <li><strong>Communications:</strong> We collect information when you contact us, sign up for newsletters, participate in surveys, or otherwise communicate with us.</li>
                <li><strong>Content:</strong> If you submit reviews, comments, or user-generated content, we collect and store this information.</li>
              </ul>

              <h3 className="text-heading-lg font-semibold mb-3">2.2 Information Collected Automatically</h3>
              <ul className="space-y-2 text-body text-neutral-600 mb-6 pl-4">
                <li><strong>Device Information:</strong> Device type, operating system, browser type, IP address, and unique device identifiers.</li>
                <li><strong>Usage Information:</strong> Pages visited, time spent on pages, search queries, clicks, and other interactions with our Service.</li>
                <li><strong>Cookies & Similar Technologies:</strong> We use cookies, pixel tags, and local storage to track and remember your preferences.</li>
                <li><strong>Location Information:</strong> If you permit, we may collect precise location data to improve our Service.</li>
              </ul>

              <h3 className="text-heading-lg font-semibold mb-3">2.3 Information from Third Parties</h3>
              <p className="text-body text-neutral-600 mb-4 leading-relaxed">
                We may receive information about you from third-party sources, including:
              </p>
              <ul className="space-y-2 text-body text-neutral-600 pl-4">
                <li>• Social media platforms (if you link your account)</li>
                <li>• Payment processors and financial institutions</li>
                <li>• Marketing and analytics partners</li>
                <li>• Publicly available data sources</li>
              </ul>
            </section>

            {/* 3. How We Use Your Information */}
            <section>
              <h2 className="text-heading-xl font-bold mb-4">3. How We Use Your Information</h2>
              <p className="text-body text-neutral-600 mb-4 leading-relaxed">
                We use the information we collect for various purposes, including:
              </p>
              <ul className="space-y-2 text-body text-neutral-600 pl-4 mb-6">
                <li>• Processing and fulfilling orders</li>
                <li>• Providing customer support and responding to inquiries</li>
                <li>• Sending promotional emails and marketing communications</li>
                <li>• Personalizing your experience and recommendations</li>
                <li>• Improving our Service, products, and customer experience</li>
                <li>• Analytics and tracking website performance</li>
                <li>• Fraud detection and prevention</li>
                <li>• Complying with legal obligations</li>
              </ul>
            </section>

            {/* 4. How We Share Your Information */}
            <section>
              <h2 className="text-heading-xl font-bold mb-4">4. How We Share Your Information</h2>
              
              <h3 className="text-heading-lg font-semibold mb-3">4.1 Service Providers</h3>
              <p className="text-body text-neutral-600 mb-6 leading-relaxed">
                We share information with third-party service providers who help us operate our Service, including payment processors, shipping companies, email providers, and analytics partners. These providers are contractually obligated to use your information only as necessary to provide services to us.
              </p>

              <h3 className="text-heading-lg font-semibold mb-3">4.2 Business Partners</h3>
              <p className="text-body text-neutral-600 mb-6 leading-relaxed">
                With your consent, we may share information with our business partners for co-marketing initiatives, surveys, and product collaborations.
              </p>

              <h3 className="text-heading-lg font-semibold mb-3">4.3 Legal Requirements</h3>
              <p className="text-body text-neutral-600 mb-6 leading-relaxed">
                We may disclose information if required by law, court order, or governmental request, or if we believe in good faith that such disclosure is necessary to protect our rights, your safety, or the safety of others.
              </p>

              <h3 className="text-heading-lg font-semibold mb-3">4.4 Business Transfer</h3>
              <p className="text-body text-neutral-600 leading-relaxed">
                If SPORT is involved in a merger, acquisition, bankruptcy, or sale of assets, your information may be transferred as part of that transaction. We will notify you of any such change and any choices you may have regarding your information.
              </p>
            </section>

            {/* 5. Data Retention */}
            <section>
              <h2 className="text-heading-xl font-bold mb-4">5. Data Retention</h2>
              <p className="text-body text-neutral-600 mb-4 leading-relaxed">
                We retain your personal information for as long as necessary to provide our Service and fulfill the purposes outlined in this Privacy Policy. The retention period varies depending on the type of information and the purpose for which we use it.
              </p>
              <p className="text-body text-neutral-600 leading-relaxed">
                For example, we retain account information for as long as your account is active, and order information for at least 7 years for tax and compliance purposes. If you request deletion of your account, we will retain information as required by law or for legitimate business purposes.
              </p>
            </section>

            {/* 6. Your Privacy Rights */}
            <section>
              <h2 className="text-heading-xl font-bold mb-4">6. Your Privacy Rights</h2>
              <p className="text-body text-neutral-600 mb-6 leading-relaxed">
                Depending on your location, you may have certain rights regarding your personal information:
              </p>

              <h3 className="text-heading-lg font-semibold mb-3">6.1 Access & Portability</h3>
              <p className="text-body text-neutral-600 mb-6 leading-relaxed">
                You have the right to access the personal information we hold about you and receive a copy in a portable format.
              </p>

              <h3 className="text-heading-lg font-semibold mb-3">6.2 Correction & Deletion</h3>
              <p className="text-body text-neutral-600 mb-6 leading-relaxed">
                You can request correction of inaccurate information or deletion of your personal information, subject to certain legal exceptions.
              </p>

              <h3 className="text-heading-lg font-semibold mb-3">6.3 Opt-Out</h3>
              <p className="text-body text-neutral-600 mb-6 leading-relaxed">
                You can opt out of receiving marketing communications from us at any time by clicking the "unsubscribe" link in our emails or contacting us directly.
              </p>

              <h3 className="text-heading-lg font-semibold mb-3">6.4 Do Not Track</h3>
              <p className="text-body text-neutral-600 mb-6 leading-relaxed">
                Some browsers include a Do Not Track feature. Our Service does not currently respond to Do Not Track signals. You can, however, disable cookies through your browser settings.
              </p>

              <p className="text-body text-neutral-600 leading-relaxed">
                To exercise any of these rights, contact us at privacy@sport.com. We will respond to your request within 30 days.
              </p>
            </section>

            {/* 7. Cookies & Tracking */}
            <section>
              <h2 className="text-heading-xl font-bold mb-4">7. Cookies & Tracking Technologies</h2>
              <p className="text-body text-neutral-600 mb-4 leading-relaxed">
                We use cookies, pixel tags, and similar tracking technologies to enhance your experience and understand how you use our Service. These include:
              </p>
              <ul className="space-y-2 text-body text-neutral-600 pl-4 mb-6">
                <li><strong>Necessary Cookies:</strong> Required for the Service to function (e.g., authentication, security)</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                <li><strong>Analytics Cookies:</strong> Help us understand usage patterns and improve the Service</li>
                <li><strong>Marketing Cookies:</strong> Used to show you targeted ads and measure campaign effectiveness</li>
              </ul>
              <p className="text-body text-neutral-600 leading-relaxed">
                You can control cookies through your browser settings. However, disabling cookies may affect the functionality of our Service. For more information about cookies, visit allaboutcookies.org.
              </p>
            </section>

            {/* 8. Third-Party Links */}
            <section>
              <h2 className="text-heading-xl font-bold mb-4">8. Third-Party Links</h2>
              <p className="text-body text-neutral-600 leading-relaxed">
                Our Service may contain links to third-party websites and applications. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies before providing your information.
              </p>
            </section>

            {/* 9. Data Security */}
            <section>
              <h2 className="text-heading-xl font-bold mb-4">9. Data Security</h2>
              <p className="text-body text-neutral-600 mb-4 leading-relaxed">
                We implement industry-standard security measures to protect your personal information against unauthorized access, disclosure, and alteration. These measures include:
              </p>
              <ul className="space-y-2 text-body text-neutral-600 pl-4 mb-6">
                <li>• SSL encryption for data in transit</li>
                <li>• Secure password storage using hashing algorithms</li>
                <li>• Regular security audits and penetration testing</li>
                <li>• Access controls limiting employee access to personal information</li>
              </ul>
              <p className="text-body text-neutral-600 leading-relaxed">
                However, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security of your information. You are responsible for maintaining the confidentiality of your account credentials.
              </p>
            </section>

            {/* 10. International Data Transfers */}
            <section>
              <h2 className="text-heading-xl font-bold mb-4">10. International Data Transfers</h2>
              <p className="text-body text-neutral-600 leading-relaxed">
                SPORT is based in the United States. If you are located outside the US, your information may be transferred to, stored in, and processed in the United States or other countries where our service providers operate. These countries may have data protection laws that differ from your home country. By using our Service, you consent to the transfer of your information to countries outside your country of residence.
              </p>
            </section>

            {/* 11. Children's Privacy */}
            <section>
              <h2 className="text-heading-xl font-bold mb-4">11. Children's Privacy</h2>
              <p className="text-body text-neutral-600 leading-relaxed">
                Our Service is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected information from a child under 13, we will delete such information immediately. If you are aware of a child providing us with information, please contact us at privacy@sport.com.
              </p>
            </section>

            {/* 12. Changes to This Policy */}
            <section>
              <h2 className="text-heading-xl font-bold mb-4">12. Changes to This Policy</h2>
              <p className="text-body text-neutral-600 leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or applicable laws. We will notify you of material changes by posting the revised Privacy Policy on our Service and updating the "Last Updated" date. Your continued use of our Service following the posting of revisions constitutes your acceptance of those changes.
              </p>
            </section>

            {/* 13. Contact Us */}
            <section>
              <h2 className="text-heading-xl font-bold mb-4">13. Contact Us</h2>
              <p className="text-body text-neutral-600 mb-4 leading-relaxed">
                If you have questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us at:
              </p>
              <div className="bg-neutral-50 p-6 rounded-lg text-body text-neutral-600">
                <p className="font-medium mb-2">SPORT Privacy Team</p>
                <p className="mb-2">Email: privacy@sport.com</p>
                <p className="mb-2">Mail: 123 Performance Drive, Portland, OR 97214</p>
                <p>Phone: 1-800-SPORT-01</p>
              </div>
            </section>
          </div>
        </div>
      </PageSection>
    </main>
  )
}
