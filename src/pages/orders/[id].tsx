import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { orderService } from "@/services/orderService";
import { authService } from "@/services/authService";
import Link from "next/link";

type Order = Awaited<ReturnType<typeof orderService.getOrderById>>;

export default function OrderDetailsPage() {
  const router = useRouter();
  const { id, success, razorpay_payment_id, razorpay_order_id, razorpay_signature } = router.query;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    if (id) {
      loadOrder();
    }
  }, [id]);

  async function loadOrder() {
    try {
      const session = await authService.getCurrentSession();
      if (!session) {
        router.push("/auth/login");
        return;
      }

      const orderData = await orderService.getOrderById(id as string);
      if (orderData.user_id && orderData.user_id !== session.user.id) {
        router.push("/orders");
        return;
      }
      setOrder(orderData);
    } catch (error) {
      console.error("Error loading order:", error);
      router.push("/orders");
    } finally {
      setLoading(false);
    }
  }

  async function verifyPayment() {
    if (!order || !razorpay_payment_id || !razorpay_order_id || !razorpay_signature) return;
    setVerifying(true);
    try {
      const res = await fetch("/api/razorpay-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          razorpay_payment_id,
          razorpay_order_id,
          razorpay_signature,
          order_id: order.id,
        }),
      });

      if (!res.ok) throw new Error("Verification failed");

      const updated = await orderService.getOrderById(order.id);
      setOrder(updated);
    } catch (error) {
      console.error("Payment verification error:", error);
      alert("Payment verification failed. Contact support if amount was deducted.");
    } finally {
      setVerifying(false);
    }
  }

  useEffect(() => {
    if (success === "true" && order && order.status === "pending") {
      verifyPayment();
    }
  }, [success, order]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Loading order...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-1 container py-12">
          <Card className="max-w-md mx-auto text-center p-8">
            <CardContent>
              <h2 className="font-serif text-2xl font-bold mb-4">Order Not Found</h2>
              <Button asChild>
                <Link href="/profile">View Orders</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1 container py-12">
        {success === "true" && (
          <div className="max-w-2xl mx-auto mb-8 text-center space-y-4">
            <CheckCircle className="h-16 w-16 text-primary mx-auto" />
            <h1 className="font-serif text-4xl font-bold">Order Confirmed!</h1>
            <p className="text-lg text-muted-foreground">
              Thank you for your purchase. Your order has been received and is being processed.
            </p>
          </div>
        )}

        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-3xl font-bold">Order #{order.id.slice(0, 8)}</h2>
              <p className="text-muted-foreground">
                Placed on {new Date(order.created_at || '').toLocaleDateString()}
              </p>
            </div>
            <Badge variant={order.status === "completed" ? "default" : "secondary"}>
              {order.status}
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Address</CardTitle>
              </CardHeader>
              <CardContent>
                {order.shipping_address && (
                  <div className="text-sm space-y-1">
                    <p className="font-medium">{order.shipping_address.full_name}</p>
                    <p>{order.shipping_address.street_address}</p>
                    <p>
                      {order.shipping_address.city}, {order.shipping_address.state}{" "}
                      {order.shipping_address.postal_code}
                    </p>
                    <p>{order.shipping_address.country}</p>
                    <p className="pt-2 text-muted-foreground">Phone: {order.shipping_address.phone}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Subtotal</span>
                    <span className="font-medium">₹{order.total_amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t">
                    <span>Total</span>
                    <span>₹{order.total_amount.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Items Ordered</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.order_items?.map((item: any, index: number) => (
                  <div key={index} className="flex gap-4 py-4 border-b last:border-0">
                    <div className="w-20 h-20 bg-muted rounded overflow-hidden flex-shrink-0">
                      {item.products?.images?.[0] && (
                        <img
                          src={item.products.images[0]}
                          alt={item.product_name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.product_name}</h4>
                      <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₹{(item.product_price * item.quantity).toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">₹{item.product_price.toFixed(2)} each</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button asChild variant="outline">
              <Link href="/products">Continue Shopping</Link>
            </Button>
            <Button asChild>
              <Link href="/profile">View All Orders</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}