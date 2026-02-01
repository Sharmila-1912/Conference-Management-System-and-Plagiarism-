import React, { useState } from "react";
import axios from "axios";
import "./auth.css";

function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    college: "",
    level: "",
    mobile: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", form);

      alert(res.data.message || "Signup successful! Check your email.");

      // Redirect to login after successful signup
      window.location.href = "/login";
    } catch (err) {
      console.error("Signup Error:", err);
      alert(err.response?.data?.message || "Signup failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>

      <input
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
      />
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
      <input
        name="college"
        placeholder="College Name"
        value={form.college}
        onChange={handleChange}
      />

      <select name="level" value={form.level} onChange={handleChange}>
        <option value="">UG / PG</option>
        <option value="UG">UG</option>
        <option value="PG">PG</option>
      </select>

      <input
        name="mobile"
        placeholder="Mobile Number"
        value={form.mobile}
        onChange={handleChange}
      />

      <select name="role" value={form.role} onChange={handleChange}>
        <option value="">Student / Faculty</option>
        <option value="Student">Student</option>
        <option value="Faculty">Faculty</option>
      </select>

      <button className="auth-btn" onClick={handleSignup} disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>

      <div
        className="auth-link"
        onClick={() => (window.location.href = "/login")}
      >
        Already have an account? Login
      </div>
    </div>
  );
}

export default Signup;
