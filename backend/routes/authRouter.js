import express from "express";
import {
  loginC,
  logoutC,
  registerUserC,
  verifyOtpC,
} from "../controllers/user.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

// register new user.
router.post("/register", registerUserC);

// verify otp.
router.post("/verifyotp", verifyOtpC);

// login user.
router.post("/login", loginC);

// log out.
router.get("/logout", logoutC);

export default router;
