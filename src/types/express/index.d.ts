// src/types/express/index.d.ts
import "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      user_id: number;
      role: "user" | "admin";
    };
  }
}
