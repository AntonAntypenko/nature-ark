import { google } from "@ai-sdk/google";
import { generateText, Output } from "ai";
import {
  parsedReceiptSchema,
  ParsedReceipt,
} from "@/shared/schemas/ai-receipt";

// Список моделей за пріоритетом для автоматичного перемикання
const CANDIDATE_MODELS = [
  "gemini-3.8-flash", // 1. Максимальна точність (основна)
  "gemini-3.5-flash", // 2. Резервна повноцінна версія
  "gemini-3.5-flash-lite", // 3. Полегшена надшвидка версія (найменше черг)
  "gemini-2.0-flash", // 4. Фінальний надійний бекап
];

export async function parseReceiptWithGemini(input: {
  imageBase64?: string;
  mimeType?: string;
  text?: string;
}): Promise<ParsedReceipt> {
  const systemPrompt = `
Ти — фінансовий помічник та аналітик зоопарку "NatureArk".
Твоє завдання — проаналізувати наданий чек, накладну чи текст замовлення та витягнути з нього точні облікові дані.

Правила класифікації категорій:
- "feed" — будь-яке харчування, корми, сіно, м'ясо, риба, вітамінні добавки до їжі.
- "veterinary" — вакцини, медикаменти, послуги ветлікаря, перев'язувальні матеріали.
- "utilities" — витрати на електроенергію, газ, опалення вольєрів, водопостачання.
- "logistics" — доставка тварин, вантажні перевезення кормів.
- "maintenance" — ремонт огорож, кліток, фільтрів для басейнів тощо.
`;

  const messages: any[] = [];

  if (input.imageBase64 && input.mimeType) {
    messages.push({
      role: "user",
      content: [
        {
          type: "text",
          text: "Витягни дані з цього чека / накладної зоопарку.",
        },
        {
          type: "image",
          image: input.imageBase64,
          mimeType: input.mimeType,
        },
      ],
    });
  } else if (input.text) {
    messages.push({
      role: "user",
      content: `Витягни структуровані дані з наступного опису/накладної:\n\n${input.text}`,
    });
  } else {
    throw new Error("Missing receipt payload: provide image or text.");
  }

  let lastError: unknown = null;

  // Пробуємо моделі по черзі, якщо виникає перевантаження (high demand / rate limit)
  for (const modelId of CANDIDATE_MODELS) {
    try {
      const { output } = await generateText({
        model: google(modelId),
        system: systemPrompt,
        messages,
        output: Output.object({
          schema: parsedReceiptSchema,
        }),
        maxRetries: 1, // Зменшуємо повторні спроби для прискорення перемикання на запасну модель
      });

      return output;
    } catch (err) {
      console.warn(`Model ${modelId} failed, trying next candidate...`, err);
      lastError = err;
    }
  }

  throw (
    lastError || new Error("Всі доступні моделі Gemini зараз перевантажені.")
  );
}
