import { Router } from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController";
import { isAdmin } from "../middlewares/isAdmin";
import { authenticateToken } from "../middlewares/authMiddleware";
import { isUser } from "../middlewares/isUser";

const router = Router();

router.post("/orders", authenticateToken, isAdmin, createOrder);
router.post("/orders", authenticateToken, isUser, createOrder);
router.get("/orders/get-admin-only", authenticateToken, isAdmin, getOrders);
router.get("/orders/:order_id", getOrderById);
router.put("/orders/admin-only/:order_id", authenticateToken, isAdmin, updateOrder);
router.put("/orders/user-only/:order_id", authenticateToken, isUser, updateOrder);
router.delete("/orders/:order_id", authenticateToken, isAdmin, deleteOrder);

export default router;
