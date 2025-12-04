"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/сlient";

export default function Home() {
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <div className="p-6">
      <h1>Головна сторінка</h1>

      <button
        onClick={handleLogout}
        className="mt-5 rounded-md bg-red-500 px-5 py-2.5 text-white"
      >
        Вийти
      </button>
    </div>
  );
}
