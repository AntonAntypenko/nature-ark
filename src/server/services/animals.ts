import { createClient } from "@/lib/supabase/server";
import { Animal } from "@/shared/schemas/animal";

export async function getAnimals(): Promise<Animal[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("animals")
    .select("*, enclosures(name)")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data as Animal[];
}
