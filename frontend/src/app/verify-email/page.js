// pages/verify-email.js
"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import EmailVerification from "@/components/panels/EmailVerification/EmailVerification";
import BasicHeader from "@/components/headers/BasicHeader";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");

  useEffect(() => {
    // We can directly access searchParams without waiting for router.isReady
    const emailQuery = searchParams.get("email");
    if (emailQuery) {
      setEmail(emailQuery);
    } else {
      // Handle case where email is not in the URL, e.g., redirect back to signup
      router.push("/Signup");
    }
  }, [searchParams, router]);

  // Pass the email as a prop to your component
  return (
    <div className="flex min-h-screen flex-col min-w-screen">
      <BasicHeader />{" "}
      <div className="flex flex-grow items-center justify-center bg-white p-4">
        <EmailVerification email={email} />{" "}
      </div>{" "}
    </div>
  );
}
