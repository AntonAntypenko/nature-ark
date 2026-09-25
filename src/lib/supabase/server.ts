import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * ARCHITECTURE DECISION: Server-side Context-Aware Client
 *
 * @description
 * Ініціалізує клієнт Supabase для серверних операцій (Server Components, Server Actions).
 * Клієнт отримує доступ до куків поточного HTTP-запиту через асинхронний метод cookies() Next.js 16.
 *
 * Безпека:
 * Запити завжди підписуються anon key і сесійним JWT користувача.
 * Це гарантує, що база даних PostgreSQL застосовує правила Row Level Security (RLS)
 * для поточного auth.uid().
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
          // У Server Components Next.js забороняє мутувати куки.
          // Оновлення застарілих токенів делегується на middleware.
        }
      },
    },
  });
}