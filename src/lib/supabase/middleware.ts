import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

/**
 * ARCHITECTURE DECISION: Supabase Session Sync for Middleware
 *
 * @description
 * Оновлює застарілий токен авторизації користувача під час запиту.
 * Приймає вже сформований response (наприклад, від next-intl),
 * зчитує куки із запиту та оновлює їх одночасно в request і response.
 */
export async function updateSession(request: NextRequest, response: NextResponse) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
        return { response, user: null };
    }

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: {
            getAll() {
                return request.cookies.getAll();
            },
            setAll(cookiesToSet) {
                cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
                cookiesToSet.forEach(({ name, value, options }) =>
                    response.cookies.set(name, value, options)
                );
            },
        },
    });

    // ВАЖЛИВО: getUser() повторно валідує токен через сервер Supabase Auth
    const {
        data: { user },
    } = await supabase.auth.getUser();

    return { response, user };
}