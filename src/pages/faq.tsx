import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { useSiteContent } from "@/hooks/use-site-content";
import { RichTextContent } from "@/components/RichTextContent";

export default function FAQPage() {
  const { contentMap } = useSiteContent(["faq"], {
    faq:
      "**Q: What does \"recycled\" mean for your products?**\nAll our products are made from materials that have been reclaimed, repurposed, or upcycled. Each product listing specifies its recycled source.\n\n**Q: Are recycled products as durable as new ones?**\nAbsolutely! Every item undergoes rigorous quality inspection. We stand behind our products with a 30-day satisfaction guarantee.\n\n**Q: How long does shipping take?**\nStandard shipping within India takes 5-7 business days. Free shipping on orders over ₹500.\n\n**Q: What is your return policy?**\nWe offer a 30-day return policy on all items in original, unused condition.\n\n**Q: What payment methods do you accept?**\nWe accept credit cards, debit cards, UPI, net banking, and digital wallets via Razorpay.\n\n**Q: Can I track my order?**\nYes! You'll receive tracking information once your order ships, and you can view order status in your account.",
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1 py-16 md:py-24">
        <div className="container max-w-4xl">
          <div className="text-center space-y-4 mb-12">
            <Badge variant="secondary" className="mb-2">Help Center</Badge>
            <h1 className="font-serif text-4xl md:text-5xl font-bold">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted-foreground">
              Find answers to common questions about our recycled products and services
            </p>
          </div>

          <div className="prose prose-lg max-w-none mb-12">
            <RichTextContent content={contentMap.faq} />
          </div>

          <div className="mt-16 p-8 bg-muted/30 rounded-lg text-center">
            <h2 className="font-serif text-2xl font-bold mb-4">
              Still have questions?
            </h2>
            <p className="text-muted-foreground mb-6">
              Can't find the answer you're looking for? Our support team is here to help.
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