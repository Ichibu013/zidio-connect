import ArrowButton from "../buttons/Arrow-Button";
import SocialButtons from "../buttons/Social-Buttons";
import Heading from "../misc/Heading";
import EyeIcon from "../icons/Eye-Icon";
import InputBox from "../inputBox/input-box";
import OR from "../misc/Or-seperator";
import { useState } from "react";
import { IoArrowForward } from "react-icons/io5";
import { signup } from "@/services/auth/signupService";
import { login } from "@/services/auth/loginService";

export default function LoginForm() {
  // Varible that collect input field data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Variable to set Password Visibility State
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle the state of the password visibility.
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Gather all the form data into a single object
    const formData = {
      email,
      password,
    };

    const result = await login(formData);

    if (result == 200) {
      console.log("Can be redirected!!");
    }
    if (result == 500) {
      console.error("Backend Server error");
    }
  };

  return (
    // Form card
    <div className="bg-white p-6 sm:p-8 rounded-lg w-full max-w-lg">
      {/* Heading and Login Form */}
      <Heading text={"Sign in"} />
      <p className="text-gray-600 mb-6">
        Don't have account?{" "}
        <a href="/Signup" className="text-blue-600 hover:underline">
          Create account
        </a>
      </p>

      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          {/* Email InputBox component */}
          <InputBox
            placeholder={"Email Address"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {/* Password Input with Eye Icon */}
        <div className="mb-4 relative">
          {/* Password InputBox component */}
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        {/* Remember me Checkbox and Forgot password link */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember-me"
              className="mr-2 rounded text-blue-500 focus:ring-blue-500"
            />
            <label htmlFor="remember-me" className="text-sm text-gray-600">
              Remember me
            </label>
          </div>
          <a
            href="/Login/ForgotPassword"
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot password?
          </a>
        </div>
        {/* Login Button */}
        <ArrowButton
          text={"Sign in"}
          icon={<IoArrowForward size={18} />}
          type="submit"
        />
        {/* OR separator */}
        <OR />

        {/* Social Sign-up Buttons */}
        <SocialButtons
          Facebook={"Sign in with Facebook"}
          Google={"Sign in with Google"}
        />
      </form>
    </div>
  );
}
