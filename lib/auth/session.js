import jwt from "jsonwebtoken";

export const SESSION_COOKIE = "shoehub_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

function getSessionSecret() {
  const secret = process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET;

  if (!secret && process.env.NODE_ENV === "production") {
    throw new Error("JWT_SECRET is required in production.");
  }

  return secret || "shoehub-development-session-secret";
}

export function signSession(user) {
  return jwt.sign(
    {
      sub: user._id?.toString?.() || user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    getSessionSecret(),
    { expiresIn: SESSION_MAX_AGE }
  );
}

export function verifySession(token) {
  if (!token) {
    return null;
  }

  try {
    return jwt.verify(token, getSessionSecret());
  } catch {
    return null;
  }
}

export function getSessionToken(request) {
  return request.cookies.get(SESSION_COOKIE)?.value;
}

export function getSessionPayload(request) {
  return verifySession(getSessionToken(request));
}

export function sessionPayloadToUser(payload) {
  if (!payload?.sub) {
    return null;
  }

  return {
    id: payload.sub,
    name: payload.name,
    email: payload.email,
    role: payload.role,
  };
}

export function setSessionCookie(response, token) {
  response.cookies.set({
    name: SESSION_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export function clearSessionCookie(response) {
  response.cookies.set({
    name: SESSION_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}
