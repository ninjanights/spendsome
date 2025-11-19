import express from "express";
import {
  loginC,
  refreshTokenC,
  registerUserC,
  verifyOtpC,
} from "../controllers/user.js";

const router = express.Router();

// register new user.
router.post("/register", registerUserC);

// verify otp.
router.post("/verifyotp", verifyOtpC);

// login user.
router.post("/login", loginC);

// refresh token access.
router.get("/refrehtoken", refreshTokenC);

export default router;
