"use client";
import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

/**
 * ErrorToast component displays an error message with an optional subtext.
 * It includes an auto-hide feature and a close button.
 * The toast slides in from the right and can be dismissed manually.
 * @param {Object} props - Component properties
 * @param {string} props.message - The main error message to display
 * @param {string} [props.subtext] - Optional subtext for additional information
 * @param {boolean} props.show - Controls the visibility of the toast
 * @param {function} props.onClose - Callback function to call when the toast is closed
 * @returns {JSX.Element|null} The rendered toast component or null if not visible
 */

export default function ErrorToast({ message, subtext, show, onClose }) {
  const [isExiting, setIsExiting] = useState(false);

  // useEffect to handle auto-hiding the toast after a few seconds
  useEffect(() => {
    if (show) {
      setIsExiting(false); // Reset exit state when shown
      const timer = setTimeout(() => {
        setIsExiting(true);
      }, 3000); // Start exit animation before auto-close
      return () => clearTimeout(timer);
    }
  }, [show]);

  // Handle manual close button click with exit animation
  const handleClose = () => {
    setIsExiting(true);
  };

  // Handle "Try again" button click with exit animation and optional callback
  const handleTryAgain = () => {
    if (onTryAgain) {
      onTryAgain();
    }
    setIsExiting(true);
  };

  // Wait for exit animation to complete before unmounting
  useEffect(() => {
    if (isExiting) {
      const timer = setTimeout(() => {
        onClose();
      }, 300); // This duration should match the exit animation duration
      return () => clearTimeout(timer);
    }
  }, [isExiting, onClose]);

  if (!show && !isExiting) {
    return null;
  }

  return (
    // This container is now positioned to the top-right of the viewport
    <div
      className={`fixed top-4 right-8 z-50 transition-all duration-300 ease-in-out ${
        isExiting ? "transform translate-x-full opacity-0" : ""
      }`}
    >
      <div
        className="relative flex items-center p-6 bg-white rounded-xl border border-red-300 shadow-2xl max-w-sm w-full mx-4 animate-slideInRight"
        style={{
          boxShadow:
            "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        }}
      >
        {/* Left-side icon container */}
        <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mr-4 text-red-500 bg-red-100 rounded-full">
          {/* SVG for the checkmark icon */}
          <IoClose className="w-6 h-6" />
        </div>

        {/* Text content container */}
        <div className="flex-1">
          <p className="text-lg font-medium text-gray-800">{message}</p>
          <p className="mt-1 text-sm text-gray-500">{subtext}</p>

          {/* New "Try again" button */}
          <div className="mt-4">
            <button
              onClick={handleTryAgain}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border-2 border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              Try again
            </button>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 p-1 text-gray-400 hover:bg-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-150"
        >
          {/* SVG for the close icon */}
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
