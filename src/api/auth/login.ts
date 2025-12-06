import { supabaseServer } from "@/lib/server";

export async function loginService(body: { email: string; password: string }) {
  const { data, error } = await supabaseServer().auth.signInWithPassword({
    email: body.email,
    password: body.password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
