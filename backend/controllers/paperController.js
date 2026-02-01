// const Paper = require("../models/Paper");
// const sendMail = require("../utils/sendMail"); // email utility

// // Submit Paper
// exports.submitPaper = async (req, res) => {
//   try {
//     const { firstName, lastName, date, email, title, abstract, fileName } = req.body;

//     if (!firstName || !lastName || !date || !email || !title || !abstract || !fileName) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const paper = await Paper.create({
//       userId: req.user.id,
//       firstName,
//       lastName,
//       date,
//       email,
//       title,
//       abstract,
//       fileName,
//     });

//     // Generate Paper ID
//     const paperId = "IEE-" + Math.floor(1000 + Math.random() * 9000);

//     // Send email
//     const message = `
//       Dear ${firstName} ${lastName},<br/><br/>
//       Your paper titled "${title}" has been successfully submitted.<br/>
//       Paper ID: ${paperId}<br/>
//       Conference Name: IEE Scholar Connect Conference<br/>
//       Date of Submission: ${date}<br/><br/>
//       Thank you for your contribution.
//     `;

//     try {
//       await sendMail(email, "Paper Submission Confirmation", message);
//     } catch (err) {
//       console.log("Mail Error:", err.message);
//     }

//     res.json({ message: "Paper submitted successfully", paperId });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Server Error" });
//   }
// };


const Paper = require("../models/Paper");
const sendMail = require("../utils/sendMail"); // optional

exports.submitPaper = async (req, res) => {
  try {
    const { firstName, lastName, email, date, title, abstract } = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ message: "Paper file required" });

    // Generate Paper ID
    const paperId = "IEE-" + Math.floor(1000 + Math.random() * 9000);

    // Create and store in DB
    const newPaper = await Paper.create({
      paperId,
      firstName,
      lastName,
      email,
      date,
      title,
      abstract,
      filePath: file.path
    });

    // Send email
    try {
      await sendMail(
        email,
        "Paper Submission Confirmation",
        `<p>Your paper has been submitted successfully! Paper ID: <b>${paperId}</b></p>`
      );
    } catch (err) {
      console.log("Mail Error:", err.message);
    }

    res.json({ message: "Paper submitted", paperId: newPaper.paperId });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

