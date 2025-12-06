"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/store/auth/authApi";
import { Eye, EyeOff } from "lucide-react";

import { loginSchema, LoginForm } from "@/schemas/login.schema";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const [login, { isLoading, error }] = useLoginMutation();

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data).unwrap();
      router.push("/");
    } catch (e) {
      console.error("Error: ", e);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 text-black">
      <div className="w-full max-w-sm rounded-xl border bg-white p-6 shadow-lg">
        <h1 className="mb-4 text-center text-2xl font-semibold">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div className="flex flex-col space-y-1">
            <label htmlFor="email" className="font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="you@example.com"
              {...register("email")}
            />
            {errors.email && (
              <span className="text-sm text-red-600">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col space-y-1">
            <label htmlFor="password" className="font-medium">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-300 focus:outline-none"
                placeholder="••••••••"
                {...register("password")}
              />
              <button
                type="button"
                className="absolute top-2.5 right-3 text-gray-500"
                onClick={() => setShowPassword(v => !v)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <span className="text-sm text-red-600">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* General error */}
          {error && (
            <div className="text-sm text-red-600">
              Login failed. Check credentials.
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 py-2 text-white transition hover:bg-blue-700 disabled:bg-gray-400"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
