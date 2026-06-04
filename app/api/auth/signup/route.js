import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/connect";
import { hashPassword } from "@/lib/auth/password";
import { signSession, setSessionCookie } from "@/lib/auth/session";
import { validateSignup } from "@/lib/validators/auth";
import { User, serializeUser } from "@/models/User";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, password, errors, valid } = validateSignup(body);

    if (!valid) {
      return NextResponse.json({ message: "Please fix the highlighted fields.", errors }, { status: 400 });
    }

    await connectToDatabase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "An account with this email already exists." }, { status: 409 });
    }

    const adminEmails = String(process.env.ADMIN_EMAILS || "")
      .split(",")
      .map((item) => item.trim().toLowerCase())
      .filter(Boolean);
    const userCount = await User.estimatedDocumentCount();
    const role = adminEmails.includes(email) || userCount === 0 ? "admin" : "user";

    const user = await User.create({
      name,
      email,
      role,
      passwordHash: await hashPassword(password),
    });

    const response = NextResponse.json(
      { message: "Account created successfully.", user: serializeUser(user) },
      { status: 201 }
    );
    setSessionCookie(response, signSession(user));
    return response;
  } catch (error) {
    return NextResponse.json({ message: error.message || "Signup failed." }, { status: 500 });
  }
}
