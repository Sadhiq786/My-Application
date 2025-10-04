import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

const LoginForm = () => {
  const [values, setValues] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const onChange = (e) =>
    setValues((s) => ({ ...s, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("auth_username", values.username.trim());
    setValues({ username: values.username, password: "" });
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="login-form-page">
      <div className="login-form-wrap">
        <div className="login-form">
          <h1>Welcome</h1>
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

            <button type="submit">Sign in</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
