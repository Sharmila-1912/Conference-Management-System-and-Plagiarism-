// const express = require("express");
// const router = express.Router();
// const authMiddleware = require("../middleware/auth");
// const { registerConference, getConferenceList } = require("../controllers/conferenceController");

// // POST register conference (any logged-in user)
// router.post("/register", authMiddleware, registerConference);

// // GET conferences
// // Admins see all; normal users see only their own
// router.get("/list", authMiddleware, getConferenceList);

// module.exports = router;


const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const { registerConference, getConferenceList } = require("../controllers/conferenceController");

// POST register conference
router.post("/register", authMiddleware, registerConference);

// GET conferences **for logged-in user only**
router.get("/list", authMiddleware, getConferenceList);

module.exports = router;
