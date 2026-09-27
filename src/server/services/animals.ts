// server/services/animals.ts
import { createClient } from "@/lib/supabase/server";
import { Animal } from "@/shared/schemas";

/**
 * ARCHITECTURE DECISION: Data Access Layer (DAL) Query for Animals
 *
 * @description
 * Fetches all animal records sorted by creation date.
 * Executes on the server using scoped session cookies to satisfy RLS policies.
 *
 * @returns {Promise<Animal[]>} List of animals.
 */
export async function getAnimals(): Promise<Animal[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("animals")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Database error in getAnimals:", error.message);
    throw new Error("Failed to retrieve animals catalog.");
  }

  return (data as Animal[]) ?? [];
}

/**
 * ARCHITECTURE DECISION: DAL Query for single Animal
 *
 * @param {string} id - The UUID of the animal.
 * @returns {Promise<Animal | null>} Animal record or null if not found.
 */
export async function getAnimalById(id: string): Promise<Animal | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("animals")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null; // Record not found
    }
    console.error(`Database error in getAnimalById (${id}):`, error.message);
    throw new Error("Failed to retrieve animal details.");
  }

  return data as Animal;
}
