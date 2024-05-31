import React, { useEffect, useState } from 'react';
import Navbar from './LandingPageNavbar';
import big from "../../images/bigpicture.jpg";

const LandingPage: React.FC = () => {
  const [typedText, setTypedText] = useState('');
  const [lineBreakIndex, setLineBreakIndex] = useState(0);
  const fullText = 'Unleashing\nExcellence Through\nDetailed Insights';
  const typingSpeed = 100; // Adjust the typing speed as needed

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        const nextChar = fullText[currentIndex];
        setTypedText(prevText => {
          if (nextChar === '\n') {
            setLineBreakIndex(prevIndex => prevIndex + 1);
            return prevText + '\n';
          } else if (lineBreakIndex === 0 || lineBreakIndex === 1) {
            return prevText + nextChar;
          } else {
            return prevText.substr(0, prevText.lastIndexOf('\n') + 1) + nextChar;
          }
        });
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, typingSpeed);

    return () => {
      clearInterval(typingInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
      <Navbar />
      <div className="flex items-center justify-center h-screen">
        <div className="w-1/2 flex flex-col items-center justify-center text-white p-8">
          <h1 className="text-7xl font-bold text-center leading-tight whitespace-pre-line shadow-lg">{typedText}</h1>
          <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-full mt-8 hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 shadow-lg">
            Get Started
          </button>
        </div>
        <div className="w-1/2 flex justify-center">
          <img src={big} alt="CCTECH Image" className="rounded-full shadow-lg" style={{ width: '500px', height: '500px', objectFit: 'cover' }} />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
