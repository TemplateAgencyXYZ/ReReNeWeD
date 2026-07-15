import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Droplets, TreePine, Recycle, Package, Zap, Truck } from "lucide-react";
import { useSiteContent } from "@/hooks/use-site-content";
import { RichTextContent } from "@/components/RichTextContent";

export default function SustainabilityPage() {
  const { contentMap } = useSiteContent(["sustainability"], {
    sustainability:
      "Sustainability isn't a marketing buzzword for us—it's the reason we exist. Every decision we make, from sourcing materials to packaging shipments, is guided by a simple principle: leave the planet better than we found it.\n\n## Our Materials\n\n**Ocean Plastic**\nWe partner with organizations that collect plastic waste from oceans, rivers, and coastal areas before it can harm marine ecosystems. This plastic is cleaned, processed, and transformed into durable goods.\n\n**Reclaimed Wood**\nOur wood products come from salvaged materials—old furniture, construction offcuts, and decommissioned structures. Instead of ending up in landfills, this wood is carefully restored and repurposed into beautiful, functional pieces.\n\n**Recycled Metals & Textiles**\nFrom aluminum cans to discarded fabric scraps, we source post-consumer and post-industrial materials that would otherwise contribute to landfill mass.",
  });

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
              <RichTextContent content={contentMap.sustainability} />
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

            <div className="mt-12 p-8 bg-muted/30 rounded-lg text-center">
              <h2 className="font-serif text-2xl font-bold mb-4">
                Have questions about our sustainability practices?
              </h2>
              <p className="text-muted-foreground mb-6">
                We're always happy to discuss our materials, processes, and impact in detail.
              </p>
              <Link href="/contact" className="text-primary font-semibold hover:underline">
                Get in Touch →
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}