import { createClient } from "@/lib/supabase/server";
import { Expense } from "@/shared/schemas";

export interface ExpenseWithAnimal extends Expense {
  animals?: {
    name: string;
    species: string;
  } | null;
}

/**
 * ARCHITECTURE DECISION: Data Access Layer (DAL) Query for Expenses
 * Fetches expenses sorted by transaction date with relational animal data.
 */
export async function getExpenses(): Promise<ExpenseWithAnimal[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("expenses")
    .select("*, animals(name, species)")
    .order("spent_at", { ascending: false });

  if (error) {
    console.error("Database error in getExpenses:", error.message);
    throw new Error("Failed to retrieve expense transactions.");
  }

  return (data as ExpenseWithAnimal[]) ?? [];
}
