"use client";

import { useState, useTransition } from "react";
import { parseReceiptAction } from "@/server/actions/ai-receipt";
import { ParsedReceipt } from "@/shared/schemas/ai-receipt";

interface Props {
  onParsed: (data: ParsedReceipt) => void;
}

export function AiReceiptScanner({ onParsed }: Props) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const response = await parseReceiptAction(formData);
      if (!response.success || !response.data) {
        setError(response.error || "Не вдалося розпізнати чек");
        return;
      }
      onParsed(response.data);
    });
  };

  return (
    <div
      style={{
        border: "1px dashed #999",
        padding: "12px",
        marginBottom: "16px",
        background: "#fafafa",
      }}
    >
      <strong>🤖 ШІ-розпізнавання чека (Gemini)</strong>
      <p style={{ margin: "4px 0 10px 0", fontSize: "14px", color: "#555" }}>
        Завантажте фото чека або вставте сирий текст накладної для
        автозаповнення полів:
      </p>

      {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <input type="file" name="receipt_file" accept="image/*,.pdf" />
        <span>або</span>
        <input
          name="manual_text"
          placeholder="Текст: ФОП Корми, 50 кг яловичини 9000 грн для лева..."
          style={{ width: "320px", padding: "4px" }}
        />
        <button
          type="submit"
          disabled={isPending}
          style={{ padding: "4px 12px", cursor: "pointer" }}
        >
          {isPending ? "⏳ Gemini аналізує..." : "Розпізнати"}
        </button>
      </form>
    </div>
  );
}
