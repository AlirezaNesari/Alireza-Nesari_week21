"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  yupResolver,
} from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";

import { useAuth } from "../../../context/AuthContext";
import { registerUser } from "../../../services/authService";
import {
  registerSchema,
} from "../../../validations/authSchema";

import styles from "./Register.module.css";

export default function RegisterPage() {
  const router = useRouter();

  const {
    isAuthenticated,
    isLoading: authLoading,
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
    resolver: yupResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
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
      await registerUser({
        username: data.username.trim(),
        password: data.password,
      });

      router.replace("/login");
    } catch (error) {
      setError("root", {
        message:
          error.response?.data?.message ||
          "ثبت نام با خطا مواجه شد.",
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
          فرم ثبت نام
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

          <input
            type="password"
            placeholder="تکرار رمز عبور"
            disabled={isSubmitting}
            {...register("confirmPassword")}
          />

          {errors.confirmPassword && (
            <p className={styles.error}>
              {errors.confirmPassword.message}
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
              ? "در حال ثبت نام..."
              : "ثبت نام"}
          </button>
        </form>

        <button
          type="button"
          className={styles.link}
          onClick={() =>
            router.push("/login")
          }
        >
          حساب کاربری دارید؟
        </button>
      </div>
    </main>
  );
}