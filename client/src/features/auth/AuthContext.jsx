"use client";

import { createContext, useContext, useMemo, useSyncExternalStore } from "react";

import { tokenStorage } from "@/lib/tokenStorage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const token = useSyncExternalStore(
    tokenStorage.subscribe,
    tokenStorage.getToken,
    tokenStorage.getServerSnapshot
  );

  const value = useMemo(
    () => ({
      token,
      isLoading: token === undefined,
      isAuthenticated: Boolean(token),
      login: tokenStorage.setToken,
      logout: tokenStorage.clearToken,
    }),
    [token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}