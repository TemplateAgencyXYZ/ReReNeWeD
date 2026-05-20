import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type CartItem = Database["public"]["Tables"]["cart_items"]["Row"];
type CartItemInsert = Database["public"]["Tables"]["cart_items"]["Insert"];

export const cartService = {
  async getCartItems(userId: string) {
    const { data, error } = await supabase
      .from("cart_items")
      .select(`
        *,
        products (*)
      `)
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching cart:", error);
      throw error;
    }

    return data || [];
  },

  async addToCart(userId: string, productId: string, quantity: number = 1) {
    // Check if item already exists
    const { data: existing } = await supabase
      .from("cart_items")
      .select("*")
      .eq("user_id", userId)
      .eq("product_id", productId)
      .single();

    if (existing) {
      // Update quantity
      const { data, error } = await supabase
        .from("cart_items")
        .update({ quantity: existing.quantity + quantity })
        .eq("id", existing.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } else {
      // Insert new item
      const { data, error } = await supabase
        .from("cart_items")
        .insert({ user_id: userId, product_id: productId, quantity })
        .select()
        .single();

      if (error) throw error;
      return data;
    }
  },

  async updateQuantity(cartItemId: string, quantity: number) {
    if (quantity <= 0) {
      return this.removeFromCart(cartItemId);
    }

    const { data, error } = await supabase
      .from("cart_items")
      .update({ quantity })
      .eq("id", cartItemId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async removeFromCart(cartItemId: string) {
    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("id", cartItemId);

    if (error) throw error;
  },

  async clearCart(userId: string) {
    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("user_id", userId);

    if (error) throw error;
  },

  async getCartTotal(userId: string) {
    const items = await this.getCartItems(userId);
    return items.reduce((total, item) => {
      const price = item.products?.price || 0;
      return total + (price * item.quantity);
    }, 0);
  },

  calculateTotal(items: any[]) {
    return items.reduce((total, item) => {
      const price = item.products?.price || 0;
      return total + (price * item.quantity);
    }, 0);
  },
};