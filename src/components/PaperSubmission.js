// import React, { useState } from "react";
// import axios from "axios";
// import "./PaperSubmission.css";

// const PaperSubmission = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     date: "",
//     email: "",
//     title: "",
//     abstract: "",
//     file: null,
//   });

//   const [confirmation, setConfirmation] = useState("");
//   const token = localStorage.getItem("token");

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData({ ...formData, [name]: files ? files[0] : value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!token) return alert("Please login first!");

//     const formPayload = new FormData();
//     formPayload.append("firstName", formData.firstName);
//     formPayload.append("lastName", formData.lastName);
//     formPayload.append("date", formData.date);
//     formPayload.append("email", formData.email);
//     formPayload.append("title", formData.title);
//     formPayload.append("abstract", formData.abstract);
//     formPayload.append("fileName", formData.file.name);

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/paper/submit",
//         formPayload,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setConfirmation(
//         `✅ Your paper has been submitted successfully!\nPaper ID: ${res.data.paperId}`
//       );
//       setFormData({
//         firstName: "",
//         lastName: "",
//         date: "",
//         email: "",
//         title: "",
//         abstract: "",
//         file: null,
//       });
//     } catch (err) {
//       console.log(err.response?.data || err.message);
//       alert("Error submitting paper");
//     }
//   };

//   return (
//     <div className="paper-container">
//       <div className="form-card">
//         <h2>📚 Research Paper Submission</h2>

//         {!confirmation ? (
//           <form onSubmit={handleSubmit}>
//             {/* form fields */}
//             <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
//             <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
//             <input name="date" type="date" value={formData.date} onChange={handleChange} required />
//             <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
//             <input name="title" placeholder="Paper Title" value={formData.title} onChange={handleChange} required />
//             <textarea name="abstract" placeholder="Abstract" value={formData.abstract} onChange={handleChange} required />
//             <input name="file" type="file" onChange={handleChange} accept=".pdf,.doc,.docx" required />

//             <button type="submit" className="submit-btn">Submit Paper</button>
//           </form>
//         ) : (
//           <div className="confirmation-box">
//             <h3>Submission Confirmation</h3>
//             <pre>{confirmation}</pre>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PaperSubmission;



import React, { useState } from "react";
import axios from "axios";
import "./PaperSubmission.css";

const PaperSubmission = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    date: "",
    email: "",
    title: "",
    abstract: "",
    file: null,
  });

  const [confirmation, setConfirmation] = useState("");
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Please login first!");
      return;
    }

    if (!formData.file) {
      alert("Please upload a paper file.");
      return;
    }

    try {
      const formPayload = new FormData();
      formPayload.append("firstName", formData.firstName);
      formPayload.append("lastName", formData.lastName);
      formPayload.append("date", formData.date);
      formPayload.append("email", formData.email);
      formPayload.append("title", formData.title);
      formPayload.append("abstract", formData.abstract);
      formPayload.append("file", formData.file); // field name must match multer

      const res = await axios.post(
        "http://localhost:5000/api/paper/submit",
        formPayload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setConfirmation(
        `✅ Your paper has been submitted successfully!\nPaper ID: ${res.data.paperId}`
      );

      setFormData({
        firstName: "",
        lastName: "",
        date: "",
        email: "",
        title: "",
        abstract: "",
        file: null,
      });
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Error submitting paper");
    }
  };

  return (
    <div className="paper-container">
      <div className="form-card">
        <h2>📚 Research Paper Submission</h2>

        {!confirmation ? (
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="title"
              placeholder="Paper Title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <textarea
              name="abstract"
              placeholder="Abstract"
              rows="4"
              value={formData.abstract}
              onChange={handleChange}
              required
            ></textarea>

            <input
              type="file"
              name="file"
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
              required
            />

            <button type="submit" className="submit-btn">
              Submit Paper
            </button>
          </form>
        ) : (
          <div className="confirmation-box">
            <h3>✅ Submission Confirmation</h3>
            <pre>{confirmation}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaperSubmission;
