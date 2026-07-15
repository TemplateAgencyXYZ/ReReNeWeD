import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const keySecret = process.env.RAZORPAY_KEY_SECRET;

function getSupabase(token: string | undefined) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("Supabase not configured");
  }

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    global: {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    },
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.substring(7)
    : undefined;

  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
  }

  if (!keySecret) {
    return res.status(503).json({ error: "Razorpay secret not configured" });
  }

  try {
    const supabase = getSupabase(token);

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return res.status(401).json({ error: "Invalid session" });
    }

    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      order_id,
    } = req.body;

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature || !order_id) {
      return res.status(400).json({ error: "Missing payment verification data" });
    }

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("id, user_id, status, razorpay_order_id")
      .eq("id", order_id)
      .single();

    if (orderError || !order) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (order.user_id !== user.id) {
      return res.status(403).json({ error: "Order does not belong to user" });
    }

    if (order.status !== "pending") {
      return res.status(400).json({ error: "Order already processed" });
    }

    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      await supabase
        .from("orders")
        .update({
          status: "payment_failed",
          updated_at: new Date().toISOString(),
        })
        .eq("id", order_id);

      return res.status(400).json({ error: "Invalid payment signature" });
    }

    const { error: updateError } = await supabase
      .from("orders")
      .update({
        status: "processing",
        razorpay_payment_id,
        razorpay_signature,
        updated_at: new Date().toISOString(),
      })
      .eq("id", order_id);

    if (updateError) {
      console.error("Order verification update error:", updateError);
      return res.status(500).json({ error: "Failed to update order" });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Razorpay verify error:", error);
    return res.status(500).json({
      error:
        error instanceof Error ? error.message : "Internal server error",
    });
  }
}