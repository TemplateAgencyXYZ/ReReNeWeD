import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { authService } from "@/services/authService";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { Shield, ShieldOff, Pencil, X } from "lucide-react";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export default function AdminUsers() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<Profile[]>([]);
  const [editingUser, setEditingUser] = useState<Profile | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    checkAdminAndLoad();
  }, []);

  async function checkAdminAndLoad() {
    try {
      const session = await authService.getCurrentSession();
      if (!session) {
        router.push("/auth/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", session.user.id)
        .maybeSingle();

      if (!profile?.is_admin) {
        router.push("/");
        return;
      }

      await loadUsers();
    } catch (error) {
      console.error("Admin check error:", error);
      router.push("/");
    } finally {
      setLoading(false);
    }
  }

  async function loadUsers() {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error("Load users error:", error);
    }
  }

  async function toggleAdminStatus(userId: string, currentStatus: boolean) {
    if (!confirm(`${currentStatus ? "Remove" : "Grant"} admin privileges for this user?`)) return;

    try {
      const { error } = await supabase
        .from("profiles")
        .update({ is_admin: !currentStatus })
        .eq("id", userId);

      if (error) throw error;
      await loadUsers();
    } catch (error) {
      console.error("Toggle admin error:", error);
      alert("Failed to update admin status");
    }
  }

  async function handleUpdateUser() {
    if (!editingUser) return;

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: formData.full_name,
          phone: formData.phone,
        })
        .eq("id", editingUser.id);

      if (error) throw error;
      await loadUsers();
      setEditingUser(null);
    } catch (error) {
      console.error("Update user error:", error);
      alert("Failed to update user");
    }
  }

  function startEdit(user: Profile) {
    setEditingUser(user);
    setFormData({
      full_name: user.full_name || "",
      email: user.email || "",
      phone: user.phone || "",
    });
  }

  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.email?.toLowerCase().includes(query) ||
      user.full_name?.toLowerCase().includes(query) ||
      user.phone?.toLowerCase().includes(query)
    );
  });

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1 container py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="font-serif text-4xl font-bold">User Management</h1>
            <p className="text-muted-foreground">{users.length} registered users</p>
          </div>

          <div className="mb-6">
            <Input
              placeholder="Search users by email, name, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md"
            />
          </div>

          {editingUser && (
            <Card className="mb-8">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Edit User Profile</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setEditingUser(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={formData.email} disabled className="bg-muted" />
                  <p className="text-xs text-muted-foreground mt-1">Email cannot be changed</p>
                </div>

                <div>
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input
                    id="full_name"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleUpdateUser}>Update User</Button>
                  <Button variant="outline" onClick={() => setEditingUser(null)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-4">
            {filteredUsers.map((user) => (
              <Card key={user.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">
                          {user.full_name || "No name set"}
                        </h3>
                        {user.is_admin && (
                          <Badge variant="default" className="bg-primary">
                            Admin
                          </Badge>
                        )}
                      </div>

                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>
                          <span className="font-medium">Email:</span> {user.email || "N/A"}
                        </p>
                        {user.phone && (
                          <p>
                            <span className="font-medium">Phone:</span> {user.phone}
                          </p>
                        )}
                        <p>
                          <span className="font-medium">Joined:</span>{" "}
                          {new Date(user.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => startEdit(user)}>
                        <Pencil className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleAdminStatus(user.id, user.is_admin || false)}
                      >
                        {user.is_admin ? (
                          <>
                            <ShieldOff className="h-3 w-3 mr-1" />
                            Remove Admin
                          </>
                        ) : (
                          <>
                            <Shield className="h-3 w-3 mr-1" />
                            Make Admin
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredUsers.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-muted-foreground">No users found matching your search</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}