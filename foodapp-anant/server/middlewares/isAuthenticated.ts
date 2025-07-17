import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// Extend Express Request type globally to include `id`
declare global {
  namespace Express {
    interface Request {
      id?: string; // use optional chaining for safety
    }
  }
}

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    // Verify token using the secret key
    const decoded = jwt.verify(token, process.env.SECRET_KEY!) as jwt.JwtPayload;

    // Check if userId exists in token payload
    if (!decoded || !decoded.userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid token payload",
      });
    }

    req.id = decoded.userId;
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
