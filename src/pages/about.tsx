import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/hooks/use-site-content";
import { RichTextContent } from "@/components/RichTextContent";

const DEFAULT_ABOUT = `ReReNeWeD began with a simple question: what happens to materials after their first use?

We believe the best answer is a second life — thoughtfully designed, carefully crafted, and honestly sold. Every product in our store is made from recycled or renewed materials, sourced responsibly and finished by makers who care about quality as much as impact.

Our mission is to make sustainable shopping feel effortless. You should not have to choose between what looks good and what does good.

Thank you for being part of the cycle.`;

export default function AboutPage() {
  const { contentMap } = useSiteContent(["about_body"], {
    about_body: DEFAULT_ABOUT,
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1">
        <section className="py-16 md:py-24 border-b border-border">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="font-serif text-4xl md:text-5xl font-bold">Our Story</h1>
              <p className="text-lg text-muted-foreground">
                How ReReNeWeD turns renewal into everyday beauty.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <RichTextContent content={contentMap.about_body || DEFAULT_ABOUT} />
              <div className="pt-8">
                <Button asChild>
                  <Link href="/products">Shop the Collection</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}