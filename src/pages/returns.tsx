import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { RotateCcw, Package, CheckCircle2, AlertCircle } from "lucide-react";
import { useSiteContent } from "@/hooks/use-site-content";
import { RichTextContent } from "@/components/RichTextContent";

export default function ReturnsPage() {
  const { contentMap } = useSiteContent(["returns_policy"], {
    returns_policy:
      "## Our Promise\n\nWe want you to love every purchase! If you're not completely satisfied with your recycled goods, you can return them within 30 days of delivery for a full refund—no questions asked.\n\n## Return Eligibility\n\n- Items in original, unused condition with tags intact\n- Defective or damaged items (we cover return shipping)\n- Items that don't match the product description\n\nItems not eligible: returns after 30 days, used or worn items, items missing packaging/tags, customized items, or clearance sale items unless defective.\n\n## Refund Timeline\n\nRefunds are processed to the original payment method within 7-10 business days after we receive and inspect the return.",
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1 py-16 md:py-24">
        <div className="container max-w-4xl">
          <div className="text-center space-y-4 mb-12">
            <Badge variant="secondary" className="mb-2">Returns & Refunds</Badge>
            <h1 className="font-serif text-4xl md:text-5xl font-bold">
              Return Policy
            </h1>
            <p className="text-lg text-muted-foreground">
              30-day hassle-free returns on all purchases
            </p>
          </div>

          <div className="space-y-12">
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <h2 className="font-serif text-2xl font-bold">Our Promise</h2>
              </div>

              <Card>
                <CardContent className="pt-6">
                  <RichTextContent content={contentMap.returns_policy} />
                </CardContent>
              </Card>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                  <RotateCcw className="h-5 w-5" />
                </div>
                <h2 className="font-serif text-2xl font-bold">How to Return an Item</h2>
              </div>

              <Card>
                <CardContent className="pt-6">
                  <ol className="space-y-6">
                    <li className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">
                        1
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Log into your account</h3>
                        <p className="text-sm text-muted-foreground">
                          Go to "My Orders" in your profile and select the order you'd like to return.
                        </p>
                      </div>
                    </li>

                    <li className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">
                        2
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Request a return</h3>
                        <p className="text-sm text-muted-foreground">
                          Click "Return Item" and select your reason for the return. We'll email you a prepaid return label if the item is defective.
                        </p>
                      </div>
                    </li>

                    <li className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">
                        3
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Pack the item</h3>
                        <p className="text-sm text-muted-foreground">
                          Place the item in its original packaging (or any suitable box). Include all accessories and documentation.
                        </p>
                      </div>
                    </li>

                    <li className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">
                        4
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Ship it back</h3>
                        <p className="text-sm text-muted-foreground">
                          Drop off the package at any courier location or schedule a pickup. You'll receive tracking information once it's on its way.
                        </p>
                      </div>
                    </li>

                    <li className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">
                        5
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Get your refund</h3>
                        <p className="text-sm text-muted-foreground">
                          Once we receive and inspect your return (typically 3-5 business days), we'll process your refund within 7-10 business days.
                        </p>
                      </div>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                  <Package className="h-5 w-5" />
                </div>
                <h2 className="font-serif text-2xl font-bold">Return Eligibility</h2>
              </div>

              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Items eligible for return:
                    </h3>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside ml-6">
                      <li>Unused items in original condition</li>
                      <li>Items with tags and packaging intact</li>
                      <li>Defective or damaged items (we cover return shipping)</li>
                      <li>Items that don't match the product description</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-destructive" />
                      Items not eligible for return:
                    </h3>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside ml-6">
                      <li>Items returned after 30 days from delivery</li>
                      <li>Items that show signs of use or wear</li>
                      <li>Items without original packaging or tags</li>
                      <li>Customized or personalized items</li>
                      <li>Sale or clearance items (unless defective)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </section>

            <div className="mt-12 p-8 bg-muted/30 rounded-lg text-center">
              <h2 className="font-serif text-2xl font-bold mb-4">
                Need help with a return?
              </h2>
              <p className="text-muted-foreground mb-6">
                Our support team is ready to assist you with any return or refund questions.
              </p>
              <Link href="/contact" className="text-primary font-semibold hover:underline">
                Contact Support →
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}