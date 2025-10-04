import PostAJobBtn from "@/components/buttons/HeaderBtn/PostAJobBtn";
import SignInBtn from "@/components/buttons/HeaderBtn/SignInBtn";
import SearchHeader from "@/components/headers/SearchHeader";
import SubHeader from "@/components/headers/SubHeader";
import TncBox from "@/components/misc/TncBox";
import { CiSearch } from "react-icons/ci";
import { MdOutlinePinDrop } from "react-icons/md";

export default function CandidateFIndJob() {
  return (
    <>
      <header className="bg-white border-gray-300 shadow-sm position-fixed pt-10">
        <SearchHeader btn1={<SignInBtn />} btn3={<PostAJobBtn />} />
        <SubHeader
          MainHeading={"Find Job"}
          RedirectText={"Home"}
          RedirectLink={"/"}
          SubHeader={"Find Job"}
        />
      </header>
      <div className="max-w-7xl mx-auto bg-white ">
        <div className="py-4 px-20 flex flex-row ">
          <div className="relative flew-grow w-full rounded-md border border-gray-300 h-10 flex items-center">
            <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
            <input
              type="text"
              placeholder="Search jobs by title, keyword or company"
              className="w-1/2 pl-10 pr-4 h-full w-full text-gray-700 bg-transparent focus:outline-none focus:border-transparent transition duration-200 border-r border-gray-300"
            />
            <MdOutlinePinDrop className="absolute left-1/2 top-1/2 -translate-y-1/2 text-blue-500" />
            <input
              type="text"
              placeholder="Search location by city, state or country"
              className="w-1/3 pl-10 pr-4 h-full w-full text-gray-700 bg-transparent focus:outline-none focus:border-transparent transition duration-200 border-r border-gray-300"
            />
            <button className="bg-blue-600 text-white font-semibold py-2 px-6  hover:shadow-lg hover:bg-blue-700 transition-colors duration-200">
              Clear
            </button>
            <button className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-r-md hover:shadow-lg hover:bg-blue-700 transition-colors duration-200">
              Search
            </button>
          </div>
        </div>
        {/* Terms and Condition component */}
        <TncBox />
      </div>
    </>
  );
}
