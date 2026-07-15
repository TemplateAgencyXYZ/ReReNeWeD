import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { orderService } from "@/services/orderService";
import { authService } from "@/services/authService";
import { Package } from "lucide-react";

type OrderListItem = Awaited<ReturnType<typeof orderService.getUserOrders>>[number];

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
  processing: "bg-blue-100 text-blue-800 border-blue-300",
  shipped: "bg-purple-100 text-purple-800 border-purple-300",
  delivered: "bg-green-100 text-green-800 border-green-300",
  cancelled: "bg-red-100 text-red-800 border-red-300",
  payment_failed: "bg-rose-100 text-rose-800 border-rose-300",
};

export default function OrdersIndexPage() {
  const [orders, setOrders] = useState<OrderListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      const session = await authService.getCurrentSession();
      if (!session) {
        router.push("/auth/login");
        return;
      }
      const data = await orderService.getUserOrders(session.user.id);
      setOrders(data);
    } catch (error) {
      console.error("Error loading orders:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1 container py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="font-serif text-4xl font-bold">My Orders</h1>
            <p className="text-muted-foreground">Track and review your purchases</p>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="h-24 bg-muted" />
                </Card>
              ))}
            </div>
          ) : orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order) => (
                <Link key={order.id} href={`/orders/${order.id}`}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <Package className="h-5 w-5 text-primary" />
                            <span className="font-semibold">Order #{order.id.slice(0, 8)}</span>
                            <Badge
                              variant="outline"
                              className={statusColors[order.status] || "bg-gray-100 text-gray-800"}
                            >
                              {order.status.replace(/_/g, " ")}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Placed on {new Date(order.created_at || "").toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-left md:text-right">
                          <p className="text-lg font-bold">₹{order.total_amount.toFixed(2)}</p>
                          <p className="text-sm text-muted-foreground">
                            {order.order_items?.length || 0} item(s)
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center space-y-4">
                <Package className="h-12 w-12 text-muted-foreground mx-auto" />
                <h2 className="font-serif text-2xl font-bold">No orders yet</h2>
                <p className="text-muted-foreground">
                  When you place an order, it will appear here.
                </p>
                <Button asChild>
                  <Link href="/products">Start Shopping</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}