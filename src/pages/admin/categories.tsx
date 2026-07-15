import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AdminTabs } from "@/components/admin/AdminTabs";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { authService } from "@/services/authService";
import { categoryService } from "@/services/categoryService";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { Pencil, Trash2, Plus } from "lucide-react";

type Category = Database["public"]["Tables"]["categories"]["Row"];

export default function AdminCategories() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    slug: "",
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

      await loadCategories();
    } catch (error) {
      console.error("Admin check error:", error);
      router.push("/");
    } finally {
      setLoading(false);
    }
  }

  async function loadCategories() {
    try {
      const data = await categoryService.getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  }

  async function handleSubmit() {
    if (!formData.name) {
      alert("Category name is required");
      return;
    }

    const slug =
      formData.slug ||
      formData.name.toLowerCase().replace(/[\s_]+/g, "-").replace(/[^\w-]+/g, "");

    try {
      if (editingCategory) {
        await categoryService.updateCategory(editingCategory.id, {
          name: formData.name,
          description: formData.description,
          image: formData.image || null,
          slug,
        });
      } else {
        await categoryService.createCategory({
          name: formData.name,
          description: formData.description,
          image: formData.image || null,
          slug,
        });
      }

      await loadCategories();
      resetForm();
    } catch (error) {
      console.error("Category save error:", error);
      alert("Failed to save category");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this category? Products linked to it will lose their category.")) return;

    try {
      await categoryService.deleteCategory(id);
      await loadCategories();
    } catch (error) {
      console.error("Delete category error:", error);
      alert("Failed to delete category");
    }
  }

  function resetForm() {
    setFormData({ name: "", description: "", image: "", slug: "" });
    setEditingCategory(null);
    setShowForm(false);
  }

  function startEdit(category: Category) {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description || "",
      image: category.image || "",
      slug: category.slug,
    });
    setShowForm(true);
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
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-serif text-4xl font-bold">Category Management</h1>
              <p className="text-muted-foreground">{categories.length} categories</p>
            </div>
            {!showForm && (
              <Button onClick={() => setShowForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </Button>
            )}
          </div>

          <AdminTabs />

          {showForm && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>{editingCategory ? "Edit Category" : "New Category"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cat-name">Name *</Label>
                    <Input
                      id="cat-name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cat-slug">Slug (auto-generated if empty)</Label>
                    <Input
                      id="cat-slug"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="cat-desc">Description</Label>
                    <Textarea
                      id="cat-desc"
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="cat-image">Image URL</Label>
                    <Input
                      id="cat-image"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://example.com/category-image.png"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleSubmit}>
                    {editingCategory ? "Update Category" : "Create Category"}
                  </Button>
                  <Button variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Card key={category.id}>
                <CardHeader className="p-0">
                  <div className="aspect-video bg-muted overflow-hidden rounded-t-lg">
                    {category.image ? (
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        No image
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-4 space-y-2">
                  <h3 className="font-semibold">{category.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{category.description}</p>
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" onClick={() => startEdit(category)} className="flex-1">
                      <Pencil className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(category.id)}
                      className="flex-1"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}