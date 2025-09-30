import React, { useState } from "react";

const PrivacyPanel = () => {
  // State to manage whether the profile is public (true) or private (false)
  // Initial state is 'true' to match the visual in the uploaded image.
  const [isPublicProfile, setIsPublicProfile] = useState(true);
  const [isPublicResume, setIsPublicResume] = useState(true);

  // Handler to toggle the state
  const togglePublicProfile = () => {
    setIsPublicProfile((prev) => !prev);
  };

  const togglePublicResume = () => {
    setIsPublicResume((prev) => !prev);
  };
  const Switch = ({ onClick, isvisible }) => (
    <div
      onClick={onClick}
      // Base container for the switch
      className={`relative w-14 h-8 flex items-center rounded-full transition-all duration-300 cursor-pointer shadow-inner
        ${isvisible ? "bg-blue-600" : "bg-gray-300 hover:bg-gray-400/80"}
      `}
      aria-checked={isvisible}
      role="switch"
      tabIndex="0"
    >
      {/* The draggable 'thumb' of the switch */}
      <div
        className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 absolute 
          ${isvisible ? "translate-x-7" : "translate-x-1"}
        `}
      />
    </div>
  );

  const labelStyle = "text-gray-700 mb-2";
  return (
    <section className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">
        Privacy Settings
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-1">
          <h5 className={labelStyle}>Make Profile Public</h5>
          <div className="bg-white p-2 rounded-xl w-full max-w-sm transition-all duration-300 border border-gray-200">
            <div className="flex items-center">
              {/* 1. Switch Component */}
              <Switch onClick={togglePublicProfile} isvisible={isPublicProfile} />

              {/* 2. Status Text (YES/NO) */}
              <span
                className={`ml-3 mr-3 text-lg font-extrabold transition-colors duration-300 min-w-[35px]
            ${isPublicProfile ? "text-blue-600" : "text-gray-500"}
          `}
              >
                {isPublicProfile ? "YES" : "NO"}
              </span>

              {/* 3. Description Text */}
              <p className="text-gray-700 text-base font-medium flex-1 transition-colors duration-300 border-l border-gray-200 pl-3">
                Your profile is{" "}
                <strong className={isPublicProfile ? "text-blue-700" : "text-red-400"}>
                  {isPublicProfile ? "public" : "private"}
                </strong>{" "}
                now
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <h5 className={labelStyle}>Make Resume Public</h5>
          <div className="bg-white p-2 rounded-xl w-full max-w-sm transition-all duration-300 border border-gray-200">
            <div className="flex items-center">
              {/* 1. Switch Component */}
              <Switch onClick={togglePublicResume} isvisible={isPublicResume}/>

              {/* 2. Status Text (YES/NO) */}
              <span
                className={`ml-3 mr-3 text-lg font-extrabold transition-colors duration-300 min-w-[35px]
            ${isPublicResume ? "text-blue-600" : "text-gray-500"}
          `}
              >
                {isPublicResume ? "YES" : "NO"}
              </span>

              {/* 3. Description Text */}
              <p className="text-gray-700 text-base font-medium flex-1 transition-colors duration-300 border-l border-gray-200 pl-3">
                Your resume is{" "}
                <strong className={isPublicResume ? "text-blue-700" : "text-red-400"}>
                  {isPublicResume ? "public" : "private"}
                </strong>{" "}
                now
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPanel;
