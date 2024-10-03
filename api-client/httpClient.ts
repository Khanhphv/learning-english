import axios, { AxiosResponse } from "axios";
import { toast } from "sonner";
import { updateAccessToken, logout } from "@/slices/authSlice";
import { store } from "@/stores";

const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

httpClient.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  async (error) => {
    if (error.response) {
      const { status, data } = error.response;
      console.error(`API error: ${status}`, data);

      const originalRequest = error.config;

      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403) &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        try {
          const newTokens = await httpClient.post("/refresh", null, {
            withCredentials: true,
          });
          store.dispatch(updateAccessToken(newTokens.data.accessToken));
          originalRequest.headers.Authorization = `Bearer ${newTokens.data.accessToken}`;
          return httpClient(originalRequest);
        } catch (error) {
          console.log("Refresh token error:", error);
          store.dispatch(logout());
          toast.error("Your session has expired. Please login again.");
        }
      }

      return Promise.reject(data);
    }

    return Promise.reject(error);
  }
);

export default httpClient;
