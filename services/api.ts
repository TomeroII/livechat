import axios from "axios";

/**
 * Base axios client for the YUH Express backend.
 * Set NEXT_PUBLIC_API_URL in .env.local once the backend has a real
 * host/port (e.g. http://localhost:4000). Falls back to 4000 for local dev.
 */
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api",
  withCredentials: true,
});

// TODO: once auth.middleware.js issues a token, attach it here, e.g.:
// api.interceptors.request.use((config) => {
//   const token = getStoredToken();
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });
