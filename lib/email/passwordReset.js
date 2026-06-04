import nodemailer from "nodemailer";

function getSmtpConfig() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return {
    host,
    port,
    secure: process.env.SMTP_SECURE === "true" || port === 465,
    auth: { user, pass },
  };
}

function getMailer() {
  const config = getSmtpConfig();
  if (!config) {
    return null;
  }

  return nodemailer.createTransport(config);
}

function buildResetEmailHtml({ name, resetLink }) {
  const greeting = name ? `Hi ${name},` : "Hi,";

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #191919;">
      <p>${greeting}</p>
      <p>We received a request to reset your StepHub password.</p>
      <p>
        <a href="${resetLink}" style="display:inline-block;padding:12px 18px;background:#ff8835;color:#17120f;text-decoration:none;border-radius:8px;font-weight:700;">
          Reset password
        </a>
      </p>
      <p>Or copy this link into your browser:</p>
      <p><a href="${resetLink}">${resetLink}</a></p>
      <p>This link expires in 30 minutes. If you did not request a reset, you can ignore this email.</p>
      <p>— StepHub</p>
    </div>
  `;
}

export async function sendPasswordResetEmail({ email, name, resetLink }) {
  const from = process.env.SMTP_FROM || process.env.SMTP_USER;
  const mailer = getMailer();

  if (!mailer || !from) {
    console.info(`[shoehub] SMTP not configured. Password reset link for ${name || email}: ${resetLink}`);
    return { delivered: false, reason: "smtp_not_configured" };
  }

  await mailer.sendMail({
    from,
    to: email,
    subject: "Reset your StepHub password",
    text: [
      name ? `Hi ${name},` : "Hi,",
      "",
      "We received a request to reset your StepHub password.",
      `Reset link: ${resetLink}`,
      "",
      "This link expires in 30 minutes. If you did not request a reset, you can ignore this email.",
    ].join("\n"),
    html: buildResetEmailHtml({ name, resetLink }),
  });

  return { delivered: true };
}
