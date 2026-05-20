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

type CartItem = Database["public"]["Tables"]["cart_items"]["Row"] & {
  products: Database["public"]["Tables"]["products"]["Row"] | null;
};

type Address = Database["public"]["Tables"]["addresses"]["Row"];

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);

  const [newAddress, setNewAddress] = useState({
    full_name: "",
    phone: "",
    street_address: "",
    city: "",
    state: "",
    postal_code: "",
    country: "United States",
  });

  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
    name: "",
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
        country: "United States",
      });
    } catch (error) {
      console.error("Error creating address:", error);
      alert("Failed to create address");
    }
  }

  async function handlePlaceOrder() {
    if (!selectedAddressId) {
      alert("Please select or create a shipping address");
      return;
    }

    if (!cardDetails.cardNumber || !cardDetails.expiry || !cardDetails.cvc || !cardDetails.name) {
      alert("Please complete payment details");
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
        subtotal + (subtotal > 50 ? 0 : 9.99)
      );

      await orderService.updateOrderStatus(order.id, "completed");
      await cartService.clearCart(session.user.id);

      router.push(`/orders/${order.id}?success=true`);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  }

  const subtotal = cartService.calculateTotal(cartItems);
  const shipping = subtotal > 50 ? 0 : 9.99;
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
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1 container py-12">
        <h1 className="font-serif text-4xl font-bold mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Address */}
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
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={newAddress.phone}
                          onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="street_address">Street Address</Label>
                        <Input
                          id="street_address"
                          value={newAddress.street_address}
                          onChange={(e) => setNewAddress({ ...newAddress, street_address: e.target.value })}
                          placeholder="123 Main St, Apt 4B"
                        />
                      </div>
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={newAddress.city}
                          onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          value={newAddress.state}
                          onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="postal_code">Postal Code</Label>
                        <Input
                          id="postal_code"
                          value={newAddress.postal_code}
                          onChange={(e) => setNewAddress({ ...newAddress, postal_code: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          value={newAddress.country}
                          onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
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

            {/* Payment */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="cardName">Cardholder Name</Label>
                  <Input
                    id="cardName"
                    value={cardDetails.name}
                    onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    value={cardDetails.cardNumber}
                    onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                    placeholder="4242 4242 4242 4242"
                    maxLength={19}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      value={cardDetails.expiry}
                      onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvc">CVC</Label>
                    <Input
                      id="cvc"
                      value={cardDetails.cvc}
                      onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value })}
                      placeholder="123"
                      maxLength={4}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
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
                      <span>${((item.products?.price || 0) * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  {shipping === 0 && (
                    <p className="text-xs text-muted-foreground">Free shipping on orders over $50</p>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={handlePlaceOrder}
                  disabled={processing || !selectedAddressId}
                >
                  {processing ? "Processing..." : `Pay $${total.toFixed(2)}`}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Your payment information is secure and encrypted
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}