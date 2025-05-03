/// <reference path="../express.d.ts" />

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.JWT_SECRET_KEY || "your_jwt_secret_key";

interface JwtPayload {
  user_id: number;
  role: "user" | "admin";
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Token is missing" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
    (req as any).user = decoded;
    // ✅ ตอนนี้ TypeScript รู้จักแล้ว เพราะเราประกาศใน express.d.ts
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};
