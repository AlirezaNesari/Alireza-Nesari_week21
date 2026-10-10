import * as yup from "yup";

export const loginSchema = yup.object({
  username: yup
    .string()
    .trim()
    .required("نام کاربری الزامی است."),

  password: yup
    .string()
    .required("رمز عبور الزامی است."),
});

export const registerSchema = yup.object({
  username: yup
    .string()
    .trim()
    .required("نام کاربری الزامی است."),

  password: yup
    .string()
    .required("رمز عبور الزامی است.")
    .min(4, "رمز عبور باید حداقل 4 کاراکتر باشد."),

  confirmPassword: yup
    .string()
    .required("تکرار رمز عبور الزامی است.")
    .oneOf(
      [yup.ref("password")],
      "رمز عبور و تکرار رمز عبور یکسان نیستند."
    ),
});