import { Router } from 'express';
import {
  createProvince,
  getProvinces,
  getProvinceById,
  updateProvince,
  deleteProvince,
} from '../controllers/provinceController';

const router = Router();

router.post('/create', createProvince); // Create new province
router.get('/gets', getProvinces); // Get all provinces
router.get('/get/:id', getProvinceById); // Get province by ID
router.put('/update/:id', updateProvince); // Update province
router.delete('/delete/:id', deleteProvince); // Delete province

export default router;
