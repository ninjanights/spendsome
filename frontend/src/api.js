import axios from "axios";
import { store } from "./store/store.js";
import { logout } from "./store/authSlice";

export const baseAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await api.get("/auth/refreshtoken");

        store.dispatch(refreshToken(res.data.accessToken));

        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${res.data.accessToken}`;

        return api(originalRequest);
      } catch (e) {
        store.dispatch(logout());
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
