import { createClient } from "@/lib/supabase/server";
import { DietNorm } from "@/shared/schemas/diet";

export async function getDiets(): Promise<DietNorm[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("diet_norms")
    .select("*, animals(name, species), inventory_items(name, unit)")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data as DietNorm[];
}
