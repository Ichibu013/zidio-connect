"use client";
import { useState } from "react";
import TwoColumnLayout from "@/components/Layout/Column-Layouts/TwoColumnLayout";
import SignupForm from "@/components/forms/Auth-Forms/SignupForm";
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
