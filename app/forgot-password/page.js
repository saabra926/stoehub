"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { apiRequest } from "@/lib/api/client";
import "./page.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [resetLink, setResetLink] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setResetLink("");

    try {
      const data = await apiRequest("/api/auth/forgot-password", {
        method: "POST",
        body: { email },
      });
      toast.success(data.message);
      if (data.resetLink) {
        setResetLink(data.resetLink);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-panel stoe-panel">
        <div className="auth-heading">
          <p>Password help</p>
          <h1>Reset Link</h1>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="form-control stoe-input"
              placeholder="you@example.com"
              required
            />
          </label>

          <button type="submit" className="stoe-button auth-submit" disabled={loading}>
            {loading ? "Preparing..." : "Send Reset Link"}
          </button>
        </form>

        {resetLink ? (
          <div className="reset-link-box">
            <span>SMTP is not configured yet. Use this development reset link:</span>
            <Link href={resetLink}>{resetLink}</Link>
          </div>
        ) : (
          <p className="auth-hint">Check your inbox for the reset link. It expires in 30 minutes.</p>
        )}

        <p className="auth-switch">
          Remembered it? <Link href="/login">Login</Link>
        </p>
      </div>
    </section>
  );
}
