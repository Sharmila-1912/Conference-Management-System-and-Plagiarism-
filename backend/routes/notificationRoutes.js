// const express = require("express");
// const router = express.Router();
// const authMiddleware = require("../middleware/auth");
// const Notification = require("../models/Notification");

// // ✅ GET LOGGED-IN USER NOTIFICATIONS
// router.get("/", authMiddleware, async (req, res) => {
//   try {
//     const notifications = await Notification.find({
//       user: req.user.id,   // ✅ MATCHES auth.js
//     }).sort({ createdAt: -1 });

//     res.json({ notifications });  // ✅ THIS FORMAT IS REQUIRED BY YOUR FRONTEND
//   } catch (err) {
//     console.error("Fetch notifications error:", err);
//     res.status(500).json({ message: "Failed to fetch notifications" });
//   }
// });

// // ✅ MARK AS READ
// router.put("/mark-read/:id", authMiddleware, async (req, res) => {
//   try {
//     const notification = await Notification.findOneAndUpdate(
//       { _id: req.params.id, user: req.user.id }, // ✅ SECURE FILTER
//       { isRead: true },
//       { new: true }
//     );

//     res.json({ success: true, notification });
//   } catch (err) {
//     console.error("Mark read error:", err);
//     res.status(500).json({ message: "Failed to mark as read" });
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");
const authMiddleware = require("../middleware/auth");

// ✅ GET USER NOTIFICATIONS
router.get("/", authMiddleware, async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.json({ notifications });
  } catch (err) {
    res.status(500).json({ message: "Fetch failed", error: err.message });
  }
});

// ✅ MARK READ
router.put("/mark-read/:id", authMiddleware, async (req, res) => {
  await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
  res.json({ success: true });
});

module.exports = router;
