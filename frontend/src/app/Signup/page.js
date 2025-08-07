"use client";
import { useState } from "react";
import TwoColumnLayout from "@/components/Layout/TwoColumnLayout";
import SignupForm from "@/components/forms/SignupForm";

export default function Signup() {
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
        <SignupForm
          onToggle={handleToggle}
          isCandidate={isCandidate}
          handleSubmit={handleSubmit}
        />
      }
      right={null}
    />
  );
}
