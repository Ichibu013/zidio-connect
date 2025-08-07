import AccountTypeToggle from "../toggles/AccoutTypeToggle";
import ArrowButton from "../buttons/Arrow-Button";
import EyeIcon from "../icons/Eye-Icon";
import Heading from "../misc/Heading";
import InputBox from "../inputBox/input-box";
import OR from "../misc/Or-seperator";
import SocialButtons from "../buttons/Social-Buttons";
import { signup } from "@/services/signupService";
import { useState } from "react";

export default function SignupForm({ onToggle, isCandidate }) {
  // Use state to manage the form inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Gather all the form data into a single object
    const formData = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      isCandidate,
      termsAccepted,
    };

    const result = await signup(formData);

    if (result == 200) {
      console.log("Can be redirected!!");
    }
  };

  return (
    // Form card
    <div className="bg-white p-6 sm:p-8 rounded-lg w-full max-w-lg">
      {/* Heading and Login Link */}
      <Heading text={"Create Account"} />
      <p className="text-gray-600 mb-6">
        Already have an account?{" "}
        <a href="/Login" className="text-blue-600 hover:underline">
          Login
        </a>
      </p>
      <AccountTypeToggle onToggle={onToggle} isCandidate={isCandidate} />
      <form onSubmit={handleFormSubmit}>
        {/* Full Name and Username Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* First Name InputBox component */}
          <InputBox
            placeholder={"First Name"}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {/* Last Name InputBox component */}
          <InputBox
            placeholder={"Last Name"}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        {/* Email Address Input */}
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
          <InputBox
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer">
            {/* Eye icon component */}
            <EyeIcon />
          </span>
        </div>
        {/* Confirm Password Input with Eye Icon */}
        <div className="mb-4 relative">
          {/* Password InputBox component */}
          <InputBox
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer">
            {/* Eye icon Component */}
            <EyeIcon />
          </span>
        </div>
        {/* Terms of Service Checkbox */}
        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            id="terms"
            className="mr-2 rounded text-blue-600 focus:ring-blue-500"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
          />
          <label htmlFor="terms" className="text-sm text-gray-600">
            I've read and agree with your{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Terms of Services
            </a>
          </label>
        </div>
        {/* Create Account Button */}
        <ArrowButton text={"Create Account"} type="submit" />
        {/* OR separator */}
        <OR />

        {/* Social Sign-up Buttons */}
        <SocialButtons
          Facebook={"Sign up with Facebook"}
          Google={"Sign up with Google"}
        />
      </form>
    </div>
  );
}
