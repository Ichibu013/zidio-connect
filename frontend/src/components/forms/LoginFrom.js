import ArrowButton from "../buttons/Arrow-Button";
import SocialButtons from "../buttons/Social-Buttons";
import Heading from "../misc/Heading";
import EyeIcon from "../icons/Eye-Icon";
import InputBox from "../inputBox/input-box";
import OR from "../misc/Or-seperator";

export default function LoginForm({ onSubmit }) {
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

      <form onSubmit={onSubmit}>
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
        <ArrowButton text={"Sign in"} />
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
