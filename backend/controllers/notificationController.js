const Notification = require("../models/Notification");
const authMiddleware = require("../middleware/auth");
const express = require("express");
const router = express.Router();

// ------------------- GET USER NOTIFICATIONS -------------------
router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch notifications for logged-in user, latest first
    const notifications = await Notification.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate("paper", "title paperId"); // optional: include paper title/id

    res.json({ notifications });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching notifications" });
  }
});

// ------------------- MARK NOTIFICATION AS READ -------------------
router.put("/mark-read/:id", authMiddleware, async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) return res.status(404).json({ message: "Notification not found" });

    notification.isRead = true;
    await notification.save();

    res.json({ success: true, message: "Notification marked as read" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating notification" });
  }
});

// ------------------- MARK PAYMENT SUCCESS -------------------
router.put("/payment-success/:id", authMiddleware, async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id).populate("user");
    if (!notification) return res.status(404).json({ message: "Notification not found" });

    notification.isPaid = true;
    notification.isRead = true;
    notification.message += " ✅ Payment Completed";
    await notification.save();

    // Send email to user
    const nodemailer = require("nodemailer");
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: notification.user.email,
      subject: "Payment Received",
      text: `Dear ${notification.user.username || "User"},\n\nYour payment of ₹${notification.paidAmount || "N/A"} has been received.\n\nThank you!\nAdmin`,
    });

    res.json({ success: true, message: "Payment marked completed & email sent", notification });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Payment update failed", error: err.message });
  }
});

module.exports = router;
