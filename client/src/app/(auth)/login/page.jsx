"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "../../../context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/products");
    }
  }, [
    isAuthenticated,
    isLoading,
    router,
  ]);

  if (isLoading || isAuthenticated) {
    return null;
  }

  return <div>Login</div>;
}