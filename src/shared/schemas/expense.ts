import { z } from "zod";

export const expenseStatusSchema = z.enum(["draft", "ai_parsed", "verified"]);
export const expenseCategorySchema = z.enum([
  "feed",
  "veterinary",
  "utilities",
  "logistics",
  "maintenance",
]);

const optionalUuid = z
  .string()
  .uuid()
  .nullable()
  .optional()
  .or(z.literal(""))
  .transform(val => (val === "" ? null : val));

export const expenseItemSchema = z.object({
  id: z.string().uuid().optional(),
  inventory_item_id: optionalUuid,
  animal_id: optionalUuid,
  enclosure_id: optionalUuid,
  raw_item_name: z.string().min(1),
  quantity: z.coerce.number().positive(),
  unit_price: z.coerce.number().nonnegative(),
  total_price: z.coerce.number().nonnegative(),
  category: expenseCategorySchema,
});

export const expenseFormSchema = z.object({
  invoice_number: z.string().nullable().optional(),
  vendor: z.string().min(1),
  total_amount: z.coerce.number().nonnegative(),
  category: expenseCategorySchema,
  spent_at: z.string().min(1),
  status: expenseStatusSchema,
  receipt_url: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  items: z.array(expenseItemSchema).min(1),
});

export type ExpenseItemFormValues = z.infer<typeof expenseItemSchema>;
export type ExpenseFormValues = z.infer<typeof expenseFormSchema>;

export type ExpenseItem = ExpenseItemFormValues & {
  id: string;
  expense_id: string;
  created_at: string;
  updated_at: string;
};

export type Expense = Omit<ExpenseFormValues, "items"> & {
  id: string;
  created_at: string;
  updated_at: string;
  expense_items?: ExpenseItem[];
};
