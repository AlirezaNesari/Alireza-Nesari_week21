"use client";

import { useEffect, useState } from "react";

import { getProducts } from "../../services/productService";

const PAGE_SIZE = 10;
const LOAD_ERROR_MESSAGE = "دریافت محصولات با خطا مواجه شد.";
const EMPTY_RESULT = { data: [], totalProducts: 0, totalPages: 1 };

export function useProducts({ page, name, minPrice, maxPrice }) {
  const [refreshCount, setRefreshCount] = useState(0);
  const [result, setResult] = useState({
    requestId: null,
    data: EMPTY_RESULT,
    error: "",
  });

  const requestId = [page, name, minPrice, maxPrice, refreshCount].join("|");

  useEffect(() => {
    let isCancelled = false;

    async function loadProducts() {
      try {
        const data = await getProducts({
          page,
          limit: PAGE_SIZE,
          name: name || undefined,
          minPrice: minPrice || undefined,
          maxPrice: maxPrice || undefined,
        });

        if (!isCancelled) {
          setResult({ requestId, data, error: "" });
        }
      } catch (error) {
        console.error(error);

        if (!isCancelled) {
          setResult({ requestId, data: EMPTY_RESULT, error: LOAD_ERROR_MESSAGE });
        }
      }
    }

    loadProducts();

    return () => {
      isCancelled = true;
    };
  }, [requestId, page, name, minPrice, maxPrice]);

  const isLoading = result.requestId !== requestId;

  return {
    products: result.data.data,
    totalPages: result.data.totalPages,
    isLoading,
    error: isLoading ? "" : result.error,
    refetch: () => setRefreshCount((count) => count + 1),
  };
}