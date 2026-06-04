import mongoose from "mongoose";

const siteSettingsSchema = new mongoose.Schema(
  {
    singletonKey: {
      type: String,
      default: "site",
      unique: true,
      immutable: true,
    },
    contactEmail: {
      type: String,
      trim: true,
    },
    contactWhatsapp: {
      type: String,
      trim: true,
    },
    contactWhatsappDisplay: {
      type: String,
      trim: true,
    },
    contactLocation: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export const SiteSettings =
  mongoose.models.SiteSettings || mongoose.model("SiteSettings", siteSettingsSchema);
