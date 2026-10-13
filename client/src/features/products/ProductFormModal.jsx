"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { getErrorMessage } from "../../lib/errors";
import { createProduct, updateProduct } from "../../services/productService";
import { productSchema } from "../../validations/productSchema";

import styles from "./ProductFormModal.module.css";

const MODE_TEXT = {
  create: {
    title: "ایجاد محصول جدید",
    quantityLabel: "تعداد موجودی",
    quantityPlaceholder: "تعداد",
    cancel: "انصراف",
    submit: "ایجاد",
    submitting: "در حال ایجاد...",
    error: "ایجاد محصول با خطا مواجه شد.",
  },
  edit: {
    title: "ویرایش اطلاعات",
    quantityLabel: "موجودی",
    quantityPlaceholder: "موجودی",
    cancel: "لغو",
    submit: "ذخیره تغییرات",
    submitting: "در حال ذخیره...",
    error: "ویرایش محصول با خطا مواجه شد.",
  },
};

function getFields(text) {
  return [
    { name: "name", label: "نام کالا", type: "text", placeholder: "نام کالا" },
    {
      name: "quantity",
      label: text.quantityLabel,
      type: "number",
      placeholder: text.quantityPlaceholder,
      min: 0,
    },
    {
      name: "price",
      label: "قیمت",
      type: "number",
      placeholder: "قیمت",
      min: 0,
      step: "any",
    },
  ];
}


export default function ProductFormModal({ product, onClose, onSuccess }) {
  const isEditMode = Boolean(product);
  const text = isEditMode ? MODE_TEXT.edit : MODE_TEXT.create;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: {
      name: product?.name ?? "",
      quantity: product?.quantity ?? "",
      price: product?.price ?? "",
    },
  });

  const submitHandler = async (data) => {
    const payload = {
      name: data.name.trim(),
      quantity: Number(data.quantity),
      price: Number(data.price),
    };

    try {
      if (isEditMode) {
        await updateProduct(product.id, payload);
      } else {
        await createProduct(payload);
      }

      onSuccess();
    } catch (error) {
      console.error(error);

      setError("root", { message: getErrorMessage(error, text.error) });
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} dir="rtl">
        <h2>{text.title}</h2>

        <form onSubmit={handleSubmit(submitHandler)}>
          {getFields(text).map(({ name, label, ...inputProps }) => (
            <div key={name} className={styles.field}>
              <label htmlFor={`product-${name}`}>{label}</label>

              <input
                id={`product-${name}`}
                disabled={isSubmitting}
                {...inputProps}
                {...register(name)}
              />

              {errors[name] && (
                <p className={styles.error}>{errors[name].message}</p>
              )}
            </div>
          ))}

          {errors.root && <p className={styles.error}>{errors.root.message}</p>}

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={handleClose}
              disabled={isSubmitting}
            >
              {text.cancel}
            </button>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? text.submitting : text.submit}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}