import { createBrowserClient } from "@supabase/ssr";

/**
 * ARCHITECTURE DECISION: Browser-side Supabase Client Singleton
 *
 * @description
 * Ініціалізує клієнт Supabase для браузерного оточення ('use client').
 * Замість використання localStorage (як у чистому supabase-js),
 * @supabase/ssr синхронізує сесію через стандартні куки (document.cookie).
 * Це дає змогу серверу (RSC) читати стан авторизації під час наступних запитів.
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