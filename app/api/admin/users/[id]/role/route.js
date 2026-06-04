import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/guards";
import { User } from "@/models/User";

export const runtime = "nodejs";

export async function PATCH(request, context) {
  try {
    const { user: admin, response } = await requireAdmin(request);
    if (response) {
      return response;
    }

    const { id } = await context.params;
    const body = await request.json();
    const role = String(body?.role || "").trim();

    if (!["user", "admin"].includes(role)) {
      return NextResponse.json({ message: "Invalid role." }, { status: 400 });
    }

    if (admin._id.toString() === id && role !== "admin") {
      return NextResponse.json({ message: "You cannot remove your own admin access." }, { status: 400 });
    }

    const user = await User.findByIdAndUpdate(id, { role }, { new: true }).select("-passwordHash");
    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    return NextResponse.json({
      message: "Role updated successfully.",
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        lastLoginAt: user.lastLoginAt,
      },
    });
  } catch (error) {
    return NextResponse.json({ message: error.message || "Could not update role." }, { status: 500 });
  }
}
