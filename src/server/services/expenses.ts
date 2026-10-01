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

export async function getExpenseById(id: string): Promise<Expense | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("expenses")
    .select("*, expense_items(*)")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw new Error(error.message);
  }

  return data as Expense;
}
