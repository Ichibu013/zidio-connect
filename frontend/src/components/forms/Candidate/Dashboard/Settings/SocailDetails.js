"use client";

import SocialInputBox from "@/components/inputBox/SocialInputBox";

export default function SocailDetails() {
  return (
    <div className="bg-hite min-w-full ">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Social Links</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 ">
        {/* Social Links Input Fields */}
        <div className="md:col-span-3">
        <SocialInputBox />
        </div>
        <div className="md:col-span-3"/>
      </div>
      <div className="mt-8 flex justify-end">
        <button
          className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
