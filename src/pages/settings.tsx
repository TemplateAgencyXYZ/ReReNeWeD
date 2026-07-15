import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { authService } from "@/services/authService";
import { addressService } from "@/services/addressService";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { Plus, Trash2, Eye, EyeOff } from "lucide-react";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type Address = Database["public"]["Tables"]["addresses"]["Row"];

export default function SettingsPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Partial<Profile>>({});
  const [userEmail, setUserEmail] = useState("");
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [newAddress, setNewAddress] = useState<Partial<Address>>({
    full_name: "",
    phone: "",
    street_address: "",
    city: "",
    state: "",
    postal_code: "",
    country: "India",
    is_default: false,
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const session = await authService.getCurrentSession();
      if (!session) {
        router.push("/auth/login");
        return;
      }

      setUserEmail(session.user.email || "");

      const [profileData, addressData] = await Promise.all([
        authService.getProfile(),
        addressService.getUserAddresses(session.user.id),
      ]);

      setProfile(profileData || {});
      setAddresses(addressData);
    } catch (error) {
      console.error("Error loading settings:", error);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const { error } = await authService.updateProfile({
        full_name: profile.full_name,
        phone: profile.phone,
      });

      if (error) throw error;
      alert("Profile updated successfully.");
    } catch (error) {
      console.error("Update profile error:", error);
      alert("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  }

  async function changePassword(e: React.FormEvent) {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match.");
      return;
    }
    if (passwordData.newPassword.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    try {
      const { error } = await authService.updatePassword(passwordData.newPassword);
      if (error) throw error;

      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      alert("Password updated successfully.");
    } catch (error) {
      console.error("Change password error:", error);
      alert("Failed to update password. Make sure you are logged in recently.");
    }
  }

  async function addAddress(e: React.FormEvent) {
    e.preventDefault();
    try {
      const session = await authService.getCurrentSession();
      if (!session) return;

      await addressService.addAddress(session.user.id, newAddress as Omit<Address, "id" | "created_at" | "user_id">);
      setNewAddress({
        full_name: "",
        phone: "",
        street_address: "",
        city: "",
        state: "",
        postal_code: "",
        country: "India",
        is_default: false,
      });
      await loadData();
    } catch (error) {
      console.error("Add address error:", error);
      alert("Failed to add address.");
    }
  }

  async function deleteAddress(id: string) {
    if (!confirm("Delete this address?")) return;
    try {
      await addressService.deleteAddress(id);
      await loadData();
    } catch (error) {
      console.error("Delete address error:", error);
      alert("Failed to delete address.");
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Loading settings...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1 container py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <div>
            <h1 className="font-serif text-4xl font-bold">Account Settings</h1>
            <p className="text-muted-foreground">Manage your profile, password, and saved addresses</p>
          </div>

          <form onSubmit={updateProfile}>
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.full_name || ""}
                    onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profile.phone || ""}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={userEmail} disabled />
                  <p className="text-xs text-muted-foreground">Email is tied to your login identity and cannot be changed here.</p>
                </div>
                <Button type="submit" disabled={saving}>
                  {saving ? "Saving..." : "Save Profile"}
                </Button>
              </CardContent>
            </Card>
          </form>

          <form onSubmit={changePassword}>
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <div className="relative">
                    <Input
                      id="new-password"
                      type={showPasswords.newPassword ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords({ ...showPasswords, newPassword: !showPasswords.newPassword })}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      tabIndex={-1}
                    >
                      {showPasswords.newPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <div className="relative">
                    <Input
                      id="confirm-password"
                      type={showPasswords.confirmPassword ? "text" : "password"}
                      value={passwordData.confirmPassword}
                      onChange={(e) =>
                        setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                      }
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords({ ...showPasswords, confirmPassword: !showPasswords.confirmPassword })}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      tabIndex={-1}
                    >
                      {showPasswords.confirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <Button type="submit">Update Password</Button>
              </CardContent>
            </Card>
          </form>

          <Card>
            <CardHeader>
              <CardTitle>Saved Addresses</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {addresses.length > 0 && (
                <div className="space-y-4">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className="flex items-start justify-between p-4 border rounded-lg"
                    >
                      <div className="text-sm space-y-1">
                        <p className="font-medium">
                          {address.full_name}
                          {address.is_default && (
                            <span className="ml-2 text-xs text-primary">Default</span>
                          )}
                        </p>
                        <p>{address.street_address}</p>
                        <p>
                          {address.city}, {address.state} {address.postal_code}
                        </p>
                        <p>{address.country}</p>
                        <p className="text-muted-foreground">Phone: {address.phone}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteAddress(address.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <Separator />

              <form onSubmit={addAddress} className="space-y-4">
                <h3 className="font-semibold">Add New Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="addr-name">Full Name</Label>
                    <Input
                      id="addr-name"
                      value={newAddress.full_name}
                      onChange={(e) => setNewAddress({ ...newAddress, full_name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="addr-phone">Phone</Label>
                    <Input
                      id="addr-phone"
                      value={newAddress.phone}
                      onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="addr-street">Street Address</Label>
                    <Input
                      id="addr-street"
                      value={newAddress.street_address}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, street_address: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="addr-city">City</Label>
                    <Input
                      id="addr-city"
                      value={newAddress.city}
                      onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="addr-state">State</Label>
                    <Input
                      id="addr-state"
                      value={newAddress.state}
                      onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="addr-postal">Postal Code</Label>
                    <Input
                      id="addr-postal"
                      value={newAddress.postal_code}
                      onChange={(e) => setNewAddress({ ...newAddress, postal_code: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="addr-country">Country</Label>
                    <Input
                      id="addr-country"
                      value={newAddress.country}
                      onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <Button type="submit">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Address
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}