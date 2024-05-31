import React from 'react';
import Navbar from '../Navbar';
import image1 from "../../images/image1.webp"
import image2 from "../../images/image2.jpg"
import image3 from "../../images/image3.jpg"
import image4 from "../../images/image4.webp"

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
      <Navbar />
      <div style={{ paddingTop: '15rem', paddingBottom:'10rem' }}> {/* Adjust this value based on your navbar height */}
        <h1 className="text-5xl font-bold mb-4 text-center">What is Evaluation Assistor?</h1>
        <p className="text-3xl text-center">Evaluation Assistor is a platform for quickly making reports out of Excel data, using ChatGPT.</p>
      </div>


      <div className="container mx-auto mt-8 px-4">
        <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 md:pl-4 md:order-1 text-center">
                <h2 className="text-2xl font-semibold mb-2">Quality 1</h2>
                <p className="mb-2">Description Line 1</p>
                <p className="mb-2">Description Line 2</p>
            </div>
            <div className="w-full md:w-1/2 text-center md:pr-4 md:order-2 mb-4 md:mb-0">
              <div className="embed-responsive embed-responsive-16by9">
                  <img src={image1} alt="1st quality image" className="w-1/2 mx-auto" />
              </div>
            </div>
        </div>
      </div>




      <div className="container mx-auto mt-8 px-4">
        <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 md:pl-4 md:order-2 text-center">
                <h2 className="text-2xl font-semibold mb-2">Quality 2</h2>
                <p className="mb-2">Description Line 1</p>
                <p className="mb-2">Description Line 2</p>
            </div>
            <div className="w-full md:w-1/2 text-center md:pr-4 md:order-1 mb-4 md:mb-0">
                <div className="embed-responsive embed-responsive-16by9">
                    <img src={image2} alt="2nd  quality image" className="w-1/2 mx-auto" />
                </div>
            </div>
        </div>
      </div>


      <div className="container mx-auto mt-8 px-4">
        <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 md:pl-4 md:order-1 text-center">
                <h2 className="text-2xl font-semibold mb-2">Quality 3</h2>
                <p className="mb-2">Description Line 1</p>
                <p className="mb-2">Description Line 2</p>
            </div>
            <div className="w-full md:w-1/2 text-center md:pr-4 md:order-2 mb-4 md:mb-0">
                <div className="embed-responsive embed-responsive-16by9">
                    <img src={image3} alt="3rd quality image" className="w-1/2 mx-auto" />
                </div>
            </div>
        </div>
      </div>



      <div className="container mx-auto mt-8 px-4">
        <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 md:pl-4 md:order-2 text-center">
                <h2 className="text-2xl font-semibold mb-2">Quality 4</h2>
                <p className="mb-2">Description Line 1</p>
                <p className="mb-2">Description Line 2</p>
            </div>
            <div className="w-full md:w-1/2 text-center md:pr-4 md:order-1 mb-4 md:mb-0">
                <div className="embed-responsive embed-responsive-16by9">
                    <img src={image4} alt="4th quality image" className="w-1/2 mx-auto" />
                </div>
            </div>
        </div>
      </div>



    </div>
  );
};

export default AboutPage;
