"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      setLoading(false);
      return;
    }

    router.push("/");
  };

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto mt-20 w-full max-w-md rounded-xl border border-neutral-200 bg-white p-8 shadow-lg dark:border-neutral-700 dark:bg-neutral-900"
    >
      <h2 className="mb-6 text-center text-2xl font-semibold">Увійти</h2>

      <div className="mb-4">
        <label className="mb-1 block text-sm">Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full rounded-md border border-neutral-300 bg-neutral-50 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800"
        />
      </div>

      <div className="mb-4">
        <label className="mb-1 block text-sm">Пароль</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full rounded-md border border-neutral-300 bg-neutral-50 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800"
        />
      </div>

      {error && <div className="mb-3 text-sm text-red-600">{error}</div>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-blue-600 py-2 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Завантаження..." : "Увійти"}
      </button>
    </form>
  );
}
