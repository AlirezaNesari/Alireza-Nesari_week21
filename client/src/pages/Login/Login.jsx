import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

import { loginSchema } from "../../validations/authSchema";

import logo from "../../assets/Union.png";
import styles from "./Login.module.css";

function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const submitHandler = async (data) => {
    try {
      const response = await loginUser({
        username: data.username.trim(),
        password: data.password,
      });

      login(response.token);

      navigate("/products");
    } catch (error) {
      console.error(error);

      setError("root", {
        message:
          error.response?.data?.message ||
          "نام کاربری یا رمز عبور اشتباه است.",
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
          onClick={() => navigate("/register")}
        >
          ایجاد حساب کاربری!
        </button>
      </div>
    </div>
  );
}

export default Login;