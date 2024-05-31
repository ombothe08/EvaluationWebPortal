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
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
      <Navbar />

      <div
        className="p-5 rounded-lg shadow-lg m-5"
        style={{ backgroundColor: "whitesmoke" }}
      >
        <h1
          className="text-2xl mb-4"
          style={{
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          Evaluation Report
        </h1>

        <h1
          className="text-2xl mb-4"
          style={{
            fontSize: "25px",
            fontWeight: "bold",
          }}
        >
          Team: {teamName}
        </h1>

        <div className="overflow-y-auto max-h-[70vh]">
          <table className="w-full border-collapse">
            <thead
              className="sticky top-0"
              style={{
                backgroundColor: "papayawhip",
                fontSize: "25px",
                fontWeight: "bold",
              }}
            >
              <tr>
                <th className="border border-black p-2">Candidate Name</th>
                <th className="border border-black p-2">Module</th>
                <th className="border border-black p-2">Strengths</th>
                <th className="border border-black p-2">Area of Improvement</th>
                <th className="border border-black p-2">Input for Mentors</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate, index) => (
                <tr key={index}>
                  <td
                    className="border border-black p-2"
                    style={{ backgroundColor: "white" }}
                  >
                    {candidate.name}
                  </td>
                  <td
                    className="border border-black p-2"
                    style={{ backgroundColor: "white" }}
                  >
                    {candidate.module}
                  </td>
                  <td
                    className="border border-black p-2"
                    style={{ backgroundColor: "palegreen" }}
                  >
                    {candidate.strengths}
                  </td>
                  <td
                    className="border border-black p-2"
                    style={{ backgroundColor: "pink" }}
                  >
                    {candidate.areaOfImprovement}
                  </td>
                  <td
                    className="border border-black p-2"
                    style={{ backgroundColor: "skyblue" }}
                  >
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
