import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1 py-16 md:py-24">
        <div className="container max-w-6xl">
          <div className="text-center space-y-4 mb-12">
            <Badge variant="secondary" className="mb-2">Get in Touch</Badge>
            <h1 className="font-serif text-4xl md:text-5xl font-bold">
              Contact Us
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have a question or need assistance? We're here to help you with your sustainable shopping journey.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <Card>
              <CardContent className="pt-6 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email Us</h3>
                  <p className="text-sm text-muted-foreground">support@example.com</p>
                  <p className="text-sm text-muted-foreground">wholesale@example.com</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Call Us</h3>
                  <p className="text-sm text-muted-foreground">+91 1800-123-4567</p>
                  <p className="text-sm text-muted-foreground">Mon-Fri, 9 AM - 6 PM IST</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Visit Us</h3>
                  <p className="text-sm text-muted-foreground">123 Green Street</p>
                  <p className="text-sm text-muted-foreground">Mumbai, Maharashtra 400001</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-2xl">Send Us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="How can we help?" />
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>

                  <p className="text-sm text-muted-foreground text-center">
                    We'll respond to your inquiry within 24 hours
                  </p>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary flex-shrink-0">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-xl mb-2">Business Hours</CardTitle>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex justify-between">
                          <span>Monday - Friday:</span>
                          <span className="font-medium text-foreground">9:00 AM - 6:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Saturday:</span>
                          <span className="font-medium text-foreground">10:00 AM - 4:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sunday:</span>
                          <span className="font-medium text-foreground">Closed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
                  <div className="space-y-3">
                    <a href="/faq" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                      → Frequently Asked Questions
                    </a>
                    <a href="/shipping" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                      → Shipping Information
                    </a>
                    <a href="/returns" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                      → Returns & Refunds
                    </a>
                    <a href="/sustainability" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                      → Our Sustainability Commitment
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-primary text-primary-foreground">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-2">Need Immediate Assistance?</h3>
                  <p className="text-sm opacity-90 mb-4">
                    For urgent inquiries, please call our customer support hotline during business hours.
                  </p>
                  <Button variant="secondary" className="w-full">
                    Call Now: +91 1800-123-4567
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}