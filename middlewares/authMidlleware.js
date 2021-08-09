import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import config from "config";

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const jwt_secret = config.get("JWT_SECRET");
      token = req.headers["authorization"].split(" ")[1];
      const decoded = jwt.verify(token, jwt_secret);
      const user = await User.findById(decoded.id);
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(404);
        throw new Error(" [Authentification] - User Not found !");
      }
    } catch (error) {
      console.log("protect error :", error.message);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});
