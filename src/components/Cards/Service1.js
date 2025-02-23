import React, { useState, useRef, useEffect } from "react";
import s1 from "../../assets/img/p1.jpg";
import s2 from "../../assets/img/Deshp1.jpg";
import s3 from "../../assets/img/p3.jpg";
import s5 from "../../assets/img/p5.jpg";
import s6 from "../../assets/img/p6.jpg";
import s7 from "../../assets/img/p7.jpg";
import { FaArrowRight } from "react-icons/fa";

const Card = ({ image, title, description, details }) => {
  const [showDetails, setShowDetails] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setShowDetails(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={cardRef} style={{ zIndex: 10 }}>
      <div
        className="bg-white rounded-lg shadow-lg overflow-hidden p-6 flex flex-col m-4 items-center justify-center"
        style={{ width: "380px", height: "290px", zIndex: 10 }}
      >
        {!showDetails ? (
          <>
            {/* Image */}
            <div
              style={{
                width: "300px",
                height: "170px",
                borderRadius: "25px",
                overflow: "hidden",
                marginTop: "20px",
                transition: "filter 0.3s ease",
              }}
            >
              <img
                src={image}
                alt={title}
                style={{
                  width: "380px",
                  height: "170px",
                  display: "block",
                  objectFit: "cover",
                }}
              />
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-800 mt-4">
              {title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-center mt-2 " style={{ marginLeft: "-110px" }}>{description}</p>

            {/* Read More Button */}
            <button
              onClick={() => setShowDetails(true)}
              className="bg-orange-500 text-white font-semibold flex items-center px-2 py-1 rounded-lg hover:bg-orange-600 transition-all duration-300 shadow-md"
              style={{ marginTop: "-30px", marginLeft: "200px" }}
            >
              Read More <FaArrowRight className="ml-2" />
            </button>
          </>
        ) : (
          // Show Detailed Content
          <div className="text-center text-gray-800">
            <h4 className="font-semibold text-lg">{title}</h4>
            <p className="mt-2">{details}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default function CardGrid() {
  const cards = [
    { image: s1, title: "Vithal Sweets", description: "Special Dudhi Pedhe.", details: "Vithal Sweets is famous for its rich and creamy Dudhi Pedhe, made using fresh bottle gourd, milk, and a hint of cardamom. Each bite offers a perfect balance of sweetness and texture, making it a beloved treat among locals and visitors alike." },
    { image: s2, title: "Deshpande Bandhu", description: "Famous Deshpande Pedhe.", details: "Deshpande Bandhu is known for its legendary Deshpande Pedhe, crafted using a secret family recipe passed down through generations. These pedhas are soft, rich in flavor, and hold a special place in festive celebrations." },
    { image: s3, title: "Amruteshvar Sweets", description: "Satari Kandi Phedha.", details: "Amruteshvar Sweets brings you the authentic taste of Satari Kandi Phedha, a delicacy known for its unique texture and aromatic sweetness. A true treat for those who appreciate traditional sweets." },
  ];

  const cards1 = [
    { image: s5, title: "Kailash Sweets", description: "Special Barfi Available.", details: "Kailash Sweets specializes in a variety of barfis, including Kaju Katli and Mawa Barfi. Made with pure ghee and the finest ingredients, their sweets are a delight for every occasion." },
    { image: s6, title: "Maharaja Sweets", description: "Malai Pedhe Available.", details: "Maharaja Sweets offers soft and delicious Malai Pedhe, made with fresh cream and infused with cardamom and saffron. These sweets are perfect for gifting or indulging in a moment of sweetness." },
    { image: s7, title: "Bikaner", description: "Sweets & Snacks Ready.", details: "Bikaner is a one-stop destination for authentic Rajasthani sweets and snacks. From crispy namkeens to mouthwatering Rasgullas, their menu offers a taste of India’s rich culinary heritage." },
  ];

  return (
    <div className="p-10 flex flex-col items-center space-y-8" style={{ marginTop: "-80px" }}>
      <div className="flex space-x-8">
        {cards.map((card, index) => (
          <Card key={`row1-${index}`} {...card} />
        ))}
      </div>
      <div className="flex space-x-8">
        {cards1.map((card, index) => (
          <Card key={`row2-${index}`} {...card} />
        ))}
      </div>
    </div>
  );
}
