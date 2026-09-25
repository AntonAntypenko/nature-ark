import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * ARCHITECTURE DECISION: Server-side Context-Aware Client Factory
 *
 * @description
 * Initializes a Supabase client for server environments (Server Components,
 * Server Actions, and Route Handlers).
 * Reads the current HTTP request cookies via the asynchronous `cookies()` API in Next.js 16.
 *
 * Security:
 * Requests are authenticated using the public anon key alongside the user's session JWT.
 * This guarantees that PostgreSQL executes queries under the caller's context,
 * strictly enforcing Row Level Security (RLS) policies based on `auth.uid()`.
 *
 * @throws {Error} If public Supabase environment variables are missing.
 * @returns {Promise<ReturnType<typeof createServerClient>>} A scoped server Supabase client.
 */
export async function createClient() {
  const cookieStore = await cookies();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables."
    );
  }

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Mutating cookies inside Server Components throws an error in Next.js.
          // Session refreshing and cookie updates are delegated to middleware.ts.
        }
      },
    },
  });
}
