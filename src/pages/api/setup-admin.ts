import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

// Server-side Supabase client with service role key
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const adminEmail = "admin@admin.com";
    const adminPassword = "admin123";

    // Check if admin already exists
    const { data: existingProfile } = await supabaseAdmin
      .from("profiles")
      .select("id, is_admin")
      .eq("email", adminEmail)
      .single();

    if (existingProfile) {
      if (existingProfile.is_admin) {
        return res.status(200).json({
          message: "Admin account already exists",
          email: adminEmail,
        });
      } else {
        // Upgrade existing user to admin
        await supabaseAdmin
          .from("profiles")
          .update({ is_admin: true })
          .eq("id", existingProfile.id);

        return res.status(200).json({
          message: "Existing account upgraded to admin",
          email: adminEmail,
        });
      }
    }

    // Create new admin user
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
    });

    if (authError) {
      console.error("Auth error:", authError);
      return res.status(500).json({ error: authError.message });
    }

    // Create profile with admin privileges
    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .insert({
        id: authData.user.id,
        email: adminEmail,
        full_name: "Admin User",
        is_admin: true,
      });

    if (profileError) {
      console.error("Profile error:", profileError);
      return res.status(500).json({ error: profileError.message });
    }

    return res.status(200).json({
      message: "Admin account created successfully",
      email: adminEmail,
      password: adminPassword,
    });
  } catch (error: any) {
    console.error("Setup admin error:", error);
    return res.status(500).json({ error: error.message || "Unknown error" });
  }
}