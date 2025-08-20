"use client";
import React, { useState, useRouter, useEffect } from "react";
import Heading from "../misc/Heading";
import InputBox from "../inputBox/input-box";
import ArrowButton from "../buttons/Arrow-Button";
import OR from "../misc/Or-seperator";
import SocialButtons from "../buttons/Social-Buttons";
import BasicHeader from "../headers/BasicHeader";
import { IoArrowForward } from "react-icons/io5";
import { forgotPassword } from "@/services/auth/forgotPasswordService";
import { s } from "framer-motion/dist/types.d-Cjd591yU";
import InfoToast from "../toasts/InfoToast";
import ErrorToast from "../toasts/ErrorToast";

export default function ForgotPasswordForm() {
  const [infoToast, setInfoToast] = useState(false);
  const [errorToast, setErrorToast] = useState(false);
  const [email, setEmail] = useState("");

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Handle the form submission logic here
    console.log("Email submitted:", email);

    const result = await forgotPassword(email);
    if (result === 200) {
      setInfoToast(true);
      console.log("Password reset link sent successfully.");
      setEmail(""); // Clear the email input
    } else {
      setErrorToast(true);
      console.error("Failed to send password reset link.");
    }
  };

  useEffect(() => {
    if (infoToast) {
      const timer = setTimeout(() => {
        setInfoToast(false);
        router.push("/auth/login"); // Redirect to login after showing info toast
      }, 3000); // Show for 3 seconds
      return () => clearTimeout(timer);
    }
  }, [infoToast, router]);

  useEffect(() => {
    if (errorToast) {
      const timer = setTimeout(() => {
        setErrorToast(false);
      }, 3000); // Show for 3 seconds
      return () => clearTimeout(timer);
    }
  }, [errorToast]);

  return (
    <>
      {/* info toast */}
      <InfoToast
        message="Password reset link sent to your email."
        subtext="Please check your inbox."
        show={infoToast}
        onClose={() => setInfoToast(false)}
      />
      {/* error toast */}
      <ErrorToast
        message="Failed to send password reset link."
        subtext="Please try again later."
        show={errorToast}
        onClose={() => setErrorToast(false)}
      />
      {/* Main container for the Forgot Password Form */}
      <div className="bg-white p-6 sm:p-8 rounded-lg w-full max-w-lg">
        <BasicHeader />
        {/* Heading and Reset Password Form */}
        <Heading text={"Forgot Password"} />
        <p className="text-gray-600 pb-2 mt-4">
          Go back to{" "}
          <a href="/auth/login" className="text-blue-600 hover:underline">
            Sign in
          </a>
        </p>
        <p className="text-gray-600 mb-6">
          Don't have account?{" "}
          <a href="/auth/signup" className="text-blue-600 hover:underline">
            Create account
          </a>
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            {/* Email InputBox component */}
            <InputBox
              placeholder={"Email Address"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Reset Password Button */}
          <ArrowButton
            text={"Reset Password"}
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
