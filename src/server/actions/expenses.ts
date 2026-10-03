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

export async function stockExpenseAction(
  expenseId: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  const { data: expense, error: fetchError } = await supabase
    .from("expenses")
    .select("status, expense_items(*)")
    .eq("id", expenseId)
    .single();

  if (fetchError || !expense)
    return { success: false, error: "Invoice not found." };
  if (expense.status === "stocked")
    return { success: false, error: "Already stocked to inventory." };
  if (expense.status !== "verified")
    return { success: false, error: "Invoice must be in 'Verified' status." };

  const physicalCategories = ["feed", "veterinary", "maintenance"];
  const invalidItems = expense.expense_items.filter(
    (item: any) =>
      physicalCategories.includes(item.category) && !item.inventory_item_id
  );

  if (invalidItems.length > 0) {
    return {
      success: false,
      error:
        "Not all physical items are linked to inventory. Please select an inventory item for all physical goods and save changes before stocking.",
    };
  }

  for (const item of expense.expense_items) {
    if (item.inventory_item_id) {
      const { data: invItem } = await supabase
        .from("inventory_items")
        .select("current_stock")
        .eq("id", item.inventory_item_id)
        .single();

      if (invItem) {
        const newStock = Number(invItem.current_stock) + Number(item.quantity);
        await supabase
          .from("inventory_items")
          .update({ current_stock: newStock })
          .eq("id", item.inventory_item_id);
      }
    }
  }

  await supabase
    .from("expenses")
    .update({ status: "stocked" })
    .eq("id", expenseId);

  revalidatePath("/dashboard/expenses");
  revalidatePath(`/dashboard/expenses/${expenseId}`);
  revalidatePath("/dashboard/inventory");

  return { success: true };
}
