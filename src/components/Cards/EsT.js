import React from "react";
import img1 from "assets/img/foot.png";
import img2 from "assets/img/ladu.jpg";
const DarshanGuideCard = ({ image, title, instruction }) => {
    return (
      <div className="border rounded-lg shadow-md p-4 max-w-[500px] w-full">
        {/* Image Container */}
        <div className="w-full h-56">
          <img src={image} alt={title} className="w-full h-full object-cover rounded-lg" />
        </div>
  
        {/* Instruction Container */}
        <div className="mt-4 p-3 bg-gray-100 rounded-lg">
          <h2 className="text-lg font-bold text-center">{title}</h2>
          <p className="text-gray-700 text-base mt-2 text-center">{instruction}</p>
        </div>
      </div>
    );
  };
  
  // Example usage
  export default function DarshanGuide() {
    return (
      <div className="p-6 flex justify-between gap-6 max-w-[1100px] mx-auto">
        <DarshanGuideCard
          image={img1}
          title="Footwear & Luggage Storage Guide"
          instruction="Visitors can deposit their footwear at the designated shoe stand near the main entrance. Locker facilities are available for storing valuable items."
        />
        
        <DarshanGuideCard
          image={img2}
          title="Prasadam & Water Points"
          instruction="Free drinking water and Prasadam distribution counters are located near the temple exit. Please use eco-friendly cups available at the counters."
        />
      </div>
    );
  }
  