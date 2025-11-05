// src/components/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false); // ✅ loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email.trim(),
          password: credentials.password.trim(),
        }),
      });

      const json = await response.json();

      if (json.success) {
        // ✅ Save token
        localStorage.setItem("token", json.authToken);


        // ✅ Show success alert
        props.showAlert("Logged in successfully!", "success");

        // ✅ Redirect to home
        navigate("/");
      } else {
        // ❌ Show invalid credentials alert
        props.showAlert("Invalid credentials!", "danger");
      }
    } catch (error) {
      console.error("Login error:", error);
      props.showAlert("Server error. Please try again later.", "danger");
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // ✅ Disable login button if fields are empty or loading
  const isDisabled =
    loading || credentials.email.trim() === "" || credentials.password.trim() === "";

  return (
    <div className="container mt-3" style={{ maxWidth: "500px" }}>
      <h2 className="mb-3">Login to Continue</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            onChange={onChange}
            required
            autoFocus
            autoComplete="username"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
            required
            autoComplete="current-password"
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={isDisabled}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
