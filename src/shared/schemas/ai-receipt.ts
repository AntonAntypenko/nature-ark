import { z } from "zod";
import { expenseCategorySchema } from "./expense";

export const parsedReceiptItemSchema = z.object({
  raw_item_name: z.string().describe("Original item name from the receipt"),
  quantity: z.number().positive().describe("Quantity, weight, or volume"),
  unit_price: z.number().nonnegative().describe("Price per single unit"),
  total_price: z.number().nonnegative().describe("Total amount for this row"),
  category: expenseCategorySchema.describe("Category of the specific item"),
  inventory_item_id: z
    .string()
    .nullable()
    .describe(
      "ID of the corresponding item from the passed inventory catalog. If there is no confident match, return null."
    ),
});

export const parsedReceiptSchema = z.object({
  vendor: z.string().describe("Name of the store, company, or supplier"),
  invoice_number: z
    .string()
    .optional()
    .describe("Receipt or invoice number, if available"),
  spent_at: z.string().describe("Purchase date in YYYY-MM-DD format"),
  total_amount: z
    .number()
    .nonnegative()
    .describe("Total overall amount of the entire receipt"),
  category: expenseCategorySchema.describe(
    "Main category of the entire document"
  ),
  items: z
    .array(parsedReceiptItemSchema)
    .min(1)
    .describe("List of purchased items"),
});

export type ParsedReceipt = z.infer<typeof parsedReceiptSchema>;
