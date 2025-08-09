import AccountTypeToggle from "../toggles/AccoutTypeToggle";
import ArrowButton from "../buttons/Arrow-Button";
import EyeIcon from "../icons/Eye-Icon";
import Heading from "../misc/Heading";
import InputBox from "../inputBox/input-box";
import OR from "../misc/Or-seperator";
import SocialButtons from "../buttons/Social-Buttons";
import { signup } from "@/services/auth/signupService";
import { useState } from "react";
import PasswordBox from "../inputBox/password-box";
import { IoArrowForward } from "react-icons/io5";

export default function SignupForm({ onToggle, isCandidate }) {
  // State to control the visibility of the popup, initialized to false to hide it
  const [isOpen, setIsOpen] = useState(false);

  // Use state to manage the form inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Function to toggle the popup visibility
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

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
        {/* First Name and Last Name Inputs */}
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
        {/* Password InputBox */}
        <PasswordBox
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* Confirm Password Input with Eye Icon */}
        <PasswordBox
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

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
            <a href="/TermsCondition" className="text-blue-600 hover:underline">
              Terms of Services
            </a>
          </label>
        </div>
        {/* Create Account Button */}
        <ArrowButton
          text={"Create Account"}
          icon={<IoArrowForward size={18} />}
          type="submit"
        />
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
