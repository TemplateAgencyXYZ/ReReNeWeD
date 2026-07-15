import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Package, Leaf, Truck, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import { productService } from "@/services/productService";
import type { Database } from "@/integrations/supabase/types";
import { useSiteContent, parseKeyValueContent } from "@/hooks/use-site-content";

type Product = Database["public"]["Tables"]["products"]["Row"] & {
  categories: { id: string; name: string; slug: string } | null;
};

const HERO_DEFAULT =
  "Title: Quality Recycled Goods for Conscious Living\nSubtitle: Every purchase supports sustainable living. Discover unique, renewed products that give materials a second life.\nButton Text: Shop All Products";

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const { contentMap } = useSiteContent(["hero_homepage"], {
    hero_homepage: HERO_DEFAULT,
  });

  const hero = parseKeyValueContent(contentMap.hero_homepage || HERO_DEFAULT);
  const heroTitle = hero.title || "Quality Recycled Goods for Conscious Living";
  const heroSubtitle =
    hero.subtitle ||
    "Every purchase supports sustainable living. Discover unique, renewed products that give materials a second life.";
  const heroButton = hero["button text"] || "Shop All Products";

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const [featured, newProducts] = await Promise.all([
        productService.getFeaturedProducts(),
        productService.getNewArrivals(),
      ]);
      setFeaturedProducts(featured);
      setNewArrivals(newProducts);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/5 via-accent/5 to-background">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <Badge variant="secondary" className="mb-4">
                Sustainable Shopping
              </Badge>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
                {heroTitle}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {heroSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button asChild size="lg" className="text-base">
                  <Link href="/products">{heroButton}</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-base">
                  <Link href="/story">Our Story</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 border-y border-border bg-muted/30">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary">
                  <Leaf className="h-7 w-7" />
                </div>
                <h3 className="font-semibold text-lg">Material Transparency</h3>
                <p className="text-sm text-muted-foreground">
                  Product cards clearly label recycled items so you can shop by material with confidence
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary">
                  <Shield className="h-7 w-7" />
                </div>
                <h3 className="font-semibold text-lg">Quality Assured</h3>
                <p className="text-sm text-muted-foreground">
                  Every item inspected for durability and functionality
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary">
                  <Truck className="h-7 w-7" />
                </div>
                <h3 className="font-semibold text-lg">Fast Shipping</h3>
                <p className="text-sm text-muted-foreground">
                  Free shipping on orders over ₹500 across India
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary">
                  <Package className="h-7 w-7" />
                </div>
                <h3 className="font-semibold text-lg">Easy Returns</h3>
                <p className="text-sm text-muted-foreground">
                  30-day return policy on all items, no questions asked
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* New Arrivals */}
        {newArrivals.length > 0 && (
          <section className="py-16 md:py-24 bg-muted/20">
            <div className="container">
              <div className="text-center space-y-4 mb-12">
                <Badge variant="secondary" className="mb-2">Just In</Badge>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                  New Arrivals
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Fresh additions to our sustainable collection
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {newArrivals.map((product) => (
                  <Link key={product.id} href={`/products/${product.id}`}>
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-square bg-muted relative">
                        {product.images && product.images.length > 0 && (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="object-cover w-full h-full"
                          />
                        )}
                        <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground">
                          New
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          {product.categories && (
                            <Badge variant="secondary" className="text-xs">
                              {product.categories.name}
                            </Badge>
                          )}
                          <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
                          <div className="flex items-center justify-between pt-2">
                            <span className="text-xl font-bold text-primary">
                              ₹{product.price.toFixed(2)}
                            </span>
                            <Button size="sm">View</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Featured Products */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center space-y-4 mb-12">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                Featured Products
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Handpicked selection of our most popular renewed items
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="aspect-square bg-muted animate-pulse" />
                    <CardContent className="p-4 space-y-2">
                      <div className="h-4 bg-muted animate-pulse rounded" />
                      <div className="h-3 bg-muted animate-pulse rounded w-2/3" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : featuredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProducts.map((product) => (
                  <Link key={product.id} href={`/products/${product.id}`}>
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-square bg-muted relative">
                        {product.images && product.images.length > 0 && (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="object-cover w-full h-full"
                          />
                        )}
                        {product.stock !== null && product.stock < 5 && product.stock > 0 && (
                          <Badge className="absolute top-2 right-2 bg-destructive">
                            Only {product.stock} left
                          </Badge>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          {product.categories && (
                            <Badge variant="secondary" className="text-xs">
                              {product.categories.name}
                            </Badge>
                          )}
                          <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {product.description}
                          </p>
                          <div className="flex items-center justify-between pt-2">
                            <span className="text-2xl font-bold text-primary">
                              ₹{product.price.toFixed(2)}
                            </span>
                            <Button size="sm">View Details</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No featured products yet. Check back soon!</p>
              </div>
            )}

            <div className="text-center mt-12">
              <Button asChild size="lg" variant="outline">
                <Link href="/products">View All Products</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold">
                Join the Renewal Movement
              </h2>
              <p className="text-lg md:text-xl opacity-90 leading-relaxed">
                Every purchase reduces waste and supports sustainable practices. Start shopping consciously today.
              </p>
              <Button asChild size="lg" variant="secondary" className="mt-4">
                <Link href="/auth/register">Create Free Account</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}