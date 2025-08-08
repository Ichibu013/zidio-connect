import { LuMail } from "react-icons/lu";

export default function EamilSubFooterPanel() {
  return (
    <div className="container max-w-6xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-between">
      {/* Email subscription form */}
      <div className="flex flex-col w-full pr-20 sm:flex-row items-center mb-8 lg:mb-0 space-y-4 sm:space-y-0 sm:space-x-4 flex-1">
        <div className=" flex p-3 w-full space-x-3 items-center border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200">
          <LuMail size={25} />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full bg-gray-900 text-white focus:outline-none"
          ></input>
        </div>
        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-lg hover:bg-blue-700 transition duration-300">
          Subscribe
        </button>
      </div>
      {/* Statistics columns */}
      <div className="flex flex-col sm:flex-row text-center lg:text-left space-y-8 sm:space-y-0 sm:space-x-12">
        <div>
          <p className="text-3xl font-bold text-white">1,75,324</p>
          <p className="text-gray-400 text-sm mt-1">Live Job</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-white">97,354</p>
          <p className="text-gray-400 text-sm mt-1">Companies</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-white">38,47,154</p>
          <p className="text-gray-400 text-sm mt-1">Candidates</p>
        </div>
      </div>
    </div>
  );
}
