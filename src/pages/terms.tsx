import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1 py-16 md:py-24">
        <div className="container max-w-4xl">
          <div className="text-center space-y-4 mb-12">
            <Badge variant="secondary" className="mb-2">Legal</Badge>
            <h1 className="font-serif text-4xl md:text-5xl font-bold">
              Terms of Service
            </h1>
            <p className="text-muted-foreground">
              Last updated: May 20, 2026
            </p>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">Agreement to Terms</h2>
              <p className="text-muted-foreground">
                By accessing or using our website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this site.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">Use License</h2>
              <p className="text-muted-foreground mb-4">
                Permission is granted to temporarily access the materials on our website for personal, non-commercial use only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose</li>
                <li>Attempt to reverse engineer any software on our website</li>
                <li>Remove any copyright or proprietary notations</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">Account Registration</h2>
              <p className="text-muted-foreground">
                To place orders, you must create an account with accurate, complete, and current information. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.
              </p>
              <p className="text-muted-foreground mt-4">
                You agree to immediately notify us of any unauthorized use of your account. We reserve the right to terminate accounts, refuse service, and cancel orders at our discretion.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">Product Information</h2>
              <p className="text-muted-foreground">
                We strive to provide accurate product descriptions, images, and pricing. However, we do not warrant that product descriptions, pricing, or other content on our website is accurate, complete, reliable, current, or error-free.
              </p>
              <p className="text-muted-foreground mt-4">
                All products are made from recycled materials and may have slight variations in appearance, which is part of their unique character. We reserve the right to limit quantities and discontinue products without prior notice.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">Pricing and Payment</h2>
              <p className="text-muted-foreground">
                All prices are in Indian Rupees (₹) and are subject to change without notice. We reserve the right to correct pricing errors even after an order has been placed. In such cases, we will notify you and offer the option to cancel your order.
              </p>
              <p className="text-muted-foreground mt-4">
                Payment is processed securely through Razorpay. We accept credit cards, debit cards, UPI, net banking, and digital wallets. By providing payment information, you represent that you are authorized to use the payment method.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">Shipping and Delivery</h2>
              <p className="text-muted-foreground">
                We ship to addresses within India only. Delivery times are estimates and not guaranteed. We are not responsible for delays caused by shipping carriers, customs, or factors beyond our control.
              </p>
              <p className="text-muted-foreground mt-4">
                Risk of loss and title for items pass to you upon delivery to the carrier. You are responsible for filing any claims with carriers for damaged or lost shipments.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">Returns and Refunds</h2>
              <p className="text-muted-foreground">
                We offer a 30-day return policy on most items. Returns must be in original, unused condition with all tags and packaging intact. Certain items (customized products, sale items) may not be eligible for return. See our Returns Policy for complete details.
              </p>
              <p className="text-muted-foreground mt-4">
                Refunds are issued to the original payment method within 7-10 business days after we receive and inspect your return.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">Prohibited Uses</h2>
              <p className="text-muted-foreground mb-4">
                You agree not to use our website:
              </p>
              <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                <li>In any way that violates laws or regulations</li>
                <li>To transmit or procure harmful or malicious code</li>
                <li>To engage in data mining, scraping, or harvesting</li>
                <li>To interfere with the proper functioning of the website</li>
                <li>To impersonate or attempt to impersonate the company or others</li>
                <li>To harass, abuse, or harm another person</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">Intellectual Property</h2>
              <p className="text-muted-foreground">
                The website and its original content, features, and functionality are owned by us and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
              <p className="text-muted-foreground mt-4">
                You may not reproduce, distribute, modify, create derivative works of, publicly display, republish, or exploit any material on our website without our prior written permission.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">Disclaimer</h2>
              <p className="text-muted-foreground">
                Our website and products are provided "as is" without warranties of any kind, either express or implied. We do not warrant that the website will be uninterrupted, secure, or error-free, or that defects will be corrected.
              </p>
              <p className="text-muted-foreground mt-4">
                We make no warranties about the accuracy, reliability, or completeness of the content on our website or the products we sell.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">Limitation of Liability</h2>
              <p className="text-muted-foreground">
                To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or other intangible losses resulting from:
              </p>
              <ul className="text-muted-foreground space-y-1 list-disc list-inside mt-4">
                <li>Your use or inability to use our website or products</li>
                <li>Unauthorized access to your account or data</li>
                <li>Any conduct or content of any third party on the website</li>
                <li>Any content obtained from the website</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">Indemnification</h2>
              <p className="text-muted-foreground">
                You agree to defend, indemnify, and hold us harmless from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from your use of the website, violation of these terms, or infringement of any third-party rights.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">Governing Law</h2>
              <p className="text-muted-foreground">
                These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes shall be resolved in the courts of Mumbai, Maharashtra.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">Changes to Terms</h2>
              <p className="text-muted-foreground">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website after changes are posted constitutes acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">Contact Information</h2>
              <p className="text-muted-foreground">
                If you have questions about these Terms of Service, please contact us:
              </p>
              <div className="mt-4 p-6 bg-muted/30 rounded-lg">
                <p className="text-muted-foreground">
                  <strong>Email:</strong> legal@example.com<br />
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