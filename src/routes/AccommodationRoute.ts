// src/routes/accommodationRoutes.ts

import { Router } from "express";
import {
  createAccommodation,
  getAccommodations,
  getAccommodationById,
  updateAccommodation,
  deleteAccommodation,
} from "../controllers/accommodationController";
import { authenticateToken } from "../middlewares/authMiddleware"; // หากต้องการให้เส้นทางนี้ใช้ authentication
import { isAdmin } from "../middlewares/isAdmin";

const router = Router();

router.post("/create",authenticateToken, createAccommodation); // สร้างที่พักใหม่
router.get("/gets", getAccommodations); // ดึงข้อมูลที่พักทั้งหมด
router.get("/get/:id", getAccommodationById); // ดึงข้อมูลที่พักตาม ID
router.put("/:id", authenticateToken, updateAccommodation); // อัปเดตที่พัก
router.delete("/:id", authenticateToken, deleteAccommodation); // ลบที่พัก

export default router;
