"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import { useAuth } from "../../context/AuthContext";
import AuthGuard from "../../components/AuthGuard/AuthGuard";

import styles from "./AdminLayout.module.css";

export default function AdminLayout({
  children,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { logout } = useAuth();

  const {
    register,
    watch,
    reset,
  } = useForm({
    defaultValues: {
      name:
        searchParams.get("name") || "",
    },
  });

  const searchValue = watch("name");

  useEffect(() => {
    reset({
      name:
        searchParams.get("name") || "",
    });
  }, [searchParams, reset]);

  useEffect(() => {
    const value = searchValue?.trim() || "";
    const currentSearch =
      searchParams.get("name") || "";

    if (value === currentSearch) {
      return;
    }

    const params = new URLSearchParams(
      searchParams.toString()
    );

    if (value) {
      params.set("name", value);
    } else {
      params.delete("name");
    }

    params.set("page", "1");

    router.replace(
      `${pathname}?${params.toString()}`
    );
  }, [
    searchValue,
    searchParams,
    pathname,
    router,
  ]);

  const handleLogout = () => {
    logout();

    router.replace("/login");
  };

  return (
    <AuthGuard>
      <div className={styles.layout}>
        <header className={styles.header}>
          <div className={styles.searchBox}>
            <span className={styles.searchIcon}>
              ⌕
            </span>

            <input
              type="text"
              placeholder="جستجو کالا"
              {...register("name")}
            />
          </div>

          <div className={styles.userProfile}>
            <div className={styles.userInfo}>
              <span>
                علیرضا نثاری
              </span>

              <small>
                مدیر
              </small>
            </div>

            <button
              type="button"
              className={styles.logoutButton}
              onClick={handleLogout}
            >
              خروج
            </button>
          </div>
        </header>

        <main className={styles.content}>
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}