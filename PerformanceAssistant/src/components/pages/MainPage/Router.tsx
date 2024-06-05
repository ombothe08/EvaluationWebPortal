import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./LandingPage";
import LoginPage from "../logInPage/LogInPage";
import HomePage from "../homePage/HomePage";
import ParameterListPage from "../parameterListPage/ParameterListPage";
import ReportPage from "../reportPage/ReportPage";
import CompareStrengthPage from "../compareStrengthPage/CompareStrengthPage";

const AppRouter: React.FC = () => {
  const [parameterFileName, setFileName] = useState<File | null>(null);

  const handleFileName = (name: File | null) => {
    setFileName(name);
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/homepage"
          element={<HomePage onfileName={handleFileName} />}
        />
        <Route
          path="/upload"
          element={<ParameterListPage parameterFileName={parameterFileName} />}
        />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/compare-strengths" element={<CompareStrengthPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;