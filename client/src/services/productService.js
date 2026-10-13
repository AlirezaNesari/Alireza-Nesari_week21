import api from "../lib/api";

export async function getProducts(params) {
  const { data } = await api.get("/products", { params });

  return data;
}

export async function createProduct(product) {
  const { data } = await api.post("/products", product);

  return data;
}

export async function updateProduct(id, product) {
  const { data } = await api.put(`/products/${id}`, product);

  return data;
}

export async function deleteProduct(id) {
  await api.delete(`/products/${id}`);
}