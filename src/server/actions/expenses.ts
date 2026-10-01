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

export async function updateExpenseAction(id: string, data: ExpenseFormValues) {
  const supabase = await createClient();
  const parsed = expenseFormSchema.parse(data);

  const { items, ...expenseData } = parsed;

  const { error: expenseError } = await supabase
    .from("expenses")
    .update(expenseData)
    .eq("id", id);

  if (expenseError) {
    throw new Error(expenseError.message);
  }

  const { data: existingItems } = await supabase
    .from("expense_items")
    .select("id")
    .eq("expense_id", id);

  const existingItemIds = existingItems?.map(i => i.id) || [];
  const payloadItemIds = items.map(i => i.id).filter(Boolean) as string[];
  const itemsToDelete = existingItemIds.filter(
    itemId => !payloadItemIds.includes(itemId)
  );

  if (itemsToDelete.length > 0) {
    await supabase.from("expense_items").delete().in("id", itemsToDelete);
  }

  const itemsToUpsert = items.map(item => {
    const { id: itemId, ...rest } = item;
    return itemId
      ? { id: itemId, expense_id: id, ...rest }
      : { expense_id: id, ...rest };
  });

  const { error: itemsError } = await supabase
    .from("expense_items")
    .upsert(itemsToUpsert);

  if (itemsError) {
    throw new Error(itemsError.message);
  }

  revalidatePath("/dashboard/expenses");
  revalidatePath(`/dashboard/expenses/${id}`);
}
