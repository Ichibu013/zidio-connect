"use client";

import TwoColumnLayout from "@/components/Layout/TwoColumnLayout";

import LoginForm from "@/components/forms/LoginFrom";

export default function Login() {
  const handleSubmit = async () => {
    console.log("ok");
  };

  return (
    <TwoColumnLayout
      left={<LoginForm onSubmit={handleSubmit} />}
      right={null}
    />
  );
}
