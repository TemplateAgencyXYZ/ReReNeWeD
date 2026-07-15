import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AdminTabs } from "@/components/admin/AdminTabs";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { authService } from "@/services/authService";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { Lock, EyeOff } from "lucide-react";

interface SettingsStatus {
  keyId: string;
  hasKeySecret: boolean;
  hasWebhookSecret: boolean;
}

export default function AdminSettings() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<SettingsStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

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

      await loadSettings(session.access_token);
    } catch (error) {
      console.error("Admin check error:", error);
      router.push("/");
    } finally {
      setLoading(false);
    }
  }

  async function loadSettings(accessToken: string) {
    try {
      const response = await fetch("/api/admin/settings-status", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(payload.error || "Failed to load settings");
      }

      const data = await response.json();
      setStatus(data);
    } catch (error) {
      console.error("Load settings error:", error);
      setError(error instanceof Error ? error.message : "Failed to load settings");
    }
  }

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
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="font-serif text-4xl font-bold">Settings</h1>
            <p className="text-muted-foreground">
              Environment configuration status (read-only in this view).
            </p>
          </div>

          <AdminTabs />

          <Card>
            <CardHeader>
              <CardTitle>Razorpay Payment Gateway</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {error && (
                <p className="text-sm text-destructive">
                  Could not load status: {error}
                </p>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Public Key ID</p>
                    <p className="text-sm text-muted-foreground">
                      Safe to display. This value is sent to the browser during checkout.
                    </p>
                  </div>
                  <div className="font-mono text-sm">
                    {status?.keyId ? (
                      <Badge variant="outline">{status.keyId}</Badge>
                    ) : (
                      <Badge variant="secondary">Not configured</Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      Key Secret
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Server-only secret. Value is never exposed in the admin UI.
                    </p>
                  </div>
                  <div>
                    {status?.hasKeySecret ? (
                      <Badge className="bg-green-100 text-green-800">Configured</Badge>
                    ) : (
                      <Badge variant="destructive">Missing</Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium flex items-center gap-2">
                      <EyeOff className="h-4 w-4" />
                      Webhook Secret
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Server-only secret. Value is never exposed in the admin UI.
                    </p>
                  </div>
                  <div>
                    {status?.hasWebhookSecret ? (
                      <Badge className="bg-green-100 text-green-800">Configured</Badge>
                    ) : (
                      <Badge variant="destructive">Missing</Badge>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                Add or update these values in Softgen Settings → Environment, then restart the
                server if the preview does not pick them up automatically.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}