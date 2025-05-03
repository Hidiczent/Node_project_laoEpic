// src/routes/ingredientRoutes.ts
import { Router } from "express";
import {
  createIngredient,
  getIngredients,
  getIngredientById,
  updateIngredient,
  deleteIngredient,
} from "../controllers/ingredientController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.post("/ingredient", authenticateToken, createIngredient);
router.get("/ingredient", getIngredients);
router.get("/ingredient/:id", getIngredientById);
router.put("/ingredient/:id", authenticateToken, updateIngredient);
router.delete("/ingredient/:id", authenticateToken, deleteIngredient);

export default router;
