import { Router } from "express";
import {
  createPackage,
  getPackages,
  updatePackage,
  deletePackage,
  getPackageById,
} from "../controllers/packageController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.post("/package", authenticateToken, createPackage);

router.get("/packages", getPackages);
router.get("/package/:package_id", getPackageById);

router.put("/package/:package_id", authenticateToken, updatePackage);
router.delete("/package/:package_id", authenticateToken, deletePackage);

export default router;
