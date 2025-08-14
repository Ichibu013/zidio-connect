'use client'
import ArrowButton from "@/components/buttons/Arrow-Button";
import PasswordBox from "@/components/inputBox/password-box";
import React, { useState } from "react";
import { IoArrowForward } from "react-icons/io5";

export default function ResetPassword({token}) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

    const hanldeSubmit = async (token) => {
      console.log(token);
      
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
