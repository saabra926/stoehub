import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/connect";
import { hashPassword, hashToken } from "@/lib/auth/password";
import { validatePassword } from "@/lib/validators/auth";
import { User } from "@/models/User";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const body = await request.json();
    const token = String(body?.token || "").trim();
    const password = String(body?.password || "");
    const passwordError = validatePassword(password);

    if (!token) {
      return NextResponse.json({ message: "Reset token is required." }, { status: 400 });
    }

    if (passwordError) {
      return NextResponse.json({ message: passwordError }, { status: 400 });
    }

    await connectToDatabase();

    const user = await User.findOne({
      resetPasswordTokenHash: hashToken(token),
      resetPasswordExpiresAt: { $gt: new Date() },
    }).select("+resetPasswordTokenHash +resetPasswordExpiresAt");

    if (!user) {
      return NextResponse.json({ message: "Reset link is invalid or expired." }, { status: 400 });
    }

    user.passwordHash = await hashPassword(password);
    user.resetPasswordTokenHash = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    return NextResponse.json({ message: "Password reset successfully. Please login again." });
  } catch (error) {
    return NextResponse.json({ message: error.message || "Password reset failed." }, { status: 500 });
  }
}
