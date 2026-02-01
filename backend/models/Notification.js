// const mongoose = require("mongoose");

// const notificationSchema = new mongoose.Schema(
//   {
//     user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     paper: { type: mongoose.Schema.Types.ObjectId, ref: "Paper" },
//     message: { type: String, required: true },
//     actionUrl: { type: String, default: null },
//     isRead: { type: Boolean, default: false },
//     isPaid: { type: Boolean, default: false },
//     paidAmount: { type: Number, default: 0 },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Notification", notificationSchema);

const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    paper: { type: mongoose.Schema.Types.ObjectId, ref: "Paper" },
    message: { type: String, required: true },

    // ✅ Payment System
    requiresPayment: { type: Boolean, default: false },
    isPaid: { type: Boolean, default: false },

    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Notification ||
  mongoose.model("Notification", notificationSchema);
