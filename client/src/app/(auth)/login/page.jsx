"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  yupResolver,
} from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";

import { useAuth } from "../../../context/AuthContext";
import { loginUser } from "../../../services/authService";
import { loginSchema } from "../../../validations/authSchema";

import styles from "./Login.module.css";

export default function LoginPage() {
  const router = useRouter();

  const {
    isAuthenticated,
    isLoading: authLoading,
    login,
  } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.replace("/products");
    }
  }, [
    authLoading,
    isAuthenticated,
    router,
  ]);

  const submitHandler = async (data) => {
    try {
      const response = await loginUser({
        username: data.username.trim(),
        password: data.password,
      });

      login(response.token);

      router.replace("/products");
    } catch (error) {
      setError("root", {
        message:
          error.response?.data?.message ||
          "نام کاربری یا رمز عبور اشتباه است.",
      });
    }
  };

  if (authLoading || isAuthenticated) {
    return null;
  }

  return (
    <main className={styles.page}>
      <h1 className={styles.brand}>
        بوت کمپ بوتواستارت
      </h1>

      <div className={styles.card}>
        <h2 className={styles.title}>
          فرم ورود
        </h2>

        <form
          className={styles.form}
          onSubmit={handleSubmit(submitHandler)}
        >
          <input
            type="text"
            placeholder="نام کاربری"
            disabled={isSubmitting}
            {...register("username")}
          />

          {errors.username && (
            <p className={styles.error}>
              {errors.username.message}
            </p>
          )}

          <input
            type="password"
            placeholder="رمز عبور"
            disabled={isSubmitting}
            {...register("password")}
          />

          {errors.password && (
            <p className={styles.error}>
              {errors.password.message}
            </p>
          )}

          {errors.root && (
            <p className={styles.error}>
              {errors.root.message}
            </p>
          )}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "در حال ورود..."
              : "ورود"}
          </button>
        </form>

        <button
          type="button"
          className={styles.link}
          onClick={() =>
            router.push("/register")
          }
        >
          ایجاد حساب کاربری!
        </button>
      </div>
    </main>
  );
}