import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { updateProduct } from "../../services/productService";
import { productSchema } from "../../validations/productSchema";

import styles from "./EditProductModal.module.css";

function EditProductModal({
  isOpen,
  product,
  onClose,
  onSuccess,
}) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: {
      name: "",
      quantity: "",
      price: "",
    },
  });

  useEffect(() => {
    if (!product) return;

    reset({
      name: product.name || "",
      quantity: product.quantity ?? "",
      price: product.price ?? "",
    });
  }, [product, reset]);

  if (!isOpen || !product) {
    return null;
  }

  const submitHandler = async (data) => {
    try {
      await updateProduct(product.id, {
        name: data.name.trim(),
        quantity: Number(data.quantity),
        price: Number(data.price),
      });

      reset();

      onSuccess();
    } catch (error) {
      console.error(error);

      setError("root", {
        message:
          error.response?.data?.message ||
          "ویرایش محصول با خطا مواجه شد.",
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
      <div className={styles.modal} dir="rtl">
        <h2>ویرایش اطلاعات</h2>

        <form
          onSubmit={handleSubmit(submitHandler)}
        >
          <div className={styles.field}>
            <label htmlFor="edit-name">
              نام کالا
            </label>

            <input
              id="edit-name"
              type="text"
              placeholder="نام کالا"
              disabled={isSubmitting}
              {...register("name")}
            />

            {errors.name && (
              <p className={styles.error}>
                {errors.name.message}
              </p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="edit-quantity">
              موجودی
            </label>

            <input
              id="edit-quantity"
              type="number"
              min="0"
              placeholder="موجودی"
              disabled={isSubmitting}
              {...register("quantity")}
            />

            {errors.quantity && (
              <p className={styles.error}>
                {errors.quantity.message}
              </p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="edit-price">
              قیمت
            </label>

            <input
              id="edit-price"
              type="number"
              min="0"
              step="any"
              placeholder="قیمت"
              disabled={isSubmitting}
              {...register("price")}
            />

            {errors.price && (
              <p className={styles.error}>
                {errors.price.message}
              </p>
            )}
          </div>

          {errors.root && (
            <p className={styles.error}>
              {errors.root.message}
            </p>
          )}

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={handleClose}
              disabled={isSubmitting}
            >
              لغو
            </button>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "در حال ذخیره..."
                : "ذخیره تغییرات"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProductModal;