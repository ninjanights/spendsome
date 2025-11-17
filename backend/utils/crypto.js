import bcrypt from "bcryptjs";

// generate the otp.
export const generateOtp = () => {
  return String(Math.floor(100000 + Math.random() * 900000));
};

// hash password.
export const hashPassword = async (value) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(value, salt);
};

// compare hash password.
export const compareHashPassword = async (value, hash) =>
  bcrypt.compare(value, hash);
