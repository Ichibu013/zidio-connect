import ArrowButton from "../buttons/Arrow-Button";
import SocialButtons from "../buttons/Social-Buttons";
import Heading from "../misc/Heading";
import InputBox from "../inputBox/input-box";
import OR from "../misc/Or-seperator";
import { useState, useRouter, useEffect } from "react";
import { IoArrowForward } from "react-icons/io5";
import { login } from "@/services/auth/loginService";
import BasicHeader from "../headers/BasicHeader";
import TickBox from "../misc/TickBox";
import PasswordBox from "../inputBox/password-box";
import SuccessToast from "../toasts/SucessToast";

export default function LoginForm() {
  // Varible that collect input field data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const router = useRouter();

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Gather all the form data into a single object
    const formData = {
      email,
      password,
    };

    const result = await login(formData);

    if (result == 200) {
      setShowSuccessToast(true);
      console.log("Login successful, redirecting to dashboard...");
    }
    if (result == 500) {
      alert("Login failed, please check your credentials");
      console.error("Login failed, please check your credentials");
    }
    if (result == 400) {
      alert("Bad Request, please check your input");
      console.error("Bad Request, please check your input");
    }
    if (result == 401) {
      alert("Unauthorized, please check your credentials");
      console.error("Unauthorized, please check your credentials");
    }
    if (result == 403) {
      alert("Forbidden, you do not have permission to access this resource");
      console.error(
        "Forbidden, you do not have permission to access this resource"
      );
    }
    if (result == 404) {
      alert("Not Found, please check the URL");
      console.error("Not Found, please check the URL");
    }
    if (result == 429) {
      alert("Too Many Requests, please try again later");
      console.error("Too Many Requests, please try again later");
    }
    if (result == 500) {
      alert("Internal Server Error, please try again later");
      console.error("Backend Server error");
    }
  };

  useEffect(() => {
    if (showSuccessToast) {
      const timer = setTimeout(() => {
        setShowSuccessToast(false);
        router.push("/");
      }, 3000); // Auto-hide after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [showSuccessToast, router]);

  useEffect(() => {
    if (showErrorToast) {
      const timer = setTimeout(() => {
        setShowErrorToast(false);
      }, 3000); // Auto-hide after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [showErrorToast]);

  return (
    <>
      {/* Render the SuccessToast component */}
      <SuccessToast
        message="Login Successful!"
        subtext="Welcome back! Redirecting to dashboard..."
        show={showSuccessToast}
        onClose={() => setShowSuccessToast(false)}
      />
      {/* Render the ErrorToast component */}
      <ErrorToast
        message="Login Failed!"
        subtext="Please check your credentials and try again."
        show={showErrorToast}
        onClose={() => setShowErrorToast(false)}
      />
      {/* Main container for the Login Form */}
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
    </>
  );
}
