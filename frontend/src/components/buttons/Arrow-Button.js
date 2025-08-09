"use client";
import { useState } from "react";
import SpiningLoadingOverLay from "../LoadingOverLays/SpiningLoadingOverLay";

export default function ArrowButton({ text, icon }) {
  const [isLoading, setIsLoading] = useState(false);
  const handleRedirect = () => {
    setIsLoading(true);
  };
  return (
    <button
      onClick={handleRedirect}
      type="submit"
      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-900 hover:scale-101 transition duration-300 ease-in-out flex items-center justify-center shadow-md"
    >
      {/* Loading Overlay */}
      {isLoading && <SpiningLoadingOverLay />}
      {text}
      {/* Arrow icon component */}
      {icon}
    </button>
  );
}
