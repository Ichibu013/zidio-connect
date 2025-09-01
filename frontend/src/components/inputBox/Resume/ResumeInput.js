'use client';
import { useState } from 'react';
import { LuCirclePlus } from "react-icons/lu";
export default function ResumeInput() {
  const [file, setFile] = useState(null);

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
    console.log("File selected:", uploadedFile);
  };

  return (
    <label
      htmlFor="resume-upload"
      className="flex flex-row items-center justify-evenly border-2 border-dashed border-gray-300 rounded-lg px-2 py-4 gap-2 text-center cursor-pointer hover:border-blue-500 transition-all duration-200"
    >
      <div>
        <LuCirclePlus size={40} className="text-blue-500 mb-2" />
      </div>
      <div className="text-center">
        <p className="text-blue-600 text-sm font-medium">
          {file ? file.name : "Add Cv/Resume"}
        </p>
        <p className="text-gray-400 text-xs mt-1">
          Browse file or drop here <br />
          [PDF only]
        </p>
      </div>
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileUpload}
        className="hidden"
        id="resume-upload"
      />
    </label>
  );
}
