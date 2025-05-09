import { Router } from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getOrdersByUser,
  cancelOrder,
  cancelOrderByUser,
  confirmOrder,
  getAdminOrdersWithDetails,
  getConfirmedOrdersWithDetails,
  cancelOrderByAdmin,
} from "../controllers/orderController";
import { isAdmin } from "../middlewares/isAdmin";
import { authenticateToken } from "../middlewares/authMiddleware";
import { isUser } from "../middlewares/isUser";

const router = Router();

router.post("/orders", authenticateToken, isAdmin, createOrder);
router.post("/users/orders", authenticateToken, isUser, createOrder);
router.get("/orders/get-admin-only", getOrders);
router.get("/order/:order_id", authenticateToken, getOrderById);
router.get("/user/history", authenticateToken, getOrdersByUser);
router.put(
  "/orders/admin-only/:order_id",
  authenticateToken,
  isAdmin,
  updateOrder
);


router.get("/orders/admin-view", getAdminOrdersWithDetails);
router.get("/orders/confirmed", authenticateToken , getConfirmedOrdersWithDetails);

router.put(
  "/orders/user-only/:order_id",
  authenticateToken,
  isUser,
  updateOrder
);

// router.put(
//   "/orders/cancel/:order_id",
//   authenticateToken,
//   isUser, // ให้สิทธิ์เฉพาะ user
//   cancelOrder
// );
router.put(
  "/cancel/:order_id",
  authenticateToken,
  isUser,
  cancelOrderByUser
);

router.put(
  "/admin/cancel/:order_id",
   // ใช้ middleware ตรวจสอบสิทธิ์ admin
  cancelOrderByAdmin // ฟังก์ชันที่ใช้ยกเลิกคำสั่งซื้อ
);



router.delete("/orders/:order_id", authenticateToken, isAdmin, deleteOrder);


router.post(
  "/orders/confirm/:order_id",
  confirmOrder
);
export default router;
