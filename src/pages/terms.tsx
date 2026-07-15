import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { useSiteContent } from "@/hooks/use-site-content";
import { RichTextContent } from "@/components/RichTextContent";

export default function TermsPage() {
  const { contentMap } = useSiteContent(["terms_of_service"], {
    terms_of_service:
      "## Agreement to Terms\n\nBy accessing or using our website, you agree to be bound by these Terms of Service and all applicable laws and regulations.\n\n## Account Registration\n\nTo place orders, you must create an account with accurate, complete, and current information. You are responsible for maintaining the confidentiality of your credentials and all activities under your account.\n\n## Product Information\n\nProducts are made from recycled materials and may have natural variations in appearance. We reserve the right to limit quantities and discontinue products without notice.\n\n## Pricing and Payment\n\nPrices are in Indian Rupees (₹) and subject to change. Payment is processed securely through Razorpay. We accept credit/debit cards, UPI, net banking, and wallets.\n\n## Returns and Refunds\n\nWe offer a 30-day return policy on most items. Refunds are issued to the original payment method within 7-10 business days after we receive and inspect the return.\n\n## Governing Law\n\nThese Terms are governed by the laws of India. Any disputes shall be resolved in the courts of Mumbai, Maharashtra.\n\n## Contact Information\n\nIf you have questions about these Terms of Service, please contact us via the Contact page.",
  });

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
              Last updated: July 15, 2026
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <RichTextContent content={contentMap.terms_of_service} />
          </div>

          <div className="mt-12 p-8 bg-muted/30 rounded-lg text-center">
            <h2 className="font-serif text-2xl font-bold mb-4">
              Questions about these terms?
            </h2>
            <p className="text-muted-foreground mb-6">
              Our team is here to help clarify any legal or policy concerns.
            </p>
            <Link href="/contact" className="text-primary font-semibold hover:underline">
              Contact Support →
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}