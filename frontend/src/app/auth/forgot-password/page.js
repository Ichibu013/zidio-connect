import TwoColumnLayout from "@/components/Layout/TwoColumnLayout";
import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm";
import HeroPanel from "@/components/panels/HeroPanel";

export default function ForgotPassword() {
  return (
    <TwoColumnLayout left={<ForgotPasswordForm />} right={<HeroPanel />} />
  );
}
