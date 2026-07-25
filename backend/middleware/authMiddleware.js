import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startWith("Bearer")) {
      return res.status(401).json({
        succes: false,
        message: "Unauthorized",
      });
    }

    const token = authHeader.split(" ")[1];
    const decorded = jwt.verify(authHeader, process.env.JWT_SECRET);
    const user = await User.findById(decorded.user._id).select("-password");

    if (!user) {
      return res.status(401).json({
        succes: false,
        message: "User not found",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      succes: false,
      message: "Invalid Token",
    });
  }
};

export const adminMiddleware = async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      succes: false,
      message: "Access Denied",
    });
  }
  next();
};
