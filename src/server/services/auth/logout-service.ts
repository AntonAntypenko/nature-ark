import { supabaseServer } from "@/lib/server";

import { AuthenticationError, InternalServerError } from "@/server/errors";

export async function logoutService(): Promise<{ success: boolean }> {
  const { error } = await supabaseServer().auth.signOut();

  if (error) {
    if (
      error.status === 400 ||
      error.message.includes("Invalid login credentials")
    ) {
      throw new AuthenticationError();
    }
    throw new InternalServerError(`Supabase Error: ${error.message}`);
  }

  return { success: true };
}
