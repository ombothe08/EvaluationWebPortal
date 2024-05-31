import React, { useState, ChangeEvent } from "react";
import Navbar from "../Navbar";
const HomePage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
      <Navbar />
      <main className="flex flex-col items-center justify-center p-10">
        <div className="flex flex-col items-center w-full ">
          {file && (
            <div className="mr-4">
              <p>Selected file: {file.name}</p>
            </div>
          )}

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
            onClick={handleUploadClick}
            style={{fontSize: 35}}
          >
            Upload data to analysis
          </button>
        </div>
        <input
          type="file"
          id="fileInput"
          className="hidden"
          onChange={handleFileChange}
        />
      </main>
    </div>
  );
};

export default HomePage;
