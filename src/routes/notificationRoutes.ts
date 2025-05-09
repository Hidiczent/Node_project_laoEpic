import { Router } from "express";
import {
  createNotification,
  getNotifications,
  getNotificationById,
  updateNotification,
  deleteNotification,
  getUserNotifications,
} from "../controllers/notificationController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.post("/notifications", createNotification);
router.get("/notifications", getNotifications);
router.get("/notifications/:id", getNotificationById);
router.put("/notifications/update/:id",authenticateToken, updateNotification);
router.delete("/notifications/:id", deleteNotification);
router.get('/user/notifications', authenticateToken, getUserNotifications);

export default router;
