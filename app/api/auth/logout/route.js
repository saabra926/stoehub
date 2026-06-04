import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/lib/auth/session";

export const runtime = "nodejs";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out successfully." });
  clearSessionCookie(response);
  return response;
}
