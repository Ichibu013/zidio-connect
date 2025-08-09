import EyeIcon from "../icons/Eye-Icon";
import { useState } from "react";

export default function PasswordBox({ placeholder, value, onChange }) {
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle the state of the password visibility.
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-4 relative">
      {/* Password InputBox component */}
      <input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
      />
      <span
        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer"
        onClick={togglePasswordVisibility}
      >
        {/* Eye icon component */}
        <EyeIcon showPassword={showPassword} />
      </span>
    </div>
  );
}
