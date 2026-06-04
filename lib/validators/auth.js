export function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

export function isEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePassword(password) {
  if (String(password || "").length < 8) {
    return "Password must be at least 8 characters.";
  }

  return null;
}

export function validateSignup(body) {
  const name = String(body?.name || "").trim();
  const email = normalizeEmail(body?.email);
  const password = String(body?.password || "");
  const errors = {};

  if (name.length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }

  if (!isEmail(email)) {
    errors.email = "Enter a valid email address.";
  }

  const passwordError = validatePassword(password);
  if (passwordError) {
    errors.password = passwordError;
  }

  return { name, email, password, errors, valid: Object.keys(errors).length === 0 };
}

export function validateLogin(body) {
  const email = normalizeEmail(body?.email);
  const password = String(body?.password || "");
  const errors = {};

  if (!isEmail(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!password) {
    errors.password = "Password is required.";
  }

  return { email, password, errors, valid: Object.keys(errors).length === 0 };
}
