import { useState } from "react";
import styles from "./DeleteModal.module.css";

import logo from "../../assets/Close.png";

function DeleteModal({ isOpen, onClose, onConfirm, productName }) {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await onConfirm();
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (loading) return;

    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.icon}>
          <img src={logo} alt="Union" />
        </div>

        <p className={styles.message}>
          آیا از حذف این محصول مطمئنید؟
        </p>

        {productName && (
          <p className={styles.productName}>{productName}</p>
        )}

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.deleteButton}
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? "در حال حذف..." : "حذف"}
          </button>

          <button
            type="button"
            className={styles.cancelButton}
            onClick={handleClose}
            disabled={loading}
          >
            لغو
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;