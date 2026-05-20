import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export default function FAQPage() {
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

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left text-lg font-semibold">
                What does "recycled" mean for your products?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                All our products are made from materials that have been reclaimed, repurposed, or upcycled from their original use. This includes items made from ocean plastic, reclaimed wood, recycled metals, and other sustainable materials. Each product listing specifies its recycled source.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left text-lg font-semibold">
                Are recycled products as durable as new ones?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Absolutely! Every item we sell undergoes rigorous quality inspection. Recycled materials are often just as durable—if not more so—than their brand-new counterparts. We stand behind our products with a 30-day satisfaction guarantee.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left text-lg font-semibold">
                How long does shipping take?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Standard shipping within India takes 5-7 business days. We offer free shipping on all orders over ₹500. Express shipping (2-3 business days) is available for an additional fee. You'll receive tracking information once your order ships.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left text-lg font-semibold">
                What is your return policy?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                We offer a 30-day return policy on all items. If you're not completely satisfied, you can return unused items in their original condition for a full refund. Return shipping is free for defective items, and we'll send you a prepaid label.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-left text-lg font-semibold">
                How do I create an account?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Click "Sign In" in the top navigation, then select "Create Account". You'll need to provide your email address and create a password. Once registered, you can track orders, save addresses, and manage your profile all in one place.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger className="text-left text-lg font-semibold">
                What payment methods do you accept?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                We accept all major payment methods through Razorpay, including credit cards, debit cards, UPI, net banking, and popular digital wallets. All transactions are secured with industry-standard encryption.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger className="text-left text-lg font-semibold">
                Can I track my order?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes! Once your order ships, you'll receive an email with tracking information. You can also view your order status anytime by logging into your account and visiting the "Orders" section of your profile.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8">
              <AccordionTrigger className="text-left text-lg font-semibold">
                Do you offer bulk or wholesale pricing?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes! We offer special pricing for bulk orders and wholesale accounts. Please contact us at wholesale@example.com with details about your business and quantity needs, and our team will provide a custom quote.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9">
              <AccordionTrigger className="text-left text-lg font-semibold">
                How can I contact customer support?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Our customer support team is available Monday-Friday, 9 AM - 6 PM IST. You can reach us via email at support@example.com, or through the contact form on our Contact page. We aim to respond to all inquiries within 24 hours.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10">
              <AccordionTrigger className="text-left text-lg font-semibold">
                Are your products eco-friendly and sustainable?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes! Sustainability is at the core of everything we do. By choosing recycled products, you're directly reducing waste, conserving resources, and supporting a circular economy. Every purchase helps divert materials from landfills and reduces the demand for new raw materials.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-16 p-8 bg-muted/30 rounded-lg text-center">
            <h2 className="font-serif text-2xl font-bold mb-4">
              Still have questions?
            </h2>
            <p className="text-muted-foreground mb-6">
              Can't find the answer you're looking for? Our support team is here to help.
            </p>
            <a href="/contact" className="text-primary font-semibold hover:underline">
              Contact Support →
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}