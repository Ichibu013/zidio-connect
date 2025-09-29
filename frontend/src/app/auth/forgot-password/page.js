import TwoColumnLayout from "@/components/Layout/Column-Layouts/TwoColumnLayout";
import ForgotPasswordForm from "@/components/forms/Auth-Forms/ForgotPasswordForm";
import HeroPanel from "@/components/panels/HeroPanel";

export default function ForgotPassword() {
  return (
    <TwoColumnLayout left={<ForgotPasswordForm />} right={<HeroPanel />} />
  );
}
