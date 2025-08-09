"use client";
import SeachInputBox from "../inputBox/SearchInputField";
import SearchHeaderActionBtns from "../panels/HeaderActionButtonPanels/SearchHeaderActionBtns";
import SignInBtn from "../buttons/HeaderBtn/SignInBtn";
import PostAJobBtn from "../buttons/HeaderBtn/PostAJobBtn";
import LocationDropdown from "../misc/LocationDropDown";
import { AiOutlineBarcode } from "react-icons/ai";
import { redirect } from "next/navigation";
import { useState } from "react";
import SpiningLoadingOverLay from "../LoadingOverLays/SpiningLoadingOverLay";

export default function SearchHeader({ btn1, btn2, btn3 }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleRedirect = () => {
    setIsLoading(true); // Set loading state to true
    redirect("/");
  };

  return (
    <div className="container flex max-w-6xl mx-auto justify-evenly bg-white py-4 sm:px-8 ">
      {/* Loading Overlay */}
      {isLoading && <SpiningLoadingOverLay />}

      {/* Left Scetion: Logo and Site Name */}
      <div
        onClick={handleRedirect}
        className={`flex items-center space-x-2 gap-1 cursor-pointer ${
          isLoading ? "pointer-events-none" : ""
        }`}
      >
        <AiOutlineBarcode className="w-8 h-8 text-indigo-500" />
        <span className="text-3x1 font-bold text-gray-800">ZIDIO Connect</span>
      </div>

      {/* Midldle Section: Search Bar  */}
      <div className="sm:hidden md:flex flex-grow justify-start lg:ml-8 lg:mr-36 rounded-md border border-gray-300">
        {/* Location dropdown/input simulation */}
        <LocationDropdown />

        {/* Seach input field */}
        <SeachInputBox />
      </div>
      {/* Right Section: Action Buttons */}
      <SearchHeaderActionBtns btn1={btn1} btn2={btn2} btn3={btn3} />
    </div>
  );
}
