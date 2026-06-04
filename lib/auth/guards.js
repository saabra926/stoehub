import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/connect";
import { getSessionPayload } from "@/lib/auth/session";
import { User, serializeUser } from "@/models/User";

export async function getAuthUser(request, options = {}) {
  const payload = getSessionPayload(request);

  if (!payload?.sub) {
    return null;
  }

  await connectToDatabase();

  const query = User.findById(payload.sub);
  if (options.includePassword) {
    query.select("+passwordHash");
  }

  return query;
}

export async function requireAuth(request, options = {}) {
  const user = await getAuthUser(request, options);

  if (!user) {
    return {
      user: null,
      response: NextResponse.json({ message: "Please login first." }, { status: 401 }),
    };
  }

  return { user, response: null };
}

export async function requireAdmin(request) {
  const { user, response } = await requireAuth(request);

  if (response) {
    return { user: null, response };
  }

  if (user.role !== "admin") {
    return {
      user: null,
      response: NextResponse.json({ message: "Admin access required." }, { status: 403 }),
    };
  }

  return { user, response: null };
}

export function toUserResponse(user) {
  return serializeUser(user);
}
