"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { PasswordField } from "@/components/auth/password-field";
import { apiRequest, notifyAuthChanged } from "@/lib/api/client";
import "./page.css";

export default function Signup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const data = await apiRequest("/api/auth/signup", {
        method: "POST",
        body: { name, email, password },
      });
      toast.success(data.user?.role === "admin" ? "Admin account created" : "Account created");
      notifyAuthChanged();
      router.push(data.user?.role === "admin" ? "/admin" : "/products");
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
          <p>Join StepHub</p>
          <h1>Signup</h1>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Full Name
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              type="text"
              className="form-control stoe-input"
              placeholder="John Doe"
              required
            />
          </label>

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
              placeholder="At least 8 characters"
              required
            />
          </label>

          <button type="submit" className="stoe-button auth-submit" disabled={loading}>
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </div>
    </section>
  );
}
