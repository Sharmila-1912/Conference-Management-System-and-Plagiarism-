// const Payment = require("../models/Payment");
// const Notification = require("../models/Notification");

// exports.savePayment = async (req, res) => {
//   try {
//     const { razorpay_payment_id, amount, notificationId } = req.body;

//     if (!razorpay_payment_id || !amount || !notificationId) {
//       return res.status(400).json({ message: "Missing payment fields" });
//     }

//     // ✅ Find Notification
//     const notification = await Notification.findById(notificationId);
//     if (!notification) {
//       return res.status(404).json({ message: "Notification not found" });
//     }

//     // ✅ Prevent duplicate payment
//     if (notification.isPaid) {
//       return res.status(400).json({ message: "Already Paid" });
//     }

//     // ✅ Save Payment
//     const payment = await Payment.create({
//       user: notification.user,
//       notification: notification._id,
//       razorpay_payment_id,
//       amount,
//       status: "success",
//     });

//     // ✅ Update Notification
//     notification.isPaid = true;
//     await notification.save();

//     res.json({
//       success: true,
//       message: "Payment saved & notification updated",
//       payment,
//     });

//   } catch (err) {
//     console.error("❌ Payment Save Error:", err);
//     res.status(500).json({
//       message: "Payment save failed",
//       error: err.message,
//     });
//   }
// };




const Payment = require("../models/Payment");
const Notification = require("../models/Notification");

// Optional: placeholder for sending notifications (email/in-app)
const sendPaymentNotification = async (userEmail, notification) => {
  console.log(`✅ Sending payment success notification to ${userEmail}`);
  if (notification) {
    console.log(`Notification ID: ${notification._id}, Amount: ${notification.amount}`);
  }
};

exports.savePayment = async (req, res) => {
  console.log("=== Incoming Payment Request ===");
  console.log("Body:", req.body);
  console.log("User from req.user:", req.user);

  try {
    const { razorpay_payment_id, amount, notificationId } = req.body;

    // ✅ Validate required fields (except notificationId)
    if (!razorpay_payment_id || !amount) {
      console.error("❌ Missing required payment fields");
      return res.status(400).json({ message: "Missing required payment fields" });
    }

    // ✅ Check authenticated user
    if (!req.user || !req.user._id) {
      console.error("❌ User not authenticated");
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    // ✅ Ensure amount is a number
    const paymentAmount = Number(amount);
    if (isNaN(paymentAmount) || paymentAmount <= 0) {
      console.error("❌ Invalid amount:", amount);
      return res.status(400).json({ message: "Invalid amount" });
    }

    let notification = null;

    // ✅ If notificationId is provided, find and update it
    if (notificationId) {
      notification = await Notification.findById(notificationId);
      if (!notification) {
        console.error("❌ Notification not found:", notificationId);
        return res.status(404).json({ message: "Notification not found" });
      }

      if (notification.isPaid) {
        console.error("❌ Payment already made for this notification");
        return res.status(400).json({ message: "Payment already made" });
      }
    }

    // ✅ Save payment
    const payment = await Payment.create({
      user: req.user._id,
      notification: notification ? notification._id : null,
      razorpay_payment_id,
      amount: paymentAmount,
      status: "success",
    });

    console.log("Payment saved successfully:", payment);

    // ✅ Update notification if it exists
    if (notification) {
      notification.isPaid = true;
      await notification.save();
      console.log("Notification updated successfully:", notification);
    }

    // ✅ Send user notification
    await sendPaymentNotification(req.user.email, notification);

    res.json({
      success: true,
      message: "Payment saved successfully",
      payment,
      notificationUpdated: !!notification,
    });
  } catch (err) {
    console.error("❌ Payment Save Error:", err);
    res.status(500).json({
      message: "Payment save failed",
      error: err.message,
    });
  }
};
