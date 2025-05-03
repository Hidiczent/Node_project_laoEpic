import { Router } from "express";
import {
  createDistrict,
  getDistricts,
  getDistrictById,
  updateDistrict,
  deleteDistrict,
} from "../controllers/districtController";
import { authenticateToken } from "../middlewares/authMiddleware";
import { isAdmin } from "../middlewares/isAdmin";

const router = Router();

router.post("/create", authenticateToken, isAdmin, createDistrict); // Create new district
router.get("/gets", authenticateToken, isAdmin, getDistricts); // Get all districts
router.get("/get/:id", authenticateToken, isAdmin, getDistrictById); // Get district by ID
router.put("/update/:id", authenticateToken, isAdmin, updateDistrict); // Update district
router.delete("/delete/:id", authenticateToken, isAdmin, deleteDistrict); // Delete district

export default router;
