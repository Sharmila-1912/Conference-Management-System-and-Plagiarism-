const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendMail = require("../utils/sendMail");

// REGISTER USER
const registerUser = async (req, res) => {
  const { username, email, password, college, level, mobile, role } = req.body;

  try {
    // Check if user exists
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already exists" });

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      username,
      email,
      password: hashed,
      college,
      studyLevel: level, // maps correctly
      mobile,
      role
    });

    // Send email
    await sendMail(
      email,
      "Registration Successful",
      `<h3>Welcome ${username}</h3><p>Your registration is completed successfully!</p>`
    );

    res.json({ message: "Registered Successfully!" });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// LOGIN USER
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Admin login check
  if (email === "researchclub.kec@gmail.com" && password === "admin123") {
    const token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET);
    return res.json({ message: "Admin Login Success", token, isAdmin: true });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid Credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ message: "Login Success", token, isAdmin: false });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { registerUser, loginUser };
