"use client";

import { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { buildUrl } from "@/lib/url";
import { deleteProduct } from "@/services/productService";

import DeleteModal from "./DeleteModal";
import Pagination from "./Pagination";
import PriceFilterForm from "./PriceFilterForm";
import ProductFormModal from "./ProductFormModal";
import ProductsTable from "./ProductsTable";
import { useProducts } from "./useProducts";

import styles from "./Products.module.css";

const DELETE_ERROR_MESSAGE = "حذف محصول با خطا مواجه شد.";

export default function ProductsView() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const name = searchParams.get("name") ?? "";
  const minPrice = searchParams.get("minPrice") ?? "";
  const maxPrice = searchParams.get("maxPrice") ?? "";

  const { products, totalPages, isLoading, error, refetch } = useProducts({
    page,
    name,
    minPrice,
    maxPrice,
  });

  const [formModal, setFormModal] = useState({ isOpen: false, product: null });
  const [productToDelete, setProductToDelete] = useState(null);
  const [deleteError, setDeleteError] = useState("");

  const updateQuery = (updates) => {
    router.push(buildUrl(pathname, searchParams, updates));
  };

  const openCreateModal = () => setFormModal({ isOpen: true, product: null });
  const openEditModal = (product) => setFormModal({ isOpen: true, product });
  const closeFormModal = () => setFormModal({ isOpen: false, product: null });

  const handleFormSuccess = () => {
    closeFormModal();
    refetch();
  };

  const closeDeleteModal = () => {
    setProductToDelete(null);
    setDeleteError("");
  };

  const confirmDelete = async () => {
    try {
      setDeleteError("");

      await deleteProduct(productToDelete.id);

      closeDeleteModal();
      refetch();
    } catch (error) {
      console.error(error);
      setDeleteError(DELETE_ERROR_MESSAGE);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div className={styles.titleWrapper}>
          <Image
            src="/images/setting.png"
            alt="setting"
            width={23}
            height={23}
            className={styles.setting}
          />

          <h1>مدیریت کالا</h1>
        </div>

        <button
          type="button"
          className={styles.addButton}
          onClick={openCreateModal}
        >
          افزودن محصول
        </button>
      </div>

      <PriceFilterForm
        key={`${minPrice}-${maxPrice}`}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onApply={(values) => updateQuery({ ...values, page: 1 })}
        onClear={() => updateQuery({ minPrice: "", maxPrice: "", page: 1 })}
      />

      {isLoading && (
        <div className={styles.message}>در حال دریافت محصولات...</div>
      )}

      {error && <div className={styles.error}>{error}</div>}

      {!isLoading && !error && (
        <>
          <ProductsTable
            products={products}
            onEdit={openEditModal}
            onDelete={setProductToDelete}
          />

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(newPage) => updateQuery({ page: newPage })}
          />
        </>
      )}

      {deleteError && <div className={styles.error}>{deleteError}</div>}

      {formModal.isOpen && (
        <ProductFormModal
          product={formModal.product}
          onClose={closeFormModal}
          onSuccess={handleFormSuccess}
        />
      )}

      {productToDelete && (
        <DeleteModal
          productName={productToDelete.name}
          onClose={closeDeleteModal}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}