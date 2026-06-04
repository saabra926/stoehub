import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/guards";
import { User } from "@/models/User";

export const runtime = "nodejs";

export async function GET(request) {
  try {
    const { response } = await requireAdmin(request);
    if (response) {
      return response;
    }

    const users = await User.find()
      .sort({ createdAt: -1 })
      .select("-passwordHash -resetPasswordTokenHash -resetPasswordExpiresAt")
      .lean();

    return NextResponse.json({
      users: users.map((user) => ({
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        lastLoginAt: user.lastLoginAt,
      })),
    });
  } catch (error) {
    return NextResponse.json({ message: error.message || "Could not load users." }, { status: 500 });
  }
}
