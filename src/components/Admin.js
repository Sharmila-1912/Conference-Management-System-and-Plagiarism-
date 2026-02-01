import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiHome } from "react-icons/fi";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";
import "./Admin.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState({ users: 0, papers: 0, conferences: 0 });
  const [users, setUsers] = useState([]);
  const [papers, setPapers] = useState([]);
  const [conferences, setConferences] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
      } catch (err) {
        console.log("Error fetching stats:", err.response?.data || err.message);
      }
    };

    const fetchUsers = async () => {
      const res = await axios.get("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    };

    const fetchPapers = async () => {
      const res = await axios.get("http://localhost:5000/api/admin/papers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPapers(res.data);
    };

    const fetchConfs = async () => {
      const res = await axios.get("http://localhost:5000/api/admin/conferences", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setConferences(res.data);
    };

    fetchStats();
    if (activeTab === "users") fetchUsers();
    else if (activeTab === "papers") fetchPapers();
    else if (activeTab === "conference") fetchConfs();
  }, [activeTab, token]);

  /* ---------------- CHART DATA ---------------- */

  const barData = {
    labels: ["Users", "Papers", "Conferences"],
    datasets: [
      {
        label: "Count",
        data: [stats.users, stats.papers, stats.conferences],
        backgroundColor: [
          "rgba(75, 192, 192, 0.5)",
          "rgba(255, 99, 132, 0.5)",
          "rgba(53, 162, 235, 0.5)"
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(53, 162, 235, 1)"
        ],
        borderWidth: 1
      }
    ]
  };

  const pieData = {
    labels: ["Users", "Papers", "Conferences"],
    datasets: [
      {
        data: [stats.users, stats.papers, stats.conferences],
        backgroundColor: [
          "rgba(75, 192, 192, 0.7)",
          "rgba(255, 99, 132, 0.7)",
          "rgba(53, 162, 235, 0.7)"
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(53, 162, 235, 1)"
        ],
        borderWidth: 1
      }
    ]
  };
const lineData = {
  labels: ["Users", "Papers", "Conferences"],
  datasets: [
    {
      label: "Trend",
      data: [stats.users, stats.papers, stats.conferences],
      borderColor: "rgba(153, 102, 255, 1)",
      backgroundColor: "rgba(153, 102, 255, 0.2)",
      tension: 0.4,
      fill: true
    }
  ]
};

  const getPlagiarismColor = (percent) => {
    if (percent < 20) return "green";
    if (percent < 50) return "orange";
    return "red";
  };

  const handleDecision = async (paperId, decision) => {
    try {
      await axios.post(
        "http://localhost:5000/api/admin/paper-decision",
        { paperId, decision },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setPapers(prev =>
        prev.map(p => p._id === paperId ? { ...p, decision } : p)
      );

      alert(`Paper ${decision === "accept" ? "Accepted" : "Rejected"}`);
    } catch (err) {
      alert("Error updating decision");
    }
  };

  return (
    <div className="admin-page">
      <header className="admin-header-bar">
        <h1>Admin Dashboard</h1>
        <FiHome
          className="home-icon"
          size={28}
          onClick={() => (window.location.href = "/login")}
        />
      </header>

      <div className="admin-tabs">
        <button className={activeTab === "dashboard" ? "active" : ""} onClick={() => setActiveTab("dashboard")}>Dashboard</button>
        <button className={activeTab === "users" ? "active" : ""} onClick={() => setActiveTab("users")}>Users</button>
        <button className={activeTab === "papers" ? "active" : ""} onClick={() => setActiveTab("papers")}>Paper Submissions</button>
        <button className={activeTab === "conference" ? "active" : ""} onClick={() => setActiveTab("conference")}>Conferences</button>
      </div>

      <div className="admin-content">
        {activeTab === "dashboard" && (
          <div className="chart-container">
            <div className="chart-box">
              <h3>Total Counts</h3>
              <Bar data={barData} options={{ responsive: true }} />
            </div>

            <div className="chart-box">
              <h3>Distribution</h3>

              {/* ✅ REDUCED PIE CHART */}
              <div className="pie-wrapper">
                <Pie
                  data={pieData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <table>
            <thead>
              <tr>
                <th>Name</th><th>Email</th><th>College</th><th>Level</th><th>Mobile</th><th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id}>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td>{u.college}</td>
                  <td>{u.studyLevel}</td>
                  <td>{u.mobile}</td>
                  <td>{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === "papers" && (
          <table>
            <thead>
              <tr>
                <th>Paper ID</th>
                <th>Author</th>
                <th>Email</th>
                <th>Title</th>
                <th>Abstract</th>
                <th>Date</th>
                <th>Plagiarism</th>
                <th>Decision</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {papers.map(p => (
                <tr key={p._id}>
                  <td>{p.paperId}</td>
                  <td>{p.firstName} {p.lastName}</td>
                  <td>{p.email}</td>
                  <td>{p.title}</td>
                  <td>{p.abstract}</td>
                  <td>{new Date(p.date).toLocaleDateString()}</td>
                  <td style={{ color: getPlagiarismColor(p.plagiarismScore || 0) }}>
                    {p.plagiarismScore || 0}%
                  </td>
                  <td>
                    {p.decision ? (
                      <b style={{ color: p.decision === "accept" ? "green" : "red" }}>
                        {p.decision.toUpperCase()}
                      </b>
                    ) : (
                      <button
                        className={p.plagiarismScore < 15 ? "accept-btn" : "reject-btn"}
                        onClick={() => handleDecision(p._id, p.plagiarismScore < 15 ? "accept" : "reject")}
                      >
                        {p.plagiarismScore < 15 ? "Accept" : "Reject"}
                      </button>
                    )}
                  </td>
                  <td>
                    <a href={`http://localhost:5000/${p.filePath}`} target="_blank" rel="noreferrer">View</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === "conference" && (
          <table>
            <thead>
              <tr>
                <th>Conference</th><th>Participants</th><th>Date</th>
              </tr>
            </thead>
            <tbody>
              {conferences.map(c => (
                <tr key={c._id}>
                  <td>{c.conferenceTitle}</td>
                  <td>{c.participants.map(p => p.name).join(", ")}</td>
                  <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Admin;
