"use client";
import CandidateProfileForm from "@/components/forms/CandidateProfileForm";
import { useState } from "react";

export default function CadSetting() {
  const [tab, setTab] = useState("Personal");

  const tabContent = {
    Personal: <CandidateProfileForm />,
    Profile: <div>Profile Settings Content</div>,
    "Social Links": <div>Social Links Settings Content</div>,
    "Account Setting": <div>Account Settings Content</div>,
  };
  return (
    <div className="bg-white p-8 mb-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Setting</h2>
      {/* Top navigation for settings tabs */}
      <div className="flex space-x-4 border-b border-gray-200 mb-6">
        {/* Map through the tabs to create buttons */}
        {tabContent &&
          Object.keys(tabContent).map((content) => (
            <button
              key={content}
              className={`py-2 px-4 text-sm font-medium transition-all duration-200 ${
                tab === content
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setTab(content)}
            >
              {content}
            </button>
          ))}
      </div>

      {/* Conditional rendering based on selected tab */}
      {tab === "Personal" && <CandidateProfileForm />}
    </div>
  );
}
