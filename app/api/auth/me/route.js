import { NextResponse } from "next/server";
import {
  clearSessionCookie,
  getSessionPayload,
  getSessionToken,
  sessionPayloadToUser,
} from "@/lib/auth/session";

export const runtime = "nodejs";

export async function GET(request) {
  try {
    const token = getSessionToken(request);
    const user = sessionPayloadToUser(getSessionPayload(request));

    if (!user) {
      const response = NextResponse.json({ user: null });

      if (token) {
        clearSessionCookie(response);
      }

      return response;
    }

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ message: error.message || "Could not load session." }, { status: 500 });
  }
}
