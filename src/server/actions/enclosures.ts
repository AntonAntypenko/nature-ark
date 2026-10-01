"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import {
  enclosureSchema,
  EnclosureFormValues,
} from "@/shared/schemas/enclosure";

export async function createEnclosureAction(data: EnclosureFormValues) {
  const supabase = await createClient();
  const parsed = enclosureSchema.parse(data);

  const { error } = await supabase.from("enclosures").insert({
    name: parsed.name,
    type: parsed.type,
    has_heating_system: parsed.has_heating_system,
    notes: parsed.notes || null,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard/enclosures");
}

export async function deleteEnclosureAction(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("enclosures").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard/enclosures");
}
