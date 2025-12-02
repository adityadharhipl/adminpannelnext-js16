import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ msg: "No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid Token" });
  }
};



// middleware/auth.js
export const requireAuth = (req, res, next) => {
  // Hook up your real auth (JWT/session)
  // Here we stub: assume req.user is set if authenticated
  if (!req.user) return res.status(401).json({ success: false, error: "Unauthorized" });
  return next();
};

export const requireAdmin = (req, res, next) => {
  // Replace with your role check
  if (!req.user?.isAdmin) return res.status(403).json({ success: false, error: "Forbidden" });
  return next();
};

