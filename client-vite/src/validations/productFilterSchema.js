import * as yup from "yup";

const optionalNumber = yup
  .number()
  .transform((value, originalValue) =>
    originalValue === "" ? undefined : value
  )
  .typeError("قیمت باید عدد باشد.")
  .min(0, "قیمت نمی‌تواند منفی باشد.")
  .notRequired();

export const productFilterSchema = yup
  .object({
    minPrice: optionalNumber,
    maxPrice: optionalNumber,
  })
  .test(
    "price-range",
    "حداکثر قیمت باید بیشتر یا مساوی حداقل قیمت باشد.",
    function (values) {
      const { minPrice, maxPrice } = values;

      if (minPrice === undefined || maxPrice === undefined) {
        return true;
      }

      if (maxPrice >= minPrice) {
        return true;
      }

      return this.createError({
        path: "maxPrice",
        message: "حداکثر قیمت باید بیشتر یا مساوی حداقل قیمت باشد.",
      });
    }
  );