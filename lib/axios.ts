import axios from "axios";
import { API_BASE_URL } from "./config";
import { getAccessToken, setAccessToken, clearTokens } from "./token-store";

export const serverApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // important for refresh cookie
});

//REQUEST INTERCEPTOR
serverApi.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

//RESPONSE INTERCEPTOR
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

serverApi.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      // queue if already refreshing
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return serverApi(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // NO TOKEN SENT — cookie handles refresh
        const res = await serverApi.post("/auth/refresh");

        const newAccessToken = res.data.access_token;

        setAccessToken(newAccessToken);

        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return serverApi(originalRequest);
      } catch (err) {
        processQueue(err, null);
        clearTokens();

        // optional: redirect to login
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
