import { connectToDatabase } from "@/lib/db/connect";
import { isEmail, normalizeEmail } from "@/lib/validators/auth";
import { SiteSettings } from "@/models/SiteSettings";

function digitsOnly(value) {
  return String(value || "").replace(/\D/g, "");
}

function getEnvContact() {
  const whatsapp = digitsOnly(process.env.SITE_CONTACT_WHATSAPP || "923144885177");

  return {
    email: process.env.SITE_CONTACT_EMAIL || "rdawood379@gmail.com",
    whatsapp,
    whatsappDisplay: process.env.SITE_CONTACT_WHATSAPP_DISPLAY || `+${whatsapp}`,
    location: process.env.SITE_CONTACT_LOCATION || "Faisalabad, Pakistan",
  };
}

export function formatSiteContact({ email, whatsapp, whatsappDisplay, location }) {
  const normalizedWhatsapp = digitsOnly(whatsapp);
  const display =
    String(whatsappDisplay || "").trim() ||
    (normalizedWhatsapp ? `+${normalizedWhatsapp}` : "");

  return {
    email: String(email || "").trim(),
    whatsapp: normalizedWhatsapp,
    whatsappDisplay: display,
    whatsappUrl: normalizedWhatsapp ? `https://wa.me/${normalizedWhatsapp}` : "",
    location: String(location || "").trim(),
  };
}

export async function getSiteContact() {
  const defaults = getEnvContact();

  try {
    await connectToDatabase();
    const settings = await SiteSettings.findOne({ singletonKey: "site" }).lean();

    if (!settings) {
      return formatSiteContact(defaults);
    }

    return formatSiteContact({
      email: settings.contactEmail || defaults.email,
      whatsapp: settings.contactWhatsapp || defaults.whatsapp,
      whatsappDisplay: settings.contactWhatsappDisplay || defaults.whatsappDisplay,
      location: settings.contactLocation || defaults.location,
    });
  } catch {
    return formatSiteContact(defaults);
  }
}

export function validateSiteContact(body) {
  const email = normalizeEmail(body?.email);
  const whatsapp = digitsOnly(body?.whatsapp);
  const whatsappDisplay = String(body?.whatsappDisplay || "").trim();
  const location = String(body?.location || "").trim();
  const errors = {};

  if (!isEmail(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (whatsapp.length < 10) {
    errors.whatsapp = "Enter a valid WhatsApp number.";
  }

  if (!location) {
    errors.location = "Location is required.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    values: {
      email,
      whatsapp,
      whatsappDisplay: whatsappDisplay || `+${whatsapp}`,
      location,
    },
  };
}

export async function updateSiteContact(body) {
  const { valid, errors, values } = validateSiteContact(body);

  if (!valid) {
    return { ok: false, errors };
  }

  await connectToDatabase();

  const settings = await SiteSettings.findOneAndUpdate(
    { singletonKey: "site" },
    {
      contactEmail: values.email,
      contactWhatsapp: values.whatsapp,
      contactWhatsappDisplay: values.whatsappDisplay,
      contactLocation: values.location,
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  return {
    ok: true,
    contact: formatSiteContact({
      email: settings.contactEmail,
      whatsapp: settings.contactWhatsapp,
      whatsappDisplay: settings.contactWhatsappDisplay,
      location: settings.contactLocation,
    }),
  };
}
