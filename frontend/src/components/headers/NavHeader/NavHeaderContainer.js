"use client";

import NavLinks from "./NavLinks";
import { FiPhoneCall } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { HiBars3BottomLeft } from "react-icons/hi2"; // A more modern hamburger icon
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

export default function NavHeader({}) {
  const phoneNumber = 8668866137;
  const [role, setRole] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // New state for menu

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
    console.log(storedRole);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  let navLinks = [{ name: "Home", href: "/" }];

  if (role == "ADMIN") {
    navLinks = [
      { name: "Home", href: "/" },
      { name: "Jobs", href: "/admin/job-management" },
      { name: "Dashboard", href: "/admin/dashboard" },
      { name: "Analytics", href: "/admin/analytics" },
      { name: "Candidates", href: "/admin/candidate-management" },
      { name: "Recruiters", href: "/admin/recruiter-management" },
      { name: "Customer Support", href: "/contact" },
    ];
  } else if (role == "CANDIDATE") {
    navLinks = [
      { name: "Home", href: "/" },
      { name: "Find Job", href: "/candidate/find-job" },
      { name: "Dashboard", href: "/candidate/dashboard" },
      { name: "Job Alerts", href: "/candidate/job-alerts" },
      { name: "Find Employers", href: "/candidate/find-employers" },
      { name: "Customer Support", href: "/contact" },
    ];
  } else if (role == "RECRUITER") {
    navLinks = [
      { name: "Home", href: "/" },
      { name: "My Jobs", href: "/recruiter/my-jobs" },
      { name: "Dashboard", href: "/recruiter/dashboard" },
      { name: "Applications", href: "/recruiter/application" },
      { name: "Find Candidate", href: "/recruiter/find-candidate" },
      { name: "Customer Support", href: "/contact" },
    ];
  } else {
    navLinks = [
      { name: "Home", href: "/" },
      { name: "Find Job", href: "/onboarding/find-job" },
      { name: "Employers", href: "/onboarding/employers" },
      { name: "Candidates", href: "/onboarding/candidates" },
      { name: "Pricing Plans", href: "/onboarding/pricing-plans" },
      { name: "Customer Support", href: "/contact" },
    ];
  }

  return (
    <nav className="bg-gray-100 p-2 flex justify-center items-center mx-auto max-w-6x1 fixed top-0 left-0 w-full z-50 shadow-sm">
      <div className="w-full max-w-7xl px-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Top bar for smaller screens: holds menu button and right section */}
        <div className="flex w-full justify-between items-center md:hidden">
          {/* Menu button for mobile */}
          <button
            onClick={toggleMenu}
            className="text-gray-700 focus:outline-none"
          >
            {isMenuOpen ? (
              <IoClose size={24} />
            ) : (
              <HiBars3BottomLeft size={24} />
            )}
          </button>
          {/* Right section on mobile */}
          <div className="flex items-center space-x-4">
            <a
              className="flex items-center space-x-2 text-gray-700 cursor-pointer"
              href={`tel:${phoneNumber}`}
            >
              <FiPhoneCall size={17} />
              <span className="text-sm font-medium whitespace-nowrap hidden sm:block">
                +91 86688-66137
              </span>
            </a>
            <div className="flex items-center space-x-2 text-gray-700 cursor-pointer">
              <img
                src="https://placehold.co/24x16/cccccc/000000?text=US"
                alt="USA Flag"
                className="h-4 w-6 rounded-sm"
              />
              <span className="text-sm font-medium hidden sm:block">
                English
              </span>
              <IoIosArrowDown />
            </div>
          </div>
        </div>

        {/* Navigation links (hidden on small screens, shown on medium screens and up) */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLinks navLinks={navLinks} />
        </div>

        {/* Right section (hidden on small screens, shown on medium screens and up) */}
        <div className="hidden md:flex items-center space-x-4">
          <a
            className="flex items-center space-x-2 text-gray-700 cursor-pointer hover:scale-101"
            href={`tel:${phoneNumber}`}
          >
            <FiPhoneCall size={17} />
            <span className="text-sm font-medium whitespace-nowrap ">
              +91 86688-66137
            </span>
          </a>
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

        {/* Sliding Panel (hidden by default) */}
        <div
          className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } md:hidden`}
        >
          <div className="flex justify-end p-4">
            <button onClick={closeMenu} className="text-gray-700">
              <IoClose size={24} />
            </button>
          </div>
          <div className="p-4">
            <NavLinks navLinks={navLinks} onLinkClick={closeMenu} />
          </div>
        </div>

        {/* Overlay to close menu on outside click */}
        {isMenuOpen && (
          <div
            onClick={closeMenu}
            className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          ></div>
        )}
      </div>
    </nav>
  );
}
