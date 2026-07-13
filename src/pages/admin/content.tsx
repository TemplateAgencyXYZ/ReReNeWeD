import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { authService } from "@/services/authService";
import { contentService } from "@/services/contentService";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  ADMIN_CONTENT_SECTIONS,
  type AdminContentSection,
} from "@/lib/admin-content";

export default function AdminContentPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<Record<string, boolean>>({});

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
      await loadContent();
    } catch (error) {
      console.error("Admin check error:", error);
      router.push("/");
    } finally {
      setLoading(false);
    }
  }

  async function loadContent() {
    try {
      const initial: Record<string, string> = {};
      for (const section of ADMIN_CONTENT_SECTIONS) {
        const { content_value } = await contentService.getContent(
          section.key,
          section.defaultValue
        );
        initial[section.key] = content_value || section.defaultValue;
      }
      setValues(initial);
    } catch (error) {
      console.error("Error loading content:", error);
      toast({
        title: "Error",
        description: "Failed to load content. Please refresh.",
        variant: "destructive",
      });
    }
  }

  async function handleSave(section: AdminContentSection) {
    setSaving((prev) => ({ ...prev, [section.key]: true }));
    try {
      await contentService.updateContent(section.key, values[section.key] || "");
      toast({
        title: "Saved",
        description: `${section.label} content has been updated and is live.`,
      });
    } catch (error) {
      console.error("Save error:", error);
      toast({
        title: "Error",
        description: "Failed to save content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving((prev) => ({ ...prev, [section.key]: false }));
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
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="font-serif text-4xl font-bold">Content Editor</h1>
            <p className="text-muted-foreground">
              Edit public-facing page content. Changes are reflected immediately.
            </p>
          </div>

          <Tabs defaultValue={ADMIN_CONTENT_SECTIONS[0].key} className="w-full">
            <TabsList className="flex flex-wrap h-auto gap-2 mb-6">
              {ADMIN_CONTENT_SECTIONS.map((section) => (
                <TabsTrigger
                  key={section.key}
                  value={section.key}
                  className="text-xs"
                >
                  {section.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {ADMIN_CONTENT_SECTIONS.map((section) => (
              <TabsContent key={section.key} value={section.key}>
                <Card>
                  <CardHeader>
                    <CardTitle>{section.label}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      This content is shown on the public {section.pageName}{" "}
                      page. Plain text or basic HTML/Markdown is supported.
                    </p>
                    <Textarea
                      value={values[section.key] ?? section.defaultValue}
                      onChange={(e) =>
                        setValues((prev) => ({
                          ...prev,
                          [section.key]: e.target.value,
                        }))
                      }
                      rows={16}
                      className="font-mono text-sm"
                    />
                    <div className="flex justify-end">
                      <Button
                        onClick={() => handleSave(section)}
                        disabled={saving[section.key]}
                      >
                        {saving[section.key] ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}