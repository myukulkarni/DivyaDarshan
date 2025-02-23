import React, { useState } from "react";
import UserDropdown from "components/Dropdowns/UserDropdown.js";
import { Link } from "react-router-dom";


export default function Navbar() {
  const [language, setLanguage] = useState("English");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setIsDropdownOpen(false); // Close dropdown after selecting a language
  };
  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <a
            className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
             Slot Booking
          </a>
          {/* Links */}
          <ul className="flex items-center space-x-6 md:ml-6">
            <li>
              <a
                className="text-white text-sm uppercase font-semibold hover:text-blue-400 transition duration-300"style={{marginLeft:'40px'}}
                href="#slot-booking"
                onClick={(e) => e.preventDefault()}
              >
                 Queue Tracking
              </a>
            </li>
            <li>
              <a
                className="text-white text-sm uppercase font-semibold hover:text-blue-400 transition duration-300"style={{marginLeft:'50px'}}
                href="#queue-tracking"
                onClick={(e) => e.preventDefault()}
              >
               Virtual Darshan
              </a>
            </li>
            <li>
              <a
                className="text-white text-sm uppercase font-semibold hover:text-blue-400 transition duration-300"style={{marginLeft:'50px'}}
                href="#virtual-darshan"
                onClick={(e) => e.preventDefault()}
              >
                Services
              </a>
            </li>
            <li>
              <a
                className="text-white text-sm uppercase font-semibold hover:text-blue-400 transition duration-300"style={{marginLeft:'50px'}}
                href="#services"
                onClick={(e) => e.preventDefault()}
              >
               Stay Booking
              </a>
            </li>
          </ul>

     {/* Multilingual Icon with Clickable Dropdown */}
<div className="relative mr-12"> {/* Moved 50px left */}
  {/* Button to Toggle Dropdown */}
  <button
    className="text-white text-sm uppercase font-semibold flex items-center hover:text-blue-400 transition duration-300 focus:outline-none focus:ring-0 active:bg-transparent"
    style={{ backgroundColor: "transparent", border: "none" }} // Extra safety
    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
  >
    <i className="fas fa-globe text-lg mr-2"></i> {language}
  </button>

  {/* Dropdown Menu (Shows Only When Open) */}
  {isDropdownOpen && (
    <div className="absolute mt-2 bg-white text-black rounded shadow-md w-32">
      <ul className="text-sm">
        <li
          className="p-2 hover:bg-gray-200 cursor-pointer"
          onClick={() => handleLanguageChange("English")}
        >
          English
        </li>
        <li
          className="p-2 hover:bg-gray-200 cursor-pointer"
          onClick={() => handleLanguageChange("Hindi")}
        >
          हिंदी
        </li>
        <li
          className="p-2 hover:bg-gray-200 cursor-pointer"
          onClick={() => handleLanguageChange("Marathi")}
        >
          मराठी
        </li>
      </ul>
    </div>
  )}
</div>


          {/* Search Form */}
          <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
            <div className="relative flex w-full flex-wrap items-stretch">
              <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                placeholder="Search here..."
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
              />
            </div>
          </form>
          {/* User Dropdown */}
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <UserDropdown />
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
