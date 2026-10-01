"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { animalFormSchema, AnimalFormValues } from "@/shared/schemas/animal";
import { createAnimalAction } from "@/server/actions/animals";
import { Enclosure } from "@/shared/schemas/enclosure";

interface Props {
  enclosures: Enclosure[];
}

export function AnimalForm({ enclosures }: Props) {
  const [isPending, startTransition] = useTransition();

  const { register, handleSubmit, reset } = useForm<AnimalFormValues>({
    resolver: zodResolver(animalFormSchema),
    defaultValues: {
      name: "",
      species: "",
      inventory_number: "",
      enclosure_id: null,
      status: "healthy",
      diet_type: "carnivore",
      weight_kg: undefined,
      daily_food_norm_kg: undefined,
      estimated_daily_cost: undefined,
      is_winter_heating_required: false,
    },
  });

  const onSubmit = (data: AnimalFormValues) => {
    startTransition(async () => {
      await createAnimalAction(data);
      reset();
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-8 grid max-w-4xl grid-cols-3 gap-4"
    >
      <input
        {...register("name")}
        className="rounded border p-2"
        placeholder="Name"
      />
      <input
        {...register("species")}
        className="rounded border p-2"
        placeholder="Species"
      />
      <input
        {...register("inventory_number")}
        className="rounded border p-2"
        placeholder="Inventory Number"
      />

      <select {...register("enclosure_id")} className="rounded border p-2">
        <option value="">Select Enclosure</option>
        {enclosures.map(e => (
          <option key={e.id} value={e.id}>
            {e.name}
          </option>
        ))}
      </select>

      <select {...register("status")} className="rounded border p-2">
        <option value="healthy">healthy</option>
        <option value="sick">sick</option>
        <option value="quarantine">quarantine</option>
        <option value="recovery">recovery</option>
      </select>

      <select {...register("diet_type")} className="rounded border p-2">
        <option value="carnivore">carnivore</option>
        <option value="herbivore">herbivore</option>
        <option value="omnivore">omnivore</option>
        <option value="piscivore">piscivore</option>
      </select>

      <input
        {...register("weight_kg")}
        type="number"
        step="0.1"
        className="rounded border p-2"
        placeholder="Weight (kg)"
      />
      <input
        {...register("daily_food_norm_kg")}
        type="number"
        step="0.1"
        className="rounded border p-2"
        placeholder="Daily Norm (kg)"
      />
      <input
        {...register("estimated_daily_cost")}
        type="number"
        step="0.01"
        className="rounded border p-2"
        placeholder="Cost/day"
      />

      <label className="col-span-2 flex items-center gap-2">
        <input type="checkbox" {...register("is_winter_heating_required")} />
        Requires winter heating
      </label>

      <button
        type="submit"
        disabled={isPending}
        className="col-span-3 max-w-xs rounded bg-black p-2 text-white disabled:opacity-50"
      >
        Save Animal
      </button>
    </form>
  );
}
