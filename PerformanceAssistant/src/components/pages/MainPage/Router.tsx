import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./LandingPage";
import AboutPage from "./AboutPage";
import ContactPage from "./ContactPage";
import LoginPage from "../logInPage/LogInPage";
//import ReportPage from "../reportPage/ReportPage";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/report" element={<ReportPage />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
