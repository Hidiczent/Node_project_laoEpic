import { Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

// Endpoint ที่ใช้ตรวจสอบ Token
router.get('/verify-token', authenticateToken, (req, res) => {
  res.status(200).json({ message: 'Token is valid' });
});

export default router;
