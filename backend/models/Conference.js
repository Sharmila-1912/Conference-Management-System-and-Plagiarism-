const mongoose = require("mongoose");

const conferenceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  conferenceTitle: { type: String, required: true },

  participants: [
    {
      name: String,
      email: String,
    }
  ],

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Conference", conferenceSchema);
