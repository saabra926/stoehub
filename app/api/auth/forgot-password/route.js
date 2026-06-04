import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/connect";
import { createPasswordResetToken } from "@/lib/auth/password";
import { normalizeEmail, isEmail } from "@/lib/validators/auth";
import { sendPasswordResetEmail } from "@/lib/email/passwordReset";
import { User } from "@/models/User";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const body = await request.json();
    const email = normalizeEmail(body?.email);

    if (!isEmail(email)) {
      return NextResponse.json({ message: "Enter a valid email address." }, { status: 400 });
    }

    await connectToDatabase();

    const user = await User.findOne({ email });
    let resetLink;

    if (user) {
      const reset = createPasswordResetToken();
      user.resetPasswordTokenHash = reset.tokenHash;
      user.resetPasswordExpiresAt = reset.expiresAt;
      await user.save();

      const origin = process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin;
      resetLink = `${origin}/reset-password?token=${reset.token}`;
      const emailResult = await sendPasswordResetEmail({
        email: user.email,
        name: user.name,
        resetLink,
      });

      if (!emailResult.delivered && process.env.NODE_ENV === "production") {
        console.error("[StepHub] Password reset email could not be sent.");
      }
    }

    const smtpReady = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);

    return NextResponse.json({
      message: smtpReady
        ? "If that email exists, we've sent a password reset link."
        : "If that email exists, a reset link has been prepared.",
      resetLink: !smtpReady && process.env.NODE_ENV !== "production" ? resetLink : undefined,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message || "Could not create reset link." }, { status: 500 });
  }
}
