import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminTabs } from "@/components/admin/AdminTabs";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { authService } from "@/services/authService";
import { contentService } from "@/services/contentService";
import { supabase } from "@/integrations/supabase/client";
import {
  ADMIN_CONTENT_SECTIONS,
  DEFAULT_CONTENT_VALUES,
} from "@/lib/admin-content";
import { Check, Loader2 } from "lucide-react";

export default function AdminContent() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [values, setValues] = useState<Record<string, string>>(DEFAULT_CONTENT_VALUES);

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
      const all = await contentService.getAll();
      const next: Record<string, string> = { ...DEFAULT_CONTENT_VALUES };
      for (const row of all) {
        next[row.content_key] = row.content_value;
      }
      setValues(next);
    } catch (error) {
      console.error("Load content error:", error);
    }
  }

  async function handleSave(sectionKey: string) {
    setSaving((prev) => ({ ...prev, [sectionKey]: true }));
    setSaved((prev) => ({ ...prev, [sectionKey]: false }));

    try {
      await contentService.update(sectionKey, values[sectionKey] || "");
      setSaved((prev) => ({ ...prev, [sectionKey]: true }));
      setTimeout(() => {
        setSaved((prev) => ({ ...prev, [sectionKey]: false }));
      }, 2000);
    } catch (error) {
      console.error("Save content error:", error);
      alert("Failed to save content");
    } finally {
      setSaving((prev) => ({ ...prev, [sectionKey]: false }));
    }
  }

  function updateValue(sectionKey: string, value: string) {
    setValues((prev) => ({ ...prev, [sectionKey]: value }));
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
            <h1 className="font-serif text-4xl font-bold">Content Editor</h1>
            <p className="text-muted-foreground">
              Edit public-facing copy. Changes are reflected immediately on the site.
            </p>
          </div>

          <AdminTabs />

          <Tabs defaultValue={ADMIN_CONTENT_SECTIONS[0].key} className="space-y-6">
            <TabsList className="flex flex-wrap h-auto gap-2">
              {ADMIN_CONTENT_SECTIONS.map((section) => (
                <TabsTrigger key={section.key} value={section.key}>
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
                      This content is shown on the public{" "}
                      <span className="font-medium text-foreground">{section.pageName}</span> page.
                      Plain text or basic HTML/Markdown supported.
                    </p>

                    <div className="space-y-2">
                      <Label htmlFor={`textarea-${section.key}`}>Content</Label>
                      <Textarea
                        id={`textarea-${section.key}`}
                        value={values[section.key] || ""}
                        onChange={(e) => updateValue(section.key, e.target.value)}
                        rows={18}
                        className="font-mono text-sm leading-relaxed"
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <Button
                        onClick={() => handleSave(section.key)}
                        disabled={saving[section.key]}
                      >
                        {saving[section.key] ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Saving...
                          </>
                        ) : saved[section.key] ? (
                          <>
                            <Check className="h-4 w-4 mr-2" />
                            Saved
                          </>
                        ) : (
                          "Save"
                        )}
                      </Button>
                      {saved[section.key] && (
                        <span className="text-sm text-green-600">
                          Live content updated.
                        </span>
                      )}
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