import User from "../models/user.js";
import { sendEmailOtp } from "../services/emailServices.js";
import { generateOtp, hashPassword } from "../utils/crypto.js";

export const registerUserC = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    console.log(username, email, password, "");

    const alreadyUser = await User.findOne({ email });
    console.log(alreadyUser, "🎏");

    if (alreadyUser) {
      return res.status(400).json({
        success: false,
        message: "Email is already registered in db.",
        isAlreadyUser: alreadyUser,
      });
    }

    // hash password.
    const hashedPassword = await hashPassword(password);

    console.log(hashedPassword, "🍁");

    // generate otp.
    const otp = generateOtp();
    const otpExpiry = Date.now() + 5 * 60 * 1000; // 5 min.

    // hold user (create user with isVerified: false).
    const user = await User.create({
      username,
      email,
      passwordHash: hashedPassword,
      isVerified: false,
      emailOTP: otp,
      emailOTPExpiresAt: otpExpiry,
    });

    // send otp.
    await sendEmailOtp(
      email,
      "Verify your email.",
      `Your OTP code is ${otp}.
      It expires in 10 minutes.`
    );

    res.status(201).json({
      success: true,
      message: "Signup initiated. Please verify your email with the OTP sent.",
      data: user._id,
    });
  } catch (e) {
    res.status(400).json({ message: e.message });
    console.log(e);
  }
};

// verify otp.
export const verifyOtpC = async (req, res) => {
  try {
    const { userId, otp } = req.body;
    if (!userId || !otp) {
      return res.status(400).json({
        success: false,
        message: "No Otp or User is sent here.",
      });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "User not found." });

    if (user.isVerified) {
      return res.status(400).json({ message: "User already verified." });
    }

    if (user.emailOTP !== otp || user.emailOTPExpiresAt < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }

    user.isVerified = true;
    user.emailOTP = null;
    userId.emailOTPExpiresAt = null;
    await user.save();

    res.json({ success: true, message: "Email verified successfully." });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "Server error", error: e.message });
  }
};
