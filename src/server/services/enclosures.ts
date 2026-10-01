import { createClient } from "@/lib/supabase/server";
import { Enclosure } from "@/shared/schemas/enclosure";

export async function getEnclosures(): Promise<Enclosure[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("enclosures")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data as Enclosure[];
}
