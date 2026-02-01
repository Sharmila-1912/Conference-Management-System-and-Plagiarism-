

// App.js

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Header from "./components/Header"; 
import Home from "./components/Home";
import Rnd from "./components/Rnd";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Admin from "./components/Admin";
import Conference from "./components/Conference";
import PaperSubmission from "./components/PaperSubmission";
import ImportantDates from "./components/ImportantDates";
import ChatWidget from "./components/ChatWidget"; // Floating chat widget
import PaymentGateway from "./components/PaymentGateway";
import Notification from "./components/Notification"
function App() {
  return (
    <Router>
      {/* Floating Chat Widget */}
      <ChatWidget />

      <Routes>
        {/* HOME */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />

        {/* IMPORTANT DATES */}
        <Route
          path="/important-dates"
          element={
            <>
              <Header />
              <ImportantDates />
            </>
          }
        />

        {/* RND */}
        <Route
          path="/Rnd"
          element={
            <>
              <Header />
              <Rnd />
            </>
          }
        />

        {/* CONFERENCE */}
        <Route
          path="/conference"
          element={
            <>
              <Header />
              <Conference />
            </>
          }
        />

        {/* PAPER SUBMISSION */}
        <Route
          path="/submit-paper"
          element={
            <>
              <Header />
              <PaperSubmission />
            </>
          }
        />

        {/* LOGIN / SIGNUP / ADMIN – NO HEADER */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/notifications" element={<Notification />} />
        <Route path="/payment/:id" element={<PaymentGateway />} />
      </Routes>
    </Router>
  );
}

export default App;
