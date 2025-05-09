import { Router } from "express";
import {
  sendRegisterFormEmail,
  getAllBookings,
  updateBooking,
  deleteBooking,
} from "../controllers/registerFormToBookController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.post("/send-form-email", authenticateToken,sendRegisterFormEmail); // สำหรับการจองใหม่
router.get("/bookings", getAllBookings); // สำหรับดึงข้อมูลการจองทั้งหมด
router.put("/bookings/:id", updateBooking); // สำหรับอัปเดตการจอง
router.delete("/bookings/:id", deleteBooking); // สำหรับลบการจอง

export default router;
