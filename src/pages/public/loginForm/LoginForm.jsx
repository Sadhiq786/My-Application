import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

const API_URL = "http://localhost:5091/Login";

const LoginForm = () => {
  const [values, setValues] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const onChange = (e) =>
    setValues((s) => ({ ...s, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    const username = values.username.trim();
    const password = values.password;

    if (!username || !password) {
      setErr("Please enter both username and password.");
      return;
    }

    setLoading(true);

    // 15s timeout for fetch
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      // Try to parse JSON even on non-2xx to read error message
      let data;
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      if (!res.ok) {
        const msg =
          data?.message ||
          `Login failed (HTTP ${res.status}${res.statusText ? `: ${res.statusText}` : ""}).`;
        throw new Error(msg);
      }

      // Expecting: { success: true, message: "...", body: { accessToken: "..." } }
      if (data?.success) {
        const token = data?.body?.accessToken || "";
        localStorage.setItem("auth_username", username);
        localStorage.setItem("auth_token", token);
        setValues((s) => ({ ...s, password: "" }));
        navigate("/dashboard", { replace: true });
      } else {
        throw new Error(data?.message || "Login failed.");
      }
    } catch (error) {
      if (error.name === "AbortError") {
        setErr("Request timed out. Please try again.");
      } else {
        setErr(error.message || "Network error. Check API URL/CORS.");
      }
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  };

  return (
    <div className="login-form-page">
      <div className="login-form-wrap">
        <div className="login-form">
          <h1>Welcome</h1>

          {err ? (
            <p className="error" role="alert" style={{ color: "tomato" }}>
              {err}
            </p>
          ) : null}

          <form onSubmit={onSubmit}>
            <label>
              Username
              <input
                type="text"
                name="username"
                placeholder="your.username"
                value={values.username}
                onChange={onChange}
                required
                autoComplete="username"
              />
            </label>

            <label>
              Password
              <input
                type="password"
                name="password"
                placeholder="********"
                value={values.password}
                onChange={onChange}
                required
                autoComplete="current-password"
              />
            </label>

            <button type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
