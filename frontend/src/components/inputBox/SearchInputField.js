import { CiSearch } from "react-icons/ci";

export default function SeachInputBox() {
  return (
    <div className="relative flew-grow w-full">
      <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
      <input
        type="text"
        placeholder="Job title, keyword, company"
        className="w-full pl-10 pr-4 h-full w-full text-gray-700 bg-transparent focus:outline-none focus:border-transparent transition duration-200"
      />
    </div>
  );
}
