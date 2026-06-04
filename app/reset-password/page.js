"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { PasswordField } from "@/components/auth/password-field";
import { apiRequest } from "@/lib/api/client";
import "./page.css";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const data = await apiRequest("/api/auth/reset-password", {
        method: "POST",
        body: { token, password },
      });
      toast.success(data.message);
      router.push("/login");
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
          <p>Secure account</p>
          <h1>New Password</h1>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Password
            <PasswordField
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="At least 8 characters"
              required
            />
          </label>

          <button type="submit" className="stoe-button auth-submit" disabled={loading || !token}>
            {loading ? "Saving..." : "Update Password"}
          </button>
        </form>

        {!token && <p className="token-warning">Reset token is missing.</p>}

        <p className="auth-switch">
          Need a new link? <Link href="/forgot-password">Request reset</Link>
        </p>
      </div>
    </section>
  );
}

export default function ResetPassword() {
  return (
    <Suspense
      fallback={
        <section className="auth-page">
          <div className="auth-panel stoe-panel">
            <p className="token-warning">Loading reset form...</p>
          </div>
        </section>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
