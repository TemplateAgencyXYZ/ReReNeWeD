import { supabase } from "@/integrations/supabase/client";

export interface SiteContent {
  id: string;
  page_key: string;
  title: string;
  content_data: any;
  updated_at: string;
}

export const contentService = {
  async getContent(pageKey: string): Promise<SiteContent | null> {
    try {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .eq("page_key", pageKey)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error(`Error fetching content for ${pageKey}:`, error);
      return null;
    }
  },

  async getAllContent(): Promise<SiteContent[]> {
    try {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .order("page_key");

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error fetching all content:", error);
      return [];
    }
  },

  async updateContent(
    pageKey: string,
    contentData: Record<string, any>
  ): Promise<boolean> {
    try {
      const { error } = await supabase
        .from("site_content")
        .update({
          content_data: contentData,
          updated_at: new Date().toISOString(),
        })
        .eq("page_key", pageKey);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error(`Error updating content for ${pageKey}:`, error);
      throw error;
    }
  },
};