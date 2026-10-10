import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { createProduct } from "../../services/productService";
import { productSchema } from "../../validations/productSchema";

import styles from "./ProductModal.module.css";

function ProductModal({
  isOpen,
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

  if (!isOpen) return null;

  const handleFormSubmit = async (data) => {
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
      console.error(error);

      setError("root", {
        message:
          error.response?.data?.message ||
          "ایجاد محصول با خطا مواجه شد.",
      });
    }
  };

  const handleClose = () => {
    if (isSubmitting) return;

    reset();
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} dir="rtl">
        <h2>ایجاد محصول جدید</h2>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <div className={styles.field}>
            <label htmlFor="name">
              نام کالا
            </label>

            <input
              id="name"
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
            <label htmlFor="quantity">
              تعداد موجودی
            </label>

            <input
              id="quantity"
              type="number"
              placeholder="تعداد"
              min="0"
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
            <label htmlFor="price">
              قیمت
            </label>

            <input
              id="price"
              type="number"
              placeholder="قیمت"
              min="0"
              step="any"
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
              انصراف
            </button>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
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

export default ProductModal;