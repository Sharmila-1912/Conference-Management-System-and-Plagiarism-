import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./conference.css";

function Conference() {
  const [title, setTitle] = useState("");
  const [count, setCount] = useState(1);
  const [participants, setParticipants] = useState([{ name: "", email: "" }]);
  const [list, setList] = useState([]);
  const [user, setUser] = useState(null);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!token) {
      alert("Please login first!");
      navigate("/login");
    }
  }, [token, navigate]);

  // Fetch logged-in user
  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data);
          setParticipants([{ name: res.data.username, email: res.data.email }]);
        })
        .catch((err) => console.log(err));
    }
  }, [token]);

  // Fetch only user’s conferences
  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:5000/api/conference/list", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setList(res.data))
        .catch((err) => console.log(err));
    }
  }, [token]);

  // Update number of participants (LIMIT 3)
  const updateCount = (val) => {
    let c = Number(val);

    if (c > 3) {
      alert("Maximum 3 participants allowed!");
      c = 3;
    }
    if (c < 1) c = 1;

    setCount(c);

    const arr = [...participants];

    if (c > arr.length) {
      while (arr.length < c) arr.push({ name: "", email: "" });
    } else if (c < arr.length) {
      arr.splice(c);
    }

    setParticipants(arr);
  };

  // Update participant details
  const handleParticipantChange = (index, field, value) => {
    const updated = [...participants];
    updated[index][field] = value;
    setParticipants(updated);
  };

  // Submit conference
  const handleSubmit = () => {
    if (!title) return alert("Please enter a conference title");

    axios
      .post(
        "http://localhost:5000/api/conference/register",
        { conferenceTitle: title, participants },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        alert("Conference Registered");
        setTitle("");
        setCount(1);
        setParticipants([{ name: user.username, email: user.email }]);

        return axios.get("http://localhost:5000/api/conference/list", {
          headers: { Authorization: `Bearer ${token}` },
        });
      })
      .then((res) => setList(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="auth-container">
      {user && <h2>Welcome, {user.username}</h2>}

      <h3>Register Conference</h3>

      <input
        placeholder="Conference Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="number"
        min="1"
        max="3"
        placeholder="Number of Participants (Max 3)"
        value={count}
        onChange={(e) => updateCount(e.target.value)}
      />

      {participants.map((p, i) => (
        <div key={i} className="participant-box">
          <h4>Participant {i + 1}</h4>
          <input
            placeholder="Name"
            value={p.name}
            onChange={(e) =>
              handleParticipantChange(i, "name", e.target.value)
            }
          />
          <input
            placeholder="Email"
            value={p.email}
            onChange={(e) =>
              handleParticipantChange(i, "email", e.target.value)
            }
          />
        </div>
      ))}

      <button className="auth-btn" onClick={handleSubmit}>
        Submit Conference
      </button>

      <h3>My Registered Conferences</h3>

      {list.length === 0 && <p>No conferences registered yet.</p>}

      {list.map((item) => (
        <div key={item._id} className="list-box">
          <b>{item.conferenceTitle}</b>
          <div className="participant-display">
            {item.participants.map((p, idx) => (
              <p key={idx}>
                {p.name} — {p.email}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Conference;
