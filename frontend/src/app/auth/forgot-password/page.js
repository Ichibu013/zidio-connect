"use client";
import { useState } from "react";
import TwoColumnLayout from "@/components/Layout/TwoColumnLayout";
import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm";
import HeroPanel from "@/components/panels/HeroPanel";

export default function ForgotPassword() {
  const [isCandidate, setIsCandidate] = useState(true);

  const handleToggle = async () => {
    setIsCandidate(!isCandidate);
  };

  const handleSubmit = async () => {
    console.log("ok");
  };

  return (
    <TwoColumnLayout left={<ForgotPasswordForm />} right={<HeroPanel />} />
  );
}
