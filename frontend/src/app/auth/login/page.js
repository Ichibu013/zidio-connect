"use client";
import TwoColumnLayout from "@/components/Layout/TwoColumnLayout";
import LoginForm from "@/components/forms/LoginFrom";
import HeroPanel from "@/components/panels/HeroPanel";

export default function Login() {
  

  return (
    <TwoColumnLayout
      left={<LoginForm />}
      right={<HeroPanel />}
    />
  );
}
