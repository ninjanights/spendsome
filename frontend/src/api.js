import axios from "axios";

export const baseAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});
