
// // const jwt = require("jsonwebtoken");

// // module.exports = (req, res, next) => {
// //   try {
// //     const authHeader = req.headers.authorization;
// //     if (!authHeader) return res.status(401).json({ message: "No token" });

// //     const token = authHeader.split(" ")[1];
// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);

// //     req.user = { id: decoded.id }; // ✅ FIX
// //     next();
// //   } catch (err) {
// //     return res.status(401).json({ message: "Invalid token" });
// //   }
// // };



// const jwt = require("jsonwebtoken");
// const User = require("../models/User"); // Make sure path is correct
// require("dotenv").config();

// const auth = async (req, res, next) => {
//   try {
//     // ✅ Get token from Authorization header
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ message: "Unauthorized: No token provided" });
//     }

//     const token = authHeader.split(" ")[1];
//     if (!token) {
//       return res.status(401).json({ message: "Unauthorized: Invalid token" });
//     }

//     // ✅ Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (!decoded || !decoded.id) {
//       return res.status(401).json({ message: "Unauthorized: Invalid token" });
//     }

//     // ✅ Attach user to request
//     const user = await User.findById(decoded.id).select("-password"); // exclude password
//     if (!user) {
//       return res.status(401).json({ message: "Unauthorized: User not found" });
//     }

//     req.user = user; // ✅ req.user is used in savePayment
//     next(); // proceed to controller
//   } catch (err) {
//     console.error("Auth Middleware Error:", err.message);
//     res.status(401).json({ message: "Unauthorized: Token verification failed" });
//   }
// };

// module.exports = auth;


const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { id: decoded.id }; // ✅ FIX
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
