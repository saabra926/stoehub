"use client"
// app/login/page.jsx or pages/login.js (depending on your structure)
import Head from 'next/head';
import "./page.css";
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const notify = () => toast.dark("successfully Login")

  const handleSubmit = (e) => {
    e.preventDefault();
    notify();
    setEmail("");
    setPass("");
  };

  return (
    <>
      <ToastContainer />
      <Head>
        <title>Login | Dawood Shoes</title>
        <meta name="description" content="Login to your Dawood Shoes account to manage your orders and access exclusive deals." />
      </Head>

      <section className="d-flex justify-content-center align-items-center min-vh-100 bg-dark">
        <div className="login-box p-4 rounded-4 shadow-lg">
          <h1 className="text-center text-white fw-bold mb-4 fs-3">Login</h1>

          <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center gap-3 w-100">
            <div className="w-100">
              <label htmlFor="email" className="form-label text-white">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control input-bg"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="w-100">
              <label htmlFor="password" className="form-label text-white">Password</label>
              <div className="d-flex gap-2">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="form-control input-bg"
                  placeholder="Password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn-show text-white"
                  onClick={() => setShowPassword(prev => !prev)}
                >
                  <small>{showPassword ? "Hide" : "Show"}</small>
                </button>
              </div>
            </div>

            <div className="form-check mt-2 w-100">
              <input type="checkbox" className="form-check-input checkbox" id="promoCheck" />
              <label className="form-check-label text-white" htmlFor="promoCheck">
                I want promotional and marketing emails
              </label>
            </div>

            <button type="submit" className="w-100 btn2 text-white mt-3">Login</button>
          </form>
        </div>
      </section>
    </>
  );
}
