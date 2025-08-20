import AccountTypeToggle from "../toggles/AccoutTypeToggle";
import ArrowButton from "../buttons/Arrow-Button";
import Heading from "../misc/Heading";
import InputBox from "../inputBox/input-box";
import OR from "../misc/Or-seperator";
import SocialButtons from "../buttons/Social-Buttons";
import { signup } from "@/services/auth/signupService";
import { useEffect, useState } from "react";
import PasswordBox from "../inputBox/password-box";
import { IoArrowForward } from "react-icons/io5";
import { useRouter } from "next/navigation";
import BasicHeader from "../headers/BasicHeader";
import TickBox from "../misc/TickBox";
import SuccessToast from "../toasts/SucessToast";
import ErrorToast from "../toasts/ErrorToast";

export default function SignupForm({ onToggle, isCandidate }) {
  // State to control the visibility of the popup, initialized to false to hide it
  const [isOpen, setIsOpen] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  // Use state to manage the form inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const router = useRouter();

  // Function to handle form submission
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
    // const result = 500;

    if (result == 200) {
      // Show success toast
      setShowSuccessToast(true);
      // log the success message
      console.log("Signup successful, redirecting to login page...");
    }
    if (result == 500) {
      // Show error toast
      setShowErrorToast(true);
      // log the error message
      console.log("Signup failed, please check your input");
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
  };

  useEffect(() => {
    if (showSuccessToast) {
      const timer = setTimeout(() => {
        setShowSuccessToast(false);
        router.push(`/auth/verify-email?email=${email}`);
      }, 3000); // Hide toast after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [showSuccessToast, email, router]);

  useEffect(() => {
    if (showErrorToast) {
      const timer = setTimeout(() => {
        setShowErrorToast(false);
      }, 3000); // Hide toast after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [showErrorToast]);

  return (
    <>
      {/* Container for signup form component */}
      <div className="bg-white p-6 sm:p-8 rounded-lg w-full max-w-lg">
        <BasicHeader />
        {/* Heading and Login Link */}
        <Heading text={"Create Account"} />
        <p className="text-gray-600 mb-2">
          Already have an account?{" "}
          <a href="/auth/login" className="text-blue-600 hover:underline">
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

          {/* Terms of Service Checkbox component */}
          <TickBox
            blackText={"I've read and agree with your"}
            blueText={"Terms of Services"}
            href={"/terms-and-condition"}
            onClick={() => setTermsAccepted(!termsAccepted)}
            state={termsAccepted}
          />
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
      {/* Render the SuccessToast component */}
      <SuccessToast
        message="Sign Up Successful!"
        subtext="Please check your email for a verification link."
        show={showSuccessToast}
        onClose={() => setShowSuccessToast(false)}
      />
      {/* Render the ErrorToast component */}
      <ErrorToast
        message="Sign Up Failed!"
        subtext="Please check your input and try again."
        show={showErrorToast}
        onClose={() => setShowErrorToast(false)}
      />
    </>
  );
}
