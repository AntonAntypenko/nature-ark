"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { dietFormSchema, DietFormValues } from "@/shared/schemas/diet";

export async function createDietAction(data: DietFormValues) {
  const supabase = await createClient();
  const parsed = dietFormSchema.parse(data);

  const { error } = await supabase.from("diet_norms").insert(parsed);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard/diets");
}

export async function updateDietAction(id: string, data: DietFormValues) {
  const supabase = await createClient();
  const parsed = dietFormSchema.parse(data);

  const { error } = await supabase
    .from("diet_norms")
    .update(parsed)
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard/diets");
}

export async function deleteDietAction(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("diet_norms").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard/diets");
}
