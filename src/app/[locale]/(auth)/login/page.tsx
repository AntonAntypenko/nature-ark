"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Eye, EyeOff, GalleryVerticalEnd } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useLoginMutation } from "@/store/auth";

import type { LoginRequestDTO } from "@/shared/schemas";
import { loginSchema } from "@/shared/schemas";
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

export default function Page() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<LoginRequestDTO>({ resolver: zodResolver(loginSchema) });

  const [login, { isLoading, error }] = useLoginMutation();

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  const onSubmit = async (data: LoginRequestDTO) => {
    try {
      await login(data).unwrap();
      router.push("/dashboard");
    } catch (e) {
      console.error("Error: ", e);
    }
  };

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
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
                      required
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
                        required
                      />
                      <button
                        type="button"
                        className="absolute top-2.5 right-3 text-gray-500"
                        onClick={() => setShowPassword(v => !v)}
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
                    {error && (
                      <div className="text-sm text-red-600">
                        Login failed. Check credentials.
                      </div>
                    )}
                    <Button type="submit" disabled={isLoading}>
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
