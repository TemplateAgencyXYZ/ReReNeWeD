import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { productService } from "@/services/productService";
import { cartService } from "@/services/cartService";
import { supabase } from "@/integrations/supabase/client";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Product = Database["public"]["Tables"]["products"]["Row"] & {
  categories: { id: string; name: string; slug: string } | null;
};

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
  }, []);

  useEffect(() => {
    if (id && typeof id === "string") {
      loadProduct(id);
    }
  }, [id]);

  async function loadProduct(productId: string) {
    try {
      const data = await productService.getProductById(productId);
      setProduct(data);
    } catch (error) {
      console.error("Error loading product:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddToCart() {
    if (!user) {
      router.push("/auth/login");
      return;
    }

    if (!product) return;

    setAddingToCart(true);
    try {
      await cartService.addToCart(user.id, product.id, quantity);
      router.push("/cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add to cart");
    } finally {
      setAddingToCart(false);
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-1 container py-12">
          <div className="animate-pulse space-y-8">
            <div className="aspect-square max-w-2xl mx-auto bg-muted rounded-lg" />
            <div className="space-y-4 max-w-2xl mx-auto">
              <div className="h-8 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-1/2" />
              <div className="h-24 bg-muted rounded" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-1 container py-12 text-center">
          <p className="text-muted-foreground">Product not found</p>
          <Button onClick={() => router.push("/products")} className="mt-4">
            Back to Products
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1 container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              {product.images && product.images.length > 0 && (
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="object-cover w-full h-full"
                />
              )}
            </div>
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square bg-muted rounded overflow-hidden border-2 transition-colors ${
                      selectedImage === idx ? "border-primary" : "border-transparent"
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${idx + 1}`} className="object-cover w-full h-full" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            {product.categories && (
              <Badge variant="secondary">{product.categories.name}</Badge>
            )}

            <div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">
                {product.name}
              </h1>
              <p className="text-3xl font-bold text-primary">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {product.recycled_from && (
              <Card className="p-4 bg-accent/10 border-accent/20">
                <p className="text-sm">
                  <span className="font-semibold">Recycled from:</span> {product.recycled_from}
                </p>
              </Card>
            )}

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                {product.stock > 0 ? (
                  <span>{product.stock} in stock</span>
                ) : (
                  <span className="text-destructive">Out of stock</span>
                )}
              </div>

              <Button
                size="lg"
                className="w-full"
                onClick={handleAddToCart}
                disabled={product.stock === 0 || addingToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {addingToCart ? "Adding..." : product.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}