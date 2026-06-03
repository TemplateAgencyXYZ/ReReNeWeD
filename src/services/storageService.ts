import { supabase } from "@/integrations/supabase/client";

export interface UploadImageResult {
  url: string;
  path: string;
}

export const storageService = {
  /**
   * Upload an image to the product-images bucket
   * @param file - The image file to upload
   * @param productId - Optional product ID to organize files
   * @returns Promise with the public URL and storage path
   */
  uploadProductImage: async (
    file: File,
    productId?: string
  ): Promise<UploadImageResult> => {
    try {
      // Generate unique filename
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(7);
      const fileExt = file.name.split(".").pop();
      const fileName = productId
        ? `${productId}/${timestamp}-${randomString}.${fileExt}`
        : `${timestamp}-${randomString}.${fileExt}`;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from("product-images")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        console.error("Upload error:", error);
        throw new Error(`Failed to upload image: ${error.message}`);
      }

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("product-images").getPublicUrl(data.path);

      return {
        url: publicUrl,
        path: data.path,
      };
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  },

  /**
   * Delete an image from storage
   * @param path - Storage path of the image to delete
   */
  deleteProductImage: async (path: string): Promise<boolean> => {
    try {
      const { error } = await supabase.storage
        .from("product-images")
        .remove([path]);

      if (error) {
        console.error("Delete error:", error);
        throw new Error(`Failed to delete image: ${error.message}`);
      }

      return true;
    } catch (error) {
      console.error("Error deleting image:", error);
      throw error;
    }
  },

  /**
   * Extract storage path from public URL
   * @param url - Full public URL
   * @returns Storage path
   */
  getPathFromUrl: (url: string): string => {
    const match = url.match(/product-images\/(.+)$/);
    return match ? match[1] : "";
  },

  /**
   * Validate image file
   * @param file - File to validate
   * @returns True if valid, throws error if invalid
   */
  validateImageFile: (file: File): boolean => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      throw new Error(
        "Invalid file type. Only JPEG, PNG, and WebP images are allowed."
      );
    }

    if (file.size > maxSize) {
      throw new Error("File size exceeds 5MB limit.");
    }

    return true;
  },
};