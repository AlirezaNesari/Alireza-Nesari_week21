"use client";

import { useState } from "react";
import Image from "next/image";

import styles from "./DeleteModal.module.css";

export default function DeleteModal({ productName, onClose, onConfirm }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    setIsDeleting(true);

    try {
      await onConfirm();
    } finally {
      setIsDeleting(false);
    }
  };

  const handleClose = () => {
    if (!isDeleting) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.icon}>
          <Image src="/images/Close.png" alt="Union" width={58} height={58} />
        </div>

        <p className={styles.message}>آیا از حذف این محصول مطمئنید؟</p>

        {productName && <p className={styles.productName}>{productName}</p>}

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.deleteButton}
            onClick={handleConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? "در حال حذف..." : "حذف"}
          </button>

          <button
            type="button"
            className={styles.cancelButton}
            onClick={handleClose}
            disabled={isDeleting}
          >
            لغو
          </button>
        </div>
      </div>
    </div>
  );
}