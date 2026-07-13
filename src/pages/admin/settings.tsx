import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { authService } from "@/services/authService";
import { supabase } from "@/integrations/supabase/client";

interface SettingsStatus {
  keyId: string;
  hasKeySecret: boolean;
  hasWebhookSecret: boolean;
}

export default function AdminSettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [status, setStatus] = useState<SettingsStatus | null>(null);

  useEffect(() => {
    checkAdminAccess();
  }, []);

  async function checkAdminAccess() {
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

      setIsAdmin(true);
      await loadSettings();
    } catch (error) {
      console.error("Admin check error:", error);
      router.push("/");
    } finally {
      setLoading(false);
    }
  }

  async function loadSettings() {
    try {
      const session = await authService.getCurrentSession();
      const response = await fetch("/api/admin/settings-status", {
        headers: {
          Authorization: session ? `Bearer ${session.access_token}` : "",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to load settings status");
      }

      const data = await response.json();
      setStatus(data);
    } catch (error) {
      console.error("Error loading settings:", error);
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Loading admin panel...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1 container py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="font-serif text-4xl font-bold">Settings</h1>
            <p className="text-muted-foreground">
              Review safe environment configuration. Secret values are never shown here.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Razorpay Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {status ? (
                <>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      RAZORPAY_KEY_ID (public)
                    </p>
                    <p className="mt-1 font-mono text-sm break-all">
                      {status.keyId || <span className="text-destructive">Not configured</span>}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      RAZORPAY_KEY_SECRET (server-only)
                    </p>
                    <p className="mt-1 text-lg">
                      {status.hasKeySecret ? "✅ Configured" : "❌ Not configured"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      RAZORPAY_WEBHOOK_SECRET (server-only)
                    </p>
                    <p className="mt-1 text-lg">
                      {status.hasWebhookSecret ? "✅ Configured" : "❌ Not configured"}
                    </p>
                  </div>
                </>
              ) : (
                <p className="text-muted-foreground">Unable to load settings status.</p>
              )}

              <p className="text-xs text-muted-foreground border-t pt-4">
                Secret values are read server-side only and are never exposed in the admin UI.
                Update these keys in the Softgen Environment settings.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}