import React from "react";
import "./ImportantDates.css";

function ImportantDates() {
  return (
    <div className="imp-container">

      {/* 🔵 MARQUEE TITLE */}
      <marquee className="imp-marquee" behavior="scroll" direction="left">
        IEEE Conference on Computational Intelligence (IEEE SSCI) — June 2026
      </marquee>

      {/* HEADER */}
      <div className="imp-header">
        <h1>IEEE Conference on Computational Intelligence (IEEE SSCI)</h1>
        <p>International Conference • June 2026 • Hybrid Mode</p>
      </div>

     {/* TOPICS */}
{/* TOPICS */}
<div className="imp-section">
  <h2>Conference Themes / Topics</h2>

  <div className="topics-box-container">
    <div className="topic-box">Artificial Intelligence & Machine Learning</div>
    <div className="topic-box">Deep Learning & Neural Networks</div>
    <div className="topic-box">Data Science & Predictive Analytics</div>
    <div className="topic-box">Computational Intelligence in IoT</div>
    <div className="topic-box">Evolutionary Computation</div>
    <div className="topic-box">Natural Language Processing</div>
    <div className="topic-box">Cybersecurity & Blockchain Technologies</div>
    <div className="topic-box">Cloud, Edge & High Performance Computing</div>
  </div>
</div>


      {/* 🔹 ADDED SPACE BETWEEN TOPICS & IMPORTANT DATES */}
      <div style={{ height: "30px" }}></div>

      {/* IMPORTANT DATES TABLE */}
      <div className="imp-section">
        <h2>Important Dates</h2>

        <table className="imp-table">
          <tbody>
            <tr>
              <td className="label"><strong>Paper Submission Opens</strong></td>
              <td>January 10, 2026</td>
            </tr>
            <tr>
              <td className="label"><strong>Last Date for Paper Submission</strong></td>
              <td>March 15, 2026</td>
            </tr>
            <tr>
              <td className="label"><strong>Acceptance Notification</strong></td>
              <td>April 10, 2026</td>
            </tr>
            <tr>
              <td className="label"><strong>Camera-Ready Deadline</strong></td>
              <td>April 25, 2026</td>
            </tr>
            <tr>
              <td className="label"><strong>Registration Deadline</strong></td>
              <td>May 10, 2026</td>
            </tr>
            <tr>
              <td className="label"><strong>Conference Date</strong></td>
              <td>June 5–7, 2026</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 🔹 EXTRA SPACE BEFORE NEXT SECTION */}
      <div style={{ height: "30px" }}></div>

      {/* MODE */}
      <div className="imp-section">
        <h2>Conference Mode</h2>

        <div className="mode-box">
          <p>
            This conference will be hosted in a <strong>Hybrid Mode</strong>. Participants can attend through:
          </p>

          <ul>
            <li><strong>Online:</strong> Live virtual sessions & remote presentations</li>
            <li><strong>Offline:</strong> On-campus presentation at Kongu Engineering College</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ImportantDates;
