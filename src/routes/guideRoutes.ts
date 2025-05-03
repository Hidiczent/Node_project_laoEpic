import { Router } from 'express';
import {
  createGuide,
  getGuides,
  getGuideById,
  updateGuide,
  deleteGuide,
} from '../controllers/guideController';

const router = Router();

router.post('/guide', createGuide);
router.get('/guide', getGuides);
router.get('/guide/:id', getGuideById);
router.put('/guide/:id', updateGuide);
router.delete('/guide/:id', deleteGuide);

export default router;
