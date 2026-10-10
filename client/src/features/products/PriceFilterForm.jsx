"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { productFilterSchema } from "@/validations/productFilterSchema";

import styles from "./Products.module.css";

const FILTER_FIELDS = [
  { name: "minPrice", placeholder: "حداقل قیمت" },
  { name: "maxPrice", placeholder: "حداکثر قیمت" },
];


export default function PriceFilterForm({ minPrice, maxPrice, onApply, onClear }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productFilterSchema),
    defaultValues: { minPrice, maxPrice },
  });

  const hasActiveFilter = Boolean(minPrice || maxPrice);

  return (
    <form className={styles.priceFilter} onSubmit={handleSubmit(onApply)}>
      {FILTER_FIELDS.map(({ name, placeholder }) => (
        <div key={name} className={styles.filterField}>
          <input
            type="number"
            min="0"
            placeholder={placeholder}
            {...register(name)}
          />

          {errors[name] && (
            <p className={styles.filterError}>{errors[name].message}</p>
          )}
        </div>
      ))}

      <button type="submit">اعمال فیلتر</button>

      {hasActiveFilter && (
        <button
          type="button"
          className={styles.clearFilterButton}
          onClick={onClear}
        >
          حذف فیلتر
        </button>
      )}
    </form>
  );
}