import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { authService } from "@/services/authService";
import { orderService } from "@/services/orderService";
import { addressService } from "@/services/addressService";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import Link from "next/link";
import { MapPin, Package, Lock } from "lucide-react";

type Address = Database["public"]["Tables"]["addresses"]["Row"];
type Order = Awaited<ReturnType<typeof orderService.getUserOrders>>[0];

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [activeTab, setActiveTab] = useState("orders");

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [newAddress, setNewAddress] = useState({
    full_name: "",
    phone: "",
    street_address: "",
    city: "",
    state: "",
    postal_code: "",
    country: "United States",
  });
  const [showAddressForm, setShowAddressForm] = useState(false);

  useEffect(() => {
    loadProfileData();
  }, []);

  async function loadProfileData() {
    setLoading(true);
    try {
      const session = await authService.getCurrentSession();
      if (!session) {
        router.push("/auth/login");
        return;
      }

      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      const [userOrders, userAddresses] = await Promise.all([
        orderService.getUserOrders(session.user.id),
        addressService.getUserAddresses(session.user.id),
      ]);

      setProfile(profileData);
      setOrders(userOrders);
      setAddresses(userAddresses);
    } catch (error) {
      console.error("Error loading profile:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handlePasswordChange() {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("New passwords don't match");
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      await authService.updatePassword(passwordForm.newPassword);
      alert("Password updated successfully");
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      console.error("Password update error:", error);
      alert("Failed to update password");
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

      const address = await addressService.createAddress(session.user.id, {
        user_id: session.user.id,
        ...newAddress,
        is_default: addresses.length === 0,
      });

      setAddresses([...addresses, address]);
      setShowAddressForm(false);
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

  async function handleDeleteAddress(addressId: string) {
    if (!confirm("Delete this address?")) return;

    try {
      await addressService.deleteAddress(addressId);
      setAddresses(addresses.filter((a) => a.id !== addressId));
    } catch (error) {
      console.error("Error deleting address:", error);
      alert("Failed to delete address");
    }
  }

  async function handleSetDefaultAddress(addressId: string) {
    try {
      await addressService.setDefaultAddress(addressId);
      await loadProfileData();
    } catch (error) {
      console.error("Error setting default:", error);
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Loading profile...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1 container py-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="font-serif text-4xl font-bold">My Account</h1>
            <p className="text-muted-foreground">{profile?.email}</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="orders">
                <Package className="h-4 w-4 mr-2" />
                Orders
              </TabsTrigger>
              <TabsTrigger value="addresses">
                <MapPin className="h-4 w-4 mr-2" />
                Addresses
              </TabsTrigger>
              <TabsTrigger value="security">
                <Lock className="h-4 w-4 mr-2" />
                Security
              </TabsTrigger>
            </TabsList>

            {/* Orders Tab */}
            <TabsContent value="orders" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                </CardHeader>
                <CardContent>
                  {orders.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground mb-4">No orders yet</p>
                      <Button asChild>
                        <Link href="/products">Start Shopping</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order.id} className="border rounded-lg p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold">Order #{order.id.slice(0, 8)}</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(order.created_at || '').toLocaleDateString()}
                              </p>
                            </div>
                            <Badge variant={order.status === "completed" ? "default" : "secondary"}>
                              {order.status}
                            </Badge>
                          </div>

                          <Separator />

                          <div className="space-y-2">
                            {order.order_items?.slice(0, 2).map((item: any, idx: number) => (
                              <div key={idx} className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-muted rounded overflow-hidden flex-shrink-0">
                                  {item.products?.images?.[0] && (
                                    <img
                                      src={item.products.images[0]}
                                      alt={item.product_name}
                                      className="w-full h-full object-cover"
                                    />
                                  )}
                                </div>
                                <div className="flex-1 text-sm">
                                  <p className="font-medium">{item.product_name}</p>
                                  <p className="text-muted-foreground">Qty: {item.quantity}</p>
                                </div>
                                <p className="font-medium">${(item.product_price * item.quantity).toFixed(2)}</p>
                              </div>
                            ))}
                            {order.order_items && order.order_items.length > 2 && (
                              <p className="text-sm text-muted-foreground">
                                +{order.order_items.length - 2} more items
                              </p>
                            )}
                          </div>

                          <Separator />

                          <div className="flex items-center justify-between">
                            <p className="font-semibold">Total: ${order.total_amount.toFixed(2)}</p>
                            <Button asChild variant="outline" size="sm">
                              <Link href={`/orders/${order.id}`}>View Details</Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Addresses Tab */}
            <TabsContent value="addresses" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Saved Addresses</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {addresses.map((address) => (
                    <div key={address.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold">{address.full_name}</p>
                          {address.is_default && (
                            <Badge variant="secondary" className="mt-1">Default</Badge>
                          )}
                        </div>
                        <div className="flex gap-2">
                          {!address.is_default && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleSetDefaultAddress(address.id)}
                            >
                              Set Default
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteAddress(address.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>{address.street_address}</p>
                        <p>{address.city}, {address.state} {address.postal_code}</p>
                        <p>{address.country}</p>
                        <p>Phone: {address.phone}</p>
                      </div>
                    </div>
                  ))}

                  {showAddressForm ? (
                    <div className="border rounded-lg p-4 space-y-4">
                      <h3 className="font-semibold">New Address</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 sm:col-span-1">
                          <Label htmlFor="new_full_name">Full Name</Label>
                          <Input
                            id="new_full_name"
                            value={newAddress.full_name}
                            onChange={(e) => setNewAddress({ ...newAddress, full_name: e.target.value })}
                          />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <Label htmlFor="new_phone">Phone</Label>
                          <Input
                            id="new_phone"
                            value={newAddress.phone}
                            onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                          />
                        </div>
                        <div className="col-span-2">
                          <Label htmlFor="new_street">Street Address</Label>
                          <Input
                            id="new_street"
                            value={newAddress.street_address}
                            onChange={(e) => setNewAddress({ ...newAddress, street_address: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="new_city">City</Label>
                          <Input
                            id="new_city"
                            value={newAddress.city}
                            onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="new_state">State</Label>
                          <Input
                            id="new_state"
                            value={newAddress.state}
                            onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="new_postal">Postal Code</Label>
                          <Input
                            id="new_postal"
                            value={newAddress.postal_code}
                            onChange={(e) => setNewAddress({ ...newAddress, postal_code: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="new_country">Country</Label>
                          <Input
                            id="new_country"
                            value={newAddress.country}
                            onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleCreateAddress}>Save Address</Button>
                        <Button variant="outline" onClick={() => setShowAddressForm(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button variant="outline" onClick={() => setShowAddressForm(true)} className="w-full">
                      + Add New Address
                    </Button>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    />
                  </div>
                  <Button onClick={handlePasswordChange}>Update Password</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}