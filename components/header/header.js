"use client";
import Link from "next/link";
import "./header.css";

export function Header() {
  // Close mobile menu after clicking a nav link
  const closeMobileMenu = () => {
    const navbarCollapse = document.getElementById("navbarContent");
    if (navbarCollapse?.classList.contains("show")) {
      new bootstrap.Collapse(navbarCollapse).hide(); 
    }
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3">
        <div className="container-fluid">
          {/* Logo */}
          <Link href="/" className="navbar-brand d-flex align-items-center" onClick={closeMobileMenu}>
            <img src="/Logo.jpg" alt="Logo" width={120} height={40} className="me-2" />
          </Link>

          {/* Toggler for mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Nav links */}
          <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
            <ul className="navbar-nav gap-lg-4 gap-2 align-items-center">
              <li className="nav-item ak-khas">
                <Link href="/" className="nav-link another-level fs-5 text-white" onClick={closeMobileMenu}>Home</Link>
              </li>
              <li className="nav-item ak-khas">
                <Link href="/login" className="nav-link another-level fs-5 text-white" onClick={closeMobileMenu}>Login</Link>
              </li>
              <li className="nav-item ak-khas">
                <Link href="/products" className="nav-link another-level fs-5 text-white" onClick={closeMobileMenu}>Products</Link>
              </li>
              <li className="nav-item ak-khas">
                <Link href="/signup" className="nav-link another-level fs-5 text-white" onClick={closeMobileMenu}>Signup</Link>
              </li>
              <li className="nav-item ak-khas">
                <Link href="/cart" className="nav-link another-level fs-5 text-white" onClick={closeMobileMenu}>Cart</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
