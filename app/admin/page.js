"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { apiRequest, notifyContactChanged } from "@/lib/api/client";
import "./page.css";

export default function AdminPage() {
  const [summary, setSummary] = useState(null);
  const [users, setUsers] = useState([]);
  const [contact, setContact] = useState(null);
  const [contactForm, setContactForm] = useState({
    email: "",
    whatsapp: "",
    whatsappDisplay: "",
    location: "",
  });
  const [savingContact, setSavingContact] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState("");

  const loadAdminData = async () => {
    setLoading(true);
    setError("");

    try {
      const [summaryData, usersData, contactData] = await Promise.all([
        apiRequest("/api/admin/summary"),
        apiRequest("/api/admin/users"),
        apiRequest("/api/admin/contact"),
      ]);
      setSummary(summaryData);
      setUsers(usersData.users);
      setContact(contactData.contact);
      setContactForm({
        email: contactData.contact.email || "",
        whatsapp: contactData.contact.whatsapp || "",
        whatsappDisplay: contactData.contact.whatsappDisplay || "",
        location: contactData.contact.location || "",
      });
    } catch (adminError) {
      setError(adminError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const handleContactChange = (field) => (event) => {
    setContactForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleContactSave = async (event) => {
    event.preventDefault();
    setSavingContact(true);

    try {
      const data = await apiRequest("/api/admin/contact", {
        method: "PATCH",
        body: contactForm,
      });
      setContact(data.contact);
      setContactForm({
        email: data.contact.email || "",
        whatsapp: data.contact.whatsapp || "",
        whatsappDisplay: data.contact.whatsappDisplay || "",
        location: data.contact.location || "",
      });
      notifyContactChanged();
      toast.success(data.message || "Contact updated");
    } catch (saveError) {
      toast.error(saveError.message);
    } finally {
      setSavingContact(false);
    }
  };

  const handleRoleChange = async (userId, role) => {
    setUpdatingId(userId);

    try {
      const data = await apiRequest(`/api/admin/users/${userId}/role`, {
        method: "PATCH",
        body: { role },
      });
      setUsers((current) => current.map((user) => (user.id === userId ? data.user : user)));
      toast.success("User role updated");
      loadAdminData();
    } catch (roleError) {
      toast.error(roleError.message);
    } finally {
      setUpdatingId("");
    }
  };

  if (loading) {
    return (
      <section className="page-shell admin-page">
        <div className="admin-state stoe-panel">Loading admin panel...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="page-shell admin-page">
        <div className="admin-state stoe-panel">
          <h1>Admin Access</h1>
          <p>{error}</p>
          <Link href="/login" className="stoe-button">Login</Link>
        </div>
      </section>
    );
  }

  const stats = summary?.stats || {};

  return (
    <section className="page-shell admin-page">
      <div className="admin-heading">
        <p>Control room</p>
        <h1 className="section-title">Admin Panel</h1>
      </div>

      <div className="admin-stats">
        <article className="stoe-panel stat-card">
          <span>Total Users</span>
          <strong>{stats.totalUsers || 0}</strong>
        </article>
        <article className="stoe-panel stat-card">
          <span>Admins</span>
          <strong>{stats.adminUsers || 0}</strong>
        </article>
        <article className="stoe-panel stat-card">
          <span>Orders</span>
          <strong>{stats.totalOrders || 0}</strong>
        </article>
        <article className="stoe-panel stat-card">
          <span>Revenue</span>
          <strong>${Number(stats.revenue || 0).toFixed(2)}</strong>
        </article>
      </div>

      <div className="admin-grid">
        <section className="stoe-panel admin-card">
          <div className="admin-card-heading">
            <h2>Users</h2>
            <span>{users.length} total</span>
          </div>

          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <select
                        value={user.role}
                        onChange={(event) => handleRoleChange(user.id, event.target.value)}
                        disabled={updatingId === user.id}
                      >
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                      </select>
                    </td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="admin-sidebar">
          <section className="stoe-panel admin-card">
            <div className="admin-card-heading">
              <h2>Contact</h2>
              <span>Public support</span>
            </div>

            <form className="contact-form" onSubmit={handleContactSave}>
              <label className="contact-field">
                <span>Email</span>
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={handleContactChange("email")}
                  className="form-control stoe-input"
                  placeholder="support@example.com"
                  required
                />
              </label>

              <label className="contact-field">
                <span>WhatsApp number</span>
                <input
                  type="tel"
                  value={contactForm.whatsapp}
                  onChange={handleContactChange("whatsapp")}
                  className="form-control stoe-input"
                  placeholder="923001234567"
                  required
                />
              </label>

              <label className="contact-field">
                <span>WhatsApp display</span>
                <input
                  type="text"
                  value={contactForm.whatsappDisplay}
                  onChange={handleContactChange("whatsappDisplay")}
                  className="form-control stoe-input"
                  placeholder="+92 300 1234567"
                />
              </label>

              <label className="contact-field">
                <span>Location</span>
                <input
                  type="text"
                  value={contactForm.location}
                  onChange={handleContactChange("location")}
                  className="form-control stoe-input"
                  placeholder="Faisalabad, Pakistan"
                  required
                />
              </label>

              <button type="submit" className="stoe-button contact-save" disabled={savingContact}>
                {savingContact ? "Saving..." : "Save contact"}
              </button>
            </form>

            {contact?.whatsappUrl ? (
              <p className="contact-preview">
                Preview:{" "}
                <a href={contact.whatsappUrl} target="_blank" rel="noreferrer">
                  {contact.whatsappDisplay}
                </a>
              </p>
            ) : null}
          </section>

          <section className="stoe-panel admin-card">
            <div className="admin-card-heading">
              <h2>Recent Orders</h2>
              <span>{summary?.recentOrders?.length || 0} latest</span>
            </div>

            <div className="order-list">
              {summary?.recentOrders?.length ? (
                summary.recentOrders.map((order) => (
                  <article key={order.id} className="order-row">
                    <div>
                      <strong>{order.customer?.name || "Customer"}</strong>
                      <span>{order.status}</span>
                    </div>
                    <strong>${Number(order.total).toFixed(2)}</strong>
                  </article>
                ))
              ) : (
                <p className="admin-muted">No orders yet.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
