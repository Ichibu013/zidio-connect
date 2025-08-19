"use client";
import { useState } from "react";
import TwoColumnLayout from "@/components/Layout/TwoColumnLayout";
import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm";
import HeroPanel from "@/components/panels/HeroPanel";

export default function ForgotPassword() {
  // This component renders a two-column layout with the Forgot Password form on the left
  // and a Hero panel on the right.
  // The ForgotPasswordForm component handles the form submission and user interactions.
  // The HeroPanel component displays a visual or informational panel to enhance the user experience.
  // The layout is responsive, adapting to different screen sizes for optimal viewing.  
  return (
    <TwoColumnLayout left={<ForgotPasswordForm />} right={<HeroPanel />} />
  );
}
