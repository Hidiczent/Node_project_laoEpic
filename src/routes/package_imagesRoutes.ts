import { Router } from "express";
import {
  createPackageImages,
  getPackageImages,
  updatePackageImage,
  deletePackageImage,
} from "../controllers/packageImageController";

const router = Router();

router.post("/package-image", createPackageImages);
router.get("/package-images/:package_id", getPackageImages);
router.put("/package-image/:image_id", updatePackageImage);
router.delete("/package-image/:package_id", deletePackageImage);

export default router;
