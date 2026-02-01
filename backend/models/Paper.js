

// const mongoose = require("mongoose");

// const paperSchema = new mongoose.Schema({
//   paperId: { type: String, required: true, unique: true }, // <-- store generated ID
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   email: { type: String, required: true },
//   date: { type: Date, required: true },
//   title: { type: String, required: true },
//   abstract: { type: String, required: true },
//   filePath: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model("Paper", paperSchema);


// const mongoose = require("mongoose");

// const PaperSchema = new mongoose.Schema({
//   paperId: String,
//   firstName: String,
//   lastName: String,
//   email: String,
//   title: String,
//   abstract: String,
//   filePath: String,
//   date: { type: Date, default: Date.now },
//   plagiarismScore: { type: Number, default: null }, // ✅ new field
//   status: { type: String, default: "pending" } // optional: accepted/rejected
// });

// module.exports = mongoose.models.Paper || mongoose.model("Paper", PaperSchema);


// const paperSchema = new mongoose.Schema({
//   paperId: String,
//   firstName: String,
//   lastName: String,
//   email: String,
//   title: String,
//   abstract: String,
//   filePath: String,
//   date: { type: Date, default: Date.now },
//   plagiarismPercent: { type: Number, default: null }, // new
//   decision: { type: String, enum: ["accept", "reject"], default: null } // new
// });
// module.exports = mongoose.models.Paper || mongoose.model("Paper", paperSchema);


const mongoose = require("mongoose");

const PaperSchema = new mongoose.Schema({
  paperId: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  title: { type: String },
  abstract: { type: String },
  filePath: { type: String },
  date: { type: Date, default: Date.now },

  // ✅ Plagiarism
  plagiarismScore: { type: Number, default: null }, // store once, 0-59%

  // ✅ Admin decision
  decision: { type: String, enum: ["accept", "reject", null], default: null },
});

module.exports = mongoose.models.Paper || mongoose.model("Paper", PaperSchema);
