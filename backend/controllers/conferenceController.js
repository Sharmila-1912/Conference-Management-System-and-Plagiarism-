// // const Conference = require("../models/Conference");
// // const sendMail = require("../utils/sendMail"); // optional

// // // Register conference
// // exports.registerConference = async (req, res) => {
// //   try {
// //     const { conferenceTitle, participants } = req.body;

// //     if (!conferenceTitle || !participants || participants.length < 1 || participants.length > 3) {
// //       return res.status(400).json({ message: "Provide title and 1-3 participants." });
// //     }

// //     if (!participants[0].email) {
// //       return res.status(400).json({ message: "First participant email required." });
// //     }

// //     const newReg = await Conference.create({ conferenceTitle, participants });

// //     // Send mail to first participant (optional)
// //     const main = participants[0];
// //     try {
// //       await sendMail(main.email, "Conference Registration", `<h2>Registered!</h2>`);
// //     } catch (err) { console.log("Mail Error:", err.message); }

// //     res.json({ message: "Conference Registered Successfully", data: newReg });
// //   } catch (err) {
// //     console.log(err);
// //     res.status(500).json({ message: "Server Error" });
// //   }
// // };

// // // Get all conferences
// // exports.getConferenceList = async (req, res) => {
// //   try {
// //     const list = await Conference.find().sort({ createdAt: -1 });
// //     res.json(list);
// //   } catch (err) {
// //     res.status(500).json({ message: "Server Error" });
// //   }
// // };


// const Conference = require("../models/Conference");
// const sendMail = require("../utils/sendMail"); // optional

// // Register a conference
// exports.registerConference = async (req, res) => {
//   try {
//     const { conferenceTitle, participants } = req.body;

//     if (!conferenceTitle || !participants || participants.length < 1 || participants.length > 3) {
//       return res.status(400).json({ message: "Provide title and 1-3 participants." });
//     }

//     if (!participants[0].email) {
//       return res.status(400).json({ message: "First participant email required." });
//     }

//     const newConference = await Conference.create({
//       userId: req.user.id, // logged-in user
//       conferenceTitle,
//       participants
//     });

//     // Send email to first participant (optional)
//     const main = participants[0];
//     try {
//       await sendMail(main.email, "Conference Registration", `<h2>Registered!</h2>`);
//     } catch (err) {
//       console.log("Mail Error:", err.message);
//     }

//     res.json({ message: "Conference Registered Successfully", data: newConference });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // Get conference list
// exports.getConferenceList = async (req, res) => {
//   try {
//     let list;
//     if (req.user.role === "admin") {
//       // Admin sees all conferences
//       list = await Conference.find().sort({ createdAt: -1 });
//     } else {
//       // Normal users see only their conferences
//       list = await Conference.find({ userId: req.user.id }).sort({ createdAt: -1 });
//     }

//     res.json(list);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server Error" });
//   }
// };



const Conference = require("../models/Conference");
const sendMail = require("../utils/sendMail");

// Register conference
exports.registerConference = async (req, res) => {
  try {
    const { conferenceTitle, participants } = req.body;

    if (!conferenceTitle || !participants || participants.length < 1 || participants.length > 3) {
      return res.status(400).json({ message: "Provide title and 1-3 participants." });
    }

    if (!participants[0].email) {
      return res.status(400).json({ message: "First participant email required." });
    }

    const newConference = await Conference.create({
      userId: req.user.id,       // link conference to the logged-in user
      conferenceTitle,
      participants
    });

    // Optional: send email to first participant
    const main = participants[0];
    try {
      await sendMail(main.email, "Conference Registration", `<h2>Registered!</h2>`);
    } catch (err) {
      console.log("Mail Error:", err.message);
    }

    res.json({ message: "Conference Registered Successfully", data: newConference });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// List conferences **only for logged-in user**
exports.getConferenceList = async (req, res) => {
  try {
    const list = await Conference.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
