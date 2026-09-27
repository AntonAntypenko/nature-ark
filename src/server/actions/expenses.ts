"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { expenseSchema } from "@/shared/schemas/expense";

/**
 * ARCHITECTURE DECISION: Server Actions for Expenses CRUD
 */

export async function createExpenseAction(formData: FormData) {
  const supabase = await createClient();

  const rawAnimalId = formData.get("animal_id") as string;

  const rawData = {
    title: formData.get("title"),
    amount: Number(formData.get("amount")),
    category: formData.get("category"),
    spent_at: formData.get("spent_at"),
    vendor: formData.get("vendor") || null,
    animal_id: rawAnimalId && rawAnimalId !== "none" ? rawAnimalId : null,
    notes: formData.get("notes") || null,
  };

  const parsed = expenseSchema
    .omit({ id: true, created_at: true, updated_at: true, receipt_url: true })
    .safeParse(rawData);

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const { error } = await supabase.from("expenses").insert(parsed.data);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/dashboard/expenses");
  return { success: true };
}

export async function updateExpenseAction(id: string, formData: FormData) {
  const supabase = await createClient();

  const rawAnimalId = formData.get("animal_id") as string;

  const rawData = {
    title: formData.get("title"),
    amount: Number(formData.get("amount")),
    category: formData.get("category"),
    spent_at: formData.get("spent_at"),
    vendor: formData.get("vendor") || null,
    animal_id: rawAnimalId && rawAnimalId !== "none" ? rawAnimalId : null,
    notes: formData.get("notes") || null,
  };

  const parsed = expenseSchema
    .omit({ id: true, created_at: true, updated_at: true, receipt_url: true })
    .safeParse(rawData);

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const { error } = await supabase
    .from("expenses")
    .update(parsed.data)
    .eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/dashboard/expenses");
  return { success: true };
}

export async function deleteExpenseAction(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("expenses").delete().eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/dashboard/expenses");
  return { success: true };
}
