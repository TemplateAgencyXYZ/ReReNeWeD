import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type AddressInsert = Database["public"]["Tables"]["addresses"]["Insert"];

export const addressService = {
  async getUserAddresses(userId: string) {
    const { data, error } = await supabase
      .from("addresses")
      .select("*")
      .eq("user_id", userId)
      .order("is_default", { ascending: false });

    if (error) {
      console.error("Get addresses error:", error);
      return [];
    }

    return data || [];
  },

  async createAddress(address: AddressInsert) {
    const { data, error } = await supabase
      .from("addresses")
      .insert(address)
      .select()
      .single();

    if (error) {
      console.error("Create address error:", error);
      throw error;
    }

    return data;
  },

  async updateAddress(addressId: string, updates: Partial<AddressInsert>) {
    const { data, error } = await supabase
      .from("addresses")
      .update(updates)
      .eq("id", addressId)
      .select()
      .single();

    if (error) {
      console.error("Update address error:", error);
      throw error;
    }

    return data;
  },

  async deleteAddress(addressId: string) {
    const { error } = await supabase
      .from("addresses")
      .delete()
      .eq("id", addressId);

    if (error) {
      console.error("Delete address error:", error);
      throw error;
    }
  },

  async setDefaultAddress(userId: string, addressId: string) {
    await supabase
      .from("addresses")
      .update({ is_default: false })
      .eq("user_id", userId);

    const { data, error } = await supabase
      .from("addresses")
      .update({ is_default: true })
      .eq("id", addressId)
      .select()
      .single();

    if (error) {
      console.error("Set default address error:", error);
      throw error;
    }

    return data;
  },
};