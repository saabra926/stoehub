"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import "./footer.css";

const fallbackContact = {
  email: "rdawood379@gmail.com",
  whatsappUrl: "https://wa.me/923144885177",
  whatsappDisplay: "+923144885177",
  location: "Faisalabad, Pakistan",
};

export function Footer() {
  const [contact, setContact] = useState(fallbackContact);

  useEffect(() => {
    const loadContact = () => {
      fetch("/api/site/contact", { cache: "no-store" })
        .then((response) => response.json())
        .then((data) => {
          if (data?.contact) {
            setContact(data.contact);
          }
        })
        .catch(() => {});
    };

    loadContact();
    window.addEventListener("shoehub-contact-changed", loadContact);
    return () => window.removeEventListener("shoehub-contact-changed", loadContact);
  }, []);

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <section className="footer-brand">
          <h2>StepHub</h2>
          <p>High-quality shoes for daily wear, training, and street style.</p>
        </section>

        <section>
          <h3>Quick Links</h3>
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/cart">Cart</Link>
          <Link href="/settings">Settings</Link>
        </section>

        <section>
          <h3>Account</h3>
          <Link href="/login">Login</Link>
          <Link href="/signup">Signup</Link>
          <Link href="/forgot-password">Forgot Password</Link>
          <Link href="/admin">Admin Panel</Link>
        </section>

        <section>
          <h3>Contact</h3>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          {contact.whatsappUrl ? (
            <a href={contact.whatsappUrl} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          ) : null}
          <span>{contact.location}</span>
        </section>
      </div>

      <div className="footer-bottom">
        <span>© 2026 StepHub.</span>
        <a href="https://github.com/dawood-rehman/stoehub" target="_blank" rel="noreferrer">Dawood Rehman</a>
      </div>
    </footer>
  );
}
