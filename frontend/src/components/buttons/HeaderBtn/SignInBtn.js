"use client";
import SpiningLoadingOverLay from "@/components/LoadingOverLays/SpiningLoadingOverLay";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInBtn() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleRedirect = () => {
    setIsLoading(true);
    router.push("/auth/login");
  };
  return (
    <button
      onClick={handleRedirect}
      className="px-6 py-2 text-blue-600 font-semibold bg-transparent rounded-lg border-2 border-blue-600 hover:bg-blue-50 hover:scale-103 transition-colors duration-200 cursor-pointer"
    >
      Sign in
      {/* Loading Overlay */}
      {isLoading && <SpiningLoadingOverLay />}
    </button>
  );
}
