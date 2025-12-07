"use client";

import { useRouter } from "next/navigation";

import { useLogoutMutation } from "@/store/auth";

export default function Page() {
  const router = useRouter();

  const [logout, { isLoading, error }] = useLogoutMutation();

  async function handleLogout() {
    await logout().unwrap();
    router.push("/login");
  }

  return (
    <div className="p-6">
      <h1>Dashboard</h1>

      <button
        onClick={handleLogout}
        className="mt-5 rounded-md bg-red-500 px-5 py-2.5 text-white"
      >
        Вийти
      </button>
    </div>
  );
}
