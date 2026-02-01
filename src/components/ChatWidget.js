import React, { useState } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleOpen = () => setOpen(!open);

  const sendMessage = () => {
    if (!message) return;
    setReply("");
    setLoading(true);

    const eventSource = new EventSourcePolyfill(
      "http://localhost:5000/api/chat/stream",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      }
    );

    eventSource.onmessage = (e) => {
      setReply((prev) => prev + e.data);
    };

    eventSource.addEventListener("end", () => {
      setLoading(false);
      eventSource.close();
    });

    eventSource.addEventListener("error", () => {
      setLoading(false);
      eventSource.close();
    });

    setMessage("");
  };

  return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 9999 }}>
      {/* Toggle Button */}
      <button
        onClick={toggleOpen}
        style={{
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          fontSize: "24px"
        }}
      >
        💬
      </button>

      {/* Chat Box */}
      {open && (
        <div
          style={{
            width: "300px",
            maxHeight: "400px",
            background: "#fff",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            marginTop: "10px",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden"
          }}
        >
          <div
            style={{
              padding: "10px",
              backgroundColor: "#007bff",
              color: "#fff",
              fontWeight: "bold"
            }}
          >
            Chatbot
          </div>

          <div
            style={{
              flex: 1,
              padding: "10px",
              overflowY: "auto",
              whiteSpace: "pre-wrap"
            }}
          >
            {reply}
            {loading && <span>💬...</span>}
          </div>

          <div style={{ display: "flex", borderTop: "1px solid #ccc" }}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message"
              style={{ flex: 1, border: "none", padding: "10px" }}
              onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
            />
            <button
              onClick={sendMessage}
              style={{
                padding: "10px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                cursor: "pointer"
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
