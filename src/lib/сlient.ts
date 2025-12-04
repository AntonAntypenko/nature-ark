import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SB_URL!;
const key = process.env.NEXT_PUBLIC_SB_PUBLIC!;

if (!url) {
  throw new Error("Missing SB_URL");
}

if (!key) {
  throw new Error("Missing SB_PUBLIC");
}

export const supabase = createClient(url, key);
