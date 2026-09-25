import { createBrowserClient } from "@supabase/ssr";

/**
 * ARCHITECTURE DECISION: Browser-side Supabase Client Factory
 *
 * @description
 * Initializes the Supabase client for client-side environments ('use client').
 * Unlike standard @supabase/supabase-js which defaults to localStorage,
 * @supabase/ssr synchronizes the session tokens directly via HTTP cookies (document.cookie).
 * This allows React Server Components (RSC) and Next.js Middleware to seamlessly
 * inspect and validate the authentication state on subsequent server requests.
 *
 * @throws {Error} If public Supabase environment variables are missing.
 * @returns {ReturnType<typeof createBrowserClient>} A configured browser Supabase client.
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables."
    );
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
