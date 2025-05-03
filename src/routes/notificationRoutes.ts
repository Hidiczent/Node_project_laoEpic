import { Router } from "express";
import {
  createNotification,
  getNotifications,
  getNotificationById,
  updateNotification,
  deleteNotification,
} from "../controllers/notificationController";

const router = Router();

router.post("/notifications", createNotification);
router.get("/notifications", getNotifications);
router.get("/notifications/:id", getNotificationById);
router.put("/notifications/:id", updateNotification);
router.delete("/notifications/:id", deleteNotification);

export default router;
