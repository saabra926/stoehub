import { NextResponse } from "next/server";
import { requireAuth, toUserResponse } from "@/lib/auth/guards";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { signSession, setSessionCookie } from "@/lib/auth/session";
import { normalizeEmail, isEmail, validatePassword } from "@/lib/validators/auth";
import { User } from "@/models/User";

export const runtime = "nodejs";

export async function PATCH(request) {
  try {
    const { user, response } = await requireAuth(request, { includePassword: true });
    if (response) {
      return response;
    }

    const body = await request.json();
    const nextName = String(body?.name || "").trim();
    const nextEmail = normalizeEmail(body?.email);
    const currentPassword = String(body?.currentPassword || "");
    const newPassword = String(body?.newPassword || "");

    if (nextName.length < 2) {
      return NextResponse.json({ message: "Name must be at least 2 characters." }, { status: 400 });
    }

    if (!isEmail(nextEmail)) {
      return NextResponse.json({ message: "Enter a valid email address." }, { status: 400 });
    }

    const emailTaken = await User.findOne({ email: nextEmail, _id: { $ne: user._id } });
    if (emailTaken) {
      return NextResponse.json({ message: "That email is already used by another account." }, { status: 409 });
    }

    if (newPassword) {
      const passwordError = validatePassword(newPassword);
      if (passwordError) {
        return NextResponse.json({ message: passwordError }, { status: 400 });
      }

      if (!currentPassword || !(await verifyPassword(currentPassword, user.passwordHash))) {
        return NextResponse.json({ message: "Current password is incorrect." }, { status: 400 });
      }

      user.passwordHash = await hashPassword(newPassword);
    }

    user.name = nextName;
    user.email = nextEmail;
    await user.save();

    const safeUser = toUserResponse(user);
    const res = NextResponse.json({ message: "Settings updated successfully.", user: safeUser });
    setSessionCookie(res, signSession(user));
    return res;
  } catch (error) {
    return NextResponse.json({ message: error.message || "Could not update settings." }, { status: 500 });
  }
}
