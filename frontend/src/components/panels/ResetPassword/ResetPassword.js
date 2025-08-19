"use client";
import ArrowButton from "@/components/buttons/Arrow-Button";
import PasswordBox from "@/components/inputBox/password-box";
import { resetPassword } from "@/services/auth/resetPasswordService";
import React, { useState } from "react";
import { IoArrowForward } from "react-icons/io5";

export default function ResetPassword({ token }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
      alert("Password reset successfully");
      // Optionally, redirect the user or clear the form
      setPassword("");
      setConfirmPassword("");
      // Redirect to login or another page
      window.location.href = "/auth/login"; 
    } else {
      alert("Error resetting password");
    }
  };
  return (
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
  );
}
