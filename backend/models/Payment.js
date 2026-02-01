// // const mongoose = require("mongoose");

// // const paymentSchema = new mongoose.Schema(
// //   {
// //     user: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "User",
// //       required: true,
// //     },
// //     notification: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "Notification",
// //       required: true,
// //     },
// //     razorpay_payment_id: {
// //       type: String,
// //       required: true,
// //     },
// //     amount: {
// //       type: Number,
// //       required: true,
// //     },
// //     currency: {
// //       type: String,
// //       default: "INR",
// //     },
// //     status: {
// //       type: String,
// //       default: "success",
// //     },
// //   },
// //   { timestamps: true }
// // );

// // module.exports = mongoose.model("Payment", paymentSchema);


// const mongoose = require("mongoose");

// const paymentSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     notification: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Notification",
//       required: true,
//     },
//     razorpay_payment_id: {
//       type: String,
//       required: true,
//     },
//     amount: {
//       type: Number,
//       required: true,
//     },
//     currency: {
//       type: String,
//       default: "INR",
//     },
//     status: {
//       type: String,
//       default: "success",
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Payment", paymentSchema);



const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  notification: { type: mongoose.Schema.Types.ObjectId, ref: "Notification", default: null },
  razorpay_payment_id: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ["success", "failed"], default: "success" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Payment", PaymentSchema);
