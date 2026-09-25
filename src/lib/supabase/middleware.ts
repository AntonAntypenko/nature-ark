import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

/**
 * ARCHITECTURE DECISION: Supabase Session Synchronization Middleware Helper
 *
 * @description
 * Refreshes expired authentication tokens during the request lifecycle.
 * Accepts an existing response object (e.g., initialized by `next-intl`),
 * reads cookies from the incoming request, and mutates both request and response
 * cookie headers in-flight. This ensures the downstream React Server Components (RSC)
 * receive up-to-date session credentials.
 *
 * @param {NextRequest} request - The incoming Next.js edge request.
 * @param {NextResponse} response - The existing response object to append updated cookies to.
 * @returns {Promise<{ response: NextResponse; user: import("@supabase/supabase-js").User | null }>}
 * Object containing the mutated response and the authenticated user instance.
 */
export async function updateSession(
  request: NextRequest,
  response: NextResponse
) {
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
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  // IMPORTANT: getUser() re-validates the auth token against the Supabase Auth server,
  // preventing spoofed or manually forged JWTs from bypassing security.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { response, user };
}
