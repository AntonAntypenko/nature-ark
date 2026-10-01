"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { expenseFormSchema, ExpenseFormValues } from "@/shared/schemas/expense";

export async function createExpenseAction(data: ExpenseFormValues) {
  const supabase = await createClient();
  const parsed = expenseFormSchema.parse(data);

  const { items, ...expenseData } = parsed;

  const { data: insertedExpense, error: expenseError } = await supabase
    .from("expenses")
    .insert(expenseData)
    .select("id")
    .single();

  if (expenseError || !insertedExpense) {
    throw new Error(expenseError?.message || "Failed to create expense");
  }

  const itemsToInsert = items.map(item => ({
    ...item,
    expense_id: insertedExpense.id,
  }));

  const { error: itemsError } = await supabase
    .from("expense_items")
    .insert(itemsToInsert);

  if (itemsError) {
    throw new Error(itemsError.message);
  }

  revalidatePath("/dashboard/expenses");
}

export async function deleteExpenseAction(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("expenses").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard/expenses");
}
