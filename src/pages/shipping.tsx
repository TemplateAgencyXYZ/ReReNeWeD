import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Truck, Package, MapPin, Clock } from "lucide-react";
import { useSiteContent } from "@/hooks/use-site-content";
import { RichTextContent } from "@/components/RichTextContent";

export default function ShippingPage() {
  const { contentMap } = useSiteContent(["shipping_info"], {
    shipping_info:
      "## Shipping Methods\n\n**Standard Shipping**\nDelivery within 5-7 business days across India. Free on orders over ₹500. ₹50 flat rate for orders under ₹500.\n\n**Express Shipping**\nDelivery within 2-3 business days to major cities. ₹150 flat rate. Available in Mumbai, Delhi, Bangalore, Chennai, Hyderabad, and more.\n\n## Processing Time\n\nOrders are typically processed within 1-2 business days. During peak seasons, processing may take up to 3 business days.\n\n## Sustainable Packaging\n\nAll orders are packaged using 100% recycled cardboard boxes, biodegradable packing materials, and paper-based tape. No plastic bubble wrap.\n\n## Order Tracking\n\nOnce your order ships, you'll receive a confirmation email with tracking information. You can also log into your account and visit the Orders section to view real-time updates.",
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1 py-16 md:py-24">
        <div className="container max-w-4xl">
          <div className="text-center space-y-4 mb-12">
            <Badge variant="secondary" className="mb-2">Delivery</Badge>
            <h1 className="font-serif text-4xl md:text-5xl font-bold">
              Shipping Information
            </h1>
            <p className="text-lg text-muted-foreground">
              Fast, reliable delivery across India with sustainable packaging
            </p>
          </div>

          <div className="space-y-12">
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                  <Truck className="h-5 w-5" />
                </div>
                <h2 className="font-serif text-2xl font-bold">Shipping Details</h2>
              </div>

              <Card>
                <CardContent className="pt-6">
                  <RichTextContent content={contentMap.shipping_info} />
                </CardContent>
              </Card>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <h2 className="font-serif text-2xl font-bold">Delivery Locations</h2>
              </div>

              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Pan-India Coverage</h3>
                    <p className="text-sm text-muted-foreground">
                      We ship to all states and union territories across India. Whether you're in a metro city or a remote village, we'll deliver your sustainable products right to your doorstep.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Major Cities</h3>
                    <p className="text-sm text-muted-foreground">
                      Express delivery available in: Mumbai, Delhi, Bangalore, Hyderabad, Chennai, Kolkata, Pune, Ahmedabad, Jaipur, Surat, Lucknow, Kanpur, Nagpur, Indore, Thane, Bhopal, Visakhapatnam, Pimpri-Chinchwad, Patna, Vadodara, Ghaziabad, Ludhiana, Agra, Nashik, Faridabad, Meerut, Rajkot, Kalyan-Dombivali, Vasai-Virar, Varanasi, and more.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Remote Areas</h3>
                    <p className="text-sm text-muted-foreground">
                      Standard shipping to remote locations may take an additional 2-3 business days. We'll notify you of any delays during checkout if your pin code falls into this category.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            <div className="mt-12 p-8 bg-muted/30 rounded-lg text-center">
              <h2 className="font-serif text-2xl font-bold mb-4">
                Questions about shipping?
              </h2>
              <p className="text-muted-foreground mb-6">
                Our customer support team is here to help with any delivery-related inquiries.
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