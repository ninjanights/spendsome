import { verifyAccessToken } from "../utils/jwt.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader)
      return res.status(401).json({
        message: "Token missing in headers.",
      });

    const token = authHeader.split(" ")[1];

    if (!token)
      return res.status(401).json({ message: "Bearer token is missing." });

    const decoded = verifyAccessToken(token);

    req.user = decoded;
    next();
  } catch (e) {
    return res.status(500).json({ message: "Invalid token." });
  }
};
