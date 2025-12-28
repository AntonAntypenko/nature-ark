import { NextResponse } from "next/server";
import { logoutService } from "@/server/services";

export async function POST() {
  try {
    await logoutService();

    const res = NextResponse.json({
      success: true,
      message: "Logged out successfully",
    });

    res.cookies.delete("sb-access-token");
    res.cookies.delete("sb-refresh-token");

    return res;
  } catch {
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}
