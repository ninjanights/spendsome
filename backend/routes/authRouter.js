import express from "express";
import { registerUserC, verifyOtpC } from "../controllers/user.js";

const router = express.Router();

// register new user.
router.post("/register", registerUserC);

// verify otp.
router.post("/verifyotp", verifyOtpC);

// // login user.
// router.post("/login");

export default router;
