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
  inventoryCatalog?: string;
}): Promise<ParsedReceipt> {
  const systemPrompt = `
You are a financial assistant and analyst for the "NatureArk" zoo.
Your task is to analyze the provided receipt, invoice, or order text and extract accurate accounting data from it.

Category classification rules:
- "feed" - any nutrition, feed, hay, meat, fish, vitamin supplements.

- "veterinary" - vaccines, medications, veterinary services.

- "utilities" - electricity, gas, heating, water supply expenses.

- "logistics" - animal delivery, freight transportation.

- "maintenance" - repair of fences, cages, inventory.


Be sure to return dates in the YYYY-MM-DD format. 
If the receipt number is missing, leave the field empty or omit it.
${
  input.inventoryCatalog
    ? `
Here is our current inventory catalog in JSON format:
${input.inventoryCatalog}

Your task for the inventory_item_id field: for each item in the receipt, try to find the best semantic match in the catalog above. 
Pay attention to synonyms (for example, "Beef grade 1" and "Beef"). 
If a match is found, insert the corresponding 'id' into the 'inventory_item_id' field.
If there are no good matches or it is a new service (for example, delivery), be sure to return null for 'inventory_item_id'.`
    : ""
}
`;

  const messages: any[] = [];

  if (input.imageBase64 && input.mimeType) {
    messages.push({
      role: "user",
      content: [
        {
          type: "text",
          text: "Extract data from this receipt / invoice.",
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
      content: `Extract structured data from the following text:\n\n${input.text}`,
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

  throw lastError || new Error("All available Gemini models are overloaded.");
}
