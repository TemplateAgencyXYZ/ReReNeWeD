import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { cartService } from "@/services/cartService";
import { addressService } from "@/services/addressService";
import { orderService } from "@/services/orderService";
import { authService } from "@/services/authService";
import type { Database } from "@/integrations/supabase/types";
import Script from "next/script";

type CartItem = Database["public"]["Tables"]["cart_items"]["Row"] & {
  products: Database["public"]["Tables"]["products"]["Row"] | null;
};

type Address = Database["public"]["Tables"]["addresses"]["Row"];

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  const [newAddress, setNewAddress] = useState({
    full_name: "",
    phone: "",
    street_address: "",
    city: "",
    state: "",
    postal_code: "",
    country: "India",
  });

  useEffect(() => {
    loadCheckoutData();
  }, []);

  async function loadCheckoutData() {
    setLoading(true);
    try {
      const session = await authService.getCurrentSession();
      if (!session) {
        router.push("/auth/login?redirect=/checkout");
        return;
      }

      const [items, userAddresses] = await Promise.all([
        cartService.getCartItems(session.user.id),
        addressService.getUserAddresses(session.user.id),
      ]);

      setCartItems(items as CartItem[]);
      setAddresses(userAddresses);

      const defaultAddress = userAddresses.find((addr) => addr.is_default);
      if (defaultAddress) {
        setSelectedAddressId(defaultAddress.id);
      } else if (userAddresses.length > 0) {
        setSelectedAddressId(userAddresses[0].id);
      }
    } catch (error) {
      console.error("Error loading checkout:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateAddress() {
    if (!newAddress.full_name || !newAddress.street_address || !newAddress.city || !newAddress.state || !newAddress.postal_code || !newAddress.country || !newAddress.phone) {
      alert("Please fill all address fields");
      return;
    }
    
    try {
      const session = await authService.getCurrentSession();
      if (!session) return;

      const address = await addressService.createAddress({
        user_id: session.user.id,
        ...newAddress,
        is_default: addresses.length === 0,
      });

      setAddresses([...addresses, address]);
      setSelectedAddressId(address.id);
      setShowNewAddress(false);
      setNewAddress({
        full_name: "",
        phone: "",
        street_address: "",
        city: "",
        state: "",
        postal_code: "",
        country: "India",
      });
    } catch (error) {
      console.error("Error creating address:", error);
      alert("Failed to create address");
    }
  }

  async function handleRazorpayPayment() {
    if (!selectedAddressId) {
      alert("Please select or create a shipping address");
      return;
    }

    if (!razorpayLoaded) {
      alert("Payment system is loading. Please try again in a moment.");
      return;
    }

    setProcessing(true);
    try {
      const session = await authService.getCurrentSession();
      if (!session) {
        router.push("/auth/login");
        return;
      }

      const subtotal = cartService.calculateTotal(cartItems);
      const shipping = subtotal > 2000 ? 0 : 99;
      const totalAmount = subtotal + shipping;

      const selectedAddress = addresses.find((addr) => addr.id === selectedAddressId);
      if (!selectedAddress) {
        alert("Selected address not found");
        return;
      }

      const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      if (!razorpayKey) {
        alert("Payment gateway not configured. Please add NEXT_PUBLIC_RAZORPAY_KEY_ID to your environment variables in Softgen Settings → Environment tab.");
        setProcessing(false);
        return;
      }

      const options = {
        key: razorpayKey,
        amount: Math.round(totalAmount * 100),
        currency: "INR",
        name: "Recycled Goods Store",
        description: "Order Payment",
        image: "/favicon.ico",
        prefill: {
          name: selectedAddress.full_name,
          email: session.user.email || "",
          contact: selectedAddress.phone,
        },
        notes: {
          address: `${selectedAddress.street_address}, ${selectedAddress.city}, ${selectedAddress.state} ${selectedAddress.postal_code}`,
        },
        theme: {
          color: "#0F4C3A",
        },
        handler: async function (response: any) {
          try {
            const orderItems = cartItems.map((item) => ({
              product_id: item.product_id,
              product_name: item.products?.name || "Unknown Product",
              product_price: item.products?.price || 0,
              quantity: item.quantity,
            }));

            const order = await orderService.createOrder(
              session.user.id,
              selectedAddressId,
              orderItems,
              totalAmount
            );

            await orderService.updateOrderStatus(order.id, "processing");
            await cartService.clearCart(session.user.id);

            router.push(`/orders/${order.id}?success=true&payment_id=${response.razorpay_payment_id}`);
          } catch (error) {
            console.error("Error creating order:", error);
            alert("Order creation failed. Please contact support.");
          }
        },
        modal: {
          ondismiss: function () {
            setProcessing(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
      alert("Payment initialization failed. Please try again.");
      setProcessing(false);
    }
  }

  const subtotal = cartService.calculateTotal(cartItems);
  const shipping = subtotal > 2000 ? 0 : 99;
  const total = subtotal + shipping;

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Loading checkout...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-1 container py-12">
          <Card className="max-w-md mx-auto text-center p-8">
            <CardContent>
              <h2 className="font-serif text-2xl font-bold mb-4">Cart is Empty</h2>
              <p className="text-muted-foreground mb-6">Add items to your cart before checking out</p>
              <Button asChild>
                <a href="/products">Browse Products</a>
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={() => setRazorpayLoaded(true)}
        onError={() => {
          console.error("Failed to load Razorpay SDK");
          alert("Payment system failed to load. Please refresh the page.");
        }}
      />
      
      <div className="flex flex-col min-h-screen">
        <Navigation />

        <main className="flex-1 container py-12">
          <h1 className="font-serif text-4xl font-bold mb-8">Checkout</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Address</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {addresses.length > 0 && !showNewAddress && (
                    <RadioGroup value={selectedAddressId} onValueChange={setSelectedAddressId}>
                      {addresses.map((address) => (
                        <div key={address.id} className="flex items-start space-x-3 p-3 border rounded">
                          <RadioGroupItem value={address.id} id={address.id} />
                          <Label htmlFor={address.id} className="flex-1 cursor-pointer">
                            <div className="font-medium">{address.full_name}</div>
                            <div className="text-sm text-muted-foreground">{address.street_address}</div>
                            <div className="text-sm text-muted-foreground">
                              {address.city}, {address.state} {address.postal_code}
                            </div>
                            <div className="text-sm text-muted-foreground">{address.country}</div>
                            <div className="text-sm text-muted-foreground">Phone: {address.phone}</div>
                            {address.is_default && (
                              <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded mt-1 inline-block">
                                Default
                              </span>
                            )}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}

                  {showNewAddress && (
                    <div className="space-y-4 p-4 border rounded">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 sm:col-span-1">
                          <Label htmlFor="full_name">Full Name</Label>
                          <Input
                            id="full_name"
                            value={newAddress.full_name}
                            onChange={(e) => setNewAddress({ ...newAddress, full_name: e.target.value })}
                            placeholder="Rajesh Kumar"
                          />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            value={newAddress.phone}
                            onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                            placeholder="+91 98765 43210"
                          />
                        </div>
                        <div className="col-span-2">
                          <Label htmlFor="street_address">Street Address</Label>
                          <Input
                            id="street_address"
                            value={newAddress.street_address}
                            onChange={(e) => setNewAddress({ ...newAddress, street_address: e.target.value })}
                            placeholder="123 MG Road, Flat 4B"
                          />
                        </div>
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            value={newAddress.city}
                            onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                            placeholder="Mumbai"
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            value={newAddress.state}
                            onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                            placeholder="Maharashtra"
                          />
                        </div>
                        <div>
                          <Label htmlFor="postal_code">PIN Code</Label>
                          <Input
                            id="postal_code"
                            value={newAddress.postal_code}
                            onChange={(e) => setNewAddress({ ...newAddress, postal_code: e.target.value })}
                            placeholder="400001"
                          />
                        </div>
                        <div>
                          <Label htmlFor="country">Country</Label>
                          <Input
                            id="country"
                            value={newAddress.country}
                            onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                            placeholder="India"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleCreateAddress}>Save Address</Button>
                        <Button variant="outline" onClick={() => setShowNewAddress(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}

                  {!showNewAddress && (
                    <Button variant="outline" onClick={() => setShowNewAddress(true)} className="w-full">
                      + Add New Address
                    </Button>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 p-4 border rounded">
                    <div className="w-12 h-8 bg-primary rounded flex items-center justify-center text-white text-xs font-bold">
                      ₹
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Razorpay Secure Checkout</p>
                      <p className="text-sm text-muted-foreground">UPI, Cards, NetBanking, Wallets</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    You will be redirected to Razorpay secure payment gateway when you click &quot;Pay Now&quot;
                  </p>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>
                          {item.products?.name} × {item.quantity}
                        </span>
                        <span>₹{((item.products?.price || 0) * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? "FREE" : `₹${shipping.toFixed(2)}`}</span>
                    </div>
                    {shipping === 0 && (
                      <p className="text-xs text-muted-foreground">Free shipping on orders over ₹2000</p>
                    )}
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handleRazorpayPayment}
                    disabled={processing || !selectedAddressId || !razorpayLoaded}
                  >
                    {processing ? "Processing..." : `Pay ₹${total.toFixed(2)}`}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Secured by Razorpay. Your payment information is safe and encrypted.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}