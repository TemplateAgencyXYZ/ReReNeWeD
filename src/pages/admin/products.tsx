import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { AdminTabs } from "@/components/admin/AdminTabs";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { authService } from "@/services/authService";
import { productService } from "@/services/productService";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { Plus, Pencil, Trash2 } from "lucide-react";

type Product = Database["public"]["Tables"]["products"]["Row"];
type Category = Database["public"]["Tables"]["categories"]["Row"];

export default function AdminProducts() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category_id: "",
    recycled_from: "",
    images: [] as string[],
    is_featured: false,
    is_new_arrival: false,
    is_recycled: true,
    special_feature: "",
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

      await loadData();
    } catch (error) {
      console.error("Admin check error:", error);
      router.push("/");
    } finally {
      setLoading(false);
    }
  }

  async function loadData() {
    const [productsData, categoriesData] = await Promise.all([
      productService.getAllProducts(),
      supabase.from("categories").select("*").order("name"),
    ]);

    setProducts(productsData);
    setCategories(categoriesData.data || []);
  }

  async function handleSubmit() {
    if (!formData.name || !formData.price || !formData.category_id) {
      alert("Please fill required fields");
      return;
    }

    try {
      const productData = {
        name: formData.name,
        slug: formData.name.toLowerCase().replace(/[\s_]+/g, '-').replace(/[^\w-]+/g, ''),
        description: formData.description,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock) || 0,
        category_id: formData.category_id,
        recycled_from: formData.recycled_from,
        images: formData.images,
        is_featured: formData.is_featured,
        is_new_arrival: formData.is_new_arrival,
        is_recycled: formData.is_recycled,
        special_feature: formData.special_feature,
      };

      if (editingProduct) {
        const { error } = await supabase
          .from("products")
          .update(productData)
          .eq("id", editingProduct.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("products").insert([productData]);
        if (error) throw error;
      }

      await loadData();
      resetForm();
    } catch (error) {
      console.error("Product save error:", error);
      alert("Failed to save product");
    }
  }

  async function handleDelete(productId: string) {
    if (!confirm("Delete this product?")) return;

    try {
      const { error } = await supabase.from("products").delete().eq("id", productId);
      if (error) throw error;
      await loadData();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete product");
    }
  }

  function resetForm() {
    setFormData({
      name: "",
      description: "",
      price: "",
      stock: "",
      category_id: "",
      recycled_from: "",
      images: [],
      is_featured: false,
      is_new_arrival: false,
      is_recycled: true,
      special_feature: "",
    });
    setEditingProduct(null);
    setShowForm(false);
  }

  function startEdit(product: Product) {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || "",
      price: product.price.toString(),
      stock: product.stock?.toString() || "0",
      category_id: product.category_id || "",
      recycled_from: product.recycled_from || "",
      images: product.images || [],
      is_featured: product.is_featured || false,
      is_new_arrival: product.is_new_arrival || false,
      is_recycled: product.is_recycled ?? true,
      special_feature: product.special_feature || "",
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
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-serif text-4xl font-bold">Product Management</h1>
              <p className="text-muted-foreground">{products.length} products</p>
            </div>
            {!showForm && (
              <Button onClick={() => setShowForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            )}
          </div>

          <AdminTabs />

          {showForm && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>{editingProduct ? "Edit Product" : "New Product"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="name">Product Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="price">Price *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="stock">Stock Quantity</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category_id}
                      onValueChange={(value) => setFormData({ ...formData, category_id: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="recycled">Recycled From</Label>
                    <Input
                      id="recycled"
                      value={formData.recycled_from}
                      onChange={(e) => setFormData({ ...formData, recycled_from: e.target.value })}
                      placeholder="e.g., Ocean plastic, Used wood"
                    />
                  </div>

                  <div>
                    <Label htmlFor="special_feature">Special Feature</Label>
                    <Input
                      id="special_feature"
                      value={formData.special_feature}
                      onChange={(e) => setFormData({ ...formData, special_feature: e.target.value })}
                      placeholder="e.g., Includes seed paper insert"
                    />
                  </div>

                  <div className="col-span-2">
                    <Label>Product Images</Label>
                    <ImageUploader
                      images={formData.images}
                      onImagesChange={(images) => setFormData({ ...formData, images })}
                      productId={editingProduct?.id}
                    />
                  </div>

                  <div className="col-span-2 flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-0.5">
                      <Label htmlFor="is-recycled">Recycled Material Flag</Label>
                      <p className="text-sm text-muted-foreground">
                        Controls whether recycled badges appear on the storefront
                      </p>
                    </div>
                    <Switch
                      id="is-recycled"
                      checked={formData.is_recycled}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_recycled: checked })}
                    />
                  </div>

                  <div className="col-span-2 flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-0.5">
                      <Label htmlFor="featured">Featured Product</Label>
                      <p className="text-sm text-muted-foreground">
                        Display this product in the Featured section on homepage
                      </p>
                    </div>
                    <Switch
                      id="featured"
                      checked={formData.is_featured}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                    />
                  </div>

                  <div className="col-span-2 flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-0.5">
                      <Label htmlFor="new-arrival">New Arrival</Label>
                      <p className="text-sm text-muted-foreground">
                        Display this product in the New Arrivals section on homepage
                      </p>
                    </div>
                    <Switch
                      id="new-arrival"
                      checked={formData.is_new_arrival}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_new_arrival: checked })}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleSubmit}>
                    {editingProduct ? "Update Product" : "Create Product"}
                  </Button>
                  <Button variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id}>
                <CardHeader className="p-0">
                  <div className="aspect-square bg-muted overflow-hidden rounded-t-lg">
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
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
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">Stock: {product.stock}</p>
                  <p className="text-sm text-muted-foreground">
                    Recycled: {product.is_recycled ? "Yes" : "No"}
                  </p>
                  {product.special_feature && (
                    <p className="text-sm text-muted-foreground">
                      Feature: {product.special_feature}
                    </p>
                  )}
                  {product.recycled_from && (
                    <p className="text-sm text-muted-foreground">From: {product.recycled_from}</p>
                  )}
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" onClick={() => startEdit(product)} className="flex-1">
                      <Pencil className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(product.id)}
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