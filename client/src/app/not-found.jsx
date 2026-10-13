"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { ROUTES } from "../lib/routes";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    router.replace(ROUTES.products);
  }, [router]);

  return null;
}