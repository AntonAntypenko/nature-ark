"use client";

import { useRef, useState } from "react";
import { Animal } from "@/shared/schemas/animal";
import { updateAnimalAction } from "@/server/actions/animals";

interface Props {
  animal: Animal;
}

export function AnimalEditDialog({ animal }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await updateAnimalAction(animal.id, formData);

    setIsPending(false);

    if (!result.success) {
      setError(result.error || "Не вдалося оновити запис");
      return;
    }

    dialogRef.current?.close();
  };

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        style={{ marginRight: "8px", cursor: "pointer" }}
      >
        Редагувати
      </button>

      <dialog
        ref={dialogRef}
        style={{ padding: "20px", maxWidth: "450px", border: "1px solid #ccc" }}
      >
        <h3>Редагування: {animal.name}</h3>

        {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <label>
            Кличка:
            <input
              name="name"
              defaultValue={animal.name}
              required
              style={{ width: "100%" }}
            />
          </label>

          <label>
            Вид:
            <input
              name="species"
              defaultValue={animal.species}
              required
              style={{ width: "100%" }}
            />
          </label>

          <label>
            Інвентарний №:
            <input
              name="inventory_number"
              defaultValue={animal.inventory_number}
              required
              style={{ width: "100%" }}
            />
          </label>

          <label>
            Локація / Вольєр:
            <input
              name="enclosure_zone"
              defaultValue={animal.enclosure_zone}
              required
              style={{ width: "100%" }}
            />
          </label>

          <label>
            Статус:
            <select
              name="status"
              defaultValue={animal.status}
              style={{ width: "100%" }}
            >
              <option value="healthy">healthy</option>
              <option value="sick">sick</option>
              <option value="quarantine">quarantine</option>
              <option value="recovery">recovery</option>
            </select>
          </label>

          <label>
            Дієта:
            <select
              name="diet_type"
              defaultValue={animal.diet_type}
              style={{ width: "100%" }}
            >
              <option value="carnivore">carnivore</option>
              <option value="herbivore">herbivore</option>
              <option value="omnivore">omnivore</option>
              <option value="piscivore">piscivore</option>
            </select>
          </label>

          <label>
            Вага (кг):
            <input
              name="weight_kg"
              type="number"
              step="0.1"
              defaultValue={animal.weight_kg}
              required
              style={{ width: "100%" }}
            />
          </label>

          <label>
            Денна норма корму (кг):
            <input
              name="daily_food_norm_kg"
              type="number"
              step="0.1"
              defaultValue={animal.daily_food_norm_kg}
              required
              style={{ width: "100%" }}
            />
          </label>

          <label>
            Планова вартість (грн/день):
            <input
              name="estimated_daily_cost"
              type="number"
              step="0.01"
              defaultValue={animal.estimated_daily_cost}
              required
              style={{ width: "100%" }}
            />
          </label>

          <label style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <input
              name="is_winter_heating_required"
              type="checkbox"
              defaultChecked={animal.is_winter_heating_required}
            />
            Потребує обігріву взимку
          </label>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
              marginTop: "12px",
            }}
          >
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              disabled={isPending}
            >
              Скасувати
            </button>
            <button type="submit" disabled={isPending}>
              {isPending ? "Збереження..." : "Зберегти зміни"}
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
