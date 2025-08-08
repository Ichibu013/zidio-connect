"use client";
import { useState, useRef, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";

export default function LocationDropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    name: "India",
    flag: "🇮🇳",
  });
  const dropdownRef = useRef(null);

  // Sample list of countries. In a real app, this would likely be fetched from an API.
  const countries = [
    { name: "India", flag: "🇮🇳" },
    { name: "United States", flag: "🇺🇸" },
    { name: "United Kingdom", flag: "🇬🇧" },
    { name: "Australia", flag: "🇦🇺" },
    { name: "Canada", flag: "🇨🇦" },
  ];

  // Effect to handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown toggle button */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center p-3 text-gray-700 border-r border-gray-200 flex-grow hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        <span className="text-xl mr-2">{selectedCountry.flag}</span>
        <span className="font-semibold text-sm">{selectedCountry.name}</span>
        <IoIosArrowDown className="text-gray-300 pl-1" size={23} />
      </button>

      {/* Dropdown menu list */}
      {isDropdownOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
          {countries.map((country, index) => (
            <div
              key={index}
              onClick={() => handleSelectCountry(country)}
              className="flex items-center p-3 hover:bg-gray-100 cursor-pointer transition-colors duration-200"
            >
              <span className="text-xl mr-2">{country.flag}</span>
              <span className="font-semibold text-sm">{country.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
