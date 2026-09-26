"use client";

import { useForm } from "react-hook-form";
import {
  yupResolver,
} from "@hookform/resolvers/yup";

import { createProduct } from "../../services/productService";
import { productSchema } from "../../validations/productSchema";

import styles from "./ProductModal.module.css";

export default function ProductModal({
  isOpen,
  onClose,
  onSuccess,
}) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: {
      name: "",
      quantity: "",
      price: "",
    },
  });

  if (!isOpen) {
    return null;
  }

  const submitHandler = async (data) => {
    try {
      await createProduct({
        name: data.name.trim(),
        quantity: Number(data.quantity),
        price: Number(data.price),
      });

      reset();

      onSuccess();
      onClose();
    } catch (error) {
      setError("root", {
        message:
          error.response?.data?.message ||
          "ایجاد محصول با خطا مواجه شد.",
      });
    }
  };

  const handleClose = () => {
    if (isSubmitting) {
      return;
    }

    reset();
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div
        className={styles.modal}
        dir="rtl"
      >
        <h2>
          ایجاد محصول جدید
        </h2>

        <form
          onSubmit={handleSubmit(
            submitHandler
          )}
        >
          <div
            className={styles.field}
          >
            <label htmlFor="name">
              نام کالا
            </label>

            <input
              id="name"
              type="text"
              {...register("name")}
              disabled={isSubmitting}
            />

            {errors.name && (
              <p
                className={
                  styles.error
                }
              >
                {
                  errors.name
                    .message
                }
              </p>
            )}
          </div>

          <div
            className={styles.field}
          >
            <label htmlFor="quantity">
              تعداد موجودی
            </label>

            <input
              id="quantity"
              type="number"
              min="0"
              {...register("quantity")}
              disabled={isSubmitting}
            />

            {errors.quantity && (
              <p
                className={
                  styles.error
                }
              >
                {
                  errors.quantity
                    .message
                }
              </p>
            )}
          </div>

          <div
            className={styles.field}
          >
            <label htmlFor="price">
              قیمت
            </label>

            <input
              id="price"
              type="number"
              min="0"
              step="any"
              {...register("price")}
              disabled={isSubmitting}
            />

            {errors.price && (
              <p
                className={
                  styles.error
                }
              >
                {
                  errors.price
                    .message
                }
              </p>
            )}
          </div>

          {errors.root && (
            <p
              className={
                styles.error
              }
            >
              {errors.root.message}
            </p>
          )}

          <div
            className={
              styles.actions
            }
          >
            <button
              type="button"
              className={
                styles.cancelButton
              }
              onClick={
                handleClose
              }
              disabled={
                isSubmitting
              }
            >
              انصراف
            </button>

            <button
              type="submit"
              className={
                styles.submitButton
              }
              disabled={
                isSubmitting
              }
            >
              {isSubmitting
                ? "در حال ایجاد..."
                : "ایجاد"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}