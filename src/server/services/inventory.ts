import { createClient } from "@/lib/supabase/server";
import { InventoryItem } from "@/shared/schemas/inventory";

export async function getInventoryItems(): Promise<InventoryItem[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("inventory_items")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data as InventoryItem[];
}
