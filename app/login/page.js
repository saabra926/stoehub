"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { PasswordField } from "@/components/auth/password-field";
import { apiRequest, notifyAuthChanged } from "@/lib/api/client";
import "./page.css";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await apiRequest("/api/auth/login", {
        method: "POST",
        body: { email, password },
      });
      toast.success("Welcome back");
      notifyAuthChanged();
      router.push("/products");
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
          <p>Account access</p>
          <h1>Login</h1>
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

          <label>
            Password
            <PasswordField
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              required
            />
          </label>

          <div className="auth-row">
            <Link href="/forgot-password">Forgot password?</Link>
          </div>

          <button type="submit" className="stoe-button auth-submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="auth-switch">
          New here? <Link href="/signup">Create an account</Link>
        </p>
      </div>
    </section>
  );
}
