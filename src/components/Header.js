
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiLogIn, FiBell } from "react-icons/fi";
import axios from "axios";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const handleLogin = () => {
    const existing = window.confirm(
      "Existing user? Click OK for Login. Cancel for Sign Up."
    );
    if (existing) navigate("/login");
    else navigate("/signup");
  };

  // ✅ Fetch notification count
  useEffect(() => {
    if (!userId || !token) return;

    axios.get(`http://localhost:5000/api/notifications/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      const unread = res.data.filter(n => !n.isRead);
      setNotifications(unread);
    });
  }, [userId, token]);

  return (
    <header className="header">
      <div className="top-row">
        <div className="left-group">
          <img src="/logo.jpg" className="logo" alt="logo" />
          <div className="college-text">
            <h1>KONGU ENGINEERING COLLEGE (Autonomous)</h1>
            <p>Affiliated to Anna University | NAAC A++ | Perundurai, Erode - 638060</p>
          </div>
        </div>
      </div>

      <nav className="nav">
        <Link to="/">Home</Link>

        <div className="dropdown">
          <span className="nav-link">RND ▾</span>
          <div className="dropdown-menu">
            <Link to="/rnd">About</Link>
            <Link to="/conference">Conference</Link>
            <Link to="/important-dates">Important Dates</Link>
          </div>
        </div>

        <Link to="/submit-paper">Submit Paper</Link>

        {/* ✅ RIGHT ICON GROUP */}
        <div className="right-icons">

          {/* 🔔 NOTIFICATION ICON */}
          <div
            className="notification-icon"
            onClick={() => navigate("/notifications")}
          >
            <FiBell size={22} />

            {notifications.length > 0 && (
              <span className="notification-badge">
                {notifications.length}
              </span>
            )}
          </div>

          {/* ✅ LOGIN ICON */}
          <div className="login-icon" onClick={handleLogin}>
            <FiLogIn size={24} />
          </div>

        </div>
      </nav>
    </header>
  );
}

export default Header;

