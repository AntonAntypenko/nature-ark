"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import {
  inventoryFormSchema,
  InventoryFormValues,
} from "@/shared/schemas/inventory";

export async function createInventoryAction(data: InventoryFormValues) {
  const supabase = await createClient();
  const parsed = inventoryFormSchema.parse(data);

  const { error } = await supabase.from("inventory_items").insert(parsed);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard/inventory");
}

export async function updateInventoryAction(
  id: string,
  data: InventoryFormValues
) {
  const supabase = await createClient();
  const parsed = inventoryFormSchema.parse(data);

  const { error } = await supabase
    .from("inventory_items")
    .update(parsed)
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard/inventory");
}

export async function deleteInventoryAction(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("inventory_items")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard/inventory");
}
