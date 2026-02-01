import React from "react";
import "./Home.css";

function Home() {
  return (
    <>
      {/* Banner Section */}
      <section className="banner">
        <div className="banner-text">
          <h1>Master of Computer Applications</h1>
          <p>Empowering Innovation & Technology</p>
        </div>
      </section>

      {/* About MCA */}
      <section className="about">
        <h2>About the Department</h2>
        <p>
          Master of Computer Applications (MCA) is a postgraduate degree that focuses on 
          advanced computing, software development, and information technology.
        </p>
        <p>
          It integrates core concepts of programming, database management, networking, 
          cloud computing, cybersecurity, and artificial intelligence to develop 
          innovative IT solutions.
        </p>
        <p>
          MCA graduates work in diverse domains such as software development, 
          data analytics, system architecture, and IT consulting.
        </p>
        <p>
          With the rapid growth of digital transformation, the field continues to evolve, 
          incorporating emerging technologies like blockchain, IoT, and machine learning.
        </p>
      </section>

      {/* Vision & Mission */}
      <section className="vision-mission">
        <h2>Vision</h2>
        <p>To be a centre of excellence for development and dissemination of knowledge in Computer Applications for the Nation and beyond.</p>

        <h2>Mission</h2>
        <ul>
          <li>Empower individuals with a strong foundation in Computational knowledge to become IT professionals.</li>
          <li>Provide recent technology and develop communication, leadership, and entrepreneurial skills among students.</li>
          <li>Impart professional ethics to students and make them socially responsible graduates.</li>
        </ul>

        {/* PEO, PO, PSO Cards */}
        <div className="cards-container">
          <div className="card">
            <h3>Program Educational Objectives (PEO)</h3>
            <ul>
              <li>Apply computing & mathematical knowledge to develop software solutions.</li>
              <li>Communicate effectively and lead multidisciplinary teams.</li>
              <li>Develop professional ethics and strive for lifelong learning.</li>
            </ul>
          </div>

          <div className="card">
            <h3>Program Outcomes (PO)</h3>
            <ul>
              <li>Apply foundation knowledge of mathematics, programming, and logic.</li>
              <li>Analyze and solve problems with innovative solutions.</li>
              <li>Use modern computational tools with awareness of limitations.</li>
              <li>Work effectively individually or as part of a team.</li>
              <li>Understand project management, finance, and professional ethics.</li>
              <li>Adapt to new technologies and commit to lifelong learning.</li>
            </ul>
          </div>

          <div className="card">
            <h3>Program Specific Outcomes (PSO)</h3>
            <ul>
              <li>Use computing technologies to solve industrial problems.</li>
              <li>Become socially responsible with leadership and interpersonal skills.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Department Details Table */}
      <section className="details">
        <h2>Department Details</h2>
        <table>
          <tbody>
            <tr>
              <th>HOD</th>
              <td>Dr.A.Tamilarasi</td>
            </tr>
            <tr>
              <th>Intake</th>
              <td>120</td>
            </tr>
            {/* <tr>
              <th>Ph.D</th>
              <td>N/A</td>
            </tr> */}
          </tbody>
        </table>
      </section>
    </>
  );
}

export default Home;
