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
