import { createClient } from "@/lib/supabase/server";
import { Expense } from "@/shared/schemas/expense";

export async function getExpenses(): Promise<Expense[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("expenses")
    .select("*")
    .order("spent_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data as Expense[];
}
