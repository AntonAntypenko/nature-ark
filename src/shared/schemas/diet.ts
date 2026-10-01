import { z } from "zod";

export const dietFormSchema = z.object({
  animal_id: z.string().uuid(),
  inventory_item_id: z.string().uuid(),
  daily_norm_quantity: z.coerce.number().positive(),
});

export type DietFormValues = z.infer<typeof dietFormSchema>;

export type DietNorm = DietFormValues & {
  id: string;
  created_at: string;
  updated_at: string;
  animals?: { name: string; species: string } | null;
  inventory_items?: { name: string; unit: string } | null;
};
