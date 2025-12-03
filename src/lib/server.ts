import { createClient } from "@supabase/supabase-js";

const url = process.env.SB_URL as string;
const key = process.env.SB_SECRET as string;

if (!url) {
  throw new Error("Missing SB_URL");
}

if (!key) {
  throw new Error("Missing SB_SECRET");
}

export function supabaseServer() {
  return createClient(url, key);
}
