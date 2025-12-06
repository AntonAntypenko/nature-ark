import { supabaseServer } from "@/lib/server";

import { LoginRequestDTO } from "@/shared/schemas";
import { LoginServiceResponse } from "@/server/types";
import { AuthenticationError, InternalServerError } from "@/server/errors";

export async function loginService(
  body: LoginRequestDTO
): Promise<LoginServiceResponse> {
  const { data, error } = await supabaseServer().auth.signInWithPassword({
    email: body.email,
    password: body.password,
  });

  if (error) {
    if (
      error.status === 400 ||
      error.message.includes("Invalid login credentials")
    ) {
      throw new AuthenticationError();
    }
    throw new InternalServerError(`Supabase Error: ${error.message}`);
  }

  if (!data.session || !data.user) {
    throw new InternalServerError(
      "Invalid Supabase response: Missing session or user data."
    );
  }

  return {
    dto: {
      user: {
        id: data.user.id,
        email: data.user.email!,
        phone: data.user.phone || "",
      },
      token: data.session.access_token,
    },
    session: {
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
    },
  };
}
