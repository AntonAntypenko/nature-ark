import { z } from "zod";

export const expenseCategorySchema = z.enum([
  "feed",
  "veterinary",
  "utilities",
  "logistics",
  "maintenance",
]);

export const expenseSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string(),
  updated_at: z.string(),
  title: z.string().min(1, "Title is required"),
  amount: z.number().positive("Amount must be greater than 0"),
  category: expenseCategorySchema,
  spent_at: z.string().min(1, "Date is required"),
  animal_id: z.string().uuid().nullable().optional(),
  vendor: z.string().nullable().optional(),
  receipt_url: z.string().url().nullable().optional(),
  notes: z.string().nullable().optional(),
});

export type Expense = z.infer<typeof expenseSchema>;
export type ExpenseCategory = z.infer<typeof expenseCategorySchema>;
