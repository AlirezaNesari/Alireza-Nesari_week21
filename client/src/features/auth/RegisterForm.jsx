"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";

import { getErrorMessage } from "../../lib/errors";
import { ROUTES } from "../../lib/routes";
import { registerUser } from "../../services/authService";
import { registerSchema } from "../../validations/authSchema";

import AuthCard from "./AuthCard";
import AuthField from "./AuthField";
import AuthForm from "./AuthForm";

export default function RegisterForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: { username: "", password: "", confirmPassword: "" },
  });

  const submitHandler = async ({ username, password }) => {
    try {
      await registerUser({ username: username.trim(), password });

      router.replace(ROUTES.login);
    } catch (error) {
      setError("root", {
        message: getErrorMessage(error, "ثبت نام با خطا مواجه شد."),
      });
    }
  };

  return (
    <AuthCard
      title="فرم ثبت نام"
      footerText="حساب کاربری دارید؟"
      footerHref={ROUTES.login}
      isTall
    >
      <AuthForm
        onSubmit={handleSubmit(submitHandler)}
        isSubmitting={isSubmitting}
        submitLabel="ثبت نام"
        submittingLabel="در حال ثبت نام..."
        rootError={errors.root?.message}
      >
        <AuthField
          type="text"
          placeholder="نام کاربری"
          disabled={isSubmitting}
          error={errors.username}
          {...register("username")}
        />

        <AuthField
          type="password"
          placeholder="رمز عبور"
          disabled={isSubmitting}
          error={errors.password}
          {...register("password")}
        />

        <AuthField
          type="password"
          placeholder="تکرار رمز عبور"
          disabled={isSubmitting}
          error={errors.confirmPassword}
          {...register("confirmPassword")}
        />
      </AuthForm>
    </AuthCard>
  );
}