"use client"
// app/signup/page.jsx or pages/signup.js
import Head from "next/head";
import "./page.css";
import { useState } from "react";
import { toast , ToastContainer } from "react-toastify";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [name , setName] = useState("");
  const [pass , setPass] = useState("");
  const [email , setEmail] = useState("");


  const notify = () => toast.dark("Successfully SignUp")

  const HandleSubmit = (e) => {
e.preventDefault()
notify();
setName("");
setEmail("");
setPass("");


  }


  return (
    <>
      <Head>
        <title>Signup | Dawood Shoes</title>
        <meta
          name="description"
          content="Create your Dawood Shoes account to start shopping and receive exclusive promotions."
          />
      </Head>

      <section className="d-flex justify-content-center align-items-center min-vh-100 bg-dark">
        <div className="signup-box p-4 rounded-4 shadow-lg">
          <h1 className="text-center text-white fw-bold mb-4 fs-3">Signup</h1>

          <form onSubmit={HandleSubmit} className="d-flex flex-column align-items-center gap-3 w-100">
            <div className="w-100">
              <label htmlFor="name" className="form-label text-white">Full Name</label>
              <input
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="form-control input-bg"
                placeholder="John Doe"
                required
                />
            </div>

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
                  value={pass}
                  type={showPassword ? "text" : "password"}
                  className="form-control input-bg"
                  onChange={(e) => setPass(e.target.value)}
                  placeholder="Create a password"
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

            <button type="submit" className="w-100 btn2 text-white mt-3">Sign Up</button>
          </form>
        </div>
      </section>
<ToastContainer/>
    </>
  );
}
