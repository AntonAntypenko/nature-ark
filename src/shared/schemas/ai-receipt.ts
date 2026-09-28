import { z } from "zod";
import { expenseCategorySchema } from "./expense";

export const parsedReceiptSchema = z.object({
  title: z
    .string()
    .describe(
      "Коротка назва покупки або послуги, наприклад: Закупівля яловичини"
    ),
  amount: z.number().positive().describe("Загальна сума з чека у гривнях"),
  category: expenseCategorySchema.describe(
    "Категорія витрати: feed, veterinary, utilities, logistics або maintenance"
  ),
  spent_at: z
    .string()
    .describe(
      "Дата операції у форматі YYYY-MM-DD. Якщо не знайдено, поточна дата"
    ),
  vendor: z
    .string()
    .nullable()
    .describe("Назва постачальника чи магазину, якщо вказано"),
  suggested_animal_species: z
    .string()
    .nullable()
    .describe(
      "Якщо товар призначений для конкретного виду тварин (наприклад, 'лев', 'пінгвін'), вкажи вид. Інакше null"
    ),
  notes: z
    .string()
    .nullable()
    .describe("Короткі деталі (вага, кількість одиниць товару тощо)"),
});

export type ParsedReceipt = z.infer<typeof parsedReceiptSchema>;
