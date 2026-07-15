import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Globe, Leaf } from "lucide-react";
import { useSiteContent } from "@/hooks/use-site-content";
import { RichTextContent } from "@/components/RichTextContent";

export default function StoryPage() {
  const { contentMap } = useSiteContent(["our_story"], {
    our_story:
      "It started with a simple question: What if waste wasn't waste at all, but raw material waiting for its second life?\n\nIn 2020, in a small workshop in Mumbai, our founders began experimenting with discarded ocean plastic, reclaimed wood, and recycled metals. What started as a passion project quickly transformed into a mission—to prove that sustainability and quality don't have to be at odds.\n\nToday, we're proud to offer a carefully curated collection of recycled goods that challenge the notion that \"new\" is always better. Every product in our catalog tells a story of transformation—materials that once headed for landfills now serve beautiful, functional purposes in homes across India.",
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1 py-16 md:py-24">
        <div className="container max-w-4xl">
          <div className="text-center space-y-4 mb-12">
            <Badge variant="secondary" className="mb-2">About Us</Badge>
            <h1 className="font-serif text-4xl md:text-5xl font-bold">
              Our Story
            </h1>
            <p className="text-lg text-muted-foreground">
              Building a sustainable future, one recycled product at a time
            </p>
          </div>

          <div className="space-y-12">
            <section className="prose prose-lg max-w-none">
              <RichTextContent content={contentMap.our_story} />
            </section>

            <section>
              <h2 className="font-serif text-3xl font-bold mb-8 text-center">What Drives Us</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="pt-6 space-y-3">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                      <Heart className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-xl">Quality First</h3>
                    <p className="text-sm text-muted-foreground">
                      We believe recycled products should exceed expectations, not compromise on them. Every item undergoes rigorous quality inspection before reaching you.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6 space-y-3">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                      <Globe className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-xl">Environmental Impact</h3>
                    <p className="text-sm text-muted-foreground">
                      Every purchase directly reduces landfill waste and conserves precious resources. Together, we've diverted over 50,000 kg of materials from landfills.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6 space-y-3">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                      <Users className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-xl">Community Support</h3>
                    <p className="text-sm text-muted-foreground">
                      We partner with local artisans and social enterprises, creating meaningful employment opportunities while supporting circular economy initiatives.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6 space-y-3">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                      <Leaf className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-xl">Transparency</h3>
                    <p className="text-sm text-muted-foreground">
                      Every product listing clearly states its recycled source. We believe you deserve to know exactly where your products come from and what impact they make.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="bg-muted/30 rounded-lg p-8 md:p-12">
              <h2 className="font-serif text-3xl font-bold mb-6 text-center">Our Impact So Far</h2>

              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">50,000+</div>
                  <div className="text-sm text-muted-foreground">Kilograms of waste diverted</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">15,000+</div>
                  <div className="text-sm text-muted-foreground">Happy customers nationwide</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">200+</div>
                  <div className="text-sm text-muted-foreground">Unique recycled products</div>
                </div>
              </div>
            </section>

            <div className="mt-12 p-8 bg-primary text-primary-foreground rounded-lg text-center">
              <h2 className="font-serif text-2xl font-bold mb-4">
                Join the Movement
              </h2>
              <p className="mb-6 opacity-90">
                Every purchase is a vote for a more sustainable future. Together, we can redefine what "value" means.
              </p>
              <Link href="/products" className="inline-block bg-background text-foreground px-6 py-3 rounded-md font-semibold hover:bg-background/90 transition-colors">
                Shop Recycled Goods →
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}