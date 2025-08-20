"use client";
import ArrowButton from "@/components/buttons/Arrow-Button";
import PasswordBox from "@/components/inputBox/password-box";
import ErrorToast from "@/components/toasts/ErrorToast";
import SuccessToast from "@/components/toasts/SucessToast";
import { resetPassword } from "@/services/auth/resetPasswordService";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IoArrowForward } from "react-icons/io5";

export default function ResetPassword({ token }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const router = useRouter();

  // Function to handle form submission
  const hanldeSubmit = async (event) => {
    // Prevent default form submission behavior
    event.preventDefault();
    console.log(token);
    // Validate passwords
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const formData = {
      password: password,
      token: token,
    };

    const result = await resetPassword(formData);
    if (result == 200) {
      setShowSuccessToast(true);
      console.log("Password reset successful, redirecting to login page...");
      setPassword("");
      setConfirmPassword(""); 
    } else {
      setShowErrorToast(true);
      console.error("Password reset failed, please check your input");
    }
  };

  // Effect to handle success toast visibility and redirection
  useEffect(() => {
    if (showSuccessToast) {
      const timer = setTimeout(() => {
        setShowSuccessToast(false);
        router.push("/auth/login"); // Redirect to login after showing success toast
      }, 3000); // Show for 3 seconds
      return () => clearTimeout(timer);
    }
  }, [showSuccessToast, router]);

  // Effect to handle error toast visibility
  useEffect(() => {
    if (showErrorToast) {
      const timer = setTimeout(() => {
        setShowErrorToast(false);
      }, 3000); // Show for 3 seconds
      return () => clearTimeout(timer);
    }
  }, [showErrorToast]);

  return (
    <>
      {/* Success Toast */}
      <SuccessToast
        message="Password reset successful!"
        subtext="You can now log in with your new password."
        show={showSuccessToast}
        onClose={() => setShowSuccessToast(false)}
      />
      {/* Error Toast */}
      <ErrorToast
        message="Password reset failed."
        subtext="Please check your input and try again."
        show={showErrorToast}
        onClose={() => setShowErrorToast(false)}
      />
      {/* Reset Password Form */}
      <div className="flex min-w-md bg-white ">
        <div className="w-full max-w-md  p-8 ">
          <h2 className="text-3xl font-semibold mb-2 text-gray-800 text-center">
            Reset Password
          </h2>
          <p className="mb-6 text-center text-sm text-gray-400">
            Please enter your
            <span className="font-semibold text-black"> new password</span>
          </p>
          <form onSubmit={hanldeSubmit}>
            <div className="mb-4">
              <PasswordBox
                placeholder={"New Password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <PasswordBox
                placeholder={"Confirm Password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <ArrowButton
              text={"Reset Password"}
              icon={<IoArrowForward size={18} />}
              type="submit"
            />
          </form>
        </div>
      </div>
    </>
  );
}
