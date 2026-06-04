"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { apiRequest, fetchSession, notifyAuthChanged } from "@/lib/api/client";
import "./page.css";

export default function SettingsPage() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    let mounted = true;

    fetchSession()
      .then((sessionUser) => {
        if (!mounted) {
          return;
        }

        setUser(sessionUser);
        if (sessionUser) {
          setForm((value) => ({
            ...value,
            name: sessionUser.name,
            email: sessionUser.email,
          }));
        }
      })
      .finally(() => mounted && setLoadingUser(false));

    return () => {
      mounted = false;
    };
  }, []);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);

    try {
      const data = await apiRequest("/api/user/settings", {
        method: "PATCH",
        body: form,
      });
      setUser(data.user);
      setForm((current) => ({
        ...current,
        name: data.user.name,
        email: data.user.email,
        currentPassword: "",
        newPassword: "",
      }));
      notifyAuthChanged();
      toast.success("Settings updated");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loadingUser) {
    return (
      <section className="page-shell settings-page">
        <div className="settings-panel stoe-panel">
          <p className="settings-muted">Loading settings...</p>
        </div>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="page-shell settings-page">
        <div className="settings-panel stoe-panel settings-empty">
          <h1>Login Required</h1>
          <p>Login to manage your profile details and password.</p>
          <Link href="/login" className="stoe-button">Login</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="page-shell settings-page">
      <div className="settings-heading">
        <p>Profile</p>
        <h1 className="section-title">Account Settings</h1>
      </div>

      <form onSubmit={handleSubmit} className="settings-panel stoe-panel">
        <div className="settings-grid">
          <label>
            Full Name
            <input
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              className="form-control stoe-input"
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              className="form-control stoe-input"
              required
            />
          </label>

          <label>
            Current Password
            <input
              type="password"
              value={form.currentPassword}
              onChange={(event) => updateField("currentPassword", event.target.value)}
              className="form-control stoe-input"
              placeholder="Required when changing password"
            />
          </label>

          <label>
            New Password
            <input
              type="password"
              value={form.newPassword}
              onChange={(event) => updateField("newPassword", event.target.value)}
              className="form-control stoe-input"
              placeholder="Leave blank to keep current"
            />
          </label>
        </div>

        <div className="settings-actions">
          <span>{user.role === "admin" ? "Admin account" : "Customer account"}</span>
          <button type="submit" className="stoe-button" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </section>
  );
}
