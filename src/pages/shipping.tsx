import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Truck, Package, MapPin, Clock } from "lucide-react";

export default function ShippingPage() {
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
                <h2 className="font-serif text-2xl font-bold">Shipping Methods</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="pt-6 space-y-3">
                    <h3 className="font-semibold text-lg">Standard Shipping</h3>
                    <p className="text-sm text-muted-foreground">
                      Delivery within 5-7 business days across India
                    </p>
                    <div className="pt-2">
                      <span className="text-2xl font-bold text-primary">Free</span>
                      <span className="text-sm text-muted-foreground ml-2">on orders over ₹500</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      ₹50 flat rate for orders under ₹500
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6 space-y-3">
                    <h3 className="font-semibold text-lg">Express Shipping</h3>
                    <p className="text-sm text-muted-foreground">
                      Delivery within 2-3 business days to major cities
                    </p>
                    <div className="pt-2">
                      <span className="text-2xl font-bold text-primary">₹150</span>
                      <span className="text-sm text-muted-foreground ml-2">flat rate</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Available in Mumbai, Delhi, Bangalore, Chennai, Hyderabad, and more
                    </p>
                  </CardContent>
                </Card>
              </div>
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

            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                  <Clock className="h-5 w-5" />
                </div>
                <h2 className="font-serif text-2xl font-bold">Processing Time</h2>
              </div>

              <Card>
                <CardContent className="pt-6 space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Orders are typically processed within 1-2 business days. During peak seasons (festivals, sales), processing may take up to 3 business days.
                  </p>

                  <div className="space-y-2">
                    <p className="text-sm font-semibold">What "processing" means:</p>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Verifying payment confirmation</li>
                      <li>Quality checking your items</li>
                      <li>Packaging with eco-friendly materials</li>
                      <li>Generating shipping label and tracking</li>
                    </ul>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    Once your order ships, you'll receive a confirmation email with tracking information.
                  </p>
                </CardContent>
              </Card>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                  <Package className="h-5 w-5" />
                </div>
                <h2 className="font-serif text-2xl font-bold">Sustainable Packaging</h2>
              </div>

              <Card>
                <CardContent className="pt-6 space-y-4">
                  <p className="text-sm text-muted-foreground">
                    True to our commitment to sustainability, all orders are packaged using:
                  </p>

                  <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                    <li>100% recycled cardboard boxes</li>
                    <li>Biodegradable packing materials</li>
                    <li>Paper-based tape (no plastic)</li>
                    <li>Minimal packaging approach to reduce waste</li>
                  </ul>

                  <p className="text-sm text-muted-foreground">
                    We encourage you to reuse or recycle all packaging materials when your order arrives.
                  </p>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-6">Order Tracking</h2>

              <Card>
                <CardContent className="pt-6 space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Once your order ships, you can track its journey:
                  </p>

                  <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                    <li>Check your email for the shipping confirmation with tracking number</li>
                    <li>Log into your account and visit the "Orders" section</li>
                    <li>Click on your order to view real-time tracking updates</li>
                  </ol>

                  <p className="text-sm text-muted-foreground">
                    Tracking information is typically updated within 24 hours of shipment. If you notice any issues, please contact our support team.
                  </p>
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
              <a href="/contact" className="text-primary font-semibold hover:underline">
                Contact Support →
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}