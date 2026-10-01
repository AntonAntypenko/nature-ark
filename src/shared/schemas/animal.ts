import { z } from "zod";

export const animalStatusSchema = z.enum([
  "healthy",
  "sick",
  "quarantine",
  "recovery",
]);

export const dietCategorySchema = z.enum([
  "carnivore",
  "herbivore",
  "omnivore",
  "piscivore",
]);

export const animalGenderSchema = z.enum(["male", "female", "unknown"]);

export const animalFormSchema = z.object({
  name: z.string().min(1),
  species: z.string().min(1),
  scientific_name: z.string().nullable().optional(),
  inventory_number: z.string().min(1),
  gender: animalGenderSchema.nullable().optional(),
  birth_date: z.string().nullable().optional(),
  enclosure_id: z.string().uuid().nullable(),
  status: animalStatusSchema,
  weight_kg: z.coerce.number().positive(),
  diet_type: dietCategorySchema,
  daily_food_norm_kg: z.coerce.number().positive(),
  estimated_daily_cost: z.coerce.number().nonnegative(),
  is_winter_heating_required: z.boolean(),
  notes: z.string().nullable().optional(),
});

export type AnimalFormValues = z.infer<typeof animalFormSchema>;

export type Animal = AnimalFormValues & {
  id: string;
  created_at: string;
  updated_at: string;
  enclosures?: {
    name: string;
  } | null;
};
