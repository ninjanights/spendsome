// import bcrypt from "bcryptjs";
// import crypto from "crypto";
// import User from "../models/User.js";
// import { generateOTP, hashValue, compareHash } from "../utils/crypto.js";
// import { sendEmailOTP } from "../services/emailService.js";
// import { signAccessToken, signRefreshToken } from "../utils/jwt.js";

// const cookieOptions = {
//   httpOnly: true,
//   secure: true, // set true in production behind HTTPS
//   sameSite: "none", // "lax" for same-site apps; "none" + secure for cross-site/mobile
//   path: "/",
//   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
// };

// // 1) Signup start: create user, send OTP
// export const signupStart = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const existing = await User.findOne({ email });
//     if (existing && existing.isVerified) {
//       return res.status(409).json({ message: "Email already registered" });
//     }

//     const passwordHash = await bcrypt.hash(password, 10);

//     const otp = generateOTP();
//     const emailOTP = await hashValue(otp);
//     const emailOTPExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min
//     const lastOTPRequestedAt = new Date();

//     const user = existing
//       ? await User.findByIdAndUpdate(
//           existing._id,
//           {
//             name,
//             passwordHash,
//             emailOTP,
//             emailOTPExpiresAt,
//             lastOTPRequestedAt,
//             isVerified: false,
//           },
//           { new: true }
//         )
//       : await User.create({
//           name,
//           email,
//           passwordHash,
//           emailOTP,
//           emailOTPExpiresAt,
//           lastOTPRequestedAt,
//         });

//     await sendEmailOTP(email, otp);

//     return res
//       .status(200)
//       .json({ message: "OTP sent to email", userId: user._id });
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// };

// // 2) Signup verify: confirm OTP, mark verified, issue tokens
// export const signupVerify = async (req, res) => {
//   try {
//     const { userId, otp } = req.body;
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found" });
//     if (!user.emailOTP || !user.emailOTPExpiresAt)
//       return res.status(400).json({ message: "No OTP pending" });
//     if (user.emailOTPExpiresAt < new Date())
//       return res.status(400).json({ message: "OTP expired" });

//     const ok = await compareHash(otp, user.emailOTP);
//     if (!ok) return res.status(400).json({ message: "Invalid OTP" });

//     user.isVerified = true;
//     user.emailOTP = undefined;
//     user.emailOTPExpiresAt = undefined;
//     await user.save();

//     // Issue tokens
//     const jti = crypto.randomUUID();
//     const accessToken = signAccessToken(user._id.toString());
//     const refreshToken = signRefreshToken(user._id.toString(), jti);
//     user.refreshTokenHash = await hashValue(refreshToken);
//     await user.save();

//     res
//       .cookie("refresh_token", refreshToken, cookieOptions)
//       .status(200)
//       .json({
//         accessToken,
//         user: { id: user._id, name: user.name, email: user.email },
//       });
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// };

// // 3) Login: email/password → tokens
// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "Invalid credentials" });
//     if (!user.isVerified)
//       return res.status(403).json({ message: "Email not verified" });

//     const valid = await bcrypt.compare(password, user.passwordHash);
//     if (!valid) return res.status(401).json({ message: "Invalid credentials" });

//     const jti = crypto.randomUUID();
//     const accessToken = signAccessToken(user._id.toString());
//     const refreshToken = signRefreshToken(user._id.toString(), jti);
//     user.refreshTokenHash = await hashValue(refreshToken);
//     await user.save();

//     res
//       .cookie("refresh_token", refreshToken, cookieOptions)
//       .status(200)
//       .json({
//         accessToken,
//         user: { id: user._id, name: user.name, email: user.email },
//       });
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// };

// // 4) Refresh access token
// export const refresh = async (req, res) => {
//   try {
//     const token = req.cookies?.refresh_token;
//     if (!token) return res.status(401).json({ message: "No refresh token" });

//     // Verify JWT
//     const { sub: userId } = await import("jsonwebtoken").then(
//       ({ default: jwt }) => jwt.verify(token, process.env.JWT_REFRESH_SECRET)
//     );

//     const user = await User.findById(userId);
//     if (!user || !user.refreshTokenHash)
//       return res.status(401).json({ message: "Invalid refresh token" });

//     const matches = await compareHash(token, user.refreshTokenHash);
//     if (!matches)
//       return res.status(401).json({ message: "Refresh token revoked" });

//     const accessToken = signAccessToken(userId);
//     return res.status(200).json({ accessToken });
//   } catch (err) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }
// };

// // 5) Logout: clear cookie and revoke refresh token
// export const logout = async (req, res) => {
//   try {
//     const userId = req.user?.id;
//     if (userId) {
//       await User.findByIdAndUpdate(userId, { $unset: { refreshTokenHash: 1 } });
//     }
//     res.clearCookie("refresh_token", { ...cookieOptions, maxAge: 0 });
//     return res.status(200).json({ message: "Logged out" });
//   } catch {
//     return res.status(200).json({ message: "Logged out" });
//   }
// };

// // 6) Resend OTP (rate-limited)
// export const resendOTP = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const now = Date.now();
//     if (
//       user.lastOTPRequestedAt &&
//       now - user.lastOTPRequestedAt.getTime() < 60_000
//     ) {
//       return res.status(429).json({ message: "Try again after 60 seconds" });
//     }

//     const otp = generateOTP();
//     user.emailOTP = await hashValue(otp);
//     user.emailOTPExpiresAt = new Date(now + 10 * 60 * 1000);
//     user.lastOTPRequestedAt = new Date(now);
//     await user.save();

//     await sendEmailOTP(email, otp);
//     return res.status(200).json({ message: "OTP resent" });
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// };


// ////////////////////////////////////
// import nodemailer from "nodemailer";

// // Create reusable transporter object
// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,       // e.g. "smtp.gmail.com"
//   port: process.env.SMTP_PORT,       // e.g. 465 for SSL, 587 for TLS
//   secure: process.env.SMTP_SECURE === "true", // true for 465, false for 587
//   auth: {
//     user: process.env.SMTP_USER,     // your email address
//     pass: process.env.SMTP_PASS,     // your email password or app password
//   },
// });

// // Send email function
// export const sendEmail = async (to, subject, text, html = null) => {
//   try {
//     const info = await transporter.sendMail({
//       from: `"Expense Tracker" <${process.env.SMTP_USER}>`,
//       to,
//       subject,
//       text,
//       html: html || text, // fallback to text if no HTML
//     });

//     console.log("Email sent: %s", info.messageId);
//     return info;
//   } catch (error) {
//     console.error("Error sending email:", error);
//     throw error;
//   }
// };
// /////////
// import { sendEmail } from "../services/emailService.js";
// import { generateOtpU } from "../utils/authUtils.js";

// export const signupStart = async (req, res) => {
//   const { email } = req.body;
//   const otp = generateOtpU();

//   // Save hashed OTP in DB here...

//   await sendEmail(
//     email,
//     "Your Expense Tracker OTP",
//     `Your OTP is ${otp}`,
//     `<h1>Your OTP is ${otp}</h1><p>It expires in 10 minutes.</p>`
//   );

//   res.json({ message: "OTP sent to email" });
// };
