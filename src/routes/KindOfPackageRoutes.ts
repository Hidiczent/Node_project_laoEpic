import { Router } from 'express';
import {
  createKindOfPackage,
  getKindOfPackages,
  getKindOfPackageById,
  updateKindOfPackage,
  deleteKindOfPackage,
} from '../controllers/kindOfPackageController';

const router = Router();

router.post('/kind-of-package', createKindOfPackage); // Create
router.get('/kind-of-package', getKindOfPackages); // Read all
router.get('/kind-of-package/:id', getKindOfPackageById); // Read one by ID
router.put('/kind-of-package/:id', updateKindOfPackage); // Update
router.delete('/kind-of-package/:id', deleteKindOfPackage); // Delete

export default router;
