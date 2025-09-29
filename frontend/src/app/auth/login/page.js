'use client'
import TwoColumnLayout from "@/components/Layout/Column-Layouts/TwoColumnLayout";
import LoginForm from "@/components/forms/Auth-Forms/LoginFrom";
import HeroPanel from "@/components/panels/HeroPanel";

export default function Login() {
  return <TwoColumnLayout left={<LoginForm />} right={<HeroPanel />} />;
}
