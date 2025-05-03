// src/routes/foodImageRoutes.ts
import { Router } from 'express';
import {
  createFoodImage,
  getFoodImages,
  getFoodImageById,
  updateFoodImage,
  deleteFoodImage,
} from '../controllers/foodImageController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

router.post('/food-image',authenticateToken, createFoodImage); // Route for creating a food image
router.get('/food-image', getFoodImages); // Route for getting all food images
router.get('/food-image/:id', getFoodImageById); // Route for getting a food image by ID
router.put('/food-image/:id',authenticateToken, updateFoodImage); // Route for updating a food image
router.delete('/food-image/:id',authenticateToken, deleteFoodImage); // Route for deleting a food image

export default router;
