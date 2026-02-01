
// const express = require("express");
// const router = express.Router();
// const { savePayment } = require("../controllers/paymentController");
// const auth = require("../middleware/auth");

// router.post("/save", auth, savePayment);

// module.exports = router;



const express = require("express");
const router = express.Router();
const { savePayment } = require("../controllers/paymentController");
const auth = require("../middleware/auth"); // Make sure auth middleware sets req.user

router.post("/save", auth, savePayment);

module.exports = router;
