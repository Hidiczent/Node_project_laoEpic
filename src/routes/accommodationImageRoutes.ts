import { Router } from 'express';
import {
  createAccommodationImage,
  getAccommodationImages,
  getAccommodationImageById,
  updateAccommodationImage,
  deleteAccommodationImage
} from '../controllers/accommodationImageController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

// Routes ที่สามารถเข้าถึงได้โดยผู้ใช้ที่ล็อกอินแล้วเท่านั้น
router.post('/accommodation-images', authenticateToken, createAccommodationImage); // Route for creating new image
router.put('/accommodation-images/:id', authenticateToken, updateAccommodationImage); // Route for updating image
router.delete('/accommodation-images/:id', authenticateToken, deleteAccommodationImage); // Route for deleting image

// Routes ที่ไม่จำเป็นต้องมีการตรวจสอบสิทธิ์
router.get('/accommodation-images', getAccommodationImages); // Route for fetching all images
router.get('/accommodation-images/:id', getAccommodationImageById); // Route for fetching image by ID

export default router;
