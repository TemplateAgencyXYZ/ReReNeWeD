import { supabase } from "@/integrations/supabase/client";

export interface SiteContent {
  id: string;
  page_key: string;
  page_title: string;
  content: Record<string, any>;
  updated_at: string;
  updated_by: string | null;
}

export const contentService = {
  async getPageContent(pageKey: string): Promise<SiteContent | null> {
    const { data, error } = await supabase
      .from("site_content")
      .select("*")
      .eq("page_key", pageKey)
      .single();

    if (error) {
      console.error(`Error fetching content for ${pageKey}:`, error);
      return null;
    }

    return data;
  },

  async getAllContent(): Promise<SiteContent[]> {
    const { data, error } = await supabase
      .from("site_content")
      .select("*")
      .order("page_key");

    if (error) {
      console.error("Error fetching all content:", error);
      return [];
    }

    return data || [];
  },

  async updatePageContent(
    pageKey: string,
    content: Record<string, any>
  ): Promise<boolean> {
    const session = await supabase.auth.getSession();
    if (!session.data.session) {
      throw new Error("Not authenticated");
    }

    const { error } = await supabase
      .from("site_content")
      .update({
        content,
        updated_at: new Date().toISOString(),
        updated_by: session.data.session.user.id,
      })
      .eq("page_key", pageKey);

    if (error) {
      console.error(`Error updating content for ${pageKey}:`, error);
      throw error;
    }

    return true;
  },
};