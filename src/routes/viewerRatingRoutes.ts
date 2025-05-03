import { Router } from "express";
import {
  createViewerRating,
  getViewerRatings,
  getViewerRatingById,
  updateViewerRating,
  deleteViewerRating,
} from "../controllers/viewerRatingController";
import { isUser } from "../middlewares/isUser";
import { authenticateToken } from "../middlewares/authMiddleware";
import { isAdmin } from "../middlewares/isAdmin";

const router = Router();

router.post(
  "/viewer-ratings/admin-only",
  authenticateToken,
  isAdmin,
  createViewerRating
);
router.post(
  "/viewer-ratings/user-only",
  authenticateToken,
  isUser,
  createViewerRating
);
router.get("/viewer-ratings", getViewerRatings);
router.get("/viewer-ratings/:id", getViewerRatingById);
router.put(
  "/viewer-ratings/:id",
  authenticateToken,
  isAdmin,
  updateViewerRating
);

router.delete(
  "/viewer-ratings/admin-only/:id",
  authenticateToken,
  isAdmin,
  deleteViewerRating
);

export default router;
