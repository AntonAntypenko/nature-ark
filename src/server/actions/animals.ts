"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { animalFormSchema, AnimalFormValues } from "@/shared/schemas/animal";

export async function createAnimalAction(data: AnimalFormValues) {
  const supabase = await createClient();
  const parsed = animalFormSchema.parse(data);

  const { error } = await supabase.from("animals").insert(parsed);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard/animals");
}

export async function updateAnimalAction(id: string, data: AnimalFormValues) {
  const supabase = await createClient();
  const parsed = animalFormSchema.parse(data);

  const { error } = await supabase.from("animals").update(parsed).eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard/animals");
}

export async function deleteAnimalAction(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("animals").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard/animals");
}
