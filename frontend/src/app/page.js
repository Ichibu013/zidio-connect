"use client";
import { useState } from "react";
import TwoColumnLayout from "@/components/Layout/TwoColumnLayout";
import SignupForm from "@/components/forms/SignupForm";
import LoginForm from "@/components/forms/LoginFrom";
import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm";

export default function Home() {
  const [isCandidate, setIsCandidate] = useState(true);

  const handleToggle = async () => {
    setIsCandidate(!isCandidate);
  };

  const handleSubmit = async () => {
    console.log("ok");
  };

  return (
    <TwoColumnLayout
      left={
        <ForgotPasswordForm />
      }
      right={null}
    />
  );
}
