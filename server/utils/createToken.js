import jwt from "jsonwebtoken";

export const createJWT = (payload) =>
  jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET || "keepItSecret", {
    expiresIn: process.env.JWT_EXPIRE || "1h",
  });
