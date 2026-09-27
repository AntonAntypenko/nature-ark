"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { animalSchema } from "@/shared/schemas/animal";

/**
 * ARCHITECTURE DECISION: Server Actions for Animal Entity Mutations
 * Validates payloads with Zod and enforces RLS context via Supabase server client.
 */

export async function createAnimalAction(formData: FormData) {
  const supabase = await createClient();

  // 1. Формуємо об'єкт для валідації
  const rawData = {
    name: formData.get("name"),
    species: formData.get("species"),
    inventory_number: formData.get("inventory_number"),
    enclosure_zone: formData.get("enclosure_zone"),
    status: formData.get("status"),
    diet_type: formData.get("diet_type"),
    weight_kg: Number(formData.get("weight_kg")),
    daily_food_norm_kg: Number(formData.get("daily_food_norm_kg")),
    estimated_daily_cost: Number(formData.get("estimated_daily_cost")),
    is_winter_heating_required:
      formData.get("is_winter_heating_required") === "on",
  };

  const parsed = animalSchema
    .omit({ id: true, created_at: true, updated_at: true })
    .safeParse(rawData);

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const { error } = await supabase.from("animals").insert(parsed.data);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/dashboard/animals");
  return { success: true };
}

export async function updateAnimalAction(id: string, formData: FormData) {
  const supabase = await createClient();

  const rawData = {
    name: formData.get("name"),
    species: formData.get("species"),
    inventory_number: formData.get("inventory_number"),
    enclosure_zone: formData.get("enclosure_zone"),
    status: formData.get("status"),
    diet_type: formData.get("diet_type"),
    weight_kg: Number(formData.get("weight_kg")),
    daily_food_norm_kg: Number(formData.get("daily_food_norm_kg")),
    estimated_daily_cost: Number(formData.get("estimated_daily_cost")),
    is_winter_heating_required:
      formData.get("is_winter_heating_required") === "on",
  };

  const parsed = animalSchema
    .omit({ id: true, created_at: true, updated_at: true })
    .safeParse(rawData);

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const { error } = await supabase
    .from("animals")
    .update(parsed.data)
    .eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/dashboard/animals");
  return { success: true };
}

export async function deleteAnimalAction(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("animals").delete().eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/dashboard/animals");
  return { success: true };
}
