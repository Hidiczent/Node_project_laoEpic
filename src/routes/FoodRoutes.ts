// src/routes/foodRoutes.ts
import { Router } from "express";
import {
  createFood,
  getFoods,
  getFoodById,
  updateFood,
  deleteFood,
} from "../controllers/foodController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.post("/food", authenticateToken, createFood);
router.get("/food", getFoods);
router.get("/food/:id", getFoodById);
router.put("/food/:id", authenticateToken, updateFood);
router.delete("/food/:id", authenticateToken, deleteFood);

export default router;
