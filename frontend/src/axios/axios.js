import { baseAPI } from "../api.js";

export const signupUserApi = (data) => baseAPI.post("/auth/register", data);
export const verifyOtpApi = (data) => baseAPI.post("/auth/verifyotp", data);
