import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const isAuthorized = async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    // Bearer dkaj89a8dadja
    token = authHeader.split(" ")[1];
  }

  // console.log(token);

  try {
    if (!token) {
      res.status(401);
      throw new Error("User is not authorized or token is missing");
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decoded.user.id);
    if (!user) {
      res.status(404);
      throw new Error("No user found with this id");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};
