import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/connect";
import { verifyPassword } from "@/lib/auth/password";
import { signSession, setSessionCookie } from "@/lib/auth/session";
import { validateLogin } from "@/lib/validators/auth";
import { User, serializeUser } from "@/models/User";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password, errors, valid } = validateLogin(body);

    if (!valid) {
      return NextResponse.json({ message: "Please enter valid login details.", errors }, { status: 400 });
    }

    await connectToDatabase();

    const user = await User.findOne({ email }).select("+passwordHash");
    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
    }

    user.lastLoginAt = new Date();
    await user.save();

    const safeUser = serializeUser(user);
    const response = NextResponse.json({ message: "Logged in successfully.", user: safeUser });
    setSessionCookie(response, signSession(user));
    return response;
  } catch (error) {
    return NextResponse.json({ message: error.message || "Login failed." }, { status: 500 });
  }
}
