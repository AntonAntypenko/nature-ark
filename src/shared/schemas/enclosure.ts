import { z } from "zod";

export const enclosureTypeSchema = z.enum([
  "outdoor",
  "indoor",
  "aquatic",
  "terrarium",
]);

export const enclosureSchema = z.object({
  name: z.string().min(1),
  type: enclosureTypeSchema,
  has_heating_system: z.boolean(),
  notes: z.string().nullable().optional(),
});

export type EnclosureFormValues = z.infer<typeof enclosureSchema>;

export type Enclosure = EnclosureFormValues & {
  id: string;
  created_at: string;
  updated_at: string;
};
