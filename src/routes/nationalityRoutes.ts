// src/routes/nationalityRoutes.ts
import { Router } from 'express';
import {
  createNationality,
  getNationalities,
  getNationalityById,
  updateNationality,
  deleteNationality,
} from '../controllers/nationalityController';

const router = Router();

router.post('/nationality', createNationality);
router.get('/nationalities', getNationalities);
router.get('/nationality/:id', getNationalityById);
router.put('/nationality/:id', updateNationality);
router.delete('/nationality/:id', deleteNationality);

export default router;
