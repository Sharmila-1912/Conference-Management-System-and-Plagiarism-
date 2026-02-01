
// const User = require("../models/User");
// const Paper = require("../models/Paper");
// const Conference = require("../models/Conference");
// const Notification = require("../models/Notification");
// const nodemailer = require("nodemailer");

// // ------------------- FETCH ALL USERS -------------------
// exports.getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find().select("-password");
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ------------------- FETCH ALL PAPERS -------------------
// exports.getAllPapers = async (req, res) => {
//   try {
//     const papers = await Paper.find().sort({ createdAt: -1 });
//     res.json(papers);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ------------------- FETCH ALL CONFERENCES -------------------
// exports.getAllConferences = async (req, res) => {
//   try {
//     const conferences = await Conference.find().sort({ createdAt: -1 });
//     res.json(conferences);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ------------------- DASHBOARD STATS -------------------
// exports.getStats = async (req, res) => {
//   try {
//     const userCount = await User.countDocuments();
//     const paperCount = await Paper.countDocuments();
//     const conferenceCount = await Conference.countDocuments();

//     res.json({
//       users: userCount,
//       papers: paperCount,
//       conferences: conferenceCount,
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ------------------- ✅ SEND PAPER DECISION (FULLY FIXED) -------------------
// exports.sendPaperDecision = async (req, res) => {
//   try {
//     const { paperId, decision } = req.body;

//     // ✅ Validation
//     if (!paperId) {
//       return res.status(400).json({ message: "paperId is required" });
//     }

//     if (!["accept", "reject"].includes(decision)) {
//       return res.status(400).json({ message: "Invalid decision" });
//     }

//     // ✅ Always use MongoDB _id
//     const paper = await Paper.findById(paperId);
//     if (!paper) {
//       return res.status(404).json({ message: "Paper not found" });
//     }

//     // ✅ Prevent duplicate decision
//     if (paper.decision) {
//       return res.status(400).json({ message: "Decision already made" });
//     }

//     // ✅ Find user using submitted email
//     const user = await User.findOne({ email: paper.email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // ✅ Save decision to paper
//     paper.decision = decision;
//     await paper.save();

//     // ✅ Prepare messages
//     let subject, text, notificationMessage;

//     if (decision === "accept") {
//       subject = "Paper Accepted";
//       text = `Dear ${paper.firstName},

// Your paper titled "${paper.title}" has been ACCEPTED.

// Please proceed with payment from your dashboard.

// Regards,
// Admin`;

//       notificationMessage = `✅ Your paper "${paper.title}" has been ACCEPTED. Please proceed with payment.`;
//     } else {
//       subject = "Paper Rejected";
//       text = `Dear ${paper.firstName},

// Your paper titled "${paper.title}" has been REJECTED.

// Regards,
// Admin`;

//       notificationMessage = `❌ Your paper "${paper.title}" has been REJECTED.`;
//     }

//     // ✅ Save notification in DB (THIS FIXES YOUR NOTIFICATION PAGE)
//     const notification = await Notification.create({
//       user: user._id,
//       paper: paper._id,        // ✅ Correct _id
//       message: notificationMessage,
//       isRead: false,
//       isPaid: false,
//     });

//     // ✅ Send email
//     const transporter = nodemailer.createTransport({
//       service: "Gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: user.email,
//       subject,
//       text,
//     });

//     res.json({
//       success: true,
//       message: "Decision sent, email delivered & notification saved",
//       paper,
//       notification,
//     });

//   } catch (err) {
//     console.error("❌ Error sending decision mail:", err);
//     res.status(500).json({
//       message: "Error sending decision",
//       error: err.message,
//     });
//   }
// };

// // ------------------- GENERATE PLAGIARISM SCORES -------------------
// exports.generatePlagiarismScores = async (req, res) => {
//   try {
//     const papers = await Paper.find();

//     const updatedPapers = await Promise.all(
//       papers.map(async (p) => {
//         if (p.plagiarismScore === null || p.plagiarismScore === undefined) {
//           p.plagiarismScore = Math.floor(Math.random() * 60); // 0–59%
//           await p.save();
//         }
//         return p;
//       })
//     );

