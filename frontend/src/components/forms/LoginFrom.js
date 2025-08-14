import ArrowButton from "../buttons/Arrow-Button";
import SocialButtons from "../buttons/Social-Buttons";
import Heading from "../misc/Heading";
import InputBox from "../inputBox/input-box";
import OR from "../misc/Or-seperator";
import { useState } from "react";
import { IoArrowForward } from "react-icons/io5";
import { login } from "@/services/auth/loginService";
import BasicHeader from "../headers/BasicHeader";
import TickBox from "../misc/TickBox";
import PasswordBox from "../inputBox/password-box";

export default function LoginForm() {
  // Varible that collect input field data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      <BasicHeader />
      {/* Heading and Login Form */}
      <Heading text={"Sign in"} />
      <p className="text-gray-600 mb-6">
        Don't have account?{" "}
        <a href="/auth/signup" className="text-blue-600 hover:underline">
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
        <PasswordBox
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* Remember me Checkbox and Forgot password link */}
        <div className="flex justify-between">
          <TickBox blackText={"Remember me"} />
          <a
            href="/auth/forgot-password"
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
