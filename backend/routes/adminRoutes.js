
// // const express = require("express");
// // const router = express.Router();
// // const authMiddleware = require("../middleware/auth");
// // const {
// //   getAllUsers,
// //   getAllPapers,
// //   getAllConferences,
// //   getStats,
// //   sendPaperDecision, // new
// // } = require("../controllers/adminController");

// // // Users
// // router.get("/users", authMiddleware, getAllUsers);

// // // Papers
// // router.get("/papers", authMiddleware, getAllPapers);

// // // Conferences
// // router.get("/conferences", authMiddleware, getAllConferences);

// // // Dashboard stats
// // router.get("/stats", authMiddleware, getStats);

// // // ✅ Send paper decision
// // router.post("/paper-decision", authMiddleware, sendPaperDecision);

// // module.exports = router;


// const express = require("express");
// const router = express.Router();
// const authMiddleware = require("../middleware/auth");
// const {
//   getAllUsers,
//   getAllPapers,
//   getAllConferences,
//   getStats,
//   sendPaperDecision,
// } = require("../controllers/adminController");

// const Paper = require("../models/Paper");

// // Users
// router.get("/users", authMiddleware, getAllUsers);

// // Papers
// router.get("/papers", authMiddleware, getAllPapers);

// // Conferences
// router.get("/conferences", authMiddleware, getAllConferences);

// // Dashboard stats
// router.get("/stats", authMiddleware, getStats);

// // ✅ Send paper decision
// router.post("/paper-decision", authMiddleware, sendPaperDecision);

// // ✅ Generate or fetch plagiarism score (added)
// router.post("/generate-plagiarism", authMiddleware, async (req, res) => {
//   try {
//     const papers = await Paper.find();

//     const updatedPapers = await Promise.all(
//       papers.map(async (p) => {
//         if (p.plagiarismScore === null || p.plagiarismScore === undefined) {
//           // Generate score only once
//           p.plagiarismScore = Math.floor(Math.random() * 60); // 0-59%
//           await p.save();
//         }
//         return p;
//       })
//     );

//     res.json({ message: "Plagiarism scores generated/fetched", papers: updatedPapers });
//   } catch (err) {
//     console.error("Plagiarism generation error:", err);
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// module.exports = router;



const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const {
  getAllUsers,
  getAllPapers,
  getAllConferences,
  getStats,
  sendPaperDecision,
  generatePlagiarismScores
} = require("../controllers/adminController");

// Users
router.get("/users", authMiddleware, getAllUsers);

// Papers
router.get("/papers", authMiddleware, getAllPapers);

// Conferences
router.get("/conferences", authMiddleware, getAllConferences);

// Dashboard stats
router.get("/stats", authMiddleware, getStats);

// Send paper decision
router.post("/paper-decision", authMiddleware, sendPaperDecision);

// Generate plagiarism scores
router.post("/generate-plagiarism", authMiddleware, generatePlagiarismScores);

module.exports = router;
