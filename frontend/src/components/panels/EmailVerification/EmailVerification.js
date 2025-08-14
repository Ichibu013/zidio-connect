// components/EmailVerification.js
"use client";
import React, { useState } from "react";
import { IoArrowForward } from "react-icons/io5";
import PasswordBox from "@/components/inputBox/password-box";
import ArrowButton from "@/components/buttons/Arrow-Button";
import BasicHeader from "@/components/headers/BasicHeader";
import { verifyEmail } from "@/services/auth/verifyEmailService";

const EmailVerification = ({ email }) => {
  const [verificationCode, setVerificationCode] = useState("");

  const handleResend = () => {
    // Logic to resend the verification code
    console.log("Resending verification code...");
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    // Logic to verify the code
    console.log(`Verifying code: ${verificationCode}`);
    
    const result = await verifyEmail({ email, otp: verificationCode });
    if (result == 200) {
      console.log('Can be redirected!!');
    }
  };

  return (
    <div className="flex max-w-md bg-white ">
      <div className="w-full max-w-md  p-8 ">
        <h2 className="mb-2 text-center text-xl font-bold text-black">
          Email Verification
        </h2>
        <p className="mb-6 text-center text-sm text-gray-400">
          We've sent an email to{" "}
          <span className="font-semibold text-black">{email} </span> to verify
          your email address and activate your account.
        </p>
        <form onSubmit={handleVerification}>
          <div className="mb-4">
            <PasswordBox
              placeholder={"Verification Code"}
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
          </div>
          <ArrowButton
            text={"Verify email"}
            icon={<IoArrowForward size={18} />}
            type="submit"
          />
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Didn't receive any code?
          <button
            onClick={handleResend}
            className="ml-1 font-semibold text-blue-600 hover:underline focus:outline-none"
          >
            Resend
          </button>
        </p>
      </div>
    </div>
  );
};

export default EmailVerification;
