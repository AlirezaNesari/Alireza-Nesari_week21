"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { ROUTES } from "@/lib/routes";

import { useAuth } from "./AuthContext";

function RedirectGate({ isAllowed, redirectTo, children }) {
  const router = useRouter();
  const { isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAllowed) {
      router.replace(redirectTo);
    }
  }, [isLoading, isAllowed, redirectTo, router]);

  if (isLoading || !isAllowed) {
    return null;
  }

  return children;
}

export function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  return (
    <RedirectGate isAllowed={isAuthenticated} redirectTo={ROUTES.login}>
      {children}
    </RedirectGate>
  );
}

export function GuestRoute({ children }) {
  const { isAuthenticated } = useAuth();

  return (
    <RedirectGate isAllowed={!isAuthenticated} redirectTo={ROUTES.products}>
      {children}
    </RedirectGate>
  );
}