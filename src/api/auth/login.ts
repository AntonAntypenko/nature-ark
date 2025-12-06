import { supabaseServer } from "@/lib/server";
import { LoginRequestDTO } from "@/shared/auth";
import { LoginServiceResponse } from "@/api/auth/types";

export async function loginService(
  body: LoginRequestDTO
): Promise<LoginServiceResponse> {
  const { data, error } = await supabaseServer().auth.signInWithPassword({
    email: body.email,
    password: body.password,
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data.session || !data.user) {
    throw new Error("Invalid Supabase response");
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
