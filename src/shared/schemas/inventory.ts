import { z } from "zod";

export const inventoryCategorySchema = z.enum([
  "feed",
  "veterinary",
  "utilities",
  "logistics",
  "maintenance",
]);

export const inventoryUnitSchema = z.enum([
  "kg",
  "liter",
  "dose",
  "piece",
  "kwh",
]);

export const inventoryFormSchema = z.object({
  name: z.string().min(1),
  category: inventoryCategorySchema,
  unit: inventoryUnitSchema,
  target_stock: z.coerce.number().nonnegative(),
  current_stock: z.coerce.number().nonnegative(),
});

export type InventoryFormValues = z.infer<typeof inventoryFormSchema>;

export type InventoryItem = InventoryFormValues & {
  id: string;
  created_at: string;
  updated_at: string;
};
