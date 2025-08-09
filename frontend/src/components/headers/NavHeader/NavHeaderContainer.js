"use client";

import NavLinks from "./NavLinks";
import { FiPhoneCall } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useState } from "react";

export default function NavHeader({}) {
  const phoneNumber = 8668866137;
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
    console.log(storedRole);
  }, []); // The empty array ensures this runs once after mounting

  let navLinks = [{ name: "Home", href: "/" }];

  if (role == "ADMIN") {
    // Array of navigation links
    navLinks = [
      { name: "Home", href: "/" },
      { name: "Jobs", href: "" },
      { name: "Dashboard", href: "" },
      { name: "Analytics", href: "" },
      { name: "Candidates", href: "" },
      { name: "Recruiters", href: "" },
      { name: "Customer Support", href: "/contact" },
    ];
  } else if (role == "CANDIDATE") {
    navLinks = [
      { name: "Home", href: "/" },
      { name: "Find Job", href: "" },
      { name: "Dashboard", href: "" },
      { name: "Job Alerts", href: "" },
      { name: "Find Employers", href: "" },
      { name: "Customer Support", href: "/contact" },
    ];
  } else if (role == "RECRUITER") {
    navLinks = [
      { name: "Home", href: "/" },
      { name: "My Jobs", href: "" },
      { name: "Dashboard", href: "" },
      { name: "Applications", href: "" },
      { name: "Find Candidate", href: "" },
      { name: "Customer Support", href: "/contact" },
    ];
  } else {
    navLinks = [
      { name: "Home", href: "/" },
      { name: "Find Job", href: "" },
      { name: "Employers", href: "" },
      { name: "Candidates", href: "" },
      { name: "Pricing Plans", href: "" },
      { name: "Customer Support", href: "/contact" },
    ];
  }

  return (
    <nav className="bg-gray-100 p-2 flex justify-center items-center  mx-auto max-w-6x1 fixed top-0 left-0 w-full z-50 shadow-sm">
      <div className="w-full max-w-7xl px-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Left section: Logo and navigation links */}
        <div className="flex items-center space-x-8">
          <NavLinks navLinks={navLinks} />
        </div>

        {/* Right section: Phone number, flag, and language */}
        <div className="flex items-center space-x-4">
          {/* Phone number */}
          <div
            className="flex items-center space-x-2 text-gray-700 cursor-pointer hover:scale-101"
            href={`tel:${phoneNumber}`}
          >
            <FiPhoneCall size={17} />
            <span className="text-sm font-medium whitespace-nowrap ">
              +91 86688-66137
            </span>
          </div>

          {/* Language selector */}
          <div className="flex items-center space-x-2 text-gray-700 cursor-pointer">
            <img
              src="https://placehold.co/24x16/cccccc/000000?text=US"
              alt="USA Flag"
              className="h-4 w-6 rounded-sm"
            />
            <span className="text-sm font-medium">English</span>
            <IoIosArrowDown />
          </div>
        </div>
      </div>
    </nav>
  );
}
