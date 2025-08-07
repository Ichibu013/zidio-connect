import AccountTypeToggle from "../AccoutTypeToggle";
import ArrowButton from "../buttons/Arrow-Button";
import EyeIcon from "../icons/Eye-Icon";
import Heading from "../Heading";
import InputBox from "../input-box";
import OR from "../Or-seperator";
import SocialButtons from "../buttons/Social-Buttons";

export default function SignupForm({ onToggle, isCandidate,onSubmit }) {
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
          <AccountTypeToggle
              onToggle={onToggle}
              isCandidate={isCandidate}
          />
      <form onSubmit={onSubmit}>
        {/* Full Name and Username Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Full Name InputBox component */}
          <InputBox placeholder={"Full Name"} />
          {/* Username InputBox component */}
          <InputBox placeholder={"Username"} />
        </div>
        {/* Email Address Input */}
        <div className="mb-4">
          {/* Email InputBox component */}
          <InputBox placeholder={"Email Address"} />
        </div>
        {/* Password Input with Eye Icon */}
        <div className="mb-4 relative">
          {/* Password InputBox component */}
          <InputBox placeholder="Password" />
          <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer">
            {/* Eye icon component */}
            <EyeIcon />
          </span>
        </div>
        {/* Confirm Password Input with Eye Icon */}
        <div className="mb-4 relative">
          {/* Password InputBox component */}
          <InputBox placeholder="Confirm Password" />
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
          />
          <label htmlFor="terms" className="text-sm text-gray-600">
            I've read and agree with your{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Terms of Services
            </a>
          </label>
        </div>
        {/* Create Account Button */}
        <ArrowButton text={"Create Account"} />
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
