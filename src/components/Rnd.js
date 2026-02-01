import React, { useState } from "react";
import "./Rnd.css";

function RnD() {
  const [openSection, setOpenSection] = useState(null);

  const toggle = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <>
    {/* 🔵 NEW: MARQUEE SECTION */}
        <div className="topics-marquee">
          <div className="marquee-track">
            <span>
              IEEE Conference on Computational Intelligence (IEEE SSCI)
            </span>
          </div>
        </div>
      {/* R&D Club Introduction Section */}
      <section className="rnd-container">
        <h1 className="rnd-main-title">Research & Development (R&D) Club</h1>

        <p className="rnd-text">
          The Research and Development (R&D) Club is established to nurture innovation,
          creativity, and scientific thinking among students. It provides a collaborative
          environment where learners can explore new ideas, conduct experiments, develop 
          projects, and contribute to emerging technologies. The club serves as a platform 
          for students to transform concepts into real-world solutions through research-based 
          learning, teamwork, and hands-on experience.
        </p>

        <p className="rnd-text">
          The R&D Club also encourages participation in technical events, publications, 
          competitions, and industry-based research activities. Through continuous mentorship, 
          workshops, and exposure to advanced technologies, the club aims to create a strong 
          research culture within the institution.
        </p>

        {/* VISION */}
        <div className="accordion">
          <div className="accordion-header" onClick={() => toggle("vision")}>
            <h3>VISION</h3>
            <span className="arrow">{openSection === "vision" ? "▲" : "▼"}</span>
          </div>

          {openSection === "vision" && (
            <div className="accordion-content">
              <p>
                To become a centre of excellence that promotes research, innovation, and
                technological advancement, empowering students to contribute impactful 
                solutions for the betterment of society.
              </p>
            </div>
          )}
        </div>

        {/* MISSION */}
        <div className="accordion">
          <div className="accordion-header" onClick={() => toggle("mission")}>
            <h3>MISSION</h3>
            <span className="arrow">{openSection === "mission" ? "▲" : "▼"}</span>
          </div>

          {openSection === "mission" && (
            <div className="accordion-content">
              <ul>
                <li>Encourage research-oriented learning and experimentation among students.</li>
                <li>Provide mentorship, tools, and resources for innovative project development.</li>
                <li>Organize seminars, workshops, and hands-on training on emerging technologies.</li>
                <li>Collaborate with industry and research organizations for real-world exposure.</li>
                <li>Support students in publishing research papers and participating in competitions.</li>
                <li>Develop technological solutions that address community and societal needs.</li>
              </ul>
            </div>
          )}
        </div>

        {/* 🔵 NEW: MARQUEE SECTION */}
        <div className="topics-marquee">
          <div className="marquee-track">
            <span>
              AI • ML • IoT • Cloud • Cybersecurity • Blockchain • Data Science • Networking 
            </span>
          </div>
        </div>

      </section>
    </>
  );
}

export default RnD;
