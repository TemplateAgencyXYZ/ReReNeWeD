import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Recycle, Droplets, TreePine, Package, Zap, Truck } from "lucide-react";

export default function SustainabilityPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1 py-16 md:py-24">
        <div className="container max-w-4xl">
          <div className="text-center space-y-4 mb-12">
            <Badge variant="secondary" className="mb-2">Our Commitment</Badge>
            <h1 className="font-serif text-4xl md:text-5xl font-bold">
              Sustainability at Our Core
            </h1>
            <p className="text-lg text-muted-foreground">
              How we're building a circular economy, one product at a time
            </p>
          </div>

          <div className="space-y-12">
            <section className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed text-lg">
                Sustainability isn't a marketing buzzword for us—it's the reason we exist. Every decision we make, from sourcing materials to packaging shipments, is guided by a simple principle: <strong>leave the planet better than we found it</strong>.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-3xl font-bold mb-8">Our Materials</h2>

              <div className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                          <Droplets className="h-6 w-6" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-xl mb-2">Ocean Plastic</h3>
                        <p className="text-sm text-muted-foreground">
                          We partner with organizations that collect plastic waste from oceans, rivers, and coastal areas before it can harm marine ecosystems. This plastic is cleaned, processed, and transformed into durable goods—giving it a second life while removing it from waterways.
                        </p>
                        <p className="text-sm text-primary font-semibold mt-2">
                          Impact: Every 1kg of ocean plastic recovered prevents approximately 0.5kg of CO₂ emissions
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                          <TreePine className="h-6 w-6" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-xl mb-2">Reclaimed Wood</h3>
                        <p className="text-sm text-muted-foreground">
                          Our wood products come from salvaged materials—old furniture, construction offcuts, and decommissioned structures. Instead of ending up in landfills, this wood is carefully restored and repurposed into beautiful, functional pieces.
                        </p>
                        <p className="text-sm text-primary font-semibold mt-2">
                          Impact: Saves approximately 100 liters of water and 2.5kg of CO₂ per kg compared to virgin wood
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                          <Recycle className="h-6 w-6" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-xl mb-2">Recycled Metals & Textiles</h3>
                        <p className="text-sm text-muted-foreground">
                          From aluminum cans to discarded fabric scraps, we source post-consumer and post-industrial materials that would otherwise contribute to landfill mass. These materials are processed and transformed into high-quality products without the environmental cost of virgin production.
                        </p>
                        <p className="text-sm text-primary font-semibold mt-2">
                          Impact: Recycled aluminum uses 95% less energy than producing new aluminum from ore
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-3xl font-bold mb-8">Our Operations</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="pt-6 space-y-3">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                      <Package className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-xl">Sustainable Packaging</h3>
                    <p className="text-sm text-muted-foreground">
                      100% recycled cardboard, biodegradable packing materials, and paper-based tape. No plastic, no bubble wrap, no waste.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6 space-y-3">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                      <Zap className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-xl">Carbon-Neutral Facilities</h3>
                    <p className="text-sm text-muted-foreground">
                      Our warehouses run on renewable energy, and we offset remaining emissions through verified reforestation projects.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6 space-y-3">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                      <Truck className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-xl">Optimized Logistics</h3>
                    <p className="text-sm text-muted-foreground">
                      Route optimization, consolidated shipments, and partnerships with eco-conscious carriers minimize our delivery footprint.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6 space-y-3">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                      <Recycle className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-xl">Zero-Waste Goal</h3>
                    <p className="text-sm text-muted-foreground">
                      We're committed to zero operational waste by 2025. Currently, 98% of our warehouse waste is recycled or composted.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="bg-muted/30 rounded-lg p-8 md:p-12">
              <h2 className="font-serif text-3xl font-bold mb-6 text-center">The Circular Economy in Action</h2>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Collection</h3>
                    <p className="text-sm text-muted-foreground">
                      Materials are collected from recycling programs, ocean cleanup initiatives, and industrial partnerships
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Processing</h3>
                    <p className="text-sm text-muted-foreground">
                      Materials are cleaned, sorted, and transformed into raw materials ready for production
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Manufacturing</h3>
                    <p className="text-sm text-muted-foreground">
                      Products are designed and manufactured to meet the highest quality standards
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Use & Enjoy</h3>
                    <p className="text-sm text-muted-foreground">
                      You receive durable, beautiful products that serve your needs for years
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    5
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Return to Cycle</h3>
                    <p className="text-sm text-muted-foreground">
                      When products reach end-of-life, they re-enter the recycling stream instead of landfills
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="prose prose-lg max-w-none">
              <h2 className="font-serif text-3xl font-bold mb-6">Transparency & Certifications</h2>

              <p className="text-muted-foreground leading-relaxed">
                We believe in radical transparency. Every product listing includes detailed information about its recycled source, manufacturing process, and environmental impact. We're proud to hold certifications from:
              </p>

              <ul className="text-muted-foreground space-y-2">
                <li><strong>Global Recycled Standard (GRS)</strong> — Verifying our recycled content claims</li>
                <li><strong>Carbon Trust</strong> — Validating our carbon footprint measurements</li>
                <li><strong>Fair Trade</strong> — Ensuring ethical labor practices throughout our supply chain</li>
                <li><strong>B Corp Certification</strong> (pending) — Demonstrating our commitment to social and environmental performance</li>
              </ul>
            </section>

            <div className="mt-12 p-8 bg-muted/30 rounded-lg text-center">
              <h2 className="font-serif text-2xl font-bold mb-4">
                Have questions about our sustainability practices?
              </h2>
              <p className="text-muted-foreground mb-6">
                We're always happy to discuss our materials, processes, and impact in detail.
              </p>
              <a href="/contact" className="text-primary font-semibold hover:underline">
                Get in Touch →
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}