import { FaRegUserCircle, FaBuilding } from "react-icons/fa";

// The AccountTypeToggle component handles the UI and logic for switching between
// a Candidate and a Recruiter account type. It accepts two props:
// - isCandidate: A boolean to determine which button is currently active.
// - onToggle: The function to call when a button is clicked to toggle the state.
export default function AccountTypeToggle({ isCandidate, onToggle }) {
  return (
    <div className="flex flex-col mb-4 p-2 space-x-2 bg-gray-100 text-center gap-1 rounded-md">
      <span className="text-gray-600 text-sm">CREATE ACCOUNT AS</span>
      <div className="flex flex-col sm:flex-row justify-evenly">
        {/* Candidate button */}
        <button
          onClick={onToggle}
          className={`flex items-center space-x-2 justify-center py-2 px-14 rounded-lg font-medium transition duration-300 ease-in-out
            ${
              isCandidate
                ? "bg-blue-900 text-white rounded-lg" // Active state classes
                : "text-black" // Inactive state classes
            }
          `}
        >
          <FaRegUserCircle />
          <span>Candidate</span>
        </button>
        {/* Recruiter button */}
        <button
          onClick={onToggle}
          className={`flex items-center space-x-2 justify-center py-2 px-14 rounded-lg font-medium transition duration-300 ease-in-out
            ${
              !isCandidate
                ? "bg-blue-900 text-white rounded-lg" // Active state classes
                : "text-black border-none" // Inactive state classes
            }
          `}
        >
          <FaBuilding />
          <span>Recruiter</span>
        </button>
      </div>
    </div>
  );
}
