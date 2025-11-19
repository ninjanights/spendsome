import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Please add name."],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please add an email."],
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email.",
      ],
    },
    passwordHash: {
      type: String,
      required: [true, "Password?"],
    },
    isVerified: { type: Boolean, default: false },

    // refresh token validation.
    refreshToken: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
