import { supabase } from "@/integrations/supabase/client";

export interface SiteContent {
  id: string;
  content_key: string;
  content_value: string;
  updated_at: string | null;
  updated_by: string | null;
}

export const contentService = {
  async getAll(): Promise<SiteContent[]> {
    const { data, error } = await supabase
      .from("site_content")
      .select("*")
      .order("content_key");

    if (error) {
      console.error("Error loading site content:", error);
      throw error;
    }

    return data ?? [];
  },

  async get(key: string): Promise<SiteContent | null> {
    const { data, error } = await supabase
      .from("site_content")
      .select("*")
      .eq("content_key", key)
      .maybeSingle();

    if (error) {
      console.error(`Error loading content for ${key}:`, error);
      throw error;
    }

    return data;
  },

  async update(key: string, value: string): Promise<SiteContent> {
    const session = await supabase.auth.getSession();
    const userId = session.data.session?.user?.id ?? null;

    const { data: existing } = await supabase
      .from("site_content")
      .select("id")
      .eq("content_key", key)
      .maybeSingle();

    let result;
    if (existing) {
      const { data, error } = await supabase
        .from("site_content")
        .update({
          content_value: value,
          updated_at: new Date().toISOString(),
          updated_by: userId,
        })
        .eq("id", existing.id)
        .select()
        .single();

      result = { data, error };
    } else {
      const { data, error } = await supabase
        .from("site_content")
        .insert({
          content_key: key,
          content_value: value,
          updated_by: userId,
        })
        .select()
        .single();

      result = { data, error };
    }

    if (result.error) {
      console.error(`Error updating content for ${key}:`, result.error);
      throw result.error;
    }

    return result.data as SiteContent;
  },
};