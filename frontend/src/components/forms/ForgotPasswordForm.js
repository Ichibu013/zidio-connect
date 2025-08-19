'use client';
import React, { useState } from "react";  
import Heading from "../misc/Heading";
import InputBox from "../inputBox/input-box";
import ArrowButton from "../buttons/Arrow-Button";
import OR from "../misc/Or-seperator";
import SocialButtons from "../buttons/Social-Buttons";
import BasicHeader from "../headers/BasicHeader";
import { IoArrowForward } from "react-icons/io5";
import { forgotPassword } from "@/services/auth/forgotPasswordService";

export default function ForgotPasswordForm() {

  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Handle the form submission logic here
    console.log("Email submitted:", email);
    
    const result = await forgotPassword(email);
    if (result === 200) {
      alert("Password reset link sent to your email");
      setEmail("");
      window.location.href = "/auth/login"; 
    } else {
      alert("Error sending password reset link");
    }
  };

  return (
    // Form card
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
  );
}
