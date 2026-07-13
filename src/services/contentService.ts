import { supabase } from "@/integrations/supabase/client";

export interface SiteContent {
  id: string;
  content_key: string;
  content_value: string;
  updated_at: string;
  updated_by: string | null;
}

export const contentService = {
  async getContent(
    contentKey: string,
    defaultValue: string = ""
  ): Promise<{ content_key: string; content_value: string }> {
    try {
      const { data, error } = await supabase
        .from("site_content")
        .select("content_key, content_value")
        .eq("content_key", contentKey)
        .maybeSingle();

      if (error) throw error;

      return {
        content_key: contentKey,
        content_value: data?.content_value ?? defaultValue,
      };
    } catch (error) {
      console.error(`Error fetching content for ${contentKey}:`, error);
      return {
        content_key: contentKey,
        content_value: defaultValue,
      };
    }
  },

  async getAllContent(): Promise<SiteContent[]> {
    try {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .order("content_key");

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error fetching all content:", error);
      return [];
    }
  },

  async updateContent(
    contentKey: string,
    contentValue: string
  ): Promise<boolean> {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { error } = await supabase
        .from("site_content")
        .update({
          content_value: contentValue,
          updated_at: new Date().toISOString(),
          updated_by: user?.id || null,
        })
        .eq("content_key", contentKey);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error(`Error updating content for ${contentKey}:`, error);
      throw error;
    }
  },
};