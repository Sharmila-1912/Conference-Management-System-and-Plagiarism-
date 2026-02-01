// const express = require("express");
// const router = express.Router();
// const authMiddleware = require("../middleware/auth");
// const { submitPaper } = require("../controllers/paperController");

// // POST submit paper
// router.post("/submit", authMiddleware, submitPaper);

// module.exports = router;


const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const { submitPaper } = require("../controllers/paperController");
const multer = require("multer");

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // folder where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// POST submit paper with file upload
router.post("/submit", authMiddleware, upload.single("file"), submitPaper);

module.exports = router;
