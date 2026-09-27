"use client";

import { useRef, useState } from "react";
import { Expense } from "@/shared/schemas/expense";
import { Animal } from "@/shared/schemas/animal";
import { updateExpenseAction } from "@/server/actions/expenses";

interface Props {
  expense: Expense;
  animals: Animal[];
}

export function ExpenseEditDialog({ expense, animals }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await updateExpenseAction(expense.id, formData);

    setIsPending(false);

    if (!result.success) {
      setError(result.error || "Не вдалося оновити запис витрати");
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
        <h3>Редагування витрати</h3>

        {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <label>
            Призначення / Назва:
            <input
              name="title"
              defaultValue={expense.title}
              required
              style={{ width: "100%" }}
            />
          </label>

          <label>
            Сума (грн):
            <input
              name="amount"
              type="number"
              step="0.01"
              defaultValue={expense.amount}
              required
              style={{ width: "100%" }}
            />
          </label>

          <label>
            Категорія:
            <select
              name="category"
              defaultValue={expense.category}
              style={{ width: "100%" }}
            >
              <option value="feed">feed (корми)</option>
              <option value="veterinary">veterinary (медицина)</option>
              <option value="utilities">utilities (обігрів/комунальні)</option>
              <option value="logistics">logistics (доставка)</option>
              <option value="maintenance">maintenance (ремонт вольєрів)</option>
            </select>
          </label>

          <label>
            Дата витрати:
            <input
              name="spent_at"
              type="date"
              defaultValue={expense.spent_at}
              required
              style={{ width: "100%" }}
            />
          </label>

          <label>
            Постачальник:
            <input
              name="vendor"
              defaultValue={expense.vendor || ""}
              style={{ width: "100%" }}
            />
          </label>

          <label>
            Прив'язка до тварини:
            <select
              name="animal_id"
              defaultValue={expense.animal_id || "none"}
              style={{ width: "100%" }}
            >
              <option value="none">-- Загальна витрата зоопарку --</option>
              {animals.map(a => (
                <option key={a.id} value={a.id}>
                  {a.name} ({a.species})
                </option>
              ))}
            </select>
          </label>

          <label>
            Примітки:
            <input
              name="notes"
              defaultValue={expense.notes || ""}
              style={{ width: "100%" }}
            />
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
              {isPending ? "Збереження..." : "Зберегти"}
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
