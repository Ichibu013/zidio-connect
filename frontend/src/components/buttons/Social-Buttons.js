import { FaFacebookF, FaGoogle } from "react-icons/fa";

export default function SocialButtons({ Facebook, Google }) {
  return (
    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
      <button className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium flex items-center justify-center space-x-2 hover:bg-gray-50 hover:scale-102 transition duration-300 ease-in-out shadow-sm">
        <FaFacebookF className="text-blue-600" />
        <span className="text-sm">{Facebook}</span>
      </button>
      <button className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium flex items-center justify-center space-x-2 hover:bg-gray-50 hover:scale-102 transition duration-300 ease-in-out shadow-sm">
        <FaGoogle className="text-red-500" />
        <span className="text-sm">{Google}</span>
      </button>
    </div>
  );
}
