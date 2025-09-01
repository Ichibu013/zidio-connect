import { useState } from "react";
import { FaRegFileAlt } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiEdit2Line } from "react-icons/ri";
import { RiDeleteBin6Line } from "react-icons/ri";

function CvItemBox({ cv }) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="relative bg-gray-100 px-2 py-4 rounded-lg flex items-center justify-between">
      <div className="flex items-center">
        {/* File icon */}
        <FaRegFileAlt size={33} className="text-blue-500 mr-4" />
        <div>
          <p className="font-semibold text-sm text-gray-700">{cv.name}</p>
          <p className="text-xs text-gray-400 mt-1">{cv.size}</p>
        </div>
      </div>
      <div className="relative">
        {/* Three dots menu */}
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="text-gray-400 hover:text-gray-600 transition-colors duration-200 focus:outline-none"
        >
          <BsThreeDotsVertical size={24} />
        </button>
        {/* Dropdown Menu */}
        {showDropdown && (
          <div className="absolute right-0 top-full mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-t-lg transition-colors duration-200">
              <RiEdit2Line size={16} className="mr-2 text-blue-500" />
              Edit Resume
            </button>
            <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-red-50 rounded-b-lg transition-colors duration-200">
              <RiDeleteBin6Line size={16} className="mr-2 text-red-500" />
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CvItemBox;
