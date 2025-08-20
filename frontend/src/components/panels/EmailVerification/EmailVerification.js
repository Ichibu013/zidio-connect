// components/EmailVerification.js
"use client";
import React, { useState } from "react";
import { IoArrowForward } from "react-icons/io5";
import PasswordBox from "@/components/inputBox/password-box";
import ArrowButton from "@/components/buttons/Arrow-Button";
import BasicHeader from "@/components/headers/BasicHeader";
import { verifyEmail } from "@/services/auth/verifyEmailService";
import { resendOtp } from "@/services/auth/resendOtpService";
import { useRouter } from "next/router";
import SuccessToast from "@/components/toasts/SucessToast";
import ErrorToast from "@/components/toasts/ErrorToast";
import InfoToast from "@/components/toasts/InfoToast";

const EmailVerification = ({ email }) => {
  const [verificationCode, setVerificationCode] = useState("");

  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);  
  const [showInfoToast, setShowInfoToast] = useState(false);

  const router = useRouter();

  // Function to handle resending the verification code
  const handleResend = async (params) => {
    params.preventDefault(); // Prevent default form submission behavior
    // Logic to resend the verification code
    console.log("Resending verification code...");

    const result = await resendOtp(email);
    if (result === 200) {
      setShowInfoToast(true);
      console.log("Verification code resent successfully.");
      setVerificationCode(""); // Clear the input field
    } else {
      setShowErrorToast(true);
      console.error("Failed to resend verification code.");
    }
  };

  // Function to handle email verification
  const handleVerification = async (e) => {
    e.preventDefault();
    // Logic to verify the code
    console.log(`Verifying code: ${verificationCode}`);

    const result = await verifyEmail({ email, otp: verificationCode });
    if (result == 200) {
      setShowSuccessToast(true);
      console.log("Email verified successfully, redirecting to login page...");
      setVerificationCode(""); // Clear the input field
    } else {
      setShowErrorToast(true);
      console.error("Email verification failed, please check your code");
      setVerificationCode(""); // Clear the input field on error
    } 
  };


  // Effect to handle success toast visibility and redirection
  React.useEffect(() => {
    if (showSuccessToast) {
      const timer = setTimeout(() => {
        setShowSuccessToast(false);
        router.push("/auth/login"); // Redirect to login after showing success toast
      }, 3000); // Show for 3 seconds
      return () => clearTimeout(timer);
    }
  }, [showSuccessToast, router]); 
  // Effect to handle error toast visibility
  React.useEffect(() => {
    if (showErrorToast) {
      const timer = setTimeout(() => {
        setShowErrorToast(false);
      }, 3000); // Show for 3 seconds
      return () => clearTimeout(timer);
    }
  }, [showErrorToast]);
  // Effect to handle info toast visibility
  React.useEffect(() => {
    if (showInfoToast) {
      const timer = setTimeout(() => {
        setShowInfoToast(false);
      }, 3000); // Show for 3 seconds
      return () => clearTimeout(timer);
    }
  }, [showInfoToast]);

  return (
    <>
      {/* SuccessToast component */}
      <SuccessToast
        message="Email verified successfully!"
        subtext="You can now log in to your account."
        show={showSuccessToast}
        onClose={() => setShowSuccessToast(false)}
      />
      {/* ErrorToast component */}
      <ErrorToast
        message="Email verification failed!"
        subtext="Please check your verification code and try again."
        show={showErrorToast}
        onClose={() => setShowErrorToast(false)}
      />
      {/* InfoToast component */}
      <InfoToast
        message="Verification code resent!"
        subtext="Please check your email for the new code."
        show={showInfoToast}
        onClose={() => setShowInfoToast(false)}
      />
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
    </>
  );
};

export default EmailVerification;
