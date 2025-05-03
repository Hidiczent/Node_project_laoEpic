import { Router } from 'express';
import { ProvinceController } from '../controllers/ProvinceController';

const router = Router();
const provinceController = new ProvinceController();

router.post('/provinces', provinceController.create);
router.get('/provinces', provinceController.getAll);
router.get('/provinces/:id', provinceController.getById);
router.put('/provinces/:id', provinceController.update);
router.delete('/provinces/:id', provinceController.delete);

export default router;
