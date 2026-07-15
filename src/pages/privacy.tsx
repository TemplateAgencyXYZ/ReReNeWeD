import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { useSiteContent } from "@/hooks/use-site-content";
import { RichTextContent } from "@/components/RichTextContent";

export default function PrivacyPage() {
  const { contentMap } = useSiteContent(["privacy_policy"], {
    privacy_policy:
      "## Introduction\n\nWe respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit our website or make a purchase.\n\n## Information We Collect\n\n**Personal Information:** name, email, phone, shipping and billing addresses, payment information (processed securely via Razorpay), order history, and preferences.\n\n**Automatically Collected Information:** IP address, browser type, device information, pages visited, and referring websites.\n\n## How We Use Your Information\n\nTo process and fulfill orders, communicate about your account, send promotional emails (with opt-out), improve our website, detect fraud, and comply with legal obligations.\n\n## Data Security\n\nWe use SSL encryption and process payments through Razorpay's secure gateway. No payment details are stored on our servers.\n\n## Your Rights\n\nYou have the right to access, correct, delete, export, and object to processing of your personal data. To exercise these rights, contact us through the details below.\n\n## Contact Us\n\nIf you have questions about this privacy policy, please contact us via the Contact page.",
  });

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
              Last updated: July 15, 2026
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <RichTextContent content={contentMap.privacy_policy} />
          </div>

          <div className="mt-12 p-8 bg-muted/30 rounded-lg text-center">
            <h2 className="font-serif text-2xl font-bold mb-4">
              Questions about privacy?
            </h2>
            <p className="text-muted-foreground mb-6">
              Reach out and we'll be happy to clarify how we handle your data.
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