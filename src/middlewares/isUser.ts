// src/middlewares/isUser.ts
import { Request, Response, NextFunction } from 'express';

export const isUser = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;
  
  if (user && user.role === 'user') {
    next(); // อนุญาตให้เข้าถึง
  } else {
    res.status(403).json({ message: 'Access denied. Users only.' });
  }
};
