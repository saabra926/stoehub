"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { apiRequest, fetchSession, notifyAuthChanged } from "@/lib/api/client";
import "./header.css";

export function Header() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const fetchUser = async () => {
    const sessionUser = await fetchSession();
    setUser(sessionUser);
    setLoadingUser(false);
  };

  useEffect(() => {
    fetchUser();
    window.addEventListener("shoehub-auth-changed", fetchUser);
    return () => window.removeEventListener("shoehub-auth-changed", fetchUser);
  }, []);

  const closeMobileMenu = () => {
    const navbarCollapse = document.getElementById("navbarContent");
    if (navbarCollapse?.classList.contains("show")) {
      window.bootstrap?.Collapse.getOrCreateInstance(navbarCollapse).hide();
    }
  };

  const handleLogout = async () => {
    try {
      await apiRequest("/api/auth/logout", { method: "POST" });
      setUser(null);
      notifyAuthChanged();
      toast.success("Logged out successfully");
      closeMobileMenu();
      router.push("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const navLinkClass = "nav-link another-level";

  return (
    <header className="site-header">
      <nav className="navbar navbar-expand-lg navbar-dark py-3">
        <div className="site-nav">
          <div className="site-nav-bar">
          <Link href="/" className="navbar-brand brand-lockup" onClick={closeMobileMenu}>
            <img src="/Logo.jpg" alt="ShoeHub" width={124} height={42} className="brand-logo" />
          </Link>

          <button
            className="navbar-toggler site-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse site-nav-menu" id="navbarContent">
            <ul className="navbar-nav nav-items align-items-lg-center">
              <li className="nav-item">
                <Link href="/" className={navLinkClass} onClick={closeMobileMenu}>Home</Link>
              </li>
              <li className="nav-item">
                <Link href="/products" className={navLinkClass} onClick={closeMobileMenu}>Products</Link>
              </li>
              <li className="nav-item">
                <Link href="/cart" className={navLinkClass} onClick={closeMobileMenu}>Cart</Link>
              </li>
              {user?.role === "admin" && (
                <li className="nav-item">
                  <Link href="/admin" className={navLinkClass} onClick={closeMobileMenu}>Admin</Link>
                </li>
              )}
              {user ? (
                <>
                  <li className="nav-item">
                    <Link href="/settings" className={navLinkClass} onClick={closeMobileMenu}>Settings</Link>
                  </li>
                  <li className="nav-item user-chip" title={user.email}>
                    {user.name}
                  </li>
                  <li className="nav-item">
                    <button type="button" className="nav-action" onClick={handleLogout}>Logout</button>
                  </li>
                </>
              ) : (
                !loadingUser && (
                  <>
                    <li className="nav-item">
                      <Link href="/login" className={navLinkClass} onClick={closeMobileMenu}>Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link href="/signup" className="nav-action" onClick={closeMobileMenu}>Signup</Link>
                    </li>
                  </>
                )
              )}
            </ul>
          </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
