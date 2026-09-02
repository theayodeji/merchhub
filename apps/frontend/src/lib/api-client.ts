import axios from 'axios';
import type { AxiosError, AxiosRequestConfig } from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

class ApiError extends Error {
  constructor(_status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

// Create the axios instance
const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to unwrap the response data directly
instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error: AxiosError) => {
    const status = error.response?.status || 500;
    const message = (error.response?.data as { message?: string })?.message || error.message || `Request failed (${status})`;
    return Promise.reject(new ApiError(status, message));
  }
);

// We export a wrapper
export const apiClient = {
  get: <T>(endpoint: string, options?: AxiosRequestConfig): Promise<T> =>
    instance.get(endpoint, options) as unknown as Promise<T>,

  post: <T>(endpoint: string, body?: unknown, options?: AxiosRequestConfig): Promise<T> =>
    instance.post(endpoint, body, options) as unknown as Promise<T>,

  put: <T>(endpoint: string, body?: unknown, options?: AxiosRequestConfig): Promise<T> =>
    instance.put(endpoint, body, options) as unknown as Promise<T>,

  delete: <T>(endpoint: string, options?: AxiosRequestConfig): Promise<T> =>
    instance.delete(endpoint, options) as unknown as Promise<T>,

  patch: <T>(endpoint: string, body?: unknown, options?: AxiosRequestConfig): Promise<T> =>
    instance.patch(endpoint, body, options) as unknown as Promise<T>,
};
