"use client";

import { useState } from "react";
import { Animal } from "@/shared/schemas/animal";
import { ParsedReceipt } from "@/shared/schemas/ai-receipt";
import { createExpenseAction } from "@/server/actions/expenses";
import { AiReceiptScanner } from "./ai-receipt-scanner";

export function ExpenseCreateForm({ animals }: { animals: Animal[] }) {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "feed",
    spent_at: new Date().toISOString().split("T")[0],
    vendor: "",
    animal_id: "none",
    notes: "",
  });

  const handleParsed = (data: ParsedReceipt) => {
    // Шукаємо тварину за видом, якщо Gemini її розпізнав
    let matchedId = "none";
    if (data.suggested_animal_species) {
      const target = data.suggested_animal_species.toLowerCase();
      const found = animals.find(
        a =>
          a.species.toLowerCase().includes(target) ||
          a.name.toLowerCase().includes(target)
      );
      if (found) matchedId = found.id;
    }

    setFormData({
      title: data.title || "",
      amount: data.amount ? String(data.amount) : "",
      category: data.category || "feed",
      spent_at: data.spent_at || new Date().toISOString().split("T")[0],
      vendor: data.vendor || "",
      animal_id: matchedId,
      notes: data.notes || "",
    });
  };

  return (
    <details
      style={{ margin: "16px 0", padding: "12px", border: "1px solid #ccc" }}
    >
      <summary style={{ cursor: "pointer", fontWeight: "bold" }}>
        + Зареєструвати нову витрату
      </summary>

      {/* ШІ-панель Gemini */}
      <AiReceiptScanner onParsed={handleParsed} />

      {/* Форма введення */}
      <form
        action={async data => {
          await createExpenseAction(data);
          // Скидання полів після відправки
          setFormData({
            title: "",
            amount: "",
            category: "feed",
            spent_at: new Date().toISOString().split("T")[0],
            vendor: "",
            animal_id: "none",
            notes: "",
          });
        }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
          marginTop: "12px",
        }}
      >
        <input
          name="title"
          placeholder="Призначення"
          value={formData.title}
          onChange={e => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <input
          name="amount"
          type="number"
          step="0.01"
          placeholder="Сума (грн)"
          value={formData.amount}
          onChange={e => setFormData({ ...formData, amount: e.target.value })}
          required
        />
        <select
          name="category"
          value={formData.category}
          onChange={e => setFormData({ ...formData, category: e.target.value })}
        >
          <option value="feed">feed (корми)</option>
          <option value="veterinary">veterinary (ветеринарія)</option>
          <option value="utilities">utilities (обігрів/комунальні)</option>
          <option value="logistics">logistics (доставка)</option>
          <option value="maintenance">maintenance (обслуговування)</option>
        </select>
        <input
          name="spent_at"
          type="date"
          value={formData.spent_at}
          onChange={e => setFormData({ ...formData, spent_at: e.target.value })}
          required
        />
        <input
          name="vendor"
          placeholder="Постачальник"
          value={formData.vendor}
          onChange={e => setFormData({ ...formData, vendor: e.target.value })}
        />
        <select
          name="animal_id"
          value={formData.animal_id}
          onChange={e =>
            setFormData({ ...formData, animal_id: e.target.value })
          }
        >
          <option value="none">-- Без прив'язки (загальне) --</option>
          {animals.map(a => (
            <option key={a.id} value={a.id}>
              {a.name} ({a.species})
            </option>
          ))}
        </select>
        <input
          name="notes"
          placeholder="Примітки"
          value={formData.notes}
          onChange={e => setFormData({ ...formData, notes: e.target.value })}
          style={{ gridColumn: "span 2" }}
        />
        <button type="submit">Зберегти витрату</button>
      </form>
    </details>
  );
}
