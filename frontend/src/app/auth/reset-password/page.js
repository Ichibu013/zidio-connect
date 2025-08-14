"use client";
import BasicHeader from "@/components/headers/BasicHeader";
import ResetPassword from "@/components/panels/ResetPassword/ResetPassword";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState("");

  useEffect(() => {
    const tokenquery = searchParams.get("token");
    if (tokenquery) {
      setToken(tokenquery);
    }
  }, [searchParams, router]);

  // Pass the token as a prop to your component
  return (
    <div className="flex min-h-screen flex-col min-w-screen">
      <BasicHeader />{" "}
      <div className="flex flex-grow items-center justify-center bg-white p-4">
        <ResetPassword token={token} />
      </div>{" "}
    </div>
  );
}
