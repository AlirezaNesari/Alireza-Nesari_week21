"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";

import { getErrorMessage } from "@/lib/errors";
import { ROUTES } from "@/lib/routes";
import { loginUser } from "@/services/authService";
import { loginSchema } from "@/validations/authSchema";

import AuthCard from "./AuthCard";
import AuthField from "./AuthField";
import AuthForm from "./AuthForm";
import { useAuth } from "./AuthContext";

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  const submitHandler = async ({ username, password }) => {
    try {
      const { token } = await loginUser({
        username: username.trim(),
        password,
      });

      login(token);
      router.replace(ROUTES.products);
    } catch (error) {
      setError("root", {
        message: getErrorMessage(error, "نام کاربری یا رمز عبور اشتباه است."),
      });
    }
  };

  return (
    <AuthCard
      title="فرم ورود"
      footerText="ایجاد حساب کاربری!"
      footerHref={ROUTES.register}
    >
      <AuthForm
        onSubmit={handleSubmit(submitHandler)}
        isSubmitting={isSubmitting}
        submitLabel="ورود"
        submittingLabel="در حال ورود..."
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
      </AuthForm>
    </AuthCard>
  );
}