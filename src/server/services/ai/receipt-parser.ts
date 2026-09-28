import { google } from "@ai-sdk/google";
import { generateText, Output } from "ai";
import {
  parsedReceiptSchema,
  ParsedReceipt,
} from "@/shared/schemas/ai-receipt";

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

  // Використовуємо актуальний API замість застарілого generateObject
  const { output } = await generateText({
    model: google("gemini-3.8-flash"),
    system: systemPrompt,
    messages,
    output: Output.object({
      schema: parsedReceiptSchema,
    }),
  });

  return output;
}
