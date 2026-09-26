"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  yupResolver,
} from "@hookform/resolvers/yup";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import ProductModal from "../../components/ProductModal/ProductModal";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import EditProductModal from "../../components/EditProductModal/EditProductModal";

import {
  deleteProduct,
  getProducts,
} from "../../services/productService";

import {
  productFilterSchema,
} from "../../validations/productFilterSchema";

import styles from "./Products.module.css";

export default function Products() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] =
    useState(null);
  const [
    selectedEditProduct,
    setSelectedEditProduct,
  ] = useState(null);

  const [
    isProductModalOpen,
    setIsProductModalOpen,
  ] = useState(false);

  const [refreshKey, setRefreshKey] =
    useState(0);

  const [deleteError, setDeleteError] =
    useState("");

  const [pagination, setPagination] =
    useState({
      totalProducts: 0,
      totalPages: 1,
      limit: 10,
    });

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const page =
    Number(searchParams.get("page")) || 1;

  const search =
    searchParams.get("name") || "";

  const minPrice =
    searchParams.get("minPrice") || "";

  const maxPrice =
    searchParams.get("maxPrice") || "";

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors: filterErrors,
    },
  } = useForm({
    resolver: yupResolver(
      productFilterSchema
    ),
    defaultValues: {
      minPrice,
      maxPrice,
    },
  });

  useEffect(() => {
    reset({
      minPrice,
      maxPrice,
    });
  }, [
    minPrice,
    maxPrice,
    reset,
  ]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const data =
          await getProducts({
            page,
            limit: 10,
            ...(search && {
              name: search,
            }),
            ...(minPrice && {
              minPrice,
            }),
            ...(maxPrice && {
              maxPrice,
            }),
          });

        setProducts(data.data);

        setPagination({
          totalProducts:
            data.totalProducts,
          totalPages:
            data.totalPages,
          limit: data.limit,
        });
      } catch (error) {
        console.error(error);

        setError(
          "دریافت محصولات با خطا مواجه شد."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [
    page,
    search,
    minPrice,
    maxPrice,
    refreshKey,
  ]);

  const updateParams = (updates) => {
    const params =
      new URLSearchParams(
        searchParams.toString()
      );

    Object.entries(updates).forEach(
      ([key, value]) => {
        if (
          value === undefined ||
          value === ""
        ) {
          params.delete(key);
        } else {
          params.set(
            key,
            String(value)
          );
        }
      }
    );

    router.push(
      `/products?${params.toString()}`
    );
  };

  const changePage = (newPage) => {
    if (
      newPage < 1 ||
      newPage > pagination.totalPages
    ) {
      return;
    }

    updateParams({
      page: newPage,
    });
  };

  const handlePriceFilter = (data) => {
    updateParams({
      minPrice: data.minPrice,
      maxPrice: data.maxPrice,
      page: 1,
    });
  };

  const clearPriceFilter = () => {
    reset({
      minPrice: "",
      maxPrice: "",
    });

    updateParams({
      minPrice: "",
      maxPrice: "",
      page: 1,
    });
  };

  const openDeleteModal = (product) => {
    setSelectedProduct(product);
    setDeleteError("");
  };

  const closeDeleteModal = () => {
    setSelectedProduct(null);
    setDeleteError("");
  };

  const confirmDelete = async () => {
    if (!selectedProduct) {
      return;
    }

    try {
      setDeleteError("");

      await deleteProduct(
        selectedProduct.id
      );

      closeDeleteModal();

      setRefreshKey(
        (current) => current + 1
      );
    } catch (error) {
      console.error(error);

      setDeleteError(
        "حذف محصول با خطا مواجه شد."
      );
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1>مدیریت کالا</h1>

        <button
          type="button"
          className={styles.addButton}
          onClick={() =>
            setIsProductModalOpen(true)
          }
        >
          افزودن محصول
        </button>
      </div>

      <form
        className={styles.priceFilter}
        onSubmit={handleSubmit(
          handlePriceFilter
        )}
      >
        <div
          className={styles.filterField}
        >
          <input
            type="number"
            min="0"
            placeholder="حداقل قیمت"
            {...register("minPrice")}
          />

          {filterErrors.minPrice && (
            <p
              className={
                styles.filterError
              }
            >
              {
                filterErrors.minPrice
                  .message
              }
            </p>
          )}
        </div>

        <div
          className={styles.filterField}
        >
          <input
            type="number"
            min="0"
            placeholder="حداکثر قیمت"
            {...register("maxPrice")}
          />

          {filterErrors.maxPrice && (
            <p
              className={
                styles.filterError
              }
            >
              {
                filterErrors.maxPrice
                  .message
              }
            </p>
          )}
        </div>

        <button type="submit">
          اعمال فیلتر
        </button>

        {(minPrice || maxPrice) && (
          <button
            type="button"
            className={
              styles.clearFilterButton
            }
            onClick={
              clearPriceFilter
            }
          >
            حذف فیلتر
          </button>
        )}
      </form>

      {loading && (
        <div className={styles.message}>
          در حال دریافت محصولات...
        </div>
      )}

      {error && (
        <div className={styles.error}>
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          <div
            className={
              styles.tableWrapper
            }
          >
            <table
              className={styles.table}
            >
              <thead>
                <tr>
                  <th>نام کالا</th>
                  <th>موجودی</th>
                  <th>قیمت</th>
                  <th>شناسه کالا</th>
                  <th>عملیات</th>
                </tr>
              </thead>

              <tbody>
                {products.map(
                  (product) => (
                    <tr
                      key={product.id}
                    >
                      <td>
                        {product.name}
                      </td>

                      <td>
                        {
                          product.quantity
                        }
                      </td>

                      <td>
                        {product.price}
                      </td>

                      <td>
                        {product.id}
                      </td>

                      <td>
                        <div
                          className={
                            styles.actions
                          }
                        >
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedEditProduct(
                                product
                              )
                            }
                          >
                            ویرایش
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              openDeleteModal(
                                product
                              )
                            }
                          >
                            حذف
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )}

                {products.length === 0 && (
                  <tr>
                    <td colSpan="5">
                      محصولی پیدا نشد.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div
            className={
              styles.pagination
            }
          >
            {Array.from(
              {
                length:
                  pagination.totalPages,
              },
              (_, index) =>
                index + 1
            ).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  type="button"
                  className={
                    page ===
                    pageNumber
                      ? styles.activePage
                      : ""
                  }
                  onClick={() =>
                    changePage(
                      pageNumber
                    )
                  }
                >
                  {pageNumber}
                </button>
              )
            )}
          </div>
        </>
      )}

      {deleteError && (
        <div className={styles.error}>
          {deleteError}
        </div>
      )}

      <DeleteModal
        isOpen={Boolean(
          selectedProduct
        )}
        productName={
          selectedProduct?.name
        }
        onClose={
          closeDeleteModal
        }
        onConfirm={
          confirmDelete
        }
      />

      <EditProductModal
        isOpen={Boolean(
          selectedEditProduct
        )}
        product={
          selectedEditProduct
        }
        onClose={() =>
          setSelectedEditProduct(
            null
          )
        }
        onSuccess={() => {
          setSelectedEditProduct(
            null
          );

          setRefreshKey(
            (current) =>
              current + 1
          );
        }}
      />

      <ProductModal
        isOpen={
          isProductModalOpen
        }
        onClose={() =>
          setIsProductModalOpen(
            false
          )
        }
        onSuccess={() =>
          setRefreshKey(
            (current) =>
              current + 1
          )
        }
      />
    </div>
  );
}