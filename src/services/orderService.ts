import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type OrderInsert = Database["public"]["Tables"]["orders"]["Insert"];
type OrderItemInsert = Database["public"]["Tables"]["order_items"]["Insert"];

export const orderService = {
  async createOrder(
    userId: string,
    addressId: string,
    items: { product_id: string; product_name: string; product_price: number; quantity: number }[],
    total: number
  ) {
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: userId,
        shipping_address_id: addressId,
        billing_address_id: addressId,
        total_amount: total,
        status: "pending",
      })
      .select()
      .single();

    if (orderError || !order) {
      console.error("Order creation error:", orderError);
      throw new Error("Failed to create order");
    }

    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      product_name: item.product_name,
      product_price: item.product_price,
      quantity: item.quantity,
      subtotal: item.product_price * item.quantity,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      console.error("Order items error:", itemsError);
      await supabase.from("orders").delete().eq("id", order.id);
      throw new Error("Failed to create order items");
    }

    return order;
  },

  async updateOrderStatus(orderId: string, status: string) {
    const { data, error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", orderId)
      .select()
      .single();

    if (error) {
      console.error("Update order status error:", error);
      throw error;
    }

    return data;
  },

  async getUserOrders(userId: string) {
    const { data, error } = await supabase
      .from("orders")
      .select(
        `
        *,
        shipping_address:addresses!orders_shipping_address_id_fkey(
          full_name,
          phone,
          street_address,
          city,
          state,
          postal_code,
          country
        ),
        order_items(
          quantity,
          product_price,
          product_name,
          products(images)
        )
      `
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Get orders error:", error);
      return [];
    }

    return data || [];
  },

  async getOrderById(orderId: string) {
    const { data, error } = await supabase
      .from("orders")
      .select(
        `
        *,
        shipping_address:addresses!orders_shipping_address_id_fkey(
          full_name,
          phone,
          street_address,
          city,
          state,
          postal_code,
          country
        ),
        order_items(
          quantity,
          product_price,
          product_name,
          products(description, images)
        )
      `
      )
      .eq("id", orderId)
      .single();

    if (error) {
      console.error("Get order error:", error);
      throw error;
    }

    return data;
  },
};