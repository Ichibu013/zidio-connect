"use client";
import { useState } from "react";
import TwoColumnLayout from "@/components/Layout/TwoColumnLayout";
import SignupForm from "@/components/forms/SignupForm";
import HeroPanel from "@/components/panels/HeroPanel";

export default function Signup() {
  const [isCandidate, setIsCandidate] = useState(true);

  const handleToggle = async () => {
    setIsCandidate(!isCandidate);
  };

  return (
    <TwoColumnLayout
      left={<SignupForm onToggle={handleToggle} isCandidate={isCandidate} />}
      right={<HeroPanel />}
    />
  );
}
