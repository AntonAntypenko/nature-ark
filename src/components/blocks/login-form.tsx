"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, GalleryVerticalEnd } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, type LoginRequestDTO } from "@/shared/schemas";
import { createClient } from "@/lib/supabase/client";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  Input,
} from "@/components/ui";

/**
 * ARCHITECTURE DECISION: Client-side Login Presentation
 *
 * Клієнтська форма взаємодіє з Supabase Browser Client.
 * При успішному вході токени зберігаються в Cookie через @supabase/ssr,
 * після чого викликається router.push("/dashboard") та router.refresh()
 * для синхронізації стану в Server Components.
 */
export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<LoginRequestDTO>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  const onSubmit = async (data: LoginRequestDTO) => {
    setIsLoading(true);
    setAuthError(null);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        setAuthError(error.message);
        setIsLoading(false);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch (e: any) {
      setAuthError(e?.message || "An unexpected error occurred");
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="/" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Nature Ark
        </a>
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Ласкаво просимо</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="email">Електронна пошта</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      {...register("email")}
                    />
                    {errors.email && (
                      <span className="text-sm text-red-600">
                        {errors.email.message}
                      </span>
                    )}
                  </Field>
                  <Field>
                    <div className="flex items-center">
                      <FieldLabel htmlFor="password">Пароль</FieldLabel>
                      <a
                        href="#"
                        className="ml-auto text-sm underline-offset-4 hover:underline"
                      >
                        Забули пароль?
                      </a>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        {...register("password")}
                      />
                      <button
                        type="button"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        className="absolute top-2.5 right-3 text-gray-500 hover:text-gray-700"
                        onClick={() => setShowPassword(prev => !prev)}
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <span className="text-sm text-red-600">
                        {errors.password.message}
                      </span>
                    )}
                  </Field>
                  <Field>
                    {authError && (
                      <div className="text-sm text-red-600" role="alert">
                        {authError}
                      </div>
                    )}
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full"
                    >
                      {isLoading ? "Обробка..." : "Вхід"}
                    </Button>
                    <FieldDescription className="text-center">
                      Немає облікового запису?
                      <br />
                      Зверніться до адміністратора
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
