import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import Razorpay from "razorpay";

interface ExtendedNextApiRequest extends NextApiRequest {
  rawBody?: Buffer;
}

const keyId = process.env.RAZORPAY_KEY_ID;
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
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.substring(7)
    : undefined;

  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
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

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", user.id)
      .maybeSingle();

    if (profileError || !profile?.is_admin) {
      return res.status(403).json({ error: "Admin access required" });
    }

    if (req.method === "POST") {
      return handleCreateOrder(req, res, supabase);
    }

    if (req.method === "PATCH") {
      return handlePaymentFailed(req, res, supabase);
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Razorpay order handler error:", error);
    return res.status(500).json({
      error:
        error instanceof Error ? error.message : "Internal server error",
    });
  }
}

async function handleCreateOrder(
  req: NextApiRequest,
  res: NextApiResponse,
  supabase: ReturnType<typeof getSupabase>
) {
  if (!keyId || !keySecret) {
    return res
      .status(503)
      .json({ error: "Razorpay keys are not configured yet." });
  }

  const { localOrderId } = req.body;

  if (!localOrderId) {
    return res.status(400).json({ error: "Order ID is required" });
  }

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select("id, total_amount, status, user_id, profiles(email, full_name, phone)")
    .eq("id", localOrderId)
    .single();

  if (orderError || !order) {
    console.error("Order lookup error:", orderError);
    return res.status(404).json({ error: "Order not found" });
  }

  if (order.user_id !== user.id) {
    return res.status(403).json({ error: "Order does not belong to user" });
  }

  if (order.status !== "pending") {
    return res.status(400).json({ error: "Order is not in a payable state" });
  }

  const razorpay = new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });

  try {
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(Number(order.total_amount) * 100),
      currency: "INR",
      receipt: order.id.slice(0, 40),
      notes: {
        local_order_id: order.id,
      },
    });

    const { error: updateError } = await supabase
      .from("orders")
      .update({
        razorpay_order_id: razorpayOrder.id,
        updated_at: new Date().toISOString(),
      })
      .eq("id", order.id);

    if (updateError) {
      console.error("Error saving Razorpay order id:", updateError);
      throw updateError;
    }

    return res.status(200).json({
      keyId,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      name: "ReReNeWeD",
      description: "Sustainable recycled stationery",
      image: "/Human_Value_AI_6_9s_Clip.png",
    });
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    return res.status(500).json({
      error:
        error instanceof Error
          ? error.message
          : "Failed to initialize payment.",
    });
  }
}

async function handlePaymentFailed(
  req: NextApiRequest,
  res: NextApiResponse,
  supabase: ReturnType<typeof getSupabase>
) {
  const { localOrderId } = req.body;

  if (!localOrderId) {
    return res.status(400).json({ error: "Order ID is required" });
  }

  const { error: updateError } = await supabase
    .from("orders")
    .update({
      status: "payment_failed",
      updated_at: new Date().toISOString(),
    })
    .eq("id", localOrderId);

  if (updateError) {
    console.error("Error marking payment failed:", updateError);
    return res.status(500).json({ error: "Failed to update order status" });
  }

  return res.status(200).json({ success: true });
}