//     res.json({
//       message: "Plagiarism scores generated/fetched",
//       papers: updatedPapers,
//     });

//   } catch (err) {
//     console.error("Plagiarism generation error:", err);
//     res.status(500).json({ message: "Server Error" });
//   }
// };



const User = require("../models/User");
const Paper = require("../models/Paper");
const Conference = require("../models/Conference");
const Notification = require("../models/Notification");
const nodemailer = require("nodemailer");

// ------------------- FETCH ALL USERS -------------------
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ------------------- FETCH ALL PAPERS -------------------
exports.getAllPapers = async (req, res) => {
  try {
    const papers = await Paper.find().sort({ createdAt: -1 });
    res.json(papers);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ------------------- FETCH ALL CONFERENCES -------------------
exports.getAllConferences = async (req, res) => {
  try {
    const conferences = await Conference.find().sort({ createdAt: -1 });
    res.json(conferences);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ------------------- DASHBOARD STATS -------------------
exports.getStats = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const paperCount = await Paper.countDocuments();
    const conferenceCount = await Conference.countDocuments();

    res.json({
      users: userCount,
      papers: paperCount,
      conferences: conferenceCount,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ------------------- ✅ SEND PAPER DECISION (FINAL FIXED) -------------------
exports.sendPaperDecision = async (req, res) => {
  try {
    const { paperId, decision } = req.body;

    // ✅ Validation
    if (!paperId || !decision) {
      return res.status(400).json({ message: "paperId & decision required" });
    }

    if (!["accept", "reject"].includes(decision)) {
      return res.status(400).json({ message: "Invalid decision" });
    }

    // ✅ Find Paper
    const paper = await Paper.findById(paperId);
    if (!paper) return res.status(404).json({ message: "Paper not found" });

    // ✅ Prevent multiple decisions
    if (paper.decision) {
      return res.status(400).json({ message: "Decision already made" });
    }

    // ✅ Find user via paper email
    const user = await User.findOne({ email: paper.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // ✅ Save Decision
    paper.decision = decision;
    await paper.save();

    let subject, text, notificationMessage;
    let requiresPayment = false;

    if (decision === "accept") {
      subject = "Paper Accepted";
      text = `Dear ${paper.firstName},

Your paper titled "${paper.title}" has been ACCEPTED.
Please complete the PAYMENT to proceed.

Regards,
Admin`;

      notificationMessage = `✅ Your paper "${paper.title}" has been ACCEPTED. Please complete the PAYMENT.`;
      requiresPayment = true;
    } else {
      subject = "Paper Rejected";
      text = `Dear ${paper.firstName},

Your paper titled "${paper.title}" has been REJECTED.

Regards,
Admin`;

      notificationMessage = `❌ Your paper "${paper.title}" has been REJECTED.`;
    }

    // ✅ Save Notification
    const notification = await Notification.create({
      user: user._id,
      paper: paper._id,
      message: notificationMessage,
      requiresPayment,
      isPaid: false,
      isRead: false,
    });

    // ✅ Send Email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject,
      text,
    });

    res.json({
      success: true,
      message: "Decision sent + Notification saved + Email delivered",
      paper,
      notification,
    });

  } catch (err) {
    console.error("❌ Error sending decision:", err);
    res.status(500).json({
      message: "Decision error",
      error: err.message,
    });
  }
};

// ------------------- GENERATE PLAGIARISM SCORES -------------------
exports.generatePlagiarismScores = async (req, res) => {
  try {
    const papers = await Paper.find();

    const updatedPapers = await Promise.all(
      papers.map(async (p) => {
        if (p.plagiarismScore === null || p.plagiarismScore === undefined) {
          p.plagiarismScore = Math.floor(Math.random() * 60); // 0-59%
          await p.save();
        }
        return p;
      })
    );

    res.json({
      message: "Plagiarism scores generated/fetched",
      papers: updatedPapers,
    });

  } catch (err) {
    console.error("Plagiarism generation error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
