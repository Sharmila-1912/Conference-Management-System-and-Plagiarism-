import React, { useState } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";

export default function ChatStream() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  const sendMessage = () => {
    setReply(""); // Reset previous reply

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
      eventSource.close();
    });

    eventSource.addEventListener("error", (e) => {
      console.error("SSE error", e);
      eventSource.close();
    });

    setMessage("");
  };

  return (
    <div>
      <h2>Live Chatbot</h2>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
      />
      <button onClick={sendMessage}>Send</button>
      <div style={{ marginTop: "10px", whiteSpace: "pre-wrap" }}>{reply}</div>
    </div>
  );
}
