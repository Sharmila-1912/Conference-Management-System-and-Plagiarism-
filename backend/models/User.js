const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  college: { type: String, required: true },
  studyLevel: { type: String, enum: ["UG", "PG"], required: true },
  mobile: { type: String, required: true },   // ADDED
  role: { type: String, enum: ["Student", "Faculty"], required: true }
});

module.exports = mongoose.model("User", userSchema);
