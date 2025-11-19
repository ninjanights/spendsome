import jwt from "jsonwebtoken";

// generate token.
export const generateToken = (payload, secret, expiresIn) => {
  return jwt.sign(payload, secret, { expiresIn });
};

// (gen) access token.
export const signAccessToken = (userId) => {
  return generateToken({ sub: userId }, process.env.JWT_ACCESS_SECRET, "15m");
};

// (gen) refresh token.
export const signRefreshToken = (userId, jti) => {
  return generateToken(
    { sub: userId, jti },
    process.env.JWT_REFRESH_SECRET,
    "7d"
  );
};

// verify access token.
export const verifyAccesstToken = (token) => {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
};

// verify refresh token.
export const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};
