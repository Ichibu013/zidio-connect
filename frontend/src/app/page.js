"use client";
import { useState } from "react";
import { FaFacebookF, FaGoogle,FaRegUserCircle, FaBuilding } from "react-icons/fa";

export default function Home() {
  const [isCandidate, setIsCandidate] = useState(true);

  const handleClick = async () => {
    setIsCandidate(!isCandidate);
  };

  return (
    // Main container: full screen height, flex column for mobile, row for larger screens
    <div className="flex flex-col lg:flex-row lg:h-screen bg-gray-100 font-inter bg-white">
      {/* Left side: Sign up form container */}
      <div className="flex items-center justify-center w-full lg:w-6/9 p-4 sm:p-8 h-full">
        {/* Form card */}
        <div className="bg-white p-6 sm:p-8 rounded-lg w-full max-w-lg">
          {/* Logo and App Name */}
          {/*  */}

          {/* Heading and Login Link */}
          <h2 className="text-3xl font-semibold mb-2 text-gray-800">
            Create account.
          </h2>
          <p className="text-gray-600 mb-6">
            Already have account?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Log In
            </a>
          </p>

          {/* Candidate/Employers Toggle Buttons */}
          <div className="flex flex-col mb-6 p-2 space-x-2 bg-gray-100 text-center gap-1 rounded-md">
            <span className="text-gray-800 text-sm">CREATE ACCOUNT AS</span>
            <div className="flex  space-x-3 justify-center">
              <button
                onClick={handleClick}
                className={`flex items-center space-x-2 justify-evenly
                  py-2 px-14 font-medium
                  ${
                    isCandidate
                      ? "bg-blue-900 text-white rounded-lg" // Active state classes
                      : "text-black "
                  } // Inactive state classes
                    transition duration-300 ease-in-out
                   `}
              >
                <FaRegUserCircle className="justify-center"/> 
                <span>Candidate</span>
              </button>
              <button
                onClick={handleClick}
                className={`flex items-center space-x-2 justify-center 
                  py-2 px-14 border rounded-lg font-medium
                  ${
                    !isCandidate
                      ? "bg-blue-900 text-white rounded-lg" // Active state classes
                      : "text-black border-none"
                  } // Inactive state classes
                    transition duration-300 ease-in-out
                   `}
              >
                <FaBuilding />
                <span>Recruiter</span>
              </button>
            </div>
          </div>

          {/* Sign-up Form */}
          <form>
            {/* Full Name and Username Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Full Name"
                className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
              />
              <input
                type="text"
                placeholder="Username"
                className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
              />
            </div>
            {/* Email Address Input */}
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email address"
                className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
              />
            </div>
            {/* Password Input with Eye Icon */}
            <div className="mb-4 relative">
              <input
                type="password"
                placeholder="Password"
                className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent pr-10 transition duration-200"
              />
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer">
                {/* Eye icon SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
            {/* Confirm Password Input with Eye Icon */}
            <div className="mb-4 relative">
              <input
                type="password"
                placeholder="Confirm Password"
                className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent pr-10 transition duration-200"
              />
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer">
                {/* Eye icon SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
            {/* Terms of Service Checkbox */}
            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                id="terms"
                className="mr-2 rounded text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I've read and agree with your{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Terms of Services
                </a>
              </label>
            </div>
            {/* Create Account Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 ease-in-out flex items-center justify-center shadow-md"
            >
              Create Account
              {/* Arrow icon SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </form>

          {/* OR separator */}
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-4 text-gray-500 text-sm">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Social Sign-up Buttons */}
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <button className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium flex items-center justify-center space-x-2 hover:bg-gray-50 transition duration-300 ease-in-out shadow-sm">
              <FaFacebookF className="text-blue-600" />
              <span className="text-sm">Sign up with Facebook</span>
            </button>
            <button className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium flex items-center justify-center space-x-2 hover:bg-gray-50 transition duration-300 ease-in-out shadow-sm">
              <FaGoogle className="text-red-500" />
              <span className="text-sm">Sign up with Google</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right side: Image and stats */}
      {/* Hidden on small screens, flex on large screens */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-800 relative items-center justify-center rounded-l-3xl overflow-hidden"></div>
    </div>
  );
}
