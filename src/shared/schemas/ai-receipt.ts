import { z } from "zod";
import { expenseCategorySchema } from "./expense";

export const parsedReceiptItemSchema = z.object({
  raw_item_name: z.string().describe("Оригінальна назва товару з чека"),
  quantity: z.number().positive().describe("Кількість, вага або об'єм"),
  unit_price: z.number().nonnegative().describe("Ціна за одну одиницю"),
  total_price: z.number().nonnegative().describe("Загальна сума за цей рядок"),
  category: expenseCategorySchema.describe("Категорія конкретного товару"),
});

export const parsedReceiptSchema = z.object({
  vendor: z.string().describe("Назва магазину, компанії або постачальника"),
  invoice_number: z
    .string()
    .optional()
    .describe("Номер чека або накладної, якщо є"),
  spent_at: z.string().describe("Дата покупки у форматі YYYY-MM-DD"),
  total_amount: z
    .number()
    .nonnegative()
    .describe("Загальна підсумкова сума всього чека"),
  category: expenseCategorySchema.describe(
    "Головна категорія всього документа"
  ),
  items: z
    .array(parsedReceiptItemSchema)
    .min(1)
    .describe("Список куплених товарів"),
});

export type ParsedReceipt = z.infer<typeof parsedReceiptSchema>;
