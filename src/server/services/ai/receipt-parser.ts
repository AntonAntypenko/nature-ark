import { google } from "@ai-sdk/google";
import { generateText, Output } from "ai";
import {
  parsedReceiptSchema,
  ParsedReceipt,
} from "@/shared/schemas/ai-receipt";

const CANDIDATE_MODELS = [
  "gemini-3.8-flash",
  "gemini-3.5-flash",
  "gemini-3.5-flash-lite",
  "gemini-2.0-flash",
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
- "feed" — будь-яке харчування, корми, сіно, м'ясо, риба, вітамінні добавки.
- "veterinary" — вакцини, медикаменти, послуги ветлікаря.
- "utilities" — витрати на електроенергію, газ, опалення, водопостачання.
- "logistics" — доставка тварин, вантажні перевезення.
- "maintenance" — ремонт огорож, кліток, інвентар.

Обов'язково повертай дати у форматі YYYY-MM-DD. 
Якщо номер чека відсутній, залиш поле порожнім або не вказуй.
`;

  const messages: any[] = [];

  if (input.imageBase64 && input.mimeType) {
    messages.push({
      role: "user",
      content: [
        {
          type: "text",
          text: "Витягни дані з цього чека / накладної.",
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
      content: `Витягни структуровані дані з наступного тексту:\n\n${input.text}`,
    });
  } else {
    throw new Error("Missing payload");
  }

  let lastError: unknown = null;

  for (const modelId of CANDIDATE_MODELS) {
    try {
      const { output } = await generateText({
        model: google(modelId),
        system: systemPrompt,
        messages,
        output: Output.object({
          schema: parsedReceiptSchema,
        }),
        maxRetries: 1,
      });

      return output;
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError || new Error("Всі доступні моделі Gemini перевантажені.");
}
