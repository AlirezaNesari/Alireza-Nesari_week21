import * as yup from "yup";

export const productSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required("نام کالا الزامی است."),

  quantity: yup
    .number()
    .typeError("تعداد موجودی باید عدد باشد.")
    .integer("تعداد موجودی باید عدد صحیح باشد.")
    .min(0, "تعداد موجودی نمی‌تواند منفی باشد.")
    .required("تعداد موجودی الزامی است."),

  price: yup
    .number()
    .typeError("قیمت باید عدد باشد.")
    .positive("قیمت باید بیشتر از صفر باشد.")
    .required("قیمت الزامی است."),
});