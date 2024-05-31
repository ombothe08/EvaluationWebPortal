import React, { useState, ChangeEvent } from 'react';
import NavBar from './HomePageNavBar';

const HomePage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <div className="flex flex-col items-start min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
      <NavBar />
      <main className="flex flex-col items-center justify-center mt-20 p-8">
        <div className="flex items-center justify-end w-full">
          {file && (
            <div className="mr-4">
              <p>Selected file: {file.name}</p>
            </div>
          )}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleUploadClick}
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
