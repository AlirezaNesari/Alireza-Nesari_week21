import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/Union.png";

import { registerUser } from "../../services/authService";
import { registerSchema } from "../../validations/authSchema";

import styles from "./Register.module.css";

function Register() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const navigate = useNavigate();

  const submitHandler = async (data) => {
    try {
      await registerUser({
        username: data.username.trim(),
        password: data.password,
      });

      navigate("/login");
    } catch (error) {
      console.error(error);

      setError("root", {
        message:
          error.response?.data?.message ||
          "ثبت نام با خطا مواجه شد.",
      });
    }
  };

  return (
    <div className={styles.page} dir="rtl">
      <h1 className={styles.brand}>
        بوت کمپ بوتواستارت
      </h1>

      <div className={styles.card}>
        <img
          src={logo}
          alt="Union"
          className={styles.logo}
        />

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
          onClick={() => navigate("/login")}
        >
          حساب کاربری دارید؟
        </button>
      </div>
    </div>
  );
}

export default Register;