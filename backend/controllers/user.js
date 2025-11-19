import User from "../models/user.js";
import crypto from "crypto";
import { sendEmailOtp } from "../services/emailServices.js";
import {
  generateOtp,
  hashPassword,
  compareHashPassword,
} from "../utils/bcryptjs.js";
import { tempUser } from "../utils/tempUser.js";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";

export const registerUserC = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (tempUser[email]) {
      const user = tempUser[email];

      if (user.emailOTPExpiresAt > Date.now()) {
        const waitTime = Math.floor(
          (user.emailOTPExpiresAt - Date.now()) / 1000
        );

        return res.status(429).json({
          success: false,
          message: `OTP already sent. Try again after ${waitTime} seconds. You can still verify it.`,
        });
      }

      const newOtp = generateOtp();
      const newExp = Date.now() + 5 * 60 * 1000; // 5 minutes.

      tempUser[email].emailOTP = newOtp;
      tempUser[email].emailOTPExpiresAt = newExp;

      // resend email for otp.
      await sendEmailOtp(
        email,
        "Your new OTP",
        `Your new OTP is ${newOtp}. It expires in 5 minutes.`
      );

      return res.status(200).json({
        success: true,
        message: "OTP expired earlier. New OTP sent.",
        emailOTPExpiresAt: newExp,
      });
    }

    const alreadyUser = await User.findOne({ email });

    if (alreadyUser) {
      return res.status(200).json({
        success: false,
        message: "Email is already registered in db.",
        isAlreadyUser: alreadyUser._id,
      });
    }

    // generate otp.
    const otp = generateOtp();
    const otpExpiry = Date.now() + 5 * 60 * 1000; // 5 min.

    // hold user (create user with isVerified: false).
    tempUser[email] = {
      username,
      email,
      password: password,
      isVerified: false,
      emailOTP: otp,
      emailOTPExpiresAt: otpExpiry,
    };

    // send otp.
    await sendEmailOtp(
      email,
      "Verify your email.",
      `Your OTP code is ${otp}.
      It expires in 5 minutes.`
    );

    res.status(201).json({
      success: true,
      message: "Signup initiated. Please verify your email with the OTP sent.",
      temporary: true,
      emailOTPExpiresAt: otpExpiry,
    });
  } catch (e) {
    res.status(400).json({ message: e.message });
    console.log(e);
  }
};

// verify otp.
export const verifyOtpC = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "No Otp or Email is sent here.",
      });
    }

    const tempUserNow = tempUser[email];

    if (!tempUserNow) {
      return res.status(400).json({
        success: false,
        message: "No pending verification.",
      });
    }

    if (tempUserNow.emailOTPExpiresAt < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Time exceeded.",
      });
    }

    if (tempUserNow.emailOTP !== otp) {
      return res.status(400).json({
        message: "Invalid OTP.",
        success: false,
      });
    }

    const user = await User.findOne({ email: tempUserNow?.email });
    if (user)
      return res
        .status(400)
        .json({ message: "User already exists. Just login now." });

    // hash password.
    const hashedPassword = await hashPassword(tempUserNow?.password);

    const newUser = await User.create({
      username: tempUserNow?.username,
      email: email,
      passwordHash: hashedPassword,
      isVerified: true,
    });

    delete tempUser[email];

    res.json({
      success: true,
      message: "Email verified successfully.",
      newUserId: newUser._id,
    });
  } catch (e) {
    console.log(e.message);
    res
      .status(500)
      .json({ message: "Server error while verifing otp.", error: e.message });
  }
};

// log in.
export const loginC = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required.",
      });
    }

    // check if user is present.
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // is verified.
    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Email not verified. Verify before login.",
        isVerified: false,
      });
    }

    // check password correct?
    const isMatch = await compareHashPassword(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Pass.",
      });
    }

    // generate jti for refresh token.
    const jti = crypto.randomUUID();

    // generate token.
    const accessToken = signAccessToken(user._id.toString());
    const refreshToken = signRefreshToken(user._id.toString(), jti);

    // save refresh token to db.
    user.refreshToken = refreshToken;
    await user.save();

    return res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        success: true,
        message: "User logged in successfully.",
        accessToken,

        user: {
          id: user._id,
          email: user.email,
          username: user.username,
        },
      });
  } catch (e) {
    console.log(e.message);
    res
      .status(500)
      .json({ message: "Server error while logging in", error: e.message });
  }
};

// refresh Token c.
export const refreshTokenC = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token)
      return res.status(401).json({
        message: "No refresh token! login again or wave the developer.",
      });

    const decoded = verifyRefreshToken(token);

    // find user
    const user = await User.findById(decoded.sub);
    if (!user || user.refreshToken !== token) {
      return res.status(403).json({
        message: "Invalid refresh token.",
      });
    }

    const newAccessT = signAccessToken(decoded.sub);

    // generate jti for refresh token.
    const jti = crypto.randomUUID();
    const newRefreshT = signRefreshToken(decoded.sub, jti);

    user.refreshToken = newRefreshT;
    await user.save();

    res.cookie("refreshToken", newRefreshT, {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      accessToken: newAccessT,
    });
  } catch (e) {
    return res
      .status(401)
      .json({ message: e.message || "Invalid refresh token" });
  }
};
