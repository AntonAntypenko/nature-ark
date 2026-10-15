"use server";

import { parseReceiptWithGemini } from "@/server/services/ai/receipt-parser";
import { ParsedReceipt } from "@/shared/schemas/ai-receipt";
import { createClient } from "@/lib/supabase/server";

export async function parseReceiptAction(
  formData: FormData
): Promise<{ success: boolean; data?: ParsedReceipt; error?: string }> {
  try {
    const file = formData.get("receipt_file") as File | null;
    const manualText = formData.get("manual_text") as string | null;

    const supabase = await createClient();
    const { data: inventoryCatalog } = await supabase
      .from("inventory_items")
      .select("id, name, unit");

    const catalogString =
      inventoryCatalog && inventoryCatalog.length > 0
        ? JSON.stringify(inventoryCatalog)
        : "";

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const base64 = Buffer.from(bytes).toString("base64");

      const result = await parseReceiptWithGemini({
        imageBase64: base64,
        mimeType: file.type || "image/jpeg",
        inventoryCatalog: catalogString,
      });

      return { success: true, data: result };
    }

    if (manualText && manualText.trim().length > 0) {
      const result = await parseReceiptWithGemini({
        text: manualText.trim(),
        inventoryCatalog: catalogString,
      });

      return { success: true, data: result };
    }

    return {
      success: false,
      error: "Please upload a file or enter text.",
    };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || "AI processing error.",
    };
  }
}
