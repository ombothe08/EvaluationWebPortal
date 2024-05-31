import React from "react";
import Navbar from "../Navbar";

const ReportPage: React.FC = () => {
  const teamName = "Code Monks";
  const candidates = [
    {
      name: "Person 1",
      module: "Module 1",
      strengths: "Quick Learner",
      areaOfImprovement: "Communication Skills",
      inputForMentors: "Needs more practice with presentations",
    },
    {
      name: "Person 2",
      module: "Module 10",
      strengths: "Quick Learner",
      areaOfImprovement: "Communication Skills",
      inputForMentors: "Needs more practice with presentations",
    },
  ];

  return (
    <div
      className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600"
      style={{
        minHeight: "100vh",
      }}
    >
      <Navbar></Navbar>
      <div
        style={{
          backgroundColor: "#f0f0f0",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          margin: "20px",
        }}
      >
        <h1 style={{ textAlign: "center", fontSize: 30 }}>Team: {teamName}</h1>
        <br></br>
        <div style={{ overflowY: "auto", maxHeight: "70vh" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid black", padding: "8px" }}>
                  Candidate Name
                </th>
                <th style={{ border: "1px solid black", padding: "8px" }}>
                  Module
                </th>
                <th style={{ border: "1px solid black", padding: "8px" }}>
                  Strengths
                </th>
                <th style={{ border: "1px solid black", padding: "8px" }}>
                  Area of Improvement
                </th>
                <th style={{ border: "1px solid black", padding: "8px" }}>
                  Input for Mentors
                </th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {candidate.name}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {candidate.module}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {candidate.strengths}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {candidate.areaOfImprovement}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {candidate.inputForMentors}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
