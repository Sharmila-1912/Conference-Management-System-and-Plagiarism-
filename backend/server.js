
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const axios = require("axios");
require("dotenv").config();

// ✅ ROUTES
const authRoutes = require("./routes/authRoutes");
const conferenceRoutes = require("./routes/conferenceRoutes");
const paperRoutes = require("./routes/paperRoutes");
const adminRoutes = require("./routes/adminRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();

// ✅ MIDDLEWARE
app.use(cors());
app.use(express.json());

// ✅ Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ API ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/conference", conferenceRoutes);
app.use("/api/paper", paperRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/payments", paymentRoutes);   // ✅ FIXED HERE

// ------------------------
// ✅ CHECK ENV VARIABLES
// ------------------------
console.log("Loaded MONGO_URI:", process.env.MONGO_URI);
console.log("Loaded PORT:", process.env.PORT);
console.log("Loaded RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID ? "YES" : "NO");

// ------------------------
// ✅ MONGO CONNECTION
// ------------------------
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// ------------------------
// ✅ CHATBASE STREAMING ENDPOINT
// ------------------------
const CHATBASE_API_KEY = process.env.CHATBASE_API_KEY || "2f9080ca-a16b-4345-b5bc-ead09ccad0ba";
const CHATBOT_ID = process.env.CHATBOT_ID || "7sRYlbzThjREaJsrZn1VI";
const CHATBASE_API_URL = "https://www.chatbase.co/api/v1/chat";

app.post("/api/chat/stream", async (req, res) => {
  const userMessage = req.body.message;

  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  try {
    const response = await axios.post(
      CHATBASE_API_URL,
      {
        messages: [{ content: userMessage, role: "user" }],
        chatbotId: CHATBOT_ID,
        stream: true,
        temperature: 0,
      },
      {
        headers: {
          Authorization: `Bearer ${CHATBASE_API_KEY}`,
          "Content-Type": "application/json",
        },
        responseType: "stream",
      }
    );

    response.data.on("data", (chunk) => {
      const lines = chunk.toString().split("\n").filter(Boolean);
      lines.forEach((line) => {
        try {
          const parsed = JSON.parse(line);
          if (parsed?.reply) {
            res.write(`data: ${parsed.reply}\n\n`);
          }
        } catch (e) {}
      });
    });

    response.data.on("end", () => {
      res.write("event: end\ndata: \n\n");
      res.end();
    });

  } catch (err) {
    console.error("Chatbase Error:", err.message);
    res.write(`event: error\ndata: ${err.message}\n\n`);
    res.end();
  }
});

// ------------------------
// ✅ START SERVER
// ------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
