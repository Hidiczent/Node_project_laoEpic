import { Router } from "express";
import {
  createVillage,
  getVillages,
  getVillageById,
  updateVillage,
  deleteVillage,
} from "../controllers/villageController";
import { authenticateToken } from "../middlewares/authMiddleware";
import { isAdmin } from "../middlewares/isAdmin";

const router = Router();

router.post("/create", authenticateToken, isAdmin, createVillage); // Create new village
router.get("/gets", authenticateToken, isAdmin, getVillages); // Get all villages
router.get("/get/:id", authenticateToken, isAdmin, getVillageById); // Get village by ID
router.put("/update/:id", authenticateToken, isAdmin, updateVillage); // Update village
router.delete("/delete/:id", authenticateToken, isAdmin, deleteVillage); // Delete village

export default router;
