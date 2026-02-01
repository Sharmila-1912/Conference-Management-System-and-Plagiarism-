import React, { useState } from "react";
import axios from "axios";
import "./auth.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);

      // Store JWT in localStorage
      localStorage.setItem("token", res.data.token);

      // Redirect based on role
      if (res.data.isAdmin) {
        window.location.href = "/admin";
      } else {
        window.location.href = "/conference";
      }
    } catch (err) {
      console.error("Login Error:", err);
      alert(err.response?.data?.message || "Invalid Credentials!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />

      <button className="auth-btn" onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>

      <div
        className="auth-link"
        onClick={() => (window.location.href = "/signup")}
      >
        New user? Create an account
      </div>
    </div>
  );
}

export default Login;
