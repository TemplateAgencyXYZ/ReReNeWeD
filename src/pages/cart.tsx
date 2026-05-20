import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { cartService } from "@/services/cartService";
import { supabase } from "@/integrations/supabase/client";
import { useRouter } from "next/router";
import Link from "next/link";

type CartItem = {
  id: string;
  quantity: number;
  products: {
    id: string;
    name: string;
    price: number;
    images: string[] | null;
    stock: number;
  } | null;
};

export default function CartPage() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadCart(session.user.id);
      } else {
        setLoading(false);
      }
    });
  }, []);

  async function loadCart(userId: string) {
    try {
      const data = await cartService.getCartItems(userId);
      setItems(data);
    } catch (error) {
      console.error("Error loading cart:", error);
    } finally {
      setLoading(false);
    }
  }

  async function updateQuantity(itemId: string, newQuantity: number) {
    if (!user) return;
    try {
      await cartService.updateQuantity(itemId, newQuantity);
      loadCart(user.id);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  }

  async function removeItem(itemId: string) {
    if (!user) return;
    try {
      await cartService.removeFromCart(itemId);
      loadCart(user.id);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  }

  const subtotal = items.reduce((total, item) => {
    const price = item.products?.price || 0;
    return total + price * item.quantity;
  }, 0);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-1 container py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/4" />
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-muted rounded" />
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-1 container py-12 text-center">
          <h1 className="font-serif text-3xl font-bold mb-4">Shopping Cart</h1>
          <p className="text-muted-foreground mb-6">Please sign in to view your cart</p>
          <Button asChild>
            <Link href="/auth/login">Sign In</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-1 container py-12 text-center">
          <h1 className="font-serif text-3xl font-bold mb-4">Shopping Cart</h1>
          <p className="text-muted-foreground mb-6">Your cart is empty</p>
          <Button asChild>
            <Link href="/products">Continue Shopping</Link>
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
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-muted rounded overflow-hidden flex-shrink-0">
                      {item.products?.images && item.products.images.length > 0 && (
                        <img
                          src={item.products.images[0]}
                          alt={item.products.name}
                          className="object-cover w-full h-full"
                        />
                      )}
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between">
                        <Link
                          href={`/products/${item.products?.id}`}
                          className="font-semibold hover:text-primary transition-colors"
                        >
                          {item.products?.name}
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>

                      <p className="text-lg font-bold text-primary">
                        ${item.products?.price.toFixed(2)}
                      </p>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= (item.products?.stock || 0)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      {item.quantity >= (item.products?.stock || 0) && (
                        <p className="text-sm text-destructive">
                          Only {item.products?.stock} available
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardContent className="p-6 space-y-4">
                <h2 className="font-serif text-2xl font-bold">Order Summary</h2>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">
                      {subtotal >= 50 ? "Free" : "$5.99"}
                    </span>
                  </div>
                  <div className="border-t border-border pt-2 mt-2">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">
                        ${(subtotal + (subtotal >= 50 ? 0 : 5.99)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full"
                  onClick={() => router.push("/checkout")}
                >
                  Proceed to Checkout
                </Button>

                <Button
                  variant="outline"
                  className="w-full"
                  asChild
                >
                  <Link href="/products">Continue Shopping</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}