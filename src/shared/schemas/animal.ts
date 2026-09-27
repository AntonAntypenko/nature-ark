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

export const animalSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string(),
  updated_at: z.string(),
  name: z.string().min(1, "Name is required"),
  species: z.string().min(1, "Species is required"),
  scientific_name: z.string().nullable().optional(),
  inventory_number: z.string().min(1, "Inventory number is required"),
  gender: z.enum(["male", "female", "unknown"]).nullable().optional(),
  birth_date: z.string().nullable().optional(),
  enclosure_zone: z.string().min(1, "Enclosure zone is required"),
  status: animalStatusSchema,
  weight_kg: z.number().positive(),
  diet_type: dietCategorySchema,
  daily_food_norm_kg: z.number().positive(),
  estimated_daily_cost: z.number().nonnegative(),
  is_winter_heating_required: z.boolean(),
  notes: z.string().nullable().optional(),
});

export type Animal = z.infer<typeof animalSchema>;
export type AnimalStatus = z.infer<typeof animalStatusSchema>;
export type DietCategory = z.infer<typeof dietCategorySchema>;
