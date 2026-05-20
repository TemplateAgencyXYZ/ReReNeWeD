import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1 py-16 md:py-24">
        <div className="container max-w-4xl">
          <div className="text-center space-y-4 mb-12">
            <Badge variant="secondary" className="mb-2">Legal</Badge>
            <h1 className="font-serif text-4xl md:text-5xl font-bold">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground">
              Last updated: May 20, 2026
            </p>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">Introduction</h2>
              <p className="text-muted-foreground">
                We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit our website or make a purchase.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">Information We Collect</h2>
              
              <h3 className="font-semibold text-lg mb-2">Personal Information</h3>
              <p className="text-muted-foreground mb-4">
                When you create an account or place an order, we collect:
              </p>
              <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                <li>Name and contact information (email, phone number)</li>
                <li>Shipping and billing addresses</li>
                <li>Payment information (processed securely via Razorpay)</li>
                <li>Order history and preferences</li>
              </ul>

              <h3 className="font-semibold text-lg mb-2 mt-6">Automatically Collected Information</h3>
              <p className="text-muted-foreground mb-4">
                When you visit our website, we automatically collect:
              </p>
              <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                <li>IP address and browser type</li>
                <li>Device information and operating system</li>
                <li>Pages visited and time spent on each page</li>
                <li>Referring website and search terms used</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">How We Use Your Information</h2>
              <p className="text-muted-foreground mb-4">
                We use your personal information to:
              </p>
              <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                <li>Process and fulfill your orders</li>
                <li>Communicate about your orders and account</li>
                <li>Send promotional emails (you can opt out anytime)</li>
                <li>Improve our website and product offerings</li>
                <li>Detect and prevent fraud</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">Data Security</h2>
              <p className="text-muted-foreground">
                We implement industry-standard security measures to protect your personal information. All payment transactions are processed through Razorpay's secure payment gateway. We use SSL encryption to protect data transmitted between your browser and our servers.
              </p>
              <p className="text-muted-foreground mt-4">
                However, no method of transmission over the internet is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">Cookies and Tracking</h2>
              <p className="text-muted-foreground">
                We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and personalize content. You can control cookie settings through your browser preferences.
              </p>
              <p className="text-muted-foreground mt-4">
                Types of cookies we use:
              </p>
              <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                <li><strong>Essential cookies:</strong> Required for website functionality</li>
                <li><strong>Analytics cookies:</strong> Help us understand how visitors use our site</li>
                <li><strong>Preference cookies:</strong> Remember your settings and choices</li>
                <li><strong>Marketing cookies:</strong> Track your activity to deliver relevant ads</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">Sharing Your Information</h2>
              <p className="text-muted-foreground mb-4">
                We do not sell your personal information. We may share your data with:
              </p>
              <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                <li><strong>Service providers:</strong> Payment processors, shipping companies, email service providers</li>
                <li><strong>Legal authorities:</strong> When required by law or to protect our rights</li>
                <li><strong>Business transfers:</strong> In the event of a merger, acquisition, or sale of assets</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">Your Rights</h2>
              <p className="text-muted-foreground mb-4">
                You have the right to:
              </p>
              <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                <li>Access and review your personal data</li>
                <li>Request corrections to inaccurate information</li>
                <li>Delete your account and associated data</li>
                <li>Opt out of marketing communications</li>
                <li>Object to certain data processing activities</li>
                <li>Request a copy of your data in a portable format</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                To exercise these rights, please contact us at privacy@example.com
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">Children's Privacy</h2>
              <p className="text-muted-foreground">
                Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">International Data Transfers</h2>
              <p className="text-muted-foreground">
                Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your data in accordance with this privacy policy.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">Data Retention</h2>
              <p className="text-muted-foreground">
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce our agreements. Order information is typically retained for 7 years for accounting and legal purposes.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">Changes to This Policy</h2>
              <p className="text-muted-foreground">
                We may update this privacy policy from time to time. We will notify you of significant changes by posting the new policy on this page and updating the "Last updated" date. We encourage you to review this policy periodically.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-muted-foreground">
                If you have questions about this privacy policy or how we handle your data, please contact us:
              </p>
              <div className="mt-4 p-6 bg-muted/30 rounded-lg">
                <p className="text-muted-foreground">
                  <strong>Email:</strong> privacy@example.com<br />
                  <strong>Phone:</strong> +91 1800-123-4567<br />
                  <strong>Address:</strong> 123 Green Street, Mumbai, Maharashtra 400001
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}