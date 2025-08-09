"use client";
import TwoColumnLayout from "@/components/Layout/TwoColumnLayout";
import LoginForm from "@/components/forms/LoginFrom";

export default function Login() {
  

  return (
    <TwoColumnLayout
      left={<LoginForm />}
      right={null}
    />
  );
}
