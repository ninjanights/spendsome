import express from "express";
import { loginC, registerUserC, verifyOtpC } from "../controllers/user.js";

const router = express.Router();

// register new user.
router.post("/register", registerUserC);

// verify otp.
router.post("/verifyotp", verifyOtpC);

// login user.
router.post("/login", loginC);

export default router;
