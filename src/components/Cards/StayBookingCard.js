import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
import k1 from "assets/img/I.jpg";
import k2 from "assets/img/Shree.jpg";
import k3 from "assets/img/Hp.jpg";

const StayBookingCard = ({ image, title, location, distance, description, rating, reviews, link }) => {
    return (
      <div className="border rounded-lg shadow-md p-4 flex" style={{ width: '1100px', marginLeft: '80px', marginTop: '20px' }}>
        {/* Left Side - Image */}
        <div className="relative" style={{ width: '400px' }}>
          <img src={image} alt={title} className="w-full h-40 object-cover rounded-lg" />
          <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md">
            <FaRegHeart className="text-gray-600" />
          </button>
        </div>
  
        {/* Right Side - Details */}
        <div className="pl-4 flex flex-col justify-between" style={{ marginLeft: '20px', width: '700px' }}>
          {/* Title */}
          <div className="flex justify-between">
            <h2 className="text-lg font-bold">{title} <FaThumbsUp className="inline text-yellow-500" /></h2>
          </div>
  
          {/* Location */}
          <p className="text-blue-600 text-sm">
            <a href={link} className="hover:underline">{location}</a> • <span className="text-gray-500">{distance} from centre</span>
          </p>
  
          {/* Description */}
          <p className="text-gray-600 text-base  ">{description}</p>
  
          {/* Rating & Button */}
          <div className="flex justify-between items-center mt-2">
            <div className="text-right">
              <p className="text-gray-600 text-sm "> Reviews Score: {reviews}</p>
              
              
            </div>
            <span className="bg-orange-500 text-white font-semibold  items-center px-2 py-1 shadow-md "style={{marginTop:'-3px',marginLeft:'-370px'}}>{rating}</span>

            <button className="bg-orange-500 text-white font-semibold flex items-center px-2 py-1 rounded-lg hover:bg-orange-400 transition-all duration-300 shadow-md">
              Show prices
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  // Example usage
  export default function StayBooking() {
    return (
      <div className="p-6">
        <StayBookingCard
          image={k1}
          title="ISKCON Pandharpur's Chandrabhaga Guest House"
          location="Pandharpur"
          distance="2.3 km"
          description="Situated in Pandharpur in the Maharashtra region,
           this accommodation features a garden and a balcony with river views."
          rating="7.0"
          reviews="179"
          link="#"
        />
        <StayBookingCard
          image={k2}
          title="Shree Radhesh Bhakt Niwas"
          location="Pandharpur"
          distance="1.9 km"
          description="Shree Radhesh Bhakta Niwas provides accommodation in Pandharpur. The accommodation features room service and a 24-hour front desk for guests."
          rating="8.2"
          reviews="250"
          link="#"
        />
        <StayBookingCard
          image={k3}
          title="Hotel Sp Majestic"
          location="Pandharpur"
          distance="1.9 km"
          description="Hotel SP Majestic provides air-conditioned rooms in Pandharpur. This 3-star hotel offers room service, a 24-hour front desk and free WiFi. Guests can enjoy city views.
"
          rating="9.0"
          reviews="320"
          link="#"
        />
      </div>
    );
  }