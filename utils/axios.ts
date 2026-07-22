import axios from 'axios';
import { message } from 'antd';

const axiosInstance = axios.create({
  baseURL: '', // Keep your mock URL
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// TOP 1% ADDITION: Interceptors
// This catches 404s, 500s, and network errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const msg = error.response?.data?.message || "Hệ thống đang bảo trì, vui lòng thử lại sau!";
    message.error(`[SYSTEM ERROR]: ${msg}`);
    return Promise.reject(error);
  }
);

export default axiosInstance;