import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { productService } from "@/services/productService";
import type { Database } from "@/integrations/supabase/types";

type Product = Database["public"]["Tables"]["products"]["Row"] & {
  categories: { id: string; name: string; slug: string } | null;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const data = await productService.getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!searchQuery.trim()) {
      loadProducts();
      return;
    }

    setLoading(true);
    try {
      const data = await productService.searchProducts(searchQuery);
      setProducts(data);
    } catch (error) {
      console.error("Error searching products:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1">
        <section className="py-12 border-b border-border">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="font-serif text-4xl md:text-5xl font-bold">
                Shop Recycled Products
              </h1>
              <p className="text-lg text-muted-foreground">
                Browse our collection of quality renewed items
              </p>

              <form onSubmit={handleSearch} className="flex gap-2 max-w-md mx-auto">
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit">
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="aspect-square bg-muted animate-pulse" />
                    <CardContent className="p-4 space-y-2">
                      <div className="h-4 bg-muted animate-pulse rounded" />
                      <div className="h-3 bg-muted animate-pulse rounded w-2/3" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <Link key={product.id} href={`/products/${product.id}`}>
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                      <div className="aspect-square bg-muted relative">
                        {product.images && product.images.length > 0 && (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="object-cover w-full h-full"
                          />
                        )}
                        {product.stock < 5 && product.stock > 0 && (
                          <Badge className="absolute top-2 right-2 bg-destructive">
                            Only {product.stock} left
                          </Badge>
                        )}
                        {product.stock === 0 && (
                          <Badge className="absolute top-2 right-2 bg-muted text-muted-foreground">
                            Out of Stock
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
                          <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {product.description}
                          </p>
                          <div className="flex items-center justify-between pt-2">
                            <span className="text-2xl font-bold text-primary">
                              ${product.price.toFixed(2)}
                            </span>
                            <Button size="sm" disabled={product.stock === 0}>
                              {product.stock === 0 ? "Out of Stock" : "View"}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">No products found</p>
                {searchQuery && (
                  <Button
                    onClick={() => {
                      setSearchQuery("");
                      loadProducts();
                    }}
                    variant="outline"
                    className="mt-4"
                  >
                    Clear Search
                  </Button>
                )}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}