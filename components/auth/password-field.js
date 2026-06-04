"use client";

import { useState } from "react";
import "./password-field.css";

function EyeOpenIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"
      />
      <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-10-8-10-8a18.45 18.45 0 0 1 5.06-6.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 10 8 10 8a18.5 18.5 0 0 1-2.16 3.19M14.12 14.12a3 3 0 1 1-4.24-4.24"
      />
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m1 1 22 22" />
    </svg>
  );
}

export function PasswordField({ value, onChange, placeholder = "Password", required, id, name }) {
  const [showPassword, setShowPassword] = useState(false);

  const toggle = () => setShowPassword((current) => !current);

  return (
    <div className="password-field">
      <input
        id={id}
        name={name}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        className="form-control stoe-input password-field__input"
        placeholder={placeholder}
        required={required}
        autoComplete={name || "current-password"}
      />
      <button
        type="button"
        className="stoe-button secondary password-field__toggle password-field__toggle--text"
        onClick={toggle}
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? "Hide" : "Show"}
      </button>
      <button
        type="button"
        className="password-field__toggle password-field__toggle--icon"
        onClick={toggle}
        aria-label={showPassword ? "Hide password" : "Show password"}
        aria-pressed={showPassword}
      >
        {showPassword ? <EyeOffIcon /> : <EyeOpenIcon />}
      </button>
    </div>
  );
}
