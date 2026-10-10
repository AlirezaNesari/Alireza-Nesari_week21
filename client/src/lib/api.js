import axios from "axios";

import { tokenStorage } from "./tokenStorage";

const UNAUTHORIZED_STATUSES = [401, 403];

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = tokenStorage.getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (UNAUTHORIZED_STATUSES.includes(error.response?.status)) {
      // Route guards observe the token and redirect to the login page.
      tokenStorage.clearToken();
    }

    return Promise.reject(error);
  }
);

export default api;