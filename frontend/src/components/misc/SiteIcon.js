"use client";
import { redirect } from "next/navigation";
import { useState } from "react";
import { AiOutlineBarcode } from "react-icons/ai";

export default function SiteNameIcon() {
  const [isLoading, setIsLoading] = useState(false);

  const handleRedirect = () => {
    setIsLoading(true); // Set loading state to true
    redirect("/");
  };
  return (
    <div
      onClick={handleRedirect}
      className={`flex items-center space-x-2 gap-1 cursor-pointer ${
        isLoading ? "pointer-events-none" : ""
      }`}
    >
      <AiOutlineBarcode className="w-8 h-8 text-indigo-500" />
      <span className="text-3x1 font-bold text-gray-800">ZIDIO Connect</span>
    </div>
  );
}